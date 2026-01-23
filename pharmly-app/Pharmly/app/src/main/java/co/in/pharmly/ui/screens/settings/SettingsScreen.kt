package co.`in`.pharmly.ui.screens.settings

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ExitToApp
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import co.`in`.pharmly.data.api.RetrofitClient
import co.`in`.pharmly.data.model.UpdateStoreRequest
import co.`in`.pharmly.utils.TokenManager
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsScreen(storeName: String, onLogout: () -> Unit) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    
    var isLoading by remember { mutableStateOf(true) }
    var isSaving by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf<String?>(null) }
    var successMessage by remember { mutableStateOf<String?>(null) }
    
    // Form fields
    var name by remember { mutableStateOf("") }
    var whatsappNumber by remember { mutableStateOf("") }
    var secondaryMobileNumber by remember { mutableStateOf("") }
    var gstNumber by remember { mutableStateOf("") }
    var address by remember { mutableStateOf("") }
    var city by remember { mutableStateOf("") }
    var discountPercent by remember { mutableStateOf("") }
    
    // Load store details
    LaunchedEffect(Unit) {
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
                
                val response = RetrofitClient.apiService.getStoreDetails("Bearer $token")
                
                if (response.isSuccessful && response.body()?.success == true) {
                    val store = response.body()?.store
                    store?.let {
                        name = it.name
                        whatsappNumber = it.whatsappNumber
                        secondaryMobileNumber = it.secondaryMobileNumber ?: ""
                        gstNumber = it.gstNumber ?: ""
                        address = it.address
                        city = it.city
                        discountPercent = it.discountPercent.toString()
                    }
                } else {
                    errorMessage = response.body()?.message ?: "Failed to load store details"
                }
            } catch (e: Exception) {
                errorMessage = "Error: ${e.message}"
            } finally {
                isLoading = false
            }
        }
    }
    
    // Save changes function
    fun saveChanges() {
        scope.launch {
            isSaving = true
            errorMessage = null
            successMessage = null
            
            try {
                val token = TokenManager.getToken(context)
                if (token.isNullOrEmpty()) {
                    errorMessage = "Authentication required"
                    isSaving = false
                    return@launch
                }
                
                val request = UpdateStoreRequest(
                    name = name.trim(),
                    whatsappNumber = whatsappNumber.trim(),
                    secondaryMobileNumber = secondaryMobileNumber.trim().ifEmpty { null },
                    gstNumber = gstNumber.trim().ifEmpty { null },
                    address = address.trim(),
                    city = city.trim(),
                    discountPercent = discountPercent.toIntOrNull() ?: 0
                )
                
                val response = RetrofitClient.apiService.updateStoreDetails("Bearer $token", request)
                
                if (response.isSuccessful && response.body()?.success == true) {
                    successMessage = "Settings saved successfully!"
                } else {
                    errorMessage = response.body()?.message ?: "Failed to save settings"
                }
            } catch (e: Exception) {
                errorMessage = "Error: ${e.message}"
            } finally {
                isSaving = false
            }
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "Settings",
                            fontSize = 24.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF1F2937)
                        )
                        Text(
                            text = "Manage your store information",
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
        if (isLoading) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator(color = Color(0xFF14B8A6))
            }
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color(0xFFF9FAFB))
                    .padding(padding),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                // Error message
                if (errorMessage != null) {
                    item {
                        ErrorCard(message = errorMessage ?: "")
                    }
                }
                
                // Success message
                if (successMessage != null) {
                    item {
                        SuccessCard(message = successMessage ?: "")
                    }
                }
                
                // Store Name
                item {
                    SettingsTextField(
                        label = "Store Name",
                        value = name,
                        onValueChange = { name = it },
                        icon = Icons.Default.Store,
                        enabled = !isSaving
                    )
                }
                
                // WhatsApp Number
                item {
                    SettingsTextField(
                        label = "WhatsApp Number",
                        value = whatsappNumber,
                        onValueChange = { whatsappNumber = it },
                        icon = Icons.Default.Phone,
                        keyboardType = KeyboardType.Phone,
                        enabled = !isSaving
                    )
                }
                
                // Secondary Mobile Number
                item {
                    SettingsTextField(
                        label = "Secondary Mobile Number",
                        value = secondaryMobileNumber,
                        onValueChange = { secondaryMobileNumber = it },
                        icon = Icons.Default.Phone,
                        keyboardType = KeyboardType.Phone,
                        enabled = !isSaving,
                        placeholder = "Optional"
                    )
                }
                
                // GST Number
                item {
                    SettingsTextField(
                        label = "GST Number",
                        value = gstNumber,
                        onValueChange = { gstNumber = it.uppercase() },
                        icon = Icons.Default.Receipt,
                        enabled = !isSaving,
                        placeholder = "Optional"
                    )
                }
                
                // Address
                item {
                    SettingsTextField(
                        label = "Address",
                        value = address,
                        onValueChange = { address = it },
                        icon = Icons.Default.LocationOn,
                        enabled = !isSaving,
                        singleLine = false,
                        minLines = 3
                    )
                }
                
                // City
                item {
                    SettingsTextField(
                        label = "City",
                        value = city,
                        onValueChange = { city = it },
                        icon = Icons.Default.LocationCity,
                        enabled = !isSaving
                    )
                }
                
                // Default Discount
                item {
                    SettingsTextField(
                        label = "Default Discount (%)",
                        value = discountPercent,
                        onValueChange = { 
                            if (it.isEmpty() || it.toIntOrNull() != null) {
                                discountPercent = it
                            }
                        },
                        icon = Icons.Default.Percent,
                        keyboardType = KeyboardType.Number,
                        enabled = !isSaving
                    )
                }
                
                // Save Button
                item {
                    Button(
                        onClick = { saveChanges() },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(56.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color(0xFF14B8A6)
                        ),
                        shape = RoundedCornerShape(12.dp),
                        enabled = !isSaving
                    ) {
                        if (isSaving) {
                            CircularProgressIndicator(
                                color = Color.White,
                                modifier = Modifier.size(20.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                        } else {
                            Icon(
                                Icons.Default.Save,
                                contentDescription = "Save",
                                modifier = Modifier.size(20.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                        }
                        Text(
                            text = if (isSaving) "Saving..." else "Save Changes",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                }
                
                // Logout Button
                item {
                    OutlinedButton(
                        onClick = onLogout,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(56.dp),
                        colors = ButtonDefaults.outlinedButtonColors(
                            contentColor = Color(0xFFEF4444)
                        ),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Icon(
                            Icons.AutoMirrored.Filled.ExitToApp,
                            contentDescription = "Logout",
                            modifier = Modifier.size(20.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "Logout",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                }
                
                // Bottom spacing
                item {
                    Spacer(modifier = Modifier.height(32.dp))
                }
            }
        }
    }
}

@Composable
fun SettingsTextField(
    label: String,
    value: String,
    onValueChange: (String) -> Unit,
    icon: ImageVector,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    keyboardType: KeyboardType = KeyboardType.Text,
    placeholder: String = "",
    singleLine: Boolean = true,
    minLines: Int = 1
) {
    Card(
        modifier = modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = label,
                    tint = Color(0xFF6B7280),
                    modifier = Modifier.size(18.dp)
                )
                Text(
                    text = label,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Medium,
                    color = Color(0xFF6B7280)
                )
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            OutlinedTextField(
                value = value,
                onValueChange = onValueChange,
                modifier = Modifier.fillMaxWidth(),
                enabled = enabled,
                singleLine = singleLine,
                minLines = minLines,
                keyboardOptions = KeyboardOptions(keyboardType = keyboardType),
                placeholder = {
                    if (placeholder.isNotEmpty()) {
                        Text(
                            text = placeholder,
                            color = Color(0xFFD1D5DB),
                            fontSize = 14.sp
                        )
                    }
                },
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = Color(0xFF14B8A6),
                    unfocusedBorderColor = Color(0xFFE5E7EB),
                    disabledBorderColor = Color(0xFFE5E7EB),
                    focusedTextColor = Color(0xFF111827),
                    unfocusedTextColor = Color(0xFF111827)
                ),
                shape = RoundedCornerShape(8.dp)
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

@Composable
fun SuccessCard(message: String) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color(0xFFD1FAE5)),
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
                imageVector = Icons.Default.CheckCircle,
                contentDescription = null,
                tint = Color(0xFF059669),
                modifier = Modifier.size(24.dp)
            )
            Text(
                text = message,
                fontSize = 14.sp,
                color = Color(0xFF065F46)
            )
        }
    }
}
