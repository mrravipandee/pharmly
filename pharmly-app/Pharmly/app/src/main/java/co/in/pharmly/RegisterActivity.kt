package co.`in`.pharmly

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import co.`in`.pharmly.data.api.RetrofitClient
import co.`in`.pharmly.data.model.RegisterRequest
import co.`in`.pharmly.ui.theme.PharmlyTheme
import co.`in`.pharmly.utils.TokenManager
import kotlinx.coroutines.launch

class RegisterActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            PharmlyTheme {
                RegisterScreen(
                    onRegisterSuccess = {
                        startActivity(Intent(this@RegisterActivity, DashboardActivity::class.java))
                        finish()
                    },
                    onBackClick = {
                        finish()
                    }
                )
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RegisterScreen(
    onRegisterSuccess: () -> Unit,
    onBackClick: () -> Unit
) {
    var name by remember { mutableStateOf("") }
    var whatsappNumber by remember { mutableStateOf("") }
    var secondaryNumber by remember { mutableStateOf("") }
    var gstNumber by remember { mutableStateOf("") }
    var address by remember { mutableStateOf("") }
    var city by remember { mutableStateOf("") }
    var discountPercent by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var confirmPassword by remember { mutableStateOf("") }
    var passwordVisible by remember { mutableStateOf(false) }
    var confirmPasswordVisible by remember { mutableStateOf(false) }
    var isLoading by remember { mutableStateOf(false) }
    
    val scope = rememberCoroutineScope()
    val context = androidx.compose.ui.platform.LocalContext.current
    val scrollState = rememberScrollState()
    
    fun performRegister() {
        when {
            name.isEmpty() || whatsappNumber.isEmpty() || gstNumber.isEmpty() || 
            address.isEmpty() || city.isEmpty() || password.isEmpty() -> {
                Toast.makeText(context, "Please fill all required fields", Toast.LENGTH_SHORT).show()
                return
            }
            whatsappNumber.length != 10 -> {
                Toast.makeText(context, "Please enter valid 10-digit mobile number", Toast.LENGTH_SHORT).show()
                return
            }
            password.length < 6 -> {
                Toast.makeText(context, "Password must be at least 6 characters", Toast.LENGTH_SHORT).show()
                return
            }
            password != confirmPassword -> {
                Toast.makeText(context, "Passwords do not match", Toast.LENGTH_SHORT).show()
                return
            }
        }
        
        isLoading = true
        scope.launch {
            try {
                val response = RetrofitClient.apiService.register(
                    RegisterRequest(
                        name = name,
                        whatsappNumber = whatsappNumber,
                        secondaryMobileNumber = secondaryNumber.ifEmpty { null },
                        gstNumber = gstNumber,
                        address = address,
                        city = city,
                        discountPercent = discountPercent.toIntOrNull() ?: 0,
                        password = password
                    )
                )
                
                if (response.isSuccessful && response.body()?.success == true) {
                    val authResponse = response.body()!!
                    TokenManager.saveToken(context, authResponse.token!!)
                    TokenManager.saveStoreInfo(
                        context,
                        authResponse.store!!.id,
                        authResponse.store.name
                    )
                    Toast.makeText(context, "Registration successful! Welcome to Pharmly", Toast.LENGTH_LONG).show()
                    onRegisterSuccess()
                } else {
                    val errorMessage = response.body()?.message ?: "Registration failed"
                    Toast.makeText(context, errorMessage, Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                Toast.makeText(context, "Error: ${e.message}", Toast.LENGTH_LONG).show()
            } finally {
                isLoading = false
            }
        }
    }
    
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(scrollState)
                .padding(24.dp)
        ) {
            // Back button
            IconButton(onClick = onBackClick) {
                Text("←", fontSize = 24.sp, color = Color(0xFF14B8A6))
            }
            
            // Logo
            Image(
                painter = painterResource(id = R.drawable.pharmly_logo),
                contentDescription = "Pharmly Logo",
                modifier = Modifier
                    .size(70.dp)
                    .align(Alignment.CenterHorizontally)
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Title
            Text(
                text = "Create Account",
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF1F2937),
                modifier = Modifier.align(Alignment.CenterHorizontally)
            )
            
            Spacer(modifier = Modifier.height(6.dp))
            
            Text(
                text = "Register your pharmacy store",
                fontSize = 14.sp,
                color = Color.Gray,
                modifier = Modifier.align(Alignment.CenterHorizontally)
            )
            
            Spacer(modifier = Modifier.height(24.dp))
            
            // Store Name
            Text("Store Name *", fontSize = 14.sp, fontWeight = FontWeight.Medium, color = Color(0xFF1F2937))
            Spacer(modifier = Modifier.height(6.dp))
            OutlinedTextField(
                value = name,
                onValueChange = { name = it },
                modifier = Modifier.fillMaxWidth(),
                placeholder = { Text("e.g., Sharma Medical Store") },
                singleLine = true,
                shape = RoundedCornerShape(12.dp),
                colors = TextFieldDefaults.colors(
                    focusedIndicatorColor = Color(0xFF14B8A6),
                    unfocusedIndicatorColor = Color(0xFFE5E7EB)
                )
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // WhatsApp Number
            Text("WhatsApp Number *", fontSize = 14.sp, fontWeight = FontWeight.Medium, color = Color(0xFF1F2937))
            Spacer(modifier = Modifier.height(6.dp))
            OutlinedTextField(
                value = whatsappNumber,
                onValueChange = { if (it.length <= 10) whatsappNumber = it },
                modifier = Modifier.fillMaxWidth(),
                placeholder = { Text("10-digit mobile number") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
                singleLine = true,
                shape = RoundedCornerShape(12.dp),
                colors = TextFieldDefaults.colors(
                    focusedIndicatorColor = Color(0xFF14B8A6),
                    unfocusedIndicatorColor = Color(0xFFE5E7EB)
                )
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Secondary Number (Optional)
            Text("Secondary Mobile (Optional)", fontSize = 14.sp, fontWeight = FontWeight.Medium, color = Color(0xFF1F2937))
            Spacer(modifier = Modifier.height(6.dp))
            OutlinedTextField(
                value = secondaryNumber,
                onValueChange = { if (it.length <= 10) secondaryNumber = it },
                modifier = Modifier.fillMaxWidth(),
                placeholder = { Text("10-digit mobile number") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
                singleLine = true,
                shape = RoundedCornerShape(12.dp),
                colors = TextFieldDefaults.colors(
                    focusedIndicatorColor = Color(0xFF14B8A6),
                    unfocusedIndicatorColor = Color(0xFFE5E7EB)
                )
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // GST Number
            Text("GST Number *", fontSize = 14.sp, fontWeight = FontWeight.Medium, color = Color(0xFF1F2937))
            Spacer(modifier = Modifier.height(6.dp))
            OutlinedTextField(
                value = gstNumber,
                onValueChange = { gstNumber = it.uppercase() },
                modifier = Modifier.fillMaxWidth(),
                placeholder = { Text("e.g., 27AAAAA0000A1Z5") },
                singleLine = true,
                shape = RoundedCornerShape(12.dp),
                colors = TextFieldDefaults.colors(
                    focusedIndicatorColor = Color(0xFF14B8A6),
                    unfocusedIndicatorColor = Color(0xFFE5E7EB)
                )
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Address
            Text("Address *", fontSize = 14.sp, fontWeight = FontWeight.Medium, color = Color(0xFF1F2937))
            Spacer(modifier = Modifier.height(6.dp))
            OutlinedTextField(
                value = address,
                onValueChange = { address = it },
                modifier = Modifier.fillMaxWidth(),
                placeholder = { Text("Store address") },
                singleLine = true,
                shape = RoundedCornerShape(12.dp),
                colors = TextFieldDefaults.colors(
                    focusedIndicatorColor = Color(0xFF14B8A6),
                    unfocusedIndicatorColor = Color(0xFFE5E7EB)
                )
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // City
            Text("City *", fontSize = 14.sp, fontWeight = FontWeight.Medium, color = Color(0xFF1F2937))
            Spacer(modifier = Modifier.height(6.dp))
            OutlinedTextField(
                value = city,
                onValueChange = { city = it },
                modifier = Modifier.fillMaxWidth(),
                placeholder = { Text("e.g., Mumbai") },
                singleLine = true,
                shape = RoundedCornerShape(12.dp),
                colors = TextFieldDefaults.colors(
                    focusedIndicatorColor = Color(0xFF14B8A6),
                    unfocusedIndicatorColor = Color(0xFFE5E7EB)
                )
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Discount Percent (Optional)
            Text("Default Discount % (Optional)", fontSize = 14.sp, fontWeight = FontWeight.Medium, color = Color(0xFF1F2937))
            Spacer(modifier = Modifier.height(6.dp))
            OutlinedTextField(
                value = discountPercent,
                onValueChange = { if (it.isEmpty() || it.toIntOrNull() in 0..100) discountPercent = it },
                modifier = Modifier.fillMaxWidth(),
                placeholder = { Text("e.g., 10") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                singleLine = true,
                shape = RoundedCornerShape(12.dp),
                colors = TextFieldDefaults.colors(
                    focusedIndicatorColor = Color(0xFF14B8A6),
                    unfocusedIndicatorColor = Color(0xFFE5E7EB)
                )
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Password
            Text("Password *", fontSize = 14.sp, fontWeight = FontWeight.Medium, color = Color(0xFF1F2937))
            Spacer(modifier = Modifier.height(6.dp))
            OutlinedTextField(
                value = password,
                onValueChange = { password = it },
                modifier = Modifier.fillMaxWidth(),
                placeholder = { Text("At least 6 characters") },
                visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                trailingIcon = {
                    Text(
                        text = if (passwordVisible) "👁" else "👁‍🗨",
                        modifier = Modifier.clickable { passwordVisible = !passwordVisible },
                        fontSize = 20.sp
                    )
                },
                singleLine = true,
                shape = RoundedCornerShape(12.dp),
                colors = TextFieldDefaults.colors(
                    focusedIndicatorColor = Color(0xFF14B8A6),
                    unfocusedIndicatorColor = Color(0xFFE5E7EB)
                )
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Confirm Password
            Text("Confirm Password *", fontSize = 14.sp, fontWeight = FontWeight.Medium, color = Color(0xFF1F2937))
            Spacer(modifier = Modifier.height(6.dp))
            OutlinedTextField(
                value = confirmPassword,
                onValueChange = { confirmPassword = it },
                modifier = Modifier.fillMaxWidth(),
                placeholder = { Text("Re-enter password") },
                visualTransformation = if (confirmPasswordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                trailingIcon = {
                    Text(
                        text = if (confirmPasswordVisible) "👁" else "👁‍🗨",
                        modifier = Modifier.clickable { confirmPasswordVisible = !confirmPasswordVisible },
                        fontSize = 20.sp
                    )
                },
                singleLine = true,
                shape = RoundedCornerShape(12.dp),
                colors = TextFieldDefaults.colors(
                    focusedIndicatorColor = Color(0xFF14B8A6),
                    unfocusedIndicatorColor = Color(0xFFE5E7EB)
                )
            )
            
            Spacer(modifier = Modifier.height(32.dp))
            
            // Register Button
            Button(
                onClick = { performRegister() },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(56.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0xFF14B8A6)
                ),
                shape = RoundedCornerShape(12.dp),
                enabled = !isLoading
            ) {
                if (isLoading) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(24.dp),
                        color = Color.White
                    )
                } else {
                    Text(
                        text = "Register",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Already have account text
            Row(
                modifier = Modifier.align(Alignment.CenterHorizontally)
            ) {
                Text(
                    text = "Already have an account? ",
                    fontSize = 14.sp,
                    color = Color.Gray
                )
                Text(
                    text = "Login",
                    fontSize = 14.sp,
                    color = Color(0xFF14B8A6),
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier.clickable { onBackClick() }
                )
            }
            
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}
