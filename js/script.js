const input = document.querySelector('#search');
const box = document.querySelector('#box');
let storeData = [];

// To get the data from the api using async await fetch
const getData = async () => {
	try {
		const res = await fetch(
			'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
		);
		const data = await res.json();
		storeData = data;
		display(storeData);
	} catch (err) {
		const output = `<div class="card"><h5>Error : ${err.message}</h5></div>`;
		console.log(err.Message);
	}
};

//Filter using onChange event on search input
input.addEventListener('keyup', (e) => {
	e.preventDefault();
	filterCities(e.target.value);
});

// To filter the cities as per user input
const filterCities = (input) => {
	const filteredList = storeData.filter((c) => {
		const regex = new RegExp(`${input}`, 'gi');
		return c.city.match(regex) || c.state.match(regex);
	});
	display(filteredList);
	console.log(filteredList);
};

const display = (cities) => {
	let output = '';

	if (cities.length > 0) {
		//Add card for each city
		cities.forEach((city) => {
			output += `<div class="card">
        <h5 id="city">City : ${city.city}</h5>
        <h5 id="growth">Growth : ${city.growth_from_2000_to_2013}</h5>
        <h5 id="latitude">Latitude : ${city.latitude}</h5>
        <h5 id="longitude">Longitude : ${city.longitude}</h5>
        <h5 id="population">Population : ${city.population}</h5>
        <h5 id="rank">Rank : ${city.rank}</h5>
        <h5 id="state">State : ${city.state}</h5>
    </div>`;
		});
	} else {
		//Display Error
		output = `<div class="card">
            <h5>Error : No Citites / States Found.</h5>
        </div>`;
	}

	//Add output to card-box
	box.innerHTML = output;
};

window.onload = getData;
