package co.`in`.pharmly.ui.screens.home.components

import android.content.Intent
import android.net.Uri
import android.util.Log
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.RemoveRedEye
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import co.`in`.pharmly.data.model.Bill
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun BillItemCard(
    bill: Bill,
    onDelete: (String) -> Unit
) {
    val context = LocalContext.current
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
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        ),
        shape = RoundedCornerShape(12.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.fillMaxWidth()) {
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
            
            // Action buttons
            HorizontalDivider(color = Color(0xFFE5E7EB))
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 8.dp, vertical = 4.dp),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                // View Bill Button
                TextButton(
                    onClick = {
                        val url = "https://pharmly.co.in/bill/${bill.id}"
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                        context.startActivity(intent)
                    },
                    modifier = Modifier.weight(1f)
                ) {
                    Icon(
                        imageVector = Icons.Default.RemoveRedEye,
                        contentDescription = "View Bill",
                        modifier = Modifier.size(18.dp),
                        tint = Color(0xFF14B8A6)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "View Bill",
                        color = Color(0xFF14B8A6),
                        fontSize = 14.sp
                    )
                }
                
                VerticalDivider(
                    modifier = Modifier
                        .height(32.dp)
                        .width(1.dp),
                    color = Color(0xFFE5E7EB)
                )
                
                // Delete Button
                TextButton(
                    onClick = { onDelete(bill.id) },
                    modifier = Modifier.weight(1f)
                ) {
                    Icon(
                        imageVector = Icons.Default.Delete,
                        contentDescription = "Delete Bill",
                        modifier = Modifier.size(18.dp),
                        tint = Color(0xFFEF4444)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "Delete",
                        color = Color(0xFFEF4444),
                        fontSize = 14.sp
                    )
                }
            }
        }
    }
}
