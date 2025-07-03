require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { translitToArmenian } = require('./translit');
const { translate } = require('./translate');

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

    await bot.sendMessage(chatId, `🇷🇺 Перевод на русский:\n${translatedRu}`);
    await bot.sendMessage(chatId, `🇬🇧 Перевод на английский:\n${translatedEn}`);
  } catch (err) {
    console.error("Ошибка при переводе:", err);
    await bot.sendMessage(chatId, `❌ Произошла ошибка при переводе.`);
  }
});