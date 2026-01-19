package co.`in`.pharmly.data.model

import com.google.gson.annotations.SerializedName

data class BillItem(
    val name: String,
    val price: Double,
    val quantity: Double,
    val total: Double,
    val stripQuantity: Double? = null
)

data class Customer(
    @SerializedName("_id")
    val id: String,
    val name: String,
    val whatsappNumber: String,
    val age: Int? = null,
    val gender: String? = null
)

data class Bill(
    @SerializedName("_id")
    val id: String,
    val storeId: String,
    val customerId: Customer,
    val items: List<BillItem>,
    val subtotal: Double,
    val discountPercent: Int,
    val finalAmount: Double,
    val createdAt: String,
    val updatedAt: String
)

data class BillsResponse(
    val success: Boolean,
    val bills: List<Bill>?,
    val message: String?
)

data class DashboardStats(
    val todaySales: Double,
    val billsToday: Int,
    val customersToday: Int,
    val avgBillValue: Double,
    val recentBills: List<Bill>
)
