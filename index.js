const express = require('express');
const req = require('express/lib/request');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

const TelegramBot = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api
const {gameOptions, againOptions, resumeOptions, projectOptions, mainOptions} = require('./options');
const token = '5074302213:AAEcVwNuW7s2xCsMy9f5wOAN_ZuVz0frlcU'; // тут токен кторый мы получили от botFather
const reportsChannel = -1001755597137;

// включаем самого обота
const bot = new TelegramBot(token, {polling: true});


app.get('/', (req, res) => {
    res.status(404).send('<h1>Страница не найдена</h1>');
}); 

const chats = {};

const callback = (msg) => {
    const data =  msg.data;
    const chatId = msg.message.chat.id;
    bot.sendMessage(chatId, data == chats[chatId] ? `Поздравляю, ты отгадал цифру ${chats[chatId]}!!!` : `Сожалею, но бот загадал другую цифру ${chats[chatId]}`, againOptions);
}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 10, твоя задача её угадать!');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Я загадал, отгадывай!', gameOptions);
    bot.once('callback_query', callback);
}

const sendFeedback = async (chatId) => {
    bot.sendMessage(chatId, `Нашёл баг? Поругать, похвалить проекты, просто дать фидбэк - всё принимается! Это анонимно!`);
    bot.sendMessage(chatId, `Слушаю тебя!`);
    bot.onText(/[a-zA-Zа-яА-Я0-9]+/, async msg => {
        const text = msg.text;
        const chatId = msg.chat.id; 
        // await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/ac5/a4c/ac5a4c6a-d024-315e-8a8b-3c99843d3eef/192/8.webp')
        await bot.sendMessage(reportsChannel, text);
        // return bot.sendMessage(chatId, 'Я тебя не понимаю, давай попробуем еще раз  (´･ᴗ･ )');
        bot.sendMessage(chatId, `Сообщение отправлено!`);
    })
}

const projectsMenu = async (chatId) => {
    await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/k/Katzz/Katzz_009.webp', projectOptions)
    // return bot.sendMessage(chatId, "Моё портфолио", projectOptions );
    // bot.sendMessage()
}

const startAnswer = async (chatId) => {
    await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/ac5/a4c/ac5a4c6a-d024-315e-8a8b-3c99843d3eef/192/8.webp');  
    return bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот веб-разработчика Антона Вайцеховского', mainOptions);
}

const toBegining = async (chatId) => {
    return bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/k/Katzz/Katzz_001.webp', mainOptions);
}

const resumeInPdf = async (chatId) => {
    return bot.sendDocument(chatId, './Vaitsekhovskiy_A.pdf')
}

const resumeAnswer = async (chatId) => {
    await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/k/Katzz/Katzz_021.webp', resumeOptions)
}





const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/resume', description: 'Резюме'},
        {command: '/projects', description: 'Проекты'},
        {command: '/feedback', description: 'Обратная связь'},
        {command: '/about', description: 'Обо мне'},
        {command: '/game', description: 'Игра, угадай цифру'},
    ])
    
    // конструкцию try catch сюда - 31 минута
    
    bot.onText(/[a-zA-Zа-яА-Я0-9]+/, async msg => {
        const text = msg.text;
        const chatId = msg.chat.id; 
        if (text === '/start') {
            return startAnswer(chatId);
        } 
        if (text === '/game') {
            return startGame(chatId);
        }
        if (text === '/feedback') {
            return sendFeedback(chatId);
        }
        if (text === '/projects') {
            return projectsMenu(chatId);
        }
        if (text === '/resume') {
            return resumeAnswer(chatId);
        }

        if (text === '/about') {

        }
        // return bot.sendMessage(chatId, 'Я тебя не понимаю, давай попробуем еще раз  (´･ᴗ･ )');
    })
}

bot.on('callback_query', msg => {
    const data =  msg.data;
    const chatId = msg.message.chat.id;


    if (data === 'start') {
        toBegining(chatId);
    }
    if (data === 'feedback') {
        sendFeedback(chatId);
    }

    if ((data === 'again') || (data === '/game')) {
        startGame(chatId);
        bot.removeListener('callback_query', callback);
    }
    if (data === 'projects') {
        return projectsMenu(chatId);
    }
    if (data === 'resume') {
        return resumeAnswer(chatId);
    }
    if (data === 'resumeInPdf') {
        resumeInPdf(chatId);
        return startAnswer(chatId);        
    }
})

start();

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
}) 