package co.`in`.pharmly.ui.screens.analytics

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.TrendingDown
import androidx.compose.material.icons.automirrored.filled.TrendingUp
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import co.`in`.pharmly.data.api.RetrofitClient
import co.`in`.pharmly.data.model.DailyTotal
import co.`in`.pharmly.data.model.RecentBill
import co.`in`.pharmly.utils.TokenManager
import kotlinx.coroutines.launch
import java.text.NumberFormat
import java.text.SimpleDateFormat
import java.util.*

enum class TimePeriod {
    TODAY, YESTERDAY, LAST_7_DAYS, LAST_30_DAYS
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AnalyticsScreen() {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    
    var selectedPeriod by remember { mutableStateOf(TimePeriod.TODAY) }
    var isLoading by remember { mutableStateOf(true) }
    var errorMessage by remember { mutableStateOf<String?>(null) }
    
    // Analytics data
    var totalSales by remember { mutableStateOf(0.0) }
    var totalBills by remember { mutableStateOf(0) }
    var uniqueCustomers by remember { mutableStateOf(0) }
    var averageBillValue by remember { mutableStateOf(0.0) }
    var growthPercent by remember { mutableStateOf(0.0) }
    var previousTotal by remember { mutableStateOf(0.0) }
    var salesHistory by remember { mutableStateOf<List<DailyTotal>>(emptyList()) }
    var recentBills by remember { mutableStateOf<List<RecentBill>>(emptyList()) }

    // Load data when period changes
    LaunchedEffect(selectedPeriod) {
        scope.launch {
            isLoading = true
            errorMessage = null
            
            try {
                val token = TokenManager.getToken(context)
                if (token.isNullOrEmpty()) {
                    errorMessage = "Authentication required"
                    isLoading = false
                    return@launch
                }
                
                val authHeader = "Bearer $token"
                
                when (selectedPeriod) {
                    TimePeriod.TODAY, TimePeriod.YESTERDAY -> {
                        // Get today's summary
                        val summaryResponse = RetrofitClient.apiService.getTodaySummary(authHeader)
                        if (summaryResponse.isSuccessful && summaryResponse.body()?.success == true) {
                            val data = summaryResponse.body()?.data
                            totalSales = if (selectedPeriod == TimePeriod.TODAY) {
                                data?.todayTotal ?: 0.0
                            } else {
                                data?.yesterdayTotal ?: 0.0
                            }
                            previousTotal = if (selectedPeriod == TimePeriod.TODAY) {
                                data?.yesterdayTotal ?: 0.0
                            } else {
                                0.0
                            }
                            growthPercent = data?.growthPercent ?: 0.0
                        }
                        
                        // Get recent bills for counting
                        val billsResponse = RetrofitClient.apiService.getRecentBills(authHeader)
                        if (billsResponse.isSuccessful && billsResponse.body()?.success == true) {
                            recentBills = billsResponse.body()?.data ?: emptyList()
                            totalBills = recentBills.size
                            
                            // Calculate unique customers
                            uniqueCustomers = recentBills.mapNotNull { it.customerId }.distinct().size
                            
                            // Calculate average
                            averageBillValue = if (totalBills > 0) totalSales / totalBills else 0.0
                        }
                    }
                    
                    TimePeriod.LAST_7_DAYS, TimePeriod.LAST_30_DAYS -> {
                        val days = if (selectedPeriod == TimePeriod.LAST_7_DAYS) 7 else 30
                        val calendar = Calendar.getInstance()
                        val endDate = calendar.time
                        calendar.add(Calendar.DAY_OF_YEAR, -days)
                        val startDate = calendar.time
                        
                        val dateFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
                        val fromStr = dateFormat.format(startDate)
                        val toStr = dateFormat.format(endDate)
                        
                        // Get sales history
                        val historyResponse = RetrofitClient.apiService.getSalesHistory(authHeader, fromStr, toStr)
                        if (historyResponse.isSuccessful && historyResponse.body()?.success == true) {
                            salesHistory = historyResponse.body()?.data ?: emptyList()
                            totalSales = salesHistory.sumOf { it.total }
                        }
                        
                        // Get recent bills
                        val billsResponse = RetrofitClient.apiService.getRecentBills(authHeader)
                        if (billsResponse.isSuccessful && billsResponse.body()?.success == true) {
                            recentBills = billsResponse.body()?.data ?: emptyList()
                            
                            // Filter bills within period
                            val filteredBills = recentBills.filter { bill ->
                                try {
                                    val billDate = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
                                        .parse(bill.createdAt)
                                    billDate != null && billDate >= startDate && billDate <= endDate
                                } catch (_: Exception) {
                                    false
                                }
                            }
                            
                            totalBills = filteredBills.size
                            uniqueCustomers = filteredBills.mapNotNull { it.customerId }.distinct().size
                            averageBillValue = if (totalBills > 0) totalSales / totalBills else 0.0
                            
                            // Calculate growth
                            val midPoint = days / 2
                            calendar.time = endDate
                            calendar.add(Calendar.DAY_OF_YEAR, -midPoint)
                            val currentPeriodTotal = salesHistory.filter { 
                                val date = dateFormat.parse(it.date)
                                date != null && date >= calendar.time
                            }.sumOf { it.total }
                            
                            val previousPeriodTotal = salesHistory.filter {
                                val date = dateFormat.parse(it.date)
                                date != null && date < calendar.time
                            }.sumOf { it.total }
                            
                            previousTotal = previousPeriodTotal
                            growthPercent = if (previousPeriodTotal > 0) {
                                ((currentPeriodTotal - previousPeriodTotal) / previousPeriodTotal) * 100
                            } else if (currentPeriodTotal > 0) {
                                100.0
                            } else {
                                0.0
                            }
                        }
                    }
                }
                
            } catch (e: Exception) {
                errorMessage = "Failed to load analytics: ${e.message}"
            } finally {
                isLoading = false
            }
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "Analytics",
                            fontSize = 28.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF1F2937)
                        )
                        Text(
                            text = "Track sales and performance metrics",
                            fontSize = 12.sp,
                            color = Color.Gray
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color.White
                )
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFFF9FAFB))
                .padding(padding),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Time period filter
            item {
                TimePeriodFilter(
                    selectedPeriod = selectedPeriod,
                    onPeriodSelected = { selectedPeriod = it }
                )
            }
            
            if (isLoading) {
                item {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(200.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        CircularProgressIndicator(color = Color(0xFF14B8A6))
                    }
                }
            } else if (errorMessage != null) {
                item {
                    ErrorCard(message = errorMessage ?: "Unknown error")
                }
            } else {
                // Main stats grid
                item {
                    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            AnalyticsStatCard(
                                title = "Total Sales",
                                value = "₹${formatNumber(totalSales)}",
                                icon = Icons.Default.AttachMoney,
                                growthPercent = growthPercent,
                                previousValue = "₹${formatNumber(previousTotal)}",
                                modifier = Modifier.weight(1f)
                            )
                        }
                        
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            AnalyticsStatCard(
                                title = "Total Bills",
                                value = totalBills.toString(),
                                icon = Icons.Default.Receipt,
                                modifier = Modifier.weight(1f)
                            )
                            
                            AnalyticsStatCard(
                                title = "Unique Customers",
                                value = uniqueCustomers.toString(),
                                icon = Icons.Default.People,
                                modifier = Modifier.weight(1f)
                            )
                        }
                        
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            AnalyticsStatCard(
                                title = "Average Bill Value",
                                value = "₹${formatNumber(averageBillValue)}",
                                icon = Icons.Default.ShowChart,
                                subtitle = "From $totalBills bills",
                                modifier = Modifier.weight(1f)
                            )
                        }
                    }
                }
                
                // Performance Insights
                if (selectedPeriod == TimePeriod.LAST_7_DAYS || selectedPeriod == TimePeriod.LAST_30_DAYS) {
                    item {
                        PerformanceInsightsCard(
                            salesHistory = salesHistory,
                            totalSales = totalSales,
                            growthPercent = growthPercent
                        )
                    }
                }
                
                // Sales breakdown
                item {
                    SalesBreakdownCard(
                        totalSales = totalSales,
                        totalBills = totalBills,
                        uniqueCustomers = uniqueCustomers,
                        averageBillValue = averageBillValue
                    )
                }
            }
        }
    }
}

