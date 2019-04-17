const express = require('express');

var nasa = require('./nasa')
var utils = require('./utils');
var app = express();


app.get('/', (request, response) => {
    response.send({
        Links: [
            '/cards',
            '/nasa'
        ]
    })
});

app.get('/cards', (request, response) => {

    utils.getCode().then((result) => {
        code = result
        return utils.getCards(result);
    }).then((result) => {
        card1 = (`${result.card1}`);
        card2 = (`${result.card2}`);
        card3 = (`${result.card3}`);
        card4 = (`${result.card4}`);
        card5 = (`${result.card5}`);
        response.send('page.hbs', {
        card1: card1,
        card2: card2,
        card3: card3,
        card4: card4,
        card5: card5
    })
    }).catch((error) => {
        response.send('Error message: ' + error);
    });
})

app.get('/nasa', (request, response) => {

    nasa.getPhotos().then((result) => {
        images = result
    }).then((result) => {
        response.send('nasa.hbs', {
        image: images
    })
    }).catch((error) => {
        response.send('Error message: ' + error);
    });
})

app.listen(8080, () => {
    console.log('Server is up on the port 8080')
})
