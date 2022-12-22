setInterval(function () {
	fetch('http://localhost/api/fetch').then( (response) => {
		response.json().then( (data) => {
			document.getElementById('ip').innerText = 'Static server : ' + Object.values(data.ips)[0]
			document.getElementById('joke').innerText = data.joke.value
		})
	})
}, 5000);
