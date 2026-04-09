package co.`in`.pharmly.data.api

import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.IOException
import java.util.concurrent.TimeUnit

object RetrofitClient {
    private const val BASE_URL = "https://pharmly.onrender.com/api/"
    
    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    }
    
    // Retry interceptor for failed requests
    private val retryInterceptor = Interceptor { chain ->
        val request = chain.request()
        var response = chain.proceed(request)
        var tryCount = 0
        val maxLimit = 2 // Retry up to 2 times
        
        while (!response.isSuccessful && tryCount < maxLimit) {
            tryCount++
            response.close()
            Thread.sleep(1000 * tryCount.toLong()) // Exponential backoff
            response = chain.proceed(request)
        }
        response
    }
    
    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(loggingInterceptor)
        .addInterceptor(retryInterceptor)
        .connectTimeout(60, TimeUnit.SECONDS)
        .readTimeout(60, TimeUnit.SECONDS)
        .writeTimeout(60, TimeUnit.SECONDS)
        .callTimeout(90, TimeUnit.SECONDS)
        .retryOnConnectionFailure(true)
        .build()
    
    private val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .client(okHttpClient)
        .addConverterFactory(GsonConverterFactory.create())
        .build()
    
    val apiService: PharmlyApiService = retrofit.create(PharmlyApiService::class.java)
}