@Composable
fun TimePeriodFilter(
    selectedPeriod: TimePeriod,
    onPeriodSelected: (TimePeriod) -> Unit
) {
    LazyRow(
        modifier = Modifier.fillMaxWidth(),
        contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(TimePeriod.values().size) { index ->
            val period = TimePeriod.values()[index]
            FilterChip(
                selected = selectedPeriod == period,
                onClick = { onPeriodSelected(period) },
                label = {
                    Text(
                        text = when (period) {
                            TimePeriod.TODAY -> "Today"
                            TimePeriod.YESTERDAY -> "Yesterday"
                            TimePeriod.LAST_7_DAYS -> "Last 7 Days"
                            TimePeriod.LAST_30_DAYS -> "Last 30 Days"
                        },
                        fontSize = 13.sp
                    )
                },
                colors = FilterChipDefaults.filterChipColors(
                    selectedContainerColor = Color(0xFF14B8A6),
                    selectedLabelColor = Color.White,
                    containerColor = Color.White,
                    labelColor = Color.Gray
                )
            )
        }
    }
}

@Composable
fun AnalyticsStatCard(
    title: String,
    value: String,
    icon: ImageVector,
    modifier: Modifier = Modifier,
    growthPercent: Double? = null,
    previousValue: String? = null,
    subtitle: String? = null
) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            // Icon
            Icon(
                imageVector = icon,
                contentDescription = title,
                tint = Color(0xFF6B7280),
                modifier = Modifier.size(28.dp)
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            // Title
            Text(
                text = title,
                fontSize = 12.sp,
                color = Color(0xFF6B7280),
                fontWeight = FontWeight.Medium
            )
            
            Spacer(modifier = Modifier.height(4.dp))
            
            // Value
            Text(
                text = value,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF111827)
            )
            
            // Growth indicator or subtitle
            if (growthPercent != null) {
                Spacer(modifier = Modifier.height(8.dp))
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Icon(
                        imageVector = if (growthPercent >= 0) Icons.AutoMirrored.Filled.TrendingUp else Icons.AutoMirrored.Filled.TrendingDown,
                        contentDescription = null,
                        tint = if (growthPercent >= 0) Color(0xFF16A34A) else Color(0xFFDC2626),
                        modifier = Modifier.size(16.dp)
                    )
                    Text(
                        text = "${if (growthPercent >= 0) "+" else ""}${String.format("%.1f", growthPercent)}%",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Medium,
                        color = if (growthPercent >= 0) Color(0xFF16A34A) else Color(0xFFDC2626)
                    )
                }
                if (previousValue != null) {
                    Text(
                        text = "Previous period: $previousValue",
                        fontSize = 11.sp,
                        color = Color(0xFF9CA3AF),
                        modifier = Modifier.padding(top = 4.dp)
                    )
                }
            } else if (subtitle != null) {
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = subtitle,
                    fontSize = 11.sp,
                    color = Color(0xFF9CA3AF)
                )
            }
        }
    }
}

