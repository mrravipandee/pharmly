package co.`in`.pharmly.utils

import android.content.Context
import android.content.SharedPreferences

object TokenManager {
    private const val PREFS_NAME = "PharmlyPrefs"
    private const val KEY_TOKEN = "auth_token"
    private const val KEY_STORE_ID = "store_id"
    private const val KEY_STORE_NAME = "store_name"
    
    private fun getPrefs(context: Context): SharedPreferences {
        return context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    }
    
    fun saveToken(context: Context, token: String) {
        getPrefs(context).edit().putString(KEY_TOKEN, token).apply()
    }
    
    fun getToken(context: Context): String? {
        return getPrefs(context).getString(KEY_TOKEN, null)
    }
    
    fun saveStoreInfo(context: Context, storeId: String, storeName: String) {
        getPrefs(context).edit().apply {
            putString(KEY_STORE_ID, storeId)
            putString(KEY_STORE_NAME, storeName)
            apply()
        }
    }
    
    fun getStoreId(context: Context): String? {
        return getPrefs(context).getString(KEY_STORE_ID, null)
    }
    
    fun getStoreName(context: Context): String? {
        return getPrefs(context).getString(KEY_STORE_NAME, null)
    }
    
    fun isLoggedIn(context: Context): Boolean {
        return getToken(context) != null
    }
    
    fun clearAll(context: Context) {
        getPrefs(context).edit().clear().apply()
    }
}
