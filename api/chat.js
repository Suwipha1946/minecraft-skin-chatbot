export default function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { message } = req.body || {};
    const text = String(message || "").toLowerCase();

    let reply = "สวัสดีครับ! ยินดีต้อนรับสู่ร้าน mameawww.skin.xyz สามารถสอบถามเรื่อง 'ราคาสกิน', 'ราคาโมเดล Blockbench', 'คิวงาน' หรือ 'วิธีลงไฟล์ในเกม' ได้เลยครับ";

    if (text.includes("สกิน") || text.includes("skin") || text.includes("ราคา")) {
        reply = "🎨 **รายละเอียดราคาสินค้าและบริการ:**\n- Custom Skin 2D/3D Layer: 150 - 300 บาท\n- 3D Model Blockbench: 300 - 800+ บาท\n- เขียน Lua Script (Figura Mod) / FancyMenu: เริ่มต้น 100 บาท";
    } else if (text.includes("คิว") || text.includes("นาน") || text.includes("เวลา")) {
        reply = "⏳ **ระยะเวลาจัดทำ:** ประมาณ 1 - 3 วันหลังจากคอนเฟิร์มแบบและชำระมัดจำครับ";
    } else if (text.includes("ลง") || text.includes("ติดตั้ง") || text.includes("วิธี")) {
        reply = "🛠️ **วิธีลงไฟล์:**\n1. Skin: อัปโหลดผ่านเว็บ Minecraft.net หรือ Launcher\n2. Figura Model: นำโฟลเดอร์โมเดลไปวางใน .minecraft/figura/avatars";
    }

    return res.status(200).json({ reply });
}