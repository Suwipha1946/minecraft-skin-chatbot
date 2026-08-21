export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    const systemPrompt = `คุณคือ AI ผู้ช่วยประจำร้าน mameawww.skin ให้บริการแนะนำสกิน Minecraft, โมเดล 3D Blockbench, แอนิเมชัน และการตั้งค่า Lua Script (Figura Mod / FancyMenu)
คำตอบของคุณต้องให้ข้อมูลอย่างสุภาพ กระชับ ประเมินความเป็นไปได้ในการดีไซน์ และช่วยแนะนำวิธีแก้ปัญหาการติดตั้งไฟล์ให้ลูกค้า`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `${systemPrompt}\n\nคำถามจากลูกค้า: ${message}` }]
                }]
            })
        });

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "ขออภัย ระบบไม่สามารถประมวลผลคำตอบได้ในขณะนี้";
        return res.status(200).json({ reply });
    } catch (error) {
        return res.status(500).json({ reply: "เกิดข้อผิดพลาดในการประมวลผลระบบ AI" });
    }
}