package co.`in`.pharmly.ui.screens.createbill

import android.content.Intent
import android.net.Uri
import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import co.`in`.pharmly.data.api.RetrofitClient
import co.`in`.pharmly.data.model.BillItem
import co.`in`.pharmly.data.model.CreateBillRequest
import co.`in`.pharmly.data.model.CustomerInfo
import co.`in`.pharmly.utils.TokenManager
import kotlinx.coroutines.launch

data class MedicineItem(
    val name: String = "",
    val stripPrice: String = "",
    val tabletsInStrip: String = "",
    val tabletsGiven: String = ""
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CreateBillScreen() {
    var whatsappNumber by remember { mutableStateOf("") }
    var customerName by remember { mutableStateOf("") }
    var age by remember { mutableStateOf("") }
    var gender by remember { mutableStateOf("") }
    var isCustomerLoaded by remember { mutableStateOf(false) }
    var isLoadingCustomer by remember { mutableStateOf(false) }
    var isExistingCustomer by remember { mutableStateOf(false) }
    var genderExpanded by remember { mutableStateOf(false) }
    
    var medicines by remember { mutableStateOf(listOf(MedicineItem())) }
    var discountPercent by remember { mutableFloatStateOf(0f) }
    
    // Validation errors
    var whatsappError by remember { mutableStateOf<String?>(null) }
    var customerNameError by remember { mutableStateOf<String?>(null) }
    var medicinesError by remember { mutableStateOf<String?>(null) }
    
    var isCreating by remember { mutableStateOf(false) }
    var showSuccessDialog by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf<String?>(null) }
    
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    
    // Calculate totals
    val subtotal = remember(medicines) {
        medicines.sumOf { medicine ->
            val stripPrice = medicine.stripPrice.toDoubleOrNull() ?: 0.0
            val tabletsInStrip = medicine.tabletsInStrip.toDoubleOrNull() ?: 1.0
            val tabletsGiven = medicine.tabletsGiven.toDoubleOrNull() ?: 0.0
            
            if (tabletsInStrip > 0) {
                val pricePerTablet = stripPrice / tabletsInStrip
                pricePerTablet * tabletsGiven
            } else {
                0.0
            }
        }
    }
    
    val discount = subtotal * discountPercent / 100.0
    val finalAmount = subtotal - discount
    
    fun lookupCustomer() {
        if (whatsappNumber.length != 10) {
            whatsappError = "Enter valid 10-digit number"
            return
        }
        
        scope.launch {
            try {
                isLoadingCustomer = true
                whatsappError = null
                
                val token = TokenManager.getToken(context)
                if (token.isNullOrEmpty()) {
                    errorMessage = "Authentication required"
                    return@launch
                }
                
                Log.d("CreateBill", "🔍 Searching for customer: $whatsappNumber")
                
                val response = RetrofitClient.apiService.getCustomerByPhone(
                    "Bearer $token",
                    whatsappNumber
                )
                
                Log.d("CreateBill", "📥 Response: ${response.code()} - ${response.body()}")
                
                if (response.isSuccessful) {
                    val body = response.body()
                    
                    // Check if customer exists in the response
                    if (body?.exists == true && body.patient != null) {
                        val customer = body.patient
                        Log.d("CreateBill", "✅ Customer found: ${customer.name}")
                        
                        customerName = customer.name ?: ""
                        age = customer.age?.toString() ?: ""
                        gender = customer.gender ?: ""
                        isCustomerLoaded = true
                        isExistingCustomer = true
                    } else {
                        // Customer not found - show new customer form
                        Log.d("CreateBill", "❌ Customer not found, showing new customer form")
                        customerName = ""
                        age = ""
                        gender = ""
                        isCustomerLoaded = true
                        isExistingCustomer = false
                    }
                } else {
                    // Customer not found or error - allow new customer
                    Log.e("CreateBill", "❌ API error: ${response.code()}")
                    customerName = ""
                    age = ""
                    gender = ""
                    isCustomerLoaded = true
                    isExistingCustomer = false
                }
            } catch (e: Exception) {
                Log.e("CreateBill", "❌ Error looking up customer", e)
                errorMessage = "Error checking customer: ${e.message}"
                customerName = ""
                age = ""
                gender = ""
                isCustomerLoaded = true
                isExistingCustomer = false
            } finally {
                isLoadingCustomer = false
            }
        }
    }
    
    fun validateForm(): Boolean {
        var isValid = true
        
        if (whatsappNumber.length != 10) {
            whatsappError = "Valid 10-digit number required"
            isValid = false
        } else {
            whatsappError = null
        }
        
        if (customerName.isBlank()) {
            customerNameError = "Customer name is required"
            isValid = false
        } else {
            customerNameError = null
        }
        
        val validMedicines = medicines.filter { 
            it.name.isNotBlank() && 
            it.stripPrice.isNotBlank() && 
            it.tabletsInStrip.isNotBlank() && 
            it.tabletsGiven.isNotBlank()
        }
        
        if (validMedicines.isEmpty()) {
            medicinesError = "Add at least one medicine with all details"
            isValid = false
        } else {
            medicinesError = null
        }
        
        return isValid
    }
    
    fun createBill() {
        if (!validateForm()) {
            errorMessage = "Please fill all required fields"
            return
        }
        
        scope.launch {
            try {
                isCreating = true
                errorMessage = null
                
                val token = TokenManager.getToken(context)
                if (token.isNullOrEmpty()) {
                    errorMessage = "Authentication required"
                    return@launch
                }
                
                val billItems = medicines
                    .filter { it.name.isNotBlank() }
                    .map { medicine ->
                        val stripPrice = medicine.stripPrice.toDouble()
                        val tabletsInStrip = medicine.tabletsInStrip.toDouble()
                        val tabletsGiven = medicine.tabletsGiven.toDouble()
                        val pricePerTablet = stripPrice / tabletsInStrip
                        val total = pricePerTablet * tabletsGiven
                        
                        BillItem(
                            name = medicine.name.trim(),
                            price = pricePerTablet,
                            quantity = tabletsGiven,
                            total = total,
                            stripQuantity = tabletsInStrip
                        )
                    }
                
                Log.d("CreateBill", "📝 Creating bill for: $customerName ($whatsappNumber)")
                
                val request = CreateBillRequest(
                    customer = CustomerInfo(
                        name = customerName.trim(),
                        whatsappNumber = whatsappNumber.trim(),
                        age = age.toIntOrNull(),
                        gender = gender.ifBlank { null }
                    ),
                    items = billItems,
                    discountPercent = discountPercent.toInt()
                )
                
                Log.d("CreateBill", "📤 Request: $request")
                
                val response = RetrofitClient.apiService.createBill("Bearer $token", request)
                
                Log.d("CreateBill", "📥 Response: ${response.code()} - ${response.body()}")
                
                if (response.isSuccessful && response.body()?.success == true) {
                    Log.d("CreateBill", "✅ Bill created successfully")
                    
                    val responseBody = response.body()
                    val whatsappMessage = responseBody?.whatsappMessage
                    val customerPhone = whatsappNumber
                    
                    // Open WhatsApp with the bill details
                    if (!whatsappMessage.isNullOrEmpty() && customerPhone.isNotEmpty()) {
                        try {
                            val formattedPhone = "91$customerPhone" // Add country code
                            val encodedMessage = Uri.encode(whatsappMessage)
                            val whatsappUrl = "https://wa.me/$formattedPhone?text=$encodedMessage"
                            
                            val intent = Intent(Intent.ACTION_VIEW).apply {
                                data = Uri.parse(whatsappUrl)
                            }
                            context.startActivity(intent)
                            Log.d("CreateBill", "📱 Opening WhatsApp for: $formattedPhone")
                        } catch (e: Exception) {
                            Log.e("CreateBill", "Error opening WhatsApp", e)
                        }
                    }
                    
                    showSuccessDialog = true
                    
                    // Reset form
                    whatsappNumber = ""
                    customerName = ""
                    age = ""
                    gender = ""
                    isCustomerLoaded = false
                    isExistingCustomer = false
                    medicines = listOf(MedicineItem())
                    discountPercent = 0f
                } else {
                    val errorMsg = response.body()?.message ?: "Failed to create bill (${response.code()})"
                    Log.e("CreateBill", "❌ Failed to create bill: $errorMsg")
                    errorMessage = errorMsg
                }
            } catch (e: Exception) {
                Log.e("CreateBill", "Error creating bill", e)
                errorMessage = "Error: ${e.message}"
            } finally {
                isCreating = false
            }
        }
    }
    
    // Success Dialog
    if (showSuccessDialog) {
        AlertDialog(
            onDismissRequest = { showSuccessDialog = false },
            icon = {
                Icon(
                    Icons.Default.CheckCircle,
                    contentDescription = null,
                    tint = Color(0xFF14B8A6),
                    modifier = Modifier.size(48.dp)
                )
            },
            title = { 
                Text(
                    "Bill Created Successfully!",
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF1F2937)
                )
            },
            text = { 
                Text(
                    "The bill has been created and saved.",
                    color = Color(0xFF374151)
                )
            },
            confirmButton = {
                Button(
                    onClick = { showSuccessDialog = false },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0xFF14B8A6)
                    )
                ) {
                    Text("OK")
                }
            }
        )
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF9FAFB))
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Header
        item {
            Column {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Icon(
                        Icons.Default.ShoppingCart,
                        contentDescription = null,
                        tint = Color(0xFF14B8A6),
                        modifier = Modifier.size(32.dp)
                    )
                    Text(
                        text = "Create New Bill",
                        fontSize = 28.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF1F2937)
                    )
                }
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "Fill customer details and add medicines",
                    fontSize = 14.sp,
                    color = Color(0xFF6B7280)
                )
            }
        }
        
        // Error Message
        if (errorMessage != null) {
            item {
                Card(
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
                            Icons.Default.Warning,
                            contentDescription = null,
                            tint = Color(0xFFDC2626),
                            modifier = Modifier.size(20.dp)
                        )
                        Text(
                            text = errorMessage!!,
                            color = Color(0xFFDC2626),
                            fontSize = 14.sp
                        )
                    }
                }
            }
        }
        
        // Customer Details Card
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(16.dp),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(20.dp)
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Icon(
                            Icons.Default.Person,
                            contentDescription = null,
                            tint = Color(0xFF14B8A6),
                            modifier = Modifier.size(24.dp)
                        )
                        Text(
                            text = "Customer Details",
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF1F2937)
                        )
                    }
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    // WhatsApp Number
                    OutlinedTextField(
                        value = whatsappNumber,
                        onValueChange = { 
                            if (it.length <= 10 && it.all { char -> char.isDigit() }) {
                                whatsappNumber = it
                                whatsappError = null
                                if (it.length == 10) {
                                    lookupCustomer()
                                } else {
                                    isCustomerLoaded = false
                                    isExistingCustomer = false
                                    customerName = ""
                                    age = ""
                                    gender = ""
                                }
                            }
                        },
                        label = { Text("WHATSAPP NUMBER", color = Color(0xFF6B7280), fontSize = 12.sp) },
                        leadingIcon = { 
                            Icon(
                                Icons.Default.Phone,
                                contentDescription = null,
                                tint = Color(0xFF6B7280)
                            )
                        },
                        trailingIcon = {
                            if (isLoadingCustomer) {
                                CircularProgressIndicator(
                                    modifier = Modifier.size(20.dp),
                                    strokeWidth = 2.dp,
                                    color = Color(0xFF14B8A6)
                                )
                            }
                        },
                        isError = whatsappError != null,
                        supportingText = whatsappError?.let { { Text(it, color = Color(0xFFDC2626)) } },
                        keyboardOptions = KeyboardOptions(
                            keyboardType = KeyboardType.Number,
                            imeAction = ImeAction.Next
                        ),
                        keyboardActions = KeyboardActions(
                            onNext = { if (whatsappNumber.length == 10) lookupCustomer() }
                        ),
                        enabled = !isLoadingCustomer,
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedBorderColor = Color(0xFF14B8A6),
                            focusedLabelColor = Color(0xFF14B8A6),
                            focusedTextColor = Color(0xFF1F2937),
                            unfocusedTextColor = Color(0xFF1F2937)
                        )
                    )
                    
                    // Loading Customer Status
                    if (isLoadingCustomer) {
                        Spacer(modifier = Modifier.height(12.dp))
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            colors = CardDefaults.cardColors(
                                containerColor = Color(0xFFDEF7FE)
                            ),
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(12.dp),
                                horizontalArrangement = Arrangement.spacedBy(12.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                CircularProgressIndicator(
                                    modifier = Modifier.size(20.dp),
                                    strokeWidth = 2.dp,
                                    color = Color(0xFF0284C7)
                                )
                                Text(
                                    text = "Checking if customer exists in database...",
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Medium,
                                    color = Color(0xFF0284C7)
                                )
                            }
                        }
                    }
                    
                    // Existing Customer Info Display
                    if (isCustomerLoaded && isExistingCustomer) {
                        Spacer(modifier = Modifier.height(16.dp))
                        
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            colors = CardDefaults.cardColors(
                                containerColor = Color(0xFFECFDF5)
                            ),
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
                                    Row(
                                        verticalAlignment = Alignment.CenterVertically,
                                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                                    ) {
                                        Icon(
                                            Icons.Default.CheckCircle,
                                            contentDescription = null,
                                            tint = Color(0xFF14B8A6),
                                            modifier = Modifier.size(20.dp)
                                        )
                                        Text(
                                            text = customerName,
                                            fontSize = 18.sp,
                                            fontWeight = FontWeight.Bold,
                                            color = Color(0xFF1F2937)
                                        )
                                    }
                                    
                                    TextButton(
                                        onClick = { 
                                            isExistingCustomer = false
                                        }
                                    ) {
                                        Text(
                                            "Edit",
                                            color = Color(0xFF14B8A6),
                                            fontSize = 14.sp,
                                            fontWeight = FontWeight.Medium
                                        )
                                    }
                                }
                                
                                if (age.isNotBlank() || gender.isNotBlank()) {
                                    Spacer(modifier = Modifier.height(4.dp))
                                    val details = buildList {
                                        if (age.isNotBlank()) add("Age: $age")
                                        if (gender.isNotBlank()) add(gender.lowercase())
                                    }.joinToString(" • ")
                                    
                                    Text(
                                        text = details,
                                        fontSize = 14.sp,
                                        color = Color(0xFF6B7280)
                                    )
                                }
                                
                                Spacer(modifier = Modifier.height(4.dp))
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                                ) {
                                    Icon(
                                        Icons.Default.Check,
                                        contentDescription = null,
                                        tint = Color(0xFF14B8A6),
                                        modifier = Modifier.size(14.dp)
                                    )
                                    Text(
                                        text = "Existing customer found",
                                        fontSize = 12.sp,
                                        color = Color(0xFF14B8A6),
                                        fontWeight = FontWeight.Medium
                                    )
                                }
                            }
                        }
                    }
                    
                    // New Customer Form
                    if (isCustomerLoaded && !isExistingCustomer) {
                        Spacer(modifier = Modifier.height(16.dp))
                        
                        // New Customer Alert
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            colors = CardDefaults.cardColors(
                                containerColor = Color(0xFFFFF7ED)
                            ),
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(12.dp),
                                horizontalArrangement = Arrangement.spacedBy(12.dp),
                                verticalAlignment = Alignment.Top
                            ) {
                                Icon(
                                    Icons.Default.Info,
                                    contentDescription = null,
                                    tint = Color(0xFFF59E0B),
                                    modifier = Modifier.size(20.dp)
                                )
                                Column {
                                    Text(
                                        text = "New Customer",
                                        fontSize = 14.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = Color(0xFF92400E)
                                    )
                                    Spacer(modifier = Modifier.height(2.dp))
                                    Text(
                                        text = "This phone number is not registered yet. Please add customer details below.",
                                        fontSize = 12.sp,
                                        color = Color(0xFFA16207)
                                    )
                                }
                            }
                        }
                        
                        Spacer(modifier = Modifier.height(12.dp))
                        
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            colors = CardDefaults.cardColors(
                                containerColor = Color(0xFFF9FAFB)
                            ),
                            shape = RoundedCornerShape(12.dp),
                            elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
                        ) {
                            Column(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(16.dp)
                            ) {
                                Text(
                                    text = "New Customer Details",
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color(0xFF1F2937)
                                )
                                
                                Spacer(modifier = Modifier.height(12.dp))
                                
                                // Full Name
                                OutlinedTextField(
                                    value = customerName,
                                    onValueChange = { 
                                        customerName = it
                                        customerNameError = null
                                    },
                                    label = { Text("FULL NAME", color = Color(0xFF6B7280), fontSize = 11.sp) },
                                    leadingIcon = { 
                                        Icon(
                                            Icons.Default.Person,
                                            contentDescription = null,
                                            tint = Color(0xFF6B7280),
                                            modifier = Modifier.size(20.dp)
                                        )
                                    },
                                    placeholder = { Text("Enter customer name", color = Color(0xFF9CA3AF)) },
                                    isError = customerNameError != null,
                                    supportingText = customerNameError?.let { { Text(it, color = Color(0xFFDC2626)) } },
                                    modifier = Modifier.fillMaxWidth(),
                                    shape = RoundedCornerShape(12.dp),
                                    colors = OutlinedTextFieldDefaults.colors(
                                        focusedBorderColor = Color(0xFF14B8A6),
                                        focusedLabelColor = Color(0xFF14B8A6),
                                        focusedTextColor = Color(0xFF1F2937),
                                        unfocusedTextColor = Color(0xFF1F2937)
                                    )
                                )
                                
                                Spacer(modifier = Modifier.height(12.dp))
                                
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                                ) {
                                    // Age
                                    OutlinedTextField(
                                        value = age,
                                        onValueChange = { 
                                            if (it.length <= 3 && (it.isEmpty() || it.all { char -> char.isDigit() })) {
                                                age = it
                                            }
                                        },
                                        label = { Text("AGE", color = Color(0xFF6B7280), fontSize = 11.sp) },
                                        leadingIcon = {
                                            Icon(
                                                Icons.Default.CalendarToday,
                                                contentDescription = null,
                                                tint = Color(0xFF6B7280),
                                                modifier = Modifier.size(18.dp)
                                            )
                                        },
                                        placeholder = { Text("Age", color = Color(0xFF9CA3AF)) },
                                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                                        modifier = Modifier.weight(1f),
                                        shape = RoundedCornerShape(12.dp),
                                        colors = OutlinedTextFieldDefaults.colors(
                                            focusedBorderColor = Color(0xFF14B8A6),
                                            focusedLabelColor = Color(0xFF14B8A6),
                                            focusedTextColor = Color(0xFF1F2937),
                                            unfocusedTextColor = Color(0xFF1F2937)
                                        )
                                    )
                                    
                                    // Gender Dropdown
                                    ExposedDropdownMenuBox(
                                        expanded = genderExpanded,
                                        onExpandedChange = { genderExpanded = !genderExpanded },
                                        modifier = Modifier.weight(1f)
                                    ) {
                                        OutlinedTextField(
                                            value = if (gender.isNotBlank()) gender else "",
                                            onValueChange = {},
                                            readOnly = true,
                                            label = { Text("GENDER", color = Color(0xFF6B7280), fontSize = 11.sp) },
                                            leadingIcon = {
                                                Icon(
                                                    Icons.Default.Person,
                                                    contentDescription = null,
                                                    tint = Color(0xFF6B7280),
                                                    modifier = Modifier.size(18.dp)
                                                )
                                            },
                                            placeholder = { Text("Select Gender", color = Color(0xFF9CA3AF)) },
                                            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = genderExpanded) },
                                            modifier = Modifier
                                                .menuAnchor()
                                                .fillMaxWidth(),
                                            shape = RoundedCornerShape(12.dp),
                                            colors = OutlinedTextFieldDefaults.colors(
                                                focusedBorderColor = Color(0xFF14B8A6),
                                                focusedLabelColor = Color(0xFF14B8A6),
                                                focusedTextColor = Color(0xFF1F2937),
                                                unfocusedTextColor = Color(0xFF1F2937)
                                            )
                                        )
                                        ExposedDropdownMenu(
                                            expanded = genderExpanded,
                                            onDismissRequest = { genderExpanded = false }
                                        ) {
                                            listOf("Male", "Female", "Other").forEach { option ->
                                                DropdownMenuItem(
                                                    text = { Text(option) },
                                                    onClick = {
                                                        gender = option
                                                        genderExpanded = false
                                                    }
                                                )
                                            }
                                        }
                                    }
                                }
                                
                                Spacer(modifier = Modifier.height(8.dp))
                                
                                Text(
                                    text = "These details help provide better service on future visits",
                                    fontSize = 11.sp,
                                    color = Color(0xFF9CA3AF),
                                    modifier = Modifier.padding(horizontal = 4.dp)
                                )
                            }
                        }
                    }
                }
            }
        }
        
        // Medicines Section Header
        if (isCustomerLoaded) {
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    shape = RoundedCornerShape(16.dp),
                    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(20.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Icon(
                                Icons.Default.MedicalServices,
                                contentDescription = null,
                                tint = Color(0xFF14B8A6),
                                modifier = Modifier.size(24.dp)
                            )
                            Text(
                                text = "Medicines",
                                fontSize = 18.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF1F2937)
                            )
                        }
                        
                        Text(
                            text = "${medicines.size} items",
                            fontSize = 14.sp,
                            color = Color(0xFF6B7280)
                        )
                    }
                    
                    if (medicinesError != null) {
                        Text(
                            text = medicinesError!!,
                            color = Color(0xFFDC2626),
                            fontSize = 12.sp,
                            modifier = Modifier.padding(horizontal = 20.dp, vertical = 0.dp)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                    }
                }
            }
            
            // Medicine Items
            itemsIndexed(medicines) { index, medicine ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    shape = RoundedCornerShape(16.dp),
                    elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
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
                            Text(
                                text = "Medicine ${index + 1}",
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Medium,
                                color = Color(0xFF6B7280)
                            )
                            
                            if (medicines.size > 1) {
                                IconButton(
                                    onClick = { 
                                        medicines = medicines.filterIndexed { i, _ -> i != index }
                                        medicinesError = null
                                    }
                                ) {
                                    Icon(
                                        Icons.Default.Delete,
                                        contentDescription = "Remove",
                                        tint = Color(0xFFEF4444),
                                        modifier = Modifier.size(20.dp)
                                    )
                                }
                            }
                        }
                        
                        Spacer(modifier = Modifier.height(12.dp))
                        
                        // Medicine Name
                        OutlinedTextField(
                            value = medicine.name,
                            onValueChange = { 
                                medicines = medicines.toMutableList().apply {
                                    this[index] = medicine.copy(name = it)
                                }
                                medicinesError = null
                            },
                            label = { Text("MEDICINE NAME", color = Color(0xFF6B7280), fontSize = 12.sp) },
                            leadingIcon = {
                                Icon(
                                    Icons.Default.MedicalServices,
                                    contentDescription = null,
                                    tint = Color(0xFF6B7280),
                                    modifier = Modifier.size(20.dp)
                                )
                            },
                            placeholder = { Text("Enter medicine name", color = Color(0xFF9CA3AF)) },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(12.dp),
                            colors = OutlinedTextFieldDefaults.colors(
                                focusedBorderColor = Color(0xFF14B8A6),
                                focusedLabelColor = Color(0xFF14B8A6),
                                focusedTextColor = Color(0xFF1F2937),
                                unfocusedTextColor = Color(0xFF1F2937)
                            )
                        )
                        
                        Spacer(modifier = Modifier.height(12.dp))
                        
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            // Strip Price
                            OutlinedTextField(
                                value = medicine.stripPrice,
                                onValueChange = { 
                                    if (it.isEmpty() || it.matches(Regex("^\\d*\\.?\\d*$"))) {
                                        medicines = medicines.toMutableList().apply {
                                            this[index] = medicine.copy(stripPrice = it)
                                        }
                                        medicinesError = null
                                    }
                                },
                                label = { Text("STRIP PRICE (₹)", color = Color(0xFF6B7280), fontSize = 11.sp) },
                                leadingIcon = {
                                    Icon(
                                        Icons.Default.AttachMoney,
                                        contentDescription = null,
                                        tint = Color(0xFF6B7280),
                                        modifier = Modifier.size(18.dp)
                                    )
                                },
                                placeholder = { Text("190", color = Color(0xFF9CA3AF)) },
                                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                                modifier = Modifier.weight(1f),
                                shape = RoundedCornerShape(12.dp),
                                colors = OutlinedTextFieldDefaults.colors(
                                    focusedBorderColor = Color(0xFF14B8A6),
                                    focusedLabelColor = Color(0xFF14B8A6),
                                    focusedTextColor = Color(0xFF1F2937),
                                    unfocusedTextColor = Color(0xFF1F2937)
                                )
                            )
                            
                            // Tablets in Strip
                            OutlinedTextField(
                                value = medicine.tabletsInStrip,
                                onValueChange = { 
                                    if (it.isEmpty() || it.matches(Regex("^\\d*\\.?\\d*$"))) {
                                        medicines = medicines.toMutableList().apply {
                                            this[index] = medicine.copy(tabletsInStrip = it)
                                        }
                                        medicinesError = null
                                    }
                                },
                                label = { Text("TABLETS IN STRIP", color = Color(0xFF6B7280), fontSize = 11.sp) },
                                leadingIcon = {
                                    Icon(
                                        Icons.Default.Inventory,
                                        contentDescription = null,
                                        tint = Color(0xFF6B7280),
                                        modifier = Modifier.size(18.dp)
                                    )
                                },
                                placeholder = { Text("20", color = Color(0xFF9CA3AF)) },
                                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                                modifier = Modifier.weight(1f),
                                shape = RoundedCornerShape(12.dp),
                                colors = OutlinedTextFieldDefaults.colors(
                                    focusedBorderColor = Color(0xFF14B8A6),
                                    focusedLabelColor = Color(0xFF14B8A6),
                                    focusedTextColor = Color(0xFF1F2937),
                                    unfocusedTextColor = Color(0xFF1F2937)
                                )
                            )
                        }
                        
                        Spacer(modifier = Modifier.height(12.dp))
                        
                        // Tablets Given
                        OutlinedTextField(
                            value = medicine.tabletsGiven,
                            onValueChange = { 
                                if (it.isEmpty() || it.matches(Regex("^\\d*\\.?\\d*$"))) {
                                    medicines = medicines.toMutableList().apply {
                                        this[index] = medicine.copy(tabletsGiven = it)
                                    }
                                    medicinesError = null
                                }
                            },
                            label = { Text("TABLETS GIVEN", color = Color(0xFF6B7280), fontSize = 12.sp) },
                            leadingIcon = {
                                Icon(
                                    Icons.Default.LocalPharmacy,
                                    contentDescription = null,
                                    tint = Color(0xFF6B7280),
                                    modifier = Modifier.size(20.dp)
                                )
                            },
                            placeholder = { Text("1", color = Color(0xFF9CA3AF)) },
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(12.dp),
                            colors = OutlinedTextFieldDefaults.colors(
                                focusedBorderColor = Color(0xFF14B8A6),
                                focusedLabelColor = Color(0xFF14B8A6),
                                focusedTextColor = Color(0xFF1F2937),
                                unfocusedTextColor = Color(0xFF1F2937)
                            )
                        )
                    }
                }
            }
            
            // Add Medicine Button
            item {
                TextButton(
                    onClick = { 
                        medicines = medicines + MedicineItem()
                        medicinesError = null
                    },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Icon(
                        Icons.Default.Add,
                        contentDescription = null,
                        tint = Color(0xFF14B8A6),
                        modifier = Modifier.size(20.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        "Add another medicine",
                        color = Color(0xFF14B8A6),
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
            
            // Discount & Summary Card
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    shape = RoundedCornerShape(16.dp),
                    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(20.dp)
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Icon(
                                Icons.Default.LocalOffer,
                                contentDescription = null,
                                tint = Color(0xFF14B8A6),
                                modifier = Modifier.size(24.dp)
                            )
                            Text(
                                text = "Discount",
                                fontSize = 18.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF1F2937)
                            )
                        }
                        
                        Spacer(modifier = Modifier.height(16.dp))
                        
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                "Discount Percentage",
                                fontSize = 14.sp,
                                color = Color(0xFF6B7280)
                            )
                            Text(
                                "${discountPercent.toInt()}%",
                                fontSize = 18.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF14B8A6)
                            )
                        }
                        
                        Spacer(modifier = Modifier.height(8.dp))
                        
                        Slider(
                            value = discountPercent,
                            onValueChange = { discountPercent = it },
                            valueRange = 0f..50f,
                            steps = 49,
                            colors = SliderDefaults.colors(
                                thumbColor = Color(0xFF14B8A6),
                                activeTrackColor = Color(0xFF14B8A6),
                                inactiveTrackColor = Color(0xFFE5E7EB)
                            )
                        )
                        
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text("0%", fontSize = 12.sp, color = Color(0xFF9CA3AF))
                            Text("25%", fontSize = 12.sp, color = Color(0xFF9CA3AF))
                            Text("50%", fontSize = 12.sp, color = Color(0xFF9CA3AF))
                        }
                        
                        Spacer(modifier = Modifier.height(16.dp))
                        HorizontalDivider(color = Color(0xFFE5E7EB))
                        Spacer(modifier = Modifier.height(16.dp))
                        
                        // Summary
                        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    "Subtotal",
                                    fontSize = 16.sp,
                                    color = Color(0xFF6B7280)
                                )
                                Text(
                                    "₹${String.format("%.2f", subtotal)}",
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Medium,
                                    color = Color(0xFF1F2937)
                                )
                            }
                            
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    "Discount (${discountPercent.toInt()}%)",
                                    fontSize = 16.sp,
                                    color = Color(0xFF6B7280)
                                )
                                Text(
                                    "- ₹${String.format("%.2f", discount)}",
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Medium,
                                    color = Color(0xFFEF4444)
                                )
                            }
                            
                            HorizontalDivider(color = Color(0xFFE5E7EB))
                            
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    "Total Amount",
                                    fontSize = 18.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color(0xFF1F2937)
                                )
                                Text(
                                    "₹${String.format("%.2f", finalAmount)}",
                                    fontSize = 24.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color(0xFF14B8A6)
                                )
                            }
                        }
                    }
                }
            }
            
            // Create Bill Button
            item {
                Button(
                    onClick = { createBill() },
                    enabled = !isCreating && isCustomerLoaded,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(56.dp),
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0xFF14B8A6),
                        disabledContainerColor = Color(0xFF14B8A6).copy(alpha = 0.5f)
                    )
                ) {
                    if (isCreating) {
                        CircularProgressIndicator(
                            modifier = Modifier.size(24.dp),
                            color = Color.White,
                            strokeWidth = 2.dp
                        )
                        Spacer(modifier = Modifier.width(12.dp))
                        Text("Creating Bill...", fontSize = 16.sp, fontWeight = FontWeight.SemiBold)
                    } else {
                        Icon(Icons.Default.Send, contentDescription = null)
                        Spacer(modifier = Modifier.width(12.dp))
                        Text("Create Bill", fontSize = 16.sp, fontWeight = FontWeight.SemiBold)
                    }
                }
                
                Spacer(modifier = Modifier.height(80.dp))
            }
        }
    }
}
