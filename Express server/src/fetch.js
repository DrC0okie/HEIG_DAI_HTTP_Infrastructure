setInterval(function () {
	fetch('http://localhost:3000')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch(err => console.log(err))
console.log("Fetched")}, 5000);