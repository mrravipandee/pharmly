package co.`in`.pharmly

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import co.`in`.pharmly.ui.screens.analytics.AnalyticsScreen
import co.`in`.pharmly.ui.screens.bills.BillsScreen
import co.`in`.pharmly.ui.screens.createbill.CreateBillScreen
import co.`in`.pharmly.ui.screens.customers.CustomersScreen
import co.`in`.pharmly.ui.screens.home.HomeScreen
import co.`in`.pharmly.ui.screens.settings.SettingsScreen
import co.`in`.pharmly.ui.theme.PharmlyTheme
import co.`in`.pharmly.utils.TokenManager

class DashboardActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            PharmlyTheme {
                MainDashboardScreen(
                    storeName = TokenManager.getStoreName(this) ?: "User",
                    onLogout = {
                        TokenManager.clearAll(this)
                        startActivity(Intent(this@DashboardActivity, MainActivity::class.java))
                        finish()
                    }
                )
            }
        }
    }
}

sealed class BottomNavItem(
    val route: String,
    val icon: ImageVector,
    val title: String
) {
    object Home : BottomNavItem("home", Icons.Filled.Home, "Home")
    object Bills : BottomNavItem("bills", Icons.Filled.List, "Bills")
    object CreateBill : BottomNavItem("create_bill", Icons.Filled.Add, "Create Bill")
    object Customers : BottomNavItem("customers", Icons.Filled.Person, "Customers")
    object More : BottomNavItem("more", Icons.Filled.MoreVert, "More")
}

@Composable
fun MainDashboardScreen(
    storeName: String,
    onLogout: () -> Unit
) {
    var selectedTab by remember { mutableStateOf(0) }
    var showMoreMenu by remember { mutableStateOf(false) }
    var selectedScreen by remember { mutableStateOf("home") }
    
    val navItems = listOf(
        BottomNavItem.Home,
        BottomNavItem.Bills,
        BottomNavItem.CreateBill,
        BottomNavItem.Customers,
        BottomNavItem.More
    )

    Scaffold(
        bottomBar = {
            NavigationBar(
                containerColor = Color.White,
                contentColor = Color(0xFF14B8A6)
            ) {
                navItems.forEachIndexed { index, item ->
                    NavigationBarItem(
                        icon = { 
                            Icon(
                                item.icon, 
                                contentDescription = item.title,
                                modifier = Modifier.size(24.dp)
                            ) 
                        },
                        label = { 
                            Text(
                                item.title,
                                fontSize = 11.sp,
                                maxLines = 1
                            ) 
                        },
                        selected = selectedTab == index,
                        onClick = { 
                            if (index == 4) {
                                showMoreMenu = true
                            } else {
                                selectedTab = index
                                selectedScreen = item.route
                            }
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = Color(0xFF14B8A6),
                            selectedTextColor = Color(0xFF14B8A6),
                            unselectedIconColor = Color.Gray,
                            unselectedTextColor = Color.Gray,
                            indicatorColor = Color(0xFF14B8A6).copy(alpha = 0.1f)
                        )
                    )
                }
                
                // More Menu Dropdown
                DropdownMenu(
                    expanded = showMoreMenu,
                    onDismissRequest = { showMoreMenu = false }
                ) {
                    DropdownMenuItem(
                        text = { 
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    Icons.Filled.Info,
                                    contentDescription = "Analytics",
                                    modifier = Modifier.size(20.dp),
                                    tint = Color(0xFF14B8A6)
                                )
                                Spacer(modifier = Modifier.width(12.dp))
                                Text("Analytics")
                            }
                        },
                        onClick = {
                            showMoreMenu = false
                            selectedScreen = "analytics"
                            selectedTab = 4
                        }
                    )
                    DropdownMenuItem(
                        text = { 
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    Icons.Filled.Settings,
                                    contentDescription = "Settings",
                                    modifier = Modifier.size(20.dp),
                                    tint = Color(0xFF14B8A6)
                                )
                                Spacer(modifier = Modifier.width(12.dp))
                                Text("Settings")
                            }
                        },
                        onClick = {
                            showMoreMenu = false
                            selectedScreen = "settings"
                            selectedTab = 4
                        }
                    )
                }
            }
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .background(Color(0xFFF9FAFB))
        ) {
            when (selectedScreen) {
                "home" -> HomeScreen(storeName)
                "bills" -> BillsScreen()
                "create_bill" -> CreateBillScreen()
                "customers" -> CustomersScreen()
                "analytics" -> AnalyticsScreen()
                "settings" -> SettingsScreen(storeName, onLogout)
                else -> HomeScreen(storeName)
            }
        }
    }
}