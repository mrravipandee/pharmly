package co.`in`.pharmly

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.core.*
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import co.`in`.pharmly.ui.theme.PharmlyTheme
import co.`in`.pharmly.utils.TokenManager

@SuppressLint("CustomSplashScreen")
class LauncherActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Navigate immediately without additional splash UI
        val intent = if (TokenManager.isLoggedIn(this)) {
            Intent(this, DashboardActivity::class.java)
        } else {
            Intent(this, MainActivity::class.java)
        }
        
        startActivity(intent)
        finish()
    }
}
