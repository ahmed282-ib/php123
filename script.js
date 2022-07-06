function getAffirmation() {
	let affirmations = [
		"I hold the deliberate intention of learning as I study.",
		"I walk through the school halls with confidence; I am aware of my identity.",
		"My future is bright.",
		"I care about school, I am passionate about focusing on my academics to create a stable and exciting future.",
		"I live a life filled with immense purpose.",
		"I move into action and produce meaningful results.",
		"I appreciate the past, present, and future of my life.",
		"I speak and think positively every moment of my life.",
		"Everything is alright. Everything happens for my most significant benefit. Divine purpose comes out of all situations.",
		"I am willing to make positive changes in my life; I greet my new positive life with wide-open arms.",
		"I am choosing to create an extraordinary life by thinking positively and practicing gratitude.",
		"I easily see the lesson or the blessing in all that is.",
		"A river of compassion washes away my anger and replaces it with love.",
		"I am peaceful in my body, heart and soul.",
		"I am superior to negative thoughts and low actions.",
		"My body is healthy; my mind is brilliant; my soul is tranquil.",
		"I am healthy, whole, and complete.",
		"As I say yes to life, life says yes to me.",
		"I possess the qualities needed to be extremely successful.",
		"Everything that is happening now is happening for the ultimate good.",
		"Creative energy surges through me and leads me to new and brilliant ideas.",
		"Today, I abandon my old habits and take up new, more positive ones.",
		"The point of power is always in the present moment.",
		"I press on because I believe in my path.",
		"I am courageous and I stand up for myself.",
		"My thoughts are filled with positivity and my life is plentiful with prosperity.",
		"Happiness is a choice. I base my happiness on my own accomplishments and the blessings I’ve been given.",
		"Many people look up to me and recognize my worth; I am admired.",
		"Every thought we think is creating our future.",
		"I now go beyond other people’s fears and limitations.",
		"Everything that is happening now is happening for my ultimate good.",
		"Though these times may be difficult, they are only a short phase of life.",
		"I am deeply fulfilled by all that I do.",
		"The perfect partner for me is coming into my life sooner than I expect.",
		"I trust the process of life.",
		"I am at peace with all that has happened, is happening, and will happen.",
		"I wake up today with strength in my heart and clarity in my mind.",
		"My obstacles are moving out of my way; my path is carved towards greatness.",
		"My life is just beginning.",
		"I am the architect of my life; I build its foundation and choose its contents.",
		"My ability to conquer my challenges is limitless; my potential to succeed is infinite.",
		"Today, I am brimming with energy and overflowing with joy.",
		"I radiate beauty, charm, and grace.",
		"I am blessed with an incredible family and wonderful friends.",
		"My fears of tomorrow are simply melting away.",
		"My future is an ideal projection of what I envision now.",
		"I am enough.",
	];

	aff = affirmations[Math.round(Math.random() * 46)];
	affText = document.createTextNode(aff);
	document.getElementById("tip").appendChild(affText);
}

async function getDadJoke() {
	let api_url = "https://icanhazdadjoke.com/";
	let myHeaders = { Accept: "application/json" };
	let response = await fetch(api_url, {
		method: "GET",
		headers: myHeaders,
	});
	let data = await response.json();
	const { joke } = data;

	jokeText = document.createTextNode(joke);
	document.getElementById("joke").appendChild(jokeText);
}

async function getWeather() {
	let endpoint = "http://api.weatherapi.com/v1/forecast.json?";
	let api_key = "key=" + "a97e8e286a9b467eb2a204937222406";
	let abingdon = "39.488240,-76.309110";
	let q = "q=" + abingdon;
	let days = "days=" + 3;
	let separator = "&";
	let api_url = endpoint + api_key + separator + q + separator + days;

	// Fetching data
	let response = await fetch(api_url);
	let data = await response.json();

	// Location name
	const { name, region } = data.location;
	let location = `${name}, ${region}`;
	let locationText = document.createTextNode(location);
	document.getElementById("location").appendChild(locationText);

	// Current conditions
	const { text, icon } = data.current.condition;
	const { feelslike_f, gust_mph, humidity, temp_f } = data.current;
	current_info = { text, icon, temp_f, feelslike_f, humidity, gust_mph };

	// Current condition icon
	document.getElementById("current-img").src = "https:" + current_info.icon;

	// Current condition icon
	let currentText = document.createTextNode(text);
	document.getElementById("current-text").appendChild(currentText);

	// Current temperature
	let currentTempText = document.createTextNode(Math.round(temp_f));
	document.getElementById("current-temp").appendChild(currentTempText);

	// Feels like
	let feelsLike = document.createTextNode(Math.round(feelslike_f));
	document.getElementById("feels-like").appendChild(feelsLike);

	// Current humidity
	let currentHumidity = document.createTextNode(humidity);
	document.getElementById("current-humidity").appendChild(currentHumidity);

	// Current windspeed
	let currentGust = document.createTextNode(gust_mph);
	document.getElementById("current-gust").appendChild(currentGust);

	// 2 day forecast
	const { forecastday } = data.forecast;
	for (let i = 1; i < forecastday.length; i++) {
		const { icon, text } = forecastday[i].day.condition;
		const { maxtemp_f, mintemp_f, daily_chance_of_rain } =
			forecastday[i].day;

		let gridElement = document.createElement("div");
		gridElement.classList.add("grid-item");

		// expectations
		let forecastFixDiv = document.createElement("div");
		forecastFixDiv.classList.add("text");

		// icon
		let iconElement = document.createElement("img");
		iconElement.src = "https:" + icon;
		iconElement.classList.add("icon");
		iconElement.alt = text;
		forecastFixDiv.appendChild(iconElement);

		// text
		let textElement = document.createElement("span");
		textElement.appendChild(document.createTextNode(text));
		textElement.classList.add("forecast-text");
		forecastFixDiv.appendChild(textElement);

		// expectations
		gridElement.appendChild(forecastFixDiv);

		// max temp
		let maxTempElement = document.createElement("span");
		let maxTempText = document.createTextNode(
			Math.round(maxtemp_f) + "° F - "
		);
		maxTempElement.appendChild(maxTempText);
		maxTempElement.classList.add("maxmin");
		// gridElement.appendChild(maxTempElement);

		// min temp
		// let minTempElement = document.createElement("span");
		let minTempText = document.createTextNode(
			Math.round(mintemp_f) + "° F"
		);
		maxTempElement.appendChild(minTempText);
		// minTempElement.classList.add("maxmin");
		gridElement.appendChild(maxTempElement);
		// gridElement.appendChild(document.createElement("br"));

		// Precepitation
		let precepitationElement = document.createElement("span");
		let precepitationText = document.createTextNode(
			"Precepitation: " + daily_chance_of_rain + "%"
		);
		precepitationElement.appendChild(precepitationText);
		precepitationElement.classList.add("percep");
		gridElement.appendChild(precepitationElement);
		gridElement.appendChild(document.createElement("br"));

		document.getElementById("grid").appendChild(gridElement);
	}
}

getAffirmation();
getDadJoke();
getWeather();
