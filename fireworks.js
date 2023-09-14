const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

const gravity = 0.05; // Gravity force applied to particles
const speedMultiplier = 1.5; // Gravity force applied to particles
const lifeMultiplier = 2; // Gravity force applied to particles
const particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticles(x, y) {
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 10 * speedMultiplier,
      vy: (Math.random() - 0.5) * 10 * speedMultiplier,
      size: Math.random() * 10 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      life: 1 * lifeMultiplier // New life based on multiplier
    });
  }
}

function updateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += gravity; // Apply gravity
    p.life -= 0.01; // Reduce life

    if (p.life <= 0) {
      // Remove particle if life is over
      particles.splice(index, 1);
    } else {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life; // Apply fading effect
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  requestAnimationFrame(updateParticles);
}

function spawnBursts() {
  // Three bursts like fireworks
  setTimeout(() => createParticles(canvas.width / 4, canvas.height / 4), 0);
  setTimeout(() => createParticles(canvas.width / 2, canvas.height / 2), 500);
  setTimeout(() => createParticles(3 * canvas.width / 4, canvas.height / 4), 1000);
}

//document.getElementById("confetti-button").addEventListener("click", spawnBursts);
updateParticles();