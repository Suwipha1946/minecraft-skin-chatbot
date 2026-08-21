export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { message } = req.body;
    const msg = (message || "").toLowerCase();

    let reply = "ยินดีต้อนรับสู่ร้าน mameawww.skin.xyz ครับ! สามารถสอบถามเรื่อง 'ราคาสกิน', 'ราคาโมเดล', 'คิวงาน' หรือ 'วิธีลงไฟล์ในเกม' ได้เลยครับ";

    if (msg.includes("สกิน") || msg.includes("skin") || msg.includes("ราคา")) {
        reply = "🎨 **รายละเอียดราคาสินค้าและบริการ:**\n- Custom Skin 2D/3D Layer: 150 - 300 บาท\n- 3D Model Blockbench: 300 - 800+ บาท (ขึ้นอยู่กับความซับซ้อน)\n- เขียน Lua Script (Figura Mod) / FancyMenu: เริ่มต้น 100 บาท";
    } else if (msg.includes("คิว") || msg.includes("นาน") || msg.includes("เวลา")) {
        reply = "⏳ **ระยะเวลาจัดทำ:** ปัจจุบันคิวงานอยู่ที่ประมาณ 1 - 3 วันหลังจากคอนเฟิร์มแบบและชำระมัดจำครับ";
    } else if (msg.includes("ลง") || msg.includes("ติดตั้ง") || msg.includes("วิธี")) {
        reply = "🛠️ **วิธีนำไฟล์เข้าเกม:**\n1. สำหรับ Skin: สามารถอัปโหลดผ่านเว็บ Minecraft.net หรือ Launcher ได้ทันที\n2. สำหรับ Figura Model: นำโฟลเดอร์โมเดลไปวางใน `.minecraft/figura/avatars` ได้เลยครับ";
    } else if (msg.includes("สวัสดี") || msg.includes("หวัดดี") || msg.includes("hi") || msg.includes("hello")) {
        reply = "สวัสดีครับ! สนใจสั่งทำ Skin, Blockbench 3D Model หรือปรับแต่งระบบเกม สอบถามรายละเอียดได้เลยครับ";
    }

    return res.status(200).json({ reply });
}