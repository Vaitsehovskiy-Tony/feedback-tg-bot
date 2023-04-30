const express = require('express');
// require('dotenv').config();
const app = express();
const config = require('./config');

const TelegramBot = require('node-telegram-bot-api');

const token = config.TOKEN;
const reportsChannel = -1001755597137;
const {
    newsExplorerText,
    blackWallText,
    devhouseText,
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
    bot.sendMessage(chatId, data == chats[chatId] ? `Congratulations, you guessed the number ${chats[chatId]}!!!` : `I'm sorry, but the bot guessed number ${chats[chatId]}`, againOptions);
}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, "Now I'm going to guess a number from 0 to 10, your task is to guess it!");
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/988/e5f/988e5f52-7165-3b74-b531-45389de62989/192/2.webp');
    await bot.sendMessage(chatId, 'I guessed it, guess it!', gameOptions);
    bot.once('callback_query', callback);
}

const sendFeedback = async (chatId) => {
    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/940/db2/940db267-de3d-37ec-a2f7-4b832394eb3f/192/81.webp');
    bot.sendMessage(chatId, `Found a bug? Scold, praise projects, just give feedback - all accepted! This is anonymous!`);
    bot.sendMessage(chatId, `Listening to you!`);
    bot.onText(/[a-zA-Zа-яА-Я0-9]+/, async msg => {
        const text = msg.text;
        const chatId = msg.chat.id; 
        await bot.sendMessage(reportsChannel, text);
        bot.sendMessage(chatId, `Message sent!`);
        bot.removeTextListener(/[a-zA-Zа-яА-Я0-9]+/);
        toBegining(chatId);
    })
}

const projectsMenu = async (chatId) => {
    await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/k/Katzz/Katzz_009.webp', projectOptions)
}

const startAnswer = async (chatId) => {
    await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/ac5/a4c/ac5a4c6a-d024-315e-8a8b-3c99843d3eef/192/8.webp');  
    return bot.sendMessage(chatId, "Welcome to the web developer Anton Vaits's bot", mainOptions);
}

const toBegining = async (chatId) => {
    return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/988/e5f/988e5f52-7165-3b74-b531-45389de62989/192/22.webp', mainOptions);
}

const resumeInPdf = async (chatId) => {
    return bot.sendDocument(chatId, './Anton_Vaits_CV.pdf')
}

const resumeAnswer = async (chatId) => {
    await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/k/Katzz/Katzz_021.webp', resumeOptions)
}   

const blackWallFunction = async (chatId) => {
    await bot.sendPhoto(chatId, './images/blwall1.jpg');
    await bot.sendPhoto(chatId, './images/blwall2.jpg');
    await bot.sendPhoto(chatId, './images/blwall3.jpg');
    await bot.sendPhoto(chatId, './images/blwall4.jpg');
    bot.sendMessage(chatId, blackWallText, toStartOptions);
}
const devhouseFunction = async (chatId) => {
    await bot.sendPhoto(chatId, './images/devhouse1.jpg');
    await bot.sendPhoto(chatId, './images/devhouse2.jpeg');
    await bot.sendPhoto(chatId, './images/devhouse3.jpeg');
    bot.sendMessage(chatId, devhouseText, toStartOptions);
}

const newsExplorerFunction = async (chatId) => {
    await bot.sendPhoto(chatId, './images/ne.png');
    bot.sendMessage(chatId, newsExplorerText, toStartOptions);
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
        {command: '/start', description: 'Greetings'},
        {command: '/resume', description: 'CV'},
        {command: '/projects', description: 'Projects'},
        {command: '/feedback', description: 'Feedback'},
        {command: '/about', description: 'About'},
        {command: '/game', description: 'Guess the number game'},
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
    if (data === 'blackWall') {
        console.log(data)

        return blackWallFunction(chatId);
    }
    if (data === 'devhouse') {
        console.log(data)

        return devhouseFunction(chatId);
    }
    if (data === 'newsExplorer') {
        return newsExplorerFunction(chatId);
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