@Composable
fun PerformanceInsightsCard(
    salesHistory: List<DailyTotal>,
    totalSales: Double,
    growthPercent: Double
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color(0xFFECFDF5)),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Performance Insights",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF111827)
                    )
                    Text(
                        text = "Period: ${salesHistory.firstOrNull()?.date ?: ""} to ${salesHistory.lastOrNull()?.date ?: ""}",
                        fontSize = 11.sp,
                        color = Color(0xFF6B7280),
                        modifier = Modifier.padding(top = 2.dp)
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Insights
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                InsightRow(
                    label = "Sales growth",
                    value = "${if (growthPercent >= 0) "+" else ""}${String.format("%.1f", growthPercent)}%",
                    isPositive = growthPercent >= 0
                )
                
                InsightRow(
                    label = "Revenue per customer",
                    value = "₹${formatNumber(totalSales / (salesHistory.size.coerceAtLeast(1)))}",
                    isPositive = null
                )
                
                val avgDailySales = totalSales / salesHistory.size.coerceAtLeast(1)
                InsightRow(
                    label = "Average daily sales",
                    value = "₹${formatNumber(avgDailySales)}",
                    isPositive = null
                )
            }
        }
    }
}

@Composable
fun InsightRow(
    label: String,
    value: String,
    isPositive: Boolean?
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = label,
            fontSize = 13.sp,
            color = Color(0xFF6B7280)
        )
        
        Row(
            horizontalArrangement = Arrangement.spacedBy(4.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = value,
                fontSize = 14.sp,
                fontWeight = FontWeight.SemiBold,
                color = when (isPositive) {
                    true -> Color(0xFF16A34A)
                    false -> Color(0xFFDC2626)
                    null -> Color(0xFF111827)
                }
            )
            if (isPositive != null) {
                Icon(
                    imageVector = if (isPositive) Icons.AutoMirrored.Filled.TrendingUp else Icons.AutoMirrored.Filled.TrendingDown,
                    contentDescription = null,
                    tint = if (isPositive) Color(0xFF16A34A) else Color(0xFFDC2626),
                    modifier = Modifier.size(14.dp)
                )
            }
        }
    }
}

