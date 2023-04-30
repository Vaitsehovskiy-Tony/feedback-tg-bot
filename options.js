module.exports = {
    gameOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
                [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
                [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
                [{text: '0', callback_data: '0'}]
            ]
        })
    },
    
    againOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Play again ☺️', callback_data: 'again'}]
            ]
        })
    },    
    
    projectOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Black Wall 🔲', callback_data: 'blackWall'}],
                [{text: 'DevHouse 🏠', callback_data: 'devhouse'}],
                [{text: 'News Explorer 🔍', callback_data: 'newsExplorer'}],
                [{text: 'Feedback Bot 🧚🏽‍♀️', callback_data: 'tgBot'}],
                [{text: 'Back to top 🤔', callback_data: 'start'}]
            ]
        })
    },
   mainOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Game 🎮', callback_data: 'game'}, {text: 'Projects 🎇', callback_data: 'projects'}],
                [{text: 'CV 🥸', callback_data: 'resume'}, {text: 'Feedback ✉️', callback_data: 'feedback'}],
                [{text: 'About 😇', callback_data: 'about'}],
            ]
        })
    },
    resumeOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'LinkedIn', callback_data: 'resumeInHH', url:'https://www.linkedin.com/in/tonyvaits/'}, {text: 'Download', callback_data: 'resumeInPdf'}],
                [{text: 'Back to top 🤔', callback_data: 'start'}],
            ]
        })
    },
    toStartOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Back to top 🤔', callback_data: 'start'}],
            ]
        })
    },
    aboutOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'GitHub', callback_data: 'github', url:'https://github.com/Vaitsehovskiy-Tony'}, {text: 'LinkedIn', callback_data: 'linkedin', url:'https://www.linkedin.com/in/tonyvaits/'}],
                [{text: 'fb', callback_data: 'vk', url:'https://www.facebook.com/tony.vaits'}, {text: 'Codewars', callback_data: 'email', url:'https://www.codewars.com/users/Антон%20Вайцеховский'}]
            ]
        })
    },
}