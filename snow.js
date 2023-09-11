// Parameters for scale and speed
const scale = 0.5; // Scale of the SVG elements
const speed = 0.5; // Speed multiplier for falling

// Create X number of SVG snowflakes
const X = 100; // Number of snowflakes
for (let i = 0; i < X; i++) {
	createSnowflake();
}

function createSnowflake() {
	// Randomly select one of your SVG files
	const svgIndex = Math.ceil(Math.random() * 12);
	const svgFileName = `Artboard_${svgIndex}.svg`;

	fetch(svgFileName)
		.then(response => response.text())
		.then(svgData => {
			const div = document.createElement("div");
			div.innerHTML = svgData;
			const snowflake = div.querySelector("svg");

			// Add class for CSS styling
			snowflake.classList.add("snowflake");

			// Position and scale the SVG snowflake
			snowflake.style.left = `${Math.random() * window.innerWidth}px`;
			snowflake.style.top = `${Math.random() * window.innerHeight}px`;
			snowflake.style.width = `${100 * scale}px`;
			snowflake.style.height = `${100 * scale}px`;

			// Add rotation
			snowflake.style.animation = `rotate ${3 + Math.random() * 7}s infinite linear`;

			// Add SVG snowflake to the DOM
			document.body.appendChild(snowflake);

			// Animate the snowflake
			animateSnowflake(snowflake);
		});
}

function animateSnowflake(snowflake) {
	let top = parseFloat(snowflake.style.top);
	let left = parseFloat(snowflake.style.left);
	const animation = setInterval(() => {
		// Update position for smooth movement
		top += (Math.random() - 0.5) * 1 * speed;
		left += (Math.random() - 0.5) * 2 * speed;

		// Set new position
		snowflake.style.top = `${top}px`;
		snowflake.style.left = `${left}px`;

		// Reset position when out of view
		if (top > window.innerHeight) {
			top = -100;
		}
		if (left > window.innerWidth || left < -100) {
			left = Math.random() * window.innerWidth;
		}
	}, 16);
}