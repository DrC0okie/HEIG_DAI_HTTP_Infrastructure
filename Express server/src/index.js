//Push to git
var express = require('express');
var app = express();

const Chuck  = require('chucknorris-io'),
      client = new Chuck();


app.get('/', (req, res)=>{
	console.log("Received request")
	res.send(generateJoke());
});

function generateJoke(){
	// Retrieve a random chuck joke
	return client.getRandomJoke().then(function (response) {
    // do stuff here
	}).catch(function (err) {
    // handle error
	});
};

app.listen(3000, () => {
  console.log('Accepting HTTP requests on port 3000.')
})