const express = require('express');
const req = require('express/lib/request');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

const TelegramBot = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api
const {gameOptions, againOptions} = require('./options');
const token = '5074302213:AAEcVwNuW7s2xCsMy9f5wOAN_ZuVz0frlcU'; // тут токен кторый мы получили от botFather

// включаем самого обота
const bot = new TelegramBot(token, {polling: true});


app.get('/', (req, res) => {
    res.status(404).send('<h1>Страница не найдена</h1>');
}); 

const chats = {};


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 10, твоя задача её угадать!');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Я загадал, отгадывай!', gameOptions);
}

const start = () => {

    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/resume', description: 'Резюме'},
        {command: '/feedback', description: 'Обратная связь'},
        {command: '/about', description: 'Обо мне'},
        {command: '/game', description: 'Игра, угадай цифру'},
    ])
    
    
    
    bot.onText(/[a-zA-Zа-яА-Я0-9]+/, async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/ac5/a4c/ac5a4c6a-d024-315e-8a8b-3c99843d3eef/192/8.webp')
            return bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот веб-разработчика Антона Вайцеховского');
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, давай попробуем еще раз  (´･ᴗ･ )');
    })
}

bot.on('callback_query', msg => {
    const data =  msg.data;
    const chatId = msg.message.chat.id;
    const number = chats[chatId].toString();

    if (data === '/again') {
        return startGame(chatId);
    }
    if (data === number) {
        return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${number}!!!`, againOptions)
    } else {
        return bot.sendMessage(chatId, `Сожалею, но бот загадал другую цифру ${number}`, againOptions)
    }
    bot.sendMessage(chatId, `Ты выбрал цифру ${data}`)
    console.log(msg);
})

start();

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
}) 