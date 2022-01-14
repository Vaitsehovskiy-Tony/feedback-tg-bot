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
                [{text: 'Играть еще раз', callback_data: 'again'}]
            ]
        })
    },    
    
    resumeOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Ссылка на hh', callback_data: 'resumeFromHH'}],
                [{text: 'Скачать в pdf', callback_data: 'resumePDF'}],
                [{text: 'В начало', callback_data: 'start'}],
            ]
        })
    }, 
    projectOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'News Explorer', callback_data: 'newsExplorer'}, {text: 'Mesto', callback_data: 'mesto'}],
                [{text: 'Mesto', callback_data: 'mestoReact'}, {text: 'Traveling', callback_data: 'traveling'}, {text: 'Feinman', callback_data: 'feinman'}],
                [{text: 'В начало', callback_data: 'start'}],
            ]
        })
    },
   mainOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Игра', callback_data: 'game'}, {text: 'Проекты', callback_data: 'projects'}],
                [{text: 'Резюме', callback_data: 'resume'}, {text: 'Обратная связь', callback_data: 'feedback'}],
                [{text: 'Обо мне', callback_data: 'about'}],
            ]
        })
    },
    resumeOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Резюме в pdf', callback_data: 'resumeInPdf'}, {text: 'Резюме на hh', callback_data: 'resumeInHH', url:'https://spb.hh.ru/resume/95f4bf6eff07eaa1400039ed1f58456c384942'}],
                [{text: 'Начало', callback_data: 'start'}],
            ]
        })
    },
}