@Composable
fun SalesBreakdownCard(
    totalSales: Double,
    totalBills: Int,
    uniqueCustomers: Int,
    averageBillValue: Double
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(
                text = "Sales Breakdown",
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF111827)
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                BreakdownRow(
                    label = "Total Revenue",
                    value = "₹${formatNumber(totalSales)}",
                    percentage = 100.0
                )
                
                BreakdownRow(
                    label = "Bills Generated",
                    value = totalBills.toString(),
                    percentage = null
                )
                
                BreakdownRow(
                    label = "Customer Base",
                    value = uniqueCustomers.toString(),
                    percentage = null
                )
                
                BreakdownRow(
                    label = "Avg. Bill Value",
                    value = "₹${formatNumber(averageBillValue)}",
                    percentage = null
                )
            }
        }
    }
}

@Composable
fun BreakdownRow(
    label: String,
    value: String,
    percentage: Double?
) {
    Column {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = label,
                fontSize = 13.sp,
                color = Color(0xFF6B7280)
            )
            Text(
                text = value,
                fontSize = 14.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color(0xFF111827)
            )
        }
        
        if (percentage != null) {
            Spacer(modifier = Modifier.height(6.dp))
            LinearProgressIndicator(
                progress = { (percentage / 100).toFloat() },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(6.dp),
                color = Color(0xFF14B8A6),
                trackColor = Color(0xFFE5E7EB),
            )
        }
    }
}

@Composable
fun ErrorCard(message: String) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color(0xFFFEE2E2)),
        shape = RoundedCornerShape(12.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.Warning,
                contentDescription = null,
                tint = Color(0xFFDC2626),
                modifier = Modifier.size(24.dp)
            )
            Text(
                text = message,
                fontSize = 14.sp,
                color = Color(0xFF991B1B)
            )
        }
    }
}

private fun formatNumber(value: Double): String {
    return NumberFormat.getNumberInstance(Locale("en", "IN")).format(value.toInt())
}
