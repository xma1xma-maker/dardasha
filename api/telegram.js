const BOT_TOKEN = "PUT_YOUR_BOT_TOKEN";
const WEBAPP_URL = "https://www.lazyai.online/2026/03/root-bg112051f-bg224113f-accentffd54a_26.html";

const BOT_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

export default async function handler(req, res) {
  const update = req.body;

  if (update.message) {
    const chatId = update.message.chat.id;
    const userId = update.message.from.id;
    const name = update.message.from.first_name || "User";

    const webUrl = `${WEBAPP_URL}?uid=${userId}`;

    if (update.message.text.startsWith("/start")) {
      await fetch(`${BOT_API}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: `🎁 أهلاً ${name}\n\nاضغط الزر وابدأ الآن 👇`,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "🎁 Claim your gift",
                  web_app: {
                    url: webUrl
                  }
                }
              ]
            ]
          }
        })
      });
    }
  }

  res.status(200).json({ ok: true });
}
