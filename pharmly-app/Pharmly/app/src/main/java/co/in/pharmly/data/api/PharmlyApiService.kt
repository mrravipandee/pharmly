package co.`in`.pharmly.data.api

import co.`in`.pharmly.data.model.AuthResponse
import co.`in`.pharmly.data.model.BillsResponse
import co.`in`.pharmly.data.model.CreateBillRequest
import co.`in`.pharmly.data.model.CreateBillResponse
import co.`in`.pharmly.data.model.CustomerResponse
import co.`in`.pharmly.data.model.CustomersListResponse
import co.`in`.pharmly.data.model.LoginRequest
import co.`in`.pharmly.data.model.RegisterRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

interface PharmlyApiService {
    
    @POST("stores/register")
    suspend fun register(@Body request: RegisterRequest): Response<AuthResponse>
    
    @POST("stores/login")
    suspend fun login(@Body request: LoginRequest): Response<AuthResponse>
    
    @GET("bills")
    suspend fun getBills(@Header("Authorization") token: String): Response<BillsResponse>
    
    @GET("patients")
    suspend fun getCustomers(@Header("Authorization") token: String): Response<CustomersListResponse>
    
    @GET("patients/search")
    suspend fun getCustomerByPhone(
        @Header("Authorization") token: String,
        @Query("whatsappNumber") whatsappNumber: String
    ): Response<CustomerResponse>
    
    @POST("bills")
    suspend fun createBill(
        @Header("Authorization") token: String,
        @Body request: CreateBillRequest
    ): Response<CreateBillResponse>
    
    @DELETE("bills/{billId}")
    suspend fun deleteBill(
        @Header("Authorization") token: String,
        @Path("billId") billId: String
    ): Response<Unit>
}
