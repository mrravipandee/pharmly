package co.`in`.pharmly.data.api

import co.`in`.pharmly.data.model.AuthResponse
import co.`in`.pharmly.data.model.BillsResponse
import co.`in`.pharmly.data.model.LoginRequest
import co.`in`.pharmly.data.model.RegisterRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Path

interface PharmlyApiService {
    
    @POST("stores/register")
    suspend fun register(@Body request: RegisterRequest): Response<AuthResponse>
    
    @POST("stores/login")
    suspend fun login(@Body request: LoginRequest): Response<AuthResponse>
    
    @GET("bills")
    suspend fun getBills(@Header("Authorization") token: String): Response<BillsResponse>
    
    @DELETE("bills/{billId}")
    suspend fun deleteBill(
        @Header("Authorization") token: String,
        @Path("billId") billId: String
    ): Response<Unit>
}
