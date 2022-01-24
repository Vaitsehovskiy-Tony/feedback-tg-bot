const express = require('express');
// require('dotenv').config();
const app = express();
const config = require('./config');

const TelegramBot = require('node-telegram-bot-api');

const token = config.TOKEN;
const reportsChannel = -1001755597137;
const {
    newsExplorerText,
    mestoText,
    mestoReactText,
    travellingText,
    feinmanText,
    aboutText,
    tgBotText
} = require('./texts');

const {
    gameOptions, 
    againOptions, 
    resumeOptions, 
    projectOptions, 
    mainOptions, 
    toStartOptions, 
    aboutOptions
} = require('./options');

const bot = new TelegramBot(token, {polling: true});
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
    await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/988/e5f/988e5f52-7165-3b74-b531-45389de62989/192/2.webp');
    await bot.sendMessage(chatId, 'Я загадал, отгадывай!', gameOptions);
    bot.once('callback_query', callback);
}

const sendFeedback = async (chatId) => {
    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/940/db2/940db267-de3d-37ec-a2f7-4b832394eb3f/192/81.webp');
    bot.sendMessage(chatId, `Нашёл баг? Поругать, похвалить проекты, просто дать фидбэк - всё принимается! Это анонимно!`);
    bot.sendMessage(chatId, `Слушаю тебя!`);
    bot.onText(/[a-zA-Zа-яА-Я0-9]+/, async msg => {
        const text = msg.text;
        const chatId = msg.chat.id; 
        await bot.sendMessage(reportsChannel, text);
        bot.sendMessage(chatId, `Сообщение отправлено!`);
        bot.removeTextListener(/[a-zA-Zа-яА-Я0-9]+/);
        toBegining(chatId);
    })
}

const projectsMenu = async (chatId) => {
    await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/k/Katzz/Katzz_009.webp', projectOptions)
}

const startAnswer = async (chatId) => {
    await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/ac5/a4c/ac5a4c6a-d024-315e-8a8b-3c99843d3eef/192/8.webp');  
    return bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот веб-разработчика Антона Вайцеховского', mainOptions);
}

const toBegining = async (chatId) => {
    return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/988/e5f/988e5f52-7165-3b74-b531-45389de62989/192/22.webp', mainOptions);
}

const resumeInPdf = async (chatId) => {
    return bot.sendDocument(chatId, './Vaitsekhovskiy_A.pdf')
}

const resumeAnswer = async (chatId) => {
    await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/k/Katzz/Katzz_021.webp', resumeOptions)
}

const newsExplorerFunction = async (chatId) => {
    await bot.sendPhoto(chatId, './images/ne.png');
    bot.sendMessage(chatId, newsExplorerText, toStartOptions);
}

const mestoFunction = async (chatId) => {
    await bot.sendPhoto(chatId, './images/m.png');
    bot.sendMessage(chatId, mestoText, toStartOptions);
}
const mestoreactFunction = async (chatId) => {
    await bot.sendPhoto(chatId, './images/m.png');
    bot.sendMessage(chatId, mestoReactText, toStartOptions);
}
const travellingFunction = async (chatId) => {
    await bot.sendPhoto(chatId, './images/tr.png');
    bot.sendMessage(chatId, travellingText, toStartOptions);
}
const feinmanFunction = async (chatId) => {
    await bot.sendPhoto(chatId, './images/fmn.png');
    bot.sendMessage(chatId, feinmanText, toStartOptions);
}

const tgBotFunction = async (chatId) => {
    bot.sendMessage(chatId, tgBotText, toStartOptions);
}

const aboutFunction = async (chatId) => {
    await bot.sendPhoto(chatId, './images/selfie.jpg');
    bot.sendMessage(chatId, aboutText, aboutOptions);
} 

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/resume', description: 'Резюме'},
        {command: '/projects', description: 'Проекты'},
        {command: '/feedback', description: 'Обратная связь'},
        {command: '/about', description: 'Обо мне'},
        {command: '/game', description: 'Игра угадай цифру'},
    ])
        
    bot.onText(/[a-zA-Z0-9]+/, async msg => {
        const text = msg.text;
        const chatId = msg.chat.id; 
        if (text === '/start') {
            return startAnswer(chatId);
        } 
        if (text === '/game') {
            return startGame(chatId);   
        }
        if (text === '/feedback') {
            sendFeedback(chatId);
        }
        if (text === '/projects') {
            return projectsMenu(chatId);
        }
        if (text === '/resume') {
            return resumeAnswer(chatId);
        }
        if (text === '/about') {
            return aboutFunction(chatId);
        }
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
    if ((data === 'again') || (data === 'game')) {
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
    if (data === 'newsExplorer') {
        return newsExplorerFunction(chatId);
    }
    if (data === 'mesto') {
        return mestoFunction(chatId);
    }
    if (data === 'mestoReact') {
        return mestoreactFunction(chatId);
    }
    if (data === 'traveling') {
        return travellingFunction(chatId);
    }
    if (data === 'feinman') {
        return feinmanFunction(chatId);
    }
    if (data === 'tgBot') {
        return tgBotFunction(chatId);
    }
    if (data === 'about') {
        return aboutFunction(chatId);
    }

})

start();

app.listen(config.PORT, () => {
    console.log(`App listening on port ${config.PORT}`)
}) 