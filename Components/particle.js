const cnvas = document.getElementById("canvas1");
const ctx = cnvas.getContext("2d");
cnvas.width = window.innerWidth;
cnvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;
ctx.fillStyle = "white";
ctx.strokeStyle = "white";
ctx.lineWidth = 0.2;
ctx.shadowColor = "white";
ctx.shadowBlur = 10;

let mouse = {
  x: null,
  y: null,
  radius: (cnvas.height / 80) * (cnvas.width / 80),
};

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});


class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = '#8C5523';
    ctx.fill();
  }

  update() {
    if (this.x > cnvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > cnvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < cnvas.width - this.size * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < cnvas.height - this.size * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function init() {
  particlesArray = [];
  let numberOfParticles = (cnvas.height * cnvas.width) / 30000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size*2;
    let y = Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size*2;
    let directionX = (Math.random() - 0.5) * 2;
    let directionY = (Math.random() - 0.5) * 2;
    let color = "#8C5523";

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let distance =
          (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) +
          (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y);
        if (distance < (cnvas.width/7) * (cnvas.height/7)) {  
          opacityValue = 1 - distance / 20000;
          ctx.strokeStyle = "rgba(140, 85, 35, " + opacityValue + ")";
          ctx.lineWidth = 1;

          ctx.beginPath(); 
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }



let gradientOffset = 10;

function updateBackground() {
    let imageData = ctx.createImageData(cnvas.width, cnvas.height);
    let pixels = imageData.data;
    
    for (let y = 0; y < cnvas.height; y++) {
        for (let x = 0; x < cnvas.width; x++) {
            let index = (y * cnvas.width + x) * 4;
            let color = Math.sin((x + gradientOffset) * 0.006) * 27 + 128;

            pixels[index] = color/2;     // Red
            pixels[index + 1] = color; // Green
            pixels[index + 2] = 255;   // Blue
            pixels[index + 3] = 255;   // Alpha
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
    gradientOffset += 1;  // Adjust speed of wave motion
}


  


function animate() {
    requestAnimationFrame(animate);
    updateBackground();
    ctx.globalCompositeOperation = "lighter";

  
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connect();
    ctx.globalCompositeOperation = "source-over";  // Restore normal drawing mode
    
}

window.addEventListener('resize', function() {
    cnvas.width = window.innerWidth;
    cnvas.height = window.innerHeight;
    mouse.radius = (cnvas.height / 80) * (cnvas.width / 80);
    init();
}
)
window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
}
)



init();
animate();

export default Particle;

