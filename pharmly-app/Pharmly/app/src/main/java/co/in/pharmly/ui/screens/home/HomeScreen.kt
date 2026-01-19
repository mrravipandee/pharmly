package co.`in`.pharmly.ui.screens.home

import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import co.`in`.pharmly.data.api.RetrofitClient
import co.`in`.pharmly.data.model.DashboardStats
import co.`in`.pharmly.ui.screens.home.components.BillItemCard
import co.`in`.pharmly.ui.screens.home.components.StatCard
import co.`in`.pharmly.utils.TokenManager
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun HomeScreen(storeName: String) {
    var dashboardStats by remember { mutableStateOf<DashboardStats?>(null) }
    var isLoading by remember { mutableStateOf(true) }
    var errorMessage by remember { mutableStateOf<String?>(null) }
    val context = androidx.compose.ui.platform.LocalContext.current
    val scope = rememberCoroutineScope()

    LaunchedEffect(Unit) {
        scope.launch {
            try {
                isLoading = true
                errorMessage = null
                
                val token = TokenManager.getToken(context)
                if (token.isNullOrEmpty()) {
                    errorMessage = "No authentication token found"
                    isLoading = false
                    return@launch
                }

                val response = RetrofitClient.apiService.getBills("Bearer $token")
                
                if (response.isSuccessful && response.body()?.success == true) {
                    val bills = response.body()?.bills ?: emptyList()
                    
                    // Calculate today's stats
                    val calendar = Calendar.getInstance()
                    calendar.set(Calendar.HOUR_OF_DAY, 0)
                    calendar.set(Calendar.MINUTE, 0)
                    calendar.set(Calendar.SECOND, 0)
                    calendar.set(Calendar.MILLISECOND, 0)
                    val todayStart = calendar.time
                    
                    val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.US)
                    dateFormat.timeZone = TimeZone.getTimeZone("UTC")
                    
                    val todayBills = bills.filter { bill ->
                        try {
                            val billDate = dateFormat.parse(bill.createdAt)
                            billDate != null && billDate.time >= todayStart.time
                        } catch (e: Exception) {
                            Log.e("HomeScreen", "Date parse error: ${e.message}")
                            false
                        }
                    }
                    
                    val todaySales = todayBills.sumOf { it.finalAmount }
                    val uniqueCustomers = todayBills.map { it.customerId.id }.toSet().size
                    val avgBill = if (todayBills.isNotEmpty()) todaySales / todayBills.size else 0.0
                    
                    dashboardStats = DashboardStats(
                        todaySales = todaySales,
                        billsToday = todayBills.size,
                        customersToday = uniqueCustomers,
                        avgBillValue = avgBill,
                        recentBills = bills.take(5)
                    )
                } else {
                    errorMessage = response.body()?.message ?: "Failed to load data"
                }
            } catch (e: Exception) {
                Log.e("HomeScreen", "Error fetching bills", e)
                errorMessage = "Error: ${e.message}"
            } finally {
                isLoading = false
            }
        }
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF9FAFB))
            .padding(16.dp)
    ) {
        item {
            // Header Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(
                    containerColor = Color(0xFF14B8A6)
                ),
                shape = RoundedCornerShape(16.dp),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(20.dp)
                ) {
                    Text(
                        text = "Welcome Back! 👋",
                        fontSize = 16.sp,
                        color = Color.White.copy(alpha = 0.9f)
                    )
                    
                    Spacer(modifier = Modifier.height(4.dp))
                    
                    Text(
                        text = storeName,
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
        }

        if (isLoading) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(40.dp),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator(color = Color(0xFF14B8A6))
                }
            }
        } else if (errorMessage != null) {
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(
                        containerColor = Color(0xFFFEE2E2)
                    ),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        horizontalArrangement = Arrangement.Center,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            Icons.Filled.Info,
                            contentDescription = "Error",
                            tint = Color(0xFFDC2626),
                            modifier = Modifier.size(20.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = errorMessage ?: "Unknown error",
                            color = Color(0xFFDC2626),
                            fontSize = 14.sp
                        )
                    }
                }
            }
        }
        
        dashboardStats?.let { stats ->
            // Stats Section Header
            item {
                Text(
                    text = "Today's Overview",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF1F2937)
                )
                Spacer(modifier = Modifier.height(12.dp))
            }

            // First Row of Stats Cards
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    StatCard(
                        title = "Today's Sales",
                        value = "₹${String.format(Locale.US, "%.0f", stats.todaySales)}",
                        icon = Icons.Filled.ShoppingCart,
                        modifier = Modifier.weight(1f)
                    )
                    StatCard(
                        title = "Bills Today",
                        value = stats.billsToday.toString(),
                        icon = Icons.Filled.List,
                        modifier = Modifier.weight(1f)
                    )
                }
            }
            
            // Second Row of Stats Cards
            item {
                Spacer(modifier = Modifier.height(12.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    StatCard(
                        title = "Customers",
                        value = stats.customersToday.toString(),
                        icon = Icons.Filled.Person,
                        modifier = Modifier.weight(1f)
                    )
                    StatCard(
                        title = "Avg Bill",
                        value = "₹${String.format(Locale.US, "%.0f", stats.avgBillValue)}",
                        icon = Icons.Filled.AccountBalanceWallet,
                        modifier = Modifier.weight(1f)
                    )
                }
                Spacer(modifier = Modifier.height(24.dp))
            }
            
            // Recent Bills Section Header
            item {
                Text(
                    text = "Recent Bills",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF1F2937)
                )
                Spacer(modifier = Modifier.height(12.dp))
            }

            if (stats.recentBills.isEmpty()) {
                item {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(
                            containerColor = Color.White
                        ),
                        shape = RoundedCornerShape(12.dp),
                        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(32.dp),
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Icon(
                                Icons.Filled.List,
                                contentDescription = "No bills",
                                modifier = Modifier.size(48.dp),
                                tint = Color.Gray.copy(alpha = 0.3f)
                            )
                            Spacer(modifier = Modifier.height(12.dp))
                            Text(
                                text = "No bills yet",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Medium,
                                color = Color.Gray
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = "Create your first bill to get started",
                                fontSize = 14.sp,
                                color = Color.Gray.copy(alpha = 0.7f)
                            )
                        }
                    }
                }
            } else {
                items(
                    items = stats.recentBills,
                    key = { bill -> bill.id }
                ) { bill ->
                    BillItemCard(bill)
                    Spacer(modifier = Modifier.height(8.dp))
                }
            }
            
            item {
                Spacer(modifier = Modifier.height(80.dp))
            }
        }
    }
}
