//Push to git
var express = require('express');
var app = express();
const { networkInterfaces } = require('os');
const { generateJoke ,getInternalIp} = require('./utils');

const nets = networkInterfaces();
const ips = getInternalIp(nets);

const Chuck  = require('chucknorris-io'),
      client = new Chuck();
	  
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
	console.log("Received request")
    generateJoke(client).then((joke)=>{
        const result = {};
        result.joke = joke;
        result.ips = ips;
		console.log(ips);
		res.render('index', { joke:joke.value, ip:ips});
		
        //res.send(result);
    });
});

app.listen(3000, () => {
  console.log('Accepting HTTP requests on port 3000.')
})



