const { networkInterfaces } = require('os');
const { generateJoke, getInternalIp } = require('./utils');
const path = require('path');
const nets = networkInterfaces();
const ips = getInternalIp(nets);
const Chuck = require('chucknorris-io'), client = new Chuck();

var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var app = express();
var gifUrl = 'https://media.giphy.com/media/4M4LzMbq9sGBO/giphy.gif';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    console.log("Received request")
    generateJoke(client).then((joke) => {
        res.render('index', { joke: joke.value, ip: ips, gif: gifUrl });
    });
});

app.get('/fetch', (req, res) => {
    generateJoke(client).then((joke) => {
        console.log("Received fetch request")
        const result = {};
        result.joke = joke;
        result.ips = ips;
        sendRequest();
        result.gifUrl = gifUrl;
        res.send(result);
    });
});

function sendRequest() {
    var offset = Math.floor(Math.random() * 51);
    var request = new XMLHttpRequest();
    var url = 'http://api.giphy.com/v1/gifs/search?q=Chuck+Norris&limit=1&offset=' + offset + '&api_key=8hrrGL62OfevX7eCtySSmuEnuAXgYTD5';

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            gifUrl = JSON.parse(this.responseText).data[0].images.original.url
            //console.log(JSON.parse(this.responseText).data[0].images.original.url);
        }
    }

    request.open("GET", url, true);
    request.send();
}

app.listen(3000, () => {
    console.log('Accepting HTTP requests on port 3000.')
})
