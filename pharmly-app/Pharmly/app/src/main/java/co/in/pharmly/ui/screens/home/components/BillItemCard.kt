package co.`in`.pharmly.ui.screens.home.components

import android.util.Log
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import co.`in`.pharmly.data.model.Bill
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun BillItemCard(bill: Bill) {
    val dateFormat = remember { SimpleDateFormat("dd MMM, hh:mm a", Locale.US) }
    
    val formattedDate = remember(bill.createdAt) {
        try {
            val utcFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.US)
            utcFormat.timeZone = TimeZone.getTimeZone("UTC")
            val date = utcFormat.parse(bill.createdAt)
            date?.let { dateFormat.format(it) } ?: "Unknown date"
        } catch (e: Exception) {
            Log.e("BillItemCard", "Date format error", e)
            "Unknown date"
        }
    }
    
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { /* TODO: Navigate to bill detail */ },
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        ),
        shape = RoundedCornerShape(12.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = bill.customerId?.name?.ifEmpty { "Unknown Customer" } ?: "Unknown Customer",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = Color(0xFF1F2937),
                    maxLines = 1
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = bill.customerId?.whatsappNumber?.ifEmpty { "No phone" } ?: "No phone",
                    fontSize = 13.sp,
                    color = Color.Gray,
                    maxLines = 1
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = formattedDate,
                    fontSize = 12.sp,
                    color = Color.Gray.copy(alpha = 0.7f),
                    maxLines = 1
                )
            }
            
            Column(horizontalAlignment = Alignment.End) {
                Text(
                    text = "₹${String.format(Locale.US, "%.0f", bill.finalAmount)}",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF14B8A6),
                    maxLines = 1
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "${bill.items.size} item${if (bill.items.size != 1) "s" else ""}",
                    fontSize = 12.sp,
                    color = Color.Gray,
                    maxLines = 1
                )
            }
        }
    }
}
