export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { message } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(200).json({ reply: "❌ ไม่พบ GEMINI_API_KEY ใน Vercel Environment Variables" });
    }

    const systemPrompt = `คุณคือ AI ผู้ช่วยประจำร้าน mameawww.skin.xyz ให้บริการแนะนำและประเมินราคาเกี่ยวกับ Minecraft ดังนี้:
1. รับทำ Custom Skin: เริ่มต้น 150 - 300 บาท
2. รับทำ 3D Model Blockbench: เริ่มต้น 300 - 800+ บาท
3. รับเขียน Lua Script (Figura Mod) / ตั้งค่า FancyMenu: เริ่มต้น 100 บาท
4. ระยะเวลาจัดทำ: 1-3 วันตามคิวงาน

หน้าที่ของคุณคือตอบคำถามลูกค้าอย่างสุภาพ ประเมินราคาเบื้องต้น และแนะนำวิธีลงไฟล์หรือตั้งค่าโมเดลในเกมให้อัตโนมัติ`;

    try {
        // ใช้ gemini-1.5-flash-latest ซึ่งเป็น Alias มาตรฐานของ Google REST API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: `${systemPrompt}\n\nคำถามจากลูกค้า: ${message}` }]
                    }
                ]
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(200).json({ reply: `⚠️ Google API Error (${data.error.code}): ${data.error.message}` });
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "ไม่พบคำตอบจาก AI";
        return res.status(200).json({ reply });

    } catch (error) {
        return res.status(200).json({ reply: `❌ Server Error: ${error.message}` });
    }
}