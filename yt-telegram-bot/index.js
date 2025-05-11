const TelegramBot = require("node-telegram-bot-api");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const downloadDir = path.join(__dirname, "downloads");
if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);

// Store user request context
const userRequests = {};

function downloadMedia(url, chatId, type) {
  const filename = `${Date.now()}_${type}.${type === "mp3" ? "mp3" : "mp4"}`;
  const filepath = path.join(downloadDir, filename);
  const format = type === "mp3" ? "bestaudio" : "mp4";
  const postProcess =
    type === "mp3" ? "--extract-audio --audio-format mp3" : "";

  const command = `yt-dlp -f "${format}" ${postProcess} -o "${filepath}" "${url}"`;
  bot.sendMessage(
    chatId,
    `📥 Downloading your ${type === "mp3" ? "audio" : "video"}...`
  );

  exec(command, (error) => {
    if (error) {
      console.error("❌ yt-dlp error:", error);
      bot.sendMessage(chatId, "❌ Failed to download.");
      return;
    }

    const sendFn = type === "mp3" ? bot.sendAudio : bot.sendVideo;
    sendFn
      .call(bot, chatId, filepath)
      .then(() => fs.unlinkSync(filepath))
      .catch((err) => {
        console.error("❌ Error sending file:", err);
        bot.sendMessage(chatId, "❌ Couldn't send the file.");
      });
  });
}

// Step 1: detect YouTube URL
bot.onText(
  /https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s]+/,
  (msg, match) => {
    const chatId = msg.chat.id;
    const url = match[0];
    userRequests[chatId] = url;

    bot.sendMessage(chatId, "🎧 What would you like to download?", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🎵 Audio (MP3)", callback_data: "audio" },
            { text: "🎥 Video (MP4)", callback_data: "video" },
          ],
        ],
      },
    });
  }
);

// Step 2: handle button response
bot.on("callback_query", (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const type = callbackQuery.data === "audio" ? "mp3" : "mp4";
  const url = userRequests[chatId];

  if (!url) {
    bot.sendMessage(
      chatId,
      "❗ No URL found. Please send a YouTube link first."
    );
    return;
  }

  downloadMedia(url, chatId, type);
});
