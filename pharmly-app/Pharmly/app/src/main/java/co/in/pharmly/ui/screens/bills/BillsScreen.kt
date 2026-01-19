package co.`in`.pharmly.ui.screens.bills

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
import co.`in`.pharmly.data.model.Bill
import co.`in`.pharmly.utils.TokenManager
import kotlinx.coroutines.launch

@Composable
fun BillsScreen() {
    var bills by remember { mutableStateOf<List<Bill>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }
    var errorMessage by remember { mutableStateOf<String?>(null) }
    var showDeleteDialog by remember { mutableStateOf(false) }
    var billToDelete by remember { mutableStateOf<Bill?>(null) }
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
                    bills = response.body()?.bills ?: emptyList()
                } else {
                    errorMessage = response.body()?.message ?: "Failed to load bills"
                }
            } catch (e: Exception) {
                Log.e("BillsScreen", "Error fetching bills", e)
                errorMessage = "Error: ${e.message}"
            } finally {
                isLoading = false
            }
        }
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
            Text(
                text = "All Bills",
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF1F2937)
            )
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Text(
                text = "${bills.size} total bills",
                fontSize = 14.sp,
                color = Color.Gray
            )
            
            Spacer(modifier = Modifier.height(16.dp))

            when {
                isLoading -> {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        CircularProgressIndicator(color = Color(0xFF14B8A6))
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
                bills.isEmpty() -> {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Icon(
                                Icons.Filled.List,
                                contentDescription = "No bills",
                                modifier = Modifier.size(64.dp),
                                tint = Color.Gray.copy(alpha = 0.3f)
                            )
                            Spacer(modifier = Modifier.height(16.dp))
                            Text(
                                text = "No bills found",
                                fontSize = 18.sp,
                                fontWeight = FontWeight.Medium,
                                color = Color.Gray
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text(
                                text = "Create your first bill to get started",
                                fontSize = 14.sp,
                                color = Color.Gray.copy(alpha = 0.7f)
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
                            items = bills,
                            key = { bill -> bill.id }
                        ) { bill ->
                            BillListItem(
                                bill = bill,
                                onViewClick = { /* TODO: Navigate to bill detail */ },
                                onDeleteClick = {
                                    billToDelete = bill
                                    showDeleteDialog = true
                                }
                            )
                        }
                        
                        item {
                            Spacer(modifier = Modifier.height(80.dp))
                        }
                    }
                }
            }
        }

        // Delete Confirmation Dialog
        if (showDeleteDialog && billToDelete != null) {
            AlertDialog(
                onDismissRequest = { showDeleteDialog = false },
                title = {
                    Text(
                        text = "Delete Bill",
                        fontWeight = FontWeight.Bold
                    )
                },
                text = {
                    Text("Are you sure you want to delete this bill for ${billToDelete?.customerId?.name}?")
                },
                confirmButton = {
                    TextButton(
                        onClick = {
                            // TODO: Implement delete API call
                            showDeleteDialog = false
                            billToDelete = null
                        },
                        colors = ButtonDefaults.textButtonColors(
                            contentColor = Color(0xFFDC2626)
                        )
                    ) {
                        Text("Delete")
                    }
                },
                dismissButton = {
                    TextButton(
                        onClick = {
                            showDeleteDialog = false
                            billToDelete = null
                        }
                    ) {
                        Text("Cancel")
                    }
                }
            )
        }
    }
}
