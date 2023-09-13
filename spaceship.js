
// Spaceship class
class Spaceship {
    constructor() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight - 50;
        this.div = document.createElement('div');
        this.div.classList.add('spaceship');
        this.div.style.left = `${this.x}px`;
        this.div.style.top = `${this.y}px`;
		this.div.style.background = `url(spaceShip.svg)`;
        document.body.appendChild(this.div);
    }

    update(x) {
        this.x = x;
        this.div.style.left = `${this.x}px`;
    }
}

// Initialize spaceship
const spaceship = new Spaceship();

// Hit threshold distance
const hitThreshold = 15;
let score = new Array (0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

// Laser class
class Laser {
    constructor(x, y) {
        this.x = x + 23;
        this.y = y;
        this.speed = 15;
        this.div = document.createElement('div');
        this.div.classList.add('laser');
        this.div.style.left = `${this.x}px`;
        this.div.style.top = `${this.y}px`;
        document.body.appendChild(this.div);
    }

    update() {
        this.y -= this.speed;
        this.div.style.top = `${this.y}px`;

        // Collision detection with snowflakes
		for (let i = 0; i < snowflakes.length; i++) {
			let snowflake = snowflakes[i];
			let snowflakeRect = snowflake.svgElement.getBoundingClientRect();
			let thisRect = this.div.getBoundingClientRect();

			if (thisRect.left < snowflakeRect.right &&
				thisRect.right > snowflakeRect.left &&
				thisRect.top < snowflakeRect.bottom &&
				thisRect.bottom > snowflakeRect.top) {

				// Remove snowflake and laser
				snowflake.remove();
				snowflakes.splice(i, 1);
				snowflakes.push(new Snowflake());
				this.div.remove();

				// Update score
				let string = snowflake.svgElement.src;
				let justNumbers = string.replace(/[^0-9]/g, "");
				let index = parseInt(justNumbers)-1;
				score[index]++;
				updateScore();
				
				return true;
			}
		}
		for (let i = 0; i < snowflakes.length; i++) {
			let snowflake = snowflakes[i];
			let snowflakeRect = snowflake.svgElement.getBoundingClientRect();
			let thisRect = this.div.getBoundingClientRect();

			if (thisRect.left < snowflakeRect.right &&
				thisRect.right > snowflakeRect.left &&
				thisRect.top < snowflakeRect.bottom &&
				thisRect.bottom > snowflakeRect.top) {

				// Remove snowflake and laser
				snowflake.remove();
				snowflakes.splice(i, 1);
				snowflakes.push(new Snowflake());
				this.div.remove();

				// Update score
				score++;
				updateScore();
				
				return true;
			}
		}


        if (this.y < -10) {
            this.div.remove();
            return true;
        }

        return false;
    }
}

function updateScore() {
  for (let i = 0; i <= 11; i++) {
    document.getElementById(`score${i}`).innerText = `${score[i]}`;
  }
}


// Initialize lasers array
const lasers = [];

// Update lasers
function updateLasers() {
    for (let i = lasers.length - 1; i >= 0; i--) {
        if (lasers[i].update()) {
            lasers.splice(i, 1);
        }
    }
}

function updateScene() {
    updateLasers();
    requestAnimationFrame(updateScene);
}

document.addEventListener('mousemove', function(event) {
    spaceship.update(event.clientX);
});

document.addEventListener('click', function() {
    lasers.push(new Laser(spaceship.x, spaceship.y));
});

const svgArray = [
  'Artboard_1.svg',
  'Artboard_2.svg',
  'Artboard_3.svg',
  'Artboard_4.svg',
  'Artboard_5.svg',
  'Artboard_6.svg',
  'Artboard_7.svg',
  'Artboard_8.svg',
  'Artboard_9.svg',
  'Artboard_10.svg',
  'Artboard_11.svg',
  'Artboard_12.svg'
];

function displaySVGs() {
  const svgContainer = document.getElementById('svg-container');
  
  for (let i = 0; i < svgArray.length; i++) {
    // Create a wrapper div for each SVG
    const svgWrapper = document.createElement('div');
    svgWrapper.className = 'svg-wrapper';
    
    // Add the SVG
    const svgElement = document.createElement('div');
    svgElement.className = 'svg-content';

    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', svgArray[i]);
    svgElement.appendChild(imgElement);
    svgWrapper.appendChild(svgElement);
    
    // Add the integer overlay
    const integerOverlay = document.createElement('div');
    integerOverlay.className = 'integer-overlay';
    integerOverlay.id = `score${i}`;  // Unique id for each overlay
    integerOverlay.innerText = i + 1; // Put the integer (starting from 1)
    svgWrapper.appendChild(integerOverlay);
    
    // Append to the container
    svgContainer.appendChild(svgWrapper);
  }
}

// Call the function to populate the SVGs
displaySVGs();


// Start the loop
updateScene();
