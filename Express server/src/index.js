//Push to git
var express = require('express');
var app = express();

const Chuck  = require('chucknorris-io'),
      client = new Chuck();

const generateJoke = async ()=> {
// Retrieve a random chuck joke
    return await client.getRandomJoke();
};

app.get('/', (req, res)=>{
	console.log("Received request")
    generateJoke().then((jokes)=>{
        res.send(jokes);
    });
});



app.listen(3000, () => {
  console.log('Accepting HTTP requests on port 3000.')
})