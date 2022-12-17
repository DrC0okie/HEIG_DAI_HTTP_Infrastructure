//Push to git
var express = require('express');
var app = express();
const { networkInterfaces } = require('os');
const { generateJoke ,getInternalIp} = require('./utils');

const nets = networkInterfaces();
const ips = getInternalIp(nets);

const Chuck  = require('chucknorris-io'),
      client = new Chuck();

app.get('/', (req, res)=>{
	console.log("Received request")
    generateJoke(client).then((jokes)=>{
        const result = {};
        result.jokes = jokes;
        result.ips = ips;
        res.send(result);
    });
});

app.listen(3000, () => {
  console.log('Accepting HTTP requests on port 3000.')
})



