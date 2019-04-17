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
        cards = (`${result.card1}`);
        response.send('page.hbs', {
        card: cards
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
