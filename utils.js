const request = require('request');

var getCode = () => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=5',
            json: true
        }, (error,response,body) => {
            if (body.success !== "True"){
                resolve(body.deck_id);
            }else{
                reject('Can not generate deck of cards')
            }
        });
    });
}

var getCards = (code) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://deckofcardsapi.com/api/deck/${code}/draw/?count=5`,
            json: true
        }, (error,response,body) => {
            if (body.sucess === "False"){
                reject('Can get deck');
            }else{
                resolve({card1: body.cards[0].image,
                	card2: body.cards[1].image,
                	card3: body.cards[2].image,
                	card4: body.cards[3].image,
                	card5: body.cards[4].image
                })
            }
        });
    });
}

module.exports = {
    getCode,
    getCards
};