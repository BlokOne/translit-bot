require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { translitToArmenian } = require('./translit');
const { translate } = require('./translate');

const app = express();
const PORT = process.env.PORT || 3000;

// Telegram Bot setup
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text || msg.from.is_bot) return;

  try {
    const armenian = translitToArmenian(text);
    await bot.sendMessage(chatId, `🇦🇲 Армянский:\n${armenian}`);

    const [translatedRu, translatedEn] = await Promise.all([
      translate(armenian, 'ru'),
      translate(armenian, 'en'),
    ]);

    await bot.sendMessage(chatId, `🇷🇺 Русский:\n${translatedRu}\n\n🇬🇧 Английский:\n${translatedEn}`);
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, 'Произошла ошибка при переводе 😔');
  }
});

app.get('/', (req, res) => {
  res.send('Bot is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Express server is listening on port ${PORT}`);
});