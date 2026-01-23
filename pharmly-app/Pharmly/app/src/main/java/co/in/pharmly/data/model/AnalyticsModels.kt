package co.`in`.pharmly.data.model

import com.google.gson.annotations.SerializedName

data class TodaySummaryResponse(
    val success: Boolean,
    val data: TodaySummaryData?,
    val message: String?
)

data class TodaySummaryData(
    val todayTotal: Double,
    val yesterdayTotal: Double,
    val growthPercent: Double
)

data class SalesHistoryResponse(
    val success: Boolean,
    val data: List<DailyTotal>?,
    val message: String?
)

data class DailyTotal(
    val date: String,
    val total: Double
)

data class RecentBillsResponse(
    val success: Boolean,
    val data: List<RecentBill>?,
    val message: String?
)

data class RecentBill(
    @SerializedName("_id")
    val id: String,
    val finalAmount: Double,
    val createdAt: String,
    val customerId: String?
)

// Analytics summary for different time periods
data class AnalyticsSummary(
    val totalSales: Double,
    val totalBills: Int,
    val uniqueCustomers: Int,
    val averageBillValue: Double,
    val previousTotal: Double,
    val growthPercent: Double
)
