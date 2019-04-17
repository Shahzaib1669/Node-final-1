const request = require('request');

var getPhotos = () => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://jsonplaceholder.typicode.com/photos',
            json: true
        }, (error,response,body) => {
            if (body){
                resolve(body[0].url);
            }else{
                reject('Can not find images')
            }
        });
    });
}


module.exports = {
    getPhotos
};