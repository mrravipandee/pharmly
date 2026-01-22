package co.`in`.pharmly.ui.screens.customers

import android.content.Intent
import android.net.Uri
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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import co.`in`.pharmly.data.api.RetrofitClient
import co.`in`.pharmly.data.model.CustomerDetail
import co.`in`.pharmly.utils.TokenManager
import kotlinx.coroutines.launch

@Composable
fun CustomersScreen() {
    var customers by remember { mutableStateOf<List<CustomerDetail>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }
    var errorMessage by remember { mutableStateOf<String?>(null) }
    val context = LocalContext.current
    val scope = rememberCoroutineScope()

    fun loadCustomers() {
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

                Log.d("CustomersScreen", "📥 Fetching customers...")
                val response = RetrofitClient.apiService.getCustomers("Bearer $token")
                
                if (response.isSuccessful && response.body()?.success == true) {
                    customers = response.body()?.customers ?: emptyList()
                    Log.d("CustomersScreen", "✅ Loaded ${customers.size} customers")
                } else {
                    errorMessage = response.body()?.message ?: "Failed to load customers"
                    Log.e("CustomersScreen", "❌ Failed: $errorMessage")
                }
            } catch (e: Exception) {
                Log.e("CustomersScreen", "❌ Error fetching customers", e)
                errorMessage = "Error: ${e.message}"
            } finally {
                isLoading = false
            }
        }
    }

    LaunchedEffect(Unit) {
        loadCustomers()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF9FAFB))
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            // Header
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.padding(bottom = 8.dp)
            ) {
                Surface(
                    shape = RoundedCornerShape(12.dp),
                    color = Color(0xFF14B8A6),
                    shadowElevation = 4.dp
                ) {
                    Icon(
                        Icons.Default.People,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.padding(8.dp).size(28.dp)
                    )
                }
                
                Column {
                    Text(
                        text = "Customers",
                        fontSize = 28.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF1F2937)
                    )
                }
            }
            
            Text(
                text = "${customers.size} customer${if (customers.size != 1) "s" else ""} have purchased from your store",
                fontSize = 14.sp,
                color = Color(0xFF6B7280),
                modifier = Modifier.padding(bottom = 16.dp)
            )

            when {
                isLoading -> {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            CircularProgressIndicator(
                                color = Color(0xFF14B8A6),
                                modifier = Modifier.size(48.dp)
                            )
                            Text(
                                text = "Loading customers...",
                                fontSize = 16.sp,
                                color = Color(0xFF6B7280)
                            )
                        }
                    }
                }
                errorMessage != null -> {
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
                            horizontalArrangement = Arrangement.spacedBy(12.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                Icons.Default.Warning,
                                contentDescription = "Error",
                                tint = Color(0xFFDC2626),
                                modifier = Modifier.size(24.dp)
                            )
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = "Error Loading Customers",
                                    fontWeight = FontWeight.Bold,
                                    color = Color(0xFFDC2626),
                                    fontSize = 16.sp
                                )
                                Text(
                                    text = errorMessage ?: "Unknown error",
                                    color = Color(0xFFDC2626),
                                    fontSize = 14.sp
                                )
                            }
                        }
                    }
                    
                    Spacer(modifier = Modifier.height(12.dp))
                    
                    Button(
                        onClick = { loadCustomers() },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color(0xFF14B8A6)
                        ),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Icon(Icons.Default.Refresh, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Retry")
                    }
                }
                customers.isEmpty() -> {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            Icon(
                                Icons.Default.People,
                                contentDescription = "No customers",
                                modifier = Modifier.size(80.dp),
                                tint = Color(0xFFE5E7EB)
                            )
                            Text(
                                text = "No customers yet",
                                fontSize = 20.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF6B7280)
                            )
                            Text(
                                text = "Customers will appear here after\ntheir first purchase",
                                fontSize = 14.sp,
                                color = Color(0xFF9CA3AF),
                                modifier = Modifier.padding(horizontal = 32.dp)
                            )
                        }
                    }
                }
                else -> {
                    LazyColumn(
                        modifier = Modifier.fillMaxSize(),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        items(
                            items = customers,
                            key = { customer -> customer.id }
                        ) { customer ->
                            CustomerListItem(customer = customer)
                        }
                        
                        item {
                            Spacer(modifier = Modifier.height(80.dp))
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun CustomerListItem(customer: CustomerDetail) {
    val context = LocalContext.current

    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        ),
        shape = RoundedCornerShape(16.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            // Customer Header
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = Color(0xFFDCFCE7)
                ) {
                    Icon(
                        Icons.Default.Person,
                        contentDescription = null,
                        tint = Color(0xFF14B8A6),
                        modifier = Modifier.padding(8.dp).size(20.dp)
                    )
                }
                
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = customer.name,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF1F2937)
                    )
                    if (customer.age != null || customer.gender != null) {
                        Spacer(modifier = Modifier.height(2.dp))
                        Text(
                            text = buildString {
                                if (customer.age != null) append("${customer.age} years")
                                if (customer.age != null && customer.gender != null) append(" • ")
                                if (customer.gender != null) append(customer.gender.replaceFirstChar { it.uppercase() })
                            },
                            fontSize = 13.sp,
                            color = Color(0xFF6B7280)
                        )
                    }
                }
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            // Phone Number
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Icon(
                    Icons.Default.Phone,
                    contentDescription = null,
                    tint = Color(0xFF6B7280),
                    modifier = Modifier.size(18.dp)
                )
                Text(
                    text = customer.whatsappNumber,
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Medium,
                    color = Color(0xFF1F2937)
                )
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            // Action Buttons
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                // Call Button
                OutlinedButton(
                    onClick = {
                        val intent = Intent(Intent.ACTION_DIAL).apply {
                            data = Uri.parse("tel:${customer.whatsappNumber}")
                        }
                        context.startActivity(intent)
                    },
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(10.dp),
                    colors = ButtonDefaults.outlinedButtonColors(
                        contentColor = Color(0xFF14B8A6)
                    )
                ) {
                    Icon(
                        Icons.Default.Phone,
                        contentDescription = "Call",
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("Call", fontSize = 14.sp, fontWeight = FontWeight.Medium)
                }
                
                // WhatsApp Button
                Button(
                    onClick = {
                        try {
                            val formattedPhone = "91${customer.whatsappNumber}"
                            val message = "Hello ${customer.name}! 👋"
                            val encodedMessage = Uri.encode(message)
                            val whatsappUrl = "https://wa.me/$formattedPhone?text=$encodedMessage"
                            
                            val intent = Intent(Intent.ACTION_VIEW).apply {
                                data = Uri.parse(whatsappUrl)
                            }
                            context.startActivity(intent)
                        } catch (e: Exception) {
                            Log.e("CustomerListItem", "Error opening WhatsApp", e)
                        }
                    },
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(10.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0xFF25D366)
                    )
                ) {
                    Icon(
                        Icons.Default.Chat,
                        contentDescription = "WhatsApp",
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("WhatsApp", fontSize = 14.sp, fontWeight = FontWeight.Medium)
                }
            }
        }
    }
}
