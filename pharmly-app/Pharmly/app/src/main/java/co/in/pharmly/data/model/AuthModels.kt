package co.`in`.pharmly.data.model

data class Store(
    val id: String,
    val name: String,
    val whatsappNumber: String,
    val secondaryMobileNumber: String?,
    val gstNumber: String?,
    val address: String,
    val city: String,
    val discountPercent: Int
)

data class StoreDetailsResponse(
    val success: Boolean,
    val store: Store?,
    val message: String?
)

data class UpdateStoreRequest(
    val name: String,
    val whatsappNumber: String,
    val secondaryMobileNumber: String?,
    val gstNumber: String?,
    val address: String,
    val city: String,
    val discountPercent: Int
)

data class AuthResponse(
    val success: Boolean,
    val token: String?,
    val store: Store?,
    val message: String?
)

data class LoginRequest(
    val whatsappNumber: String,
    val password: String
)

data class RegisterRequest(
    val name: String,
    val whatsappNumber: String,
    val secondaryMobileNumber: String?,
    val gstNumber: String,
    val address: String,
    val city: String,
    val discountPercent: Int,
    val password: String
)
