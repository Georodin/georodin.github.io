		// Parameters for scale and speed
		const scale = 2;
		const speed = 0.5;

		// Create X number of SVG snowflakes
		const X = 40;
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

					const rotationSpeed = 3 + Math.random() * 7;
					const rotationDirection = Math.random() < 0.5 ? '' : '-';

					// Save attributes into snowflake object
					snowflake.dataset.rotationSpeed = rotationSpeed;
					snowflake.dataset.rotationDirection = rotationDirection;

					// Add class for CSS styling
					snowflake.classList.add("snowflake");

					// Position and scale the SVG snowflake
					snowflake.style.left = `${Math.random() * window.innerWidth}px`;
					snowflake.style.top = `${Math.random() * window.innerHeight}px`;
					snowflake.style.width = `${100 * scale}px`;
					snowflake.style.height = `${100 * scale}px`;

					// Add rotation
					snowflake.style.animation = `rotate ${rotationSpeed}s infinite linear`;

					// Add the initial rotation and rotation direction
					snowflake.style.transform = `rotate(${Math.random() * 360}deg)`;

					// Add SVG snowflake to the DOM
					document.body.appendChild(snowflake);

					// Animate the snowflake
					animateSnowflake(snowflake);
				});
		}

		function animateSnowflake(snowflake) {
			let top = parseFloat(snowflake.style.top);
			let left = parseFloat(snowflake.style.left);
			const rotationSpeed = parseFloat(snowflake.dataset.rotationSpeed);
			const rotationDirection = snowflake.dataset.rotationDirection;
			const animation = setInterval(() => {
				// Update position for smooth movement
				top += (Math.random() - 0.5) * 1 * speed;
				left += (Math.random() - 0.5) * 2 * speed;

				// Set new position
				snowflake.style.top = `${top}px`;
				snowflake.style.left = `${left}px`;

				// Update the rotation
				snowflake.style.animation = `rotate ${rotationDirection}${rotationSpeed}s infinite linear`;

				// Reset position when out of view
				if (top > window.innerHeight) {
					top = -100;
				}
				if (left > window.innerWidth || left < -100) {
					left = Math.random() * window.innerWidth;
				}
			}, Math.random() * 400);
		}