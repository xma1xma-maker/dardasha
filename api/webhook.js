const BOT_TOKEN = "458590542:AAEDLKHRLlfmF9yVH6MYObbG-PR2toZpqmY";
const WEBAPP_URL = "https://www.lazyai.online/2026/03/root-bg112051f-bg224113f-accentffd54a_26.html";

const BOT_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

export default async function (req, res) {
  try {
    // قراءة البيانات من تيليجرام
    const update = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (update.message) {
      const chatId = update.message.chat.id;
      const userId = update.message.from.id;
      const name = update.message.from.first_name || "User";

      const webUrl = `${WEBAPP_URL}?uid=${userId}`;

      // أمر start
      if (update.message.text && update.message.text.startsWith("/start")) {
        await fetch(`${BOT_API}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `🎁 أهلاً ${name}\n\nابدا المحادثة معاي من هنا 👇`,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "اضغط هنا",
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
  } catch (err) {
    console.error(err);
    res.status(200).json({ ok: true });
  }
}
