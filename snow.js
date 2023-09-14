// Number of snowflakes
		const numSnowflakes = 40;
		const scale = 1;
		const deleteThreshhold = 120;
		const rotationSpeed = 3;
		const now = new Date();

		// Snowflake class to handle individual snowflake properties
		class Snowflake {
			constructor() {
				this.init();
			}

			init() {
				this.x = Math.random() * (window.innerWidth + 100) - 50;  // +/- 50px
				this.y = -deleteThreshhold+5;  // Start off-screen, above the viewport
				this.size = Math.random() * 10 + 5;
				this.scale = Math.random() * 0.5 + 0.5; // New scale parameter
				this.speed = Math.random() * 1 + 0.5;
				this.angle = Math.random() * Math.PI * 2;
				this.rotationSpeed = Math.random() * 1 - 0.5; // New rotation parameter
				this.rotation = Math.random() * 360;

				const randomSVG = Math.floor(Math.random() * 12) + 1; // 1 to 12
				this.svgElement = document.createElement('img');
				const dayOfWeek = now.getDay();
				if (dayOfWeek === 4) {
					this.svgElement.src = `Doener.svg`;
				}else{
					this.svgElement.src = `Artboard_${randomSVG}.svg`;
				}
				 // Assuming the SVG files are in the same directory
				this.svgElement.classList.add('snowflake');
				this.svgElement.style.width = `${100 * scale}px`;
				this.svgElement.style.height = `${100 * scale}px`;
				this.svgElement.style.left = `${this.x}px`;
				this.svgElement.style.top = `${this.y}px`;

				document.body.appendChild(this.svgElement);
			}

			update() {
				this.y += Math.sin(this.angle) * this.speed;
				this.x += Math.cos(this.angle) * this.speed;
				this.angle += Math.random() * 0.05 - 0.025;
				
				// Update rotation
				this.rotation += this.rotationSpeed * rotationSpeed;
				this.svgElement.style.transform = `rotate(${this.rotation}deg) scale(${this.scale})`;

				if (this.y > window.innerHeight + deleteThreshhold || this.y < -deleteThreshhold || this.x < -deleteThreshhold || this.x > window.innerWidth + deleteThreshhold) {
					this.remove();
					this.init();
				}

				this.svgElement.style.top = `${this.y}px`;
				this.svgElement.style.left = `${this.x}px`;
			}

			remove() {
				this.svgElement.remove();
			}
		}

		// Initialize snowflakes
		let snowflakes = [];
		for (let i = 0; i < numSnowflakes; i++) {
			snowflakes.push(new Snowflake());
		}

		// Update snowflakes
		function updateSnowflakes() {
			for (let snowflake of snowflakes) {
				snowflake.update();
			}
			requestAnimationFrame(updateSnowflakes);
		}

		updateSnowflakes();
