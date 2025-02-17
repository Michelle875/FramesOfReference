import React, { useEffect, useRef } from "react";

const ParticlesBackground = () => {
  // Create a ref for the section you want to scroll to
  const contentRef = useRef(null);

  useEffect(() => {
    const cnvas = document.getElementById("canvas1");
    const ctx = cnvas.getContext("2d");

    // Set canvas size dynamically
    const resizeCanvas = () => {
      cnvas.width = window.innerWidth;
      cnvas.height = window.innerHeight;
    };

    resizeCanvas(); // Initial resize

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
      radius: (cnvas.height / 100) * (cnvas.width / 100),
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
        ctx.fillStyle = "#8C5523";
        ctx.fill();
      }

      update() {
        if (this.x > cnvas.width || this.x < 0 || mouse.x < this.x) {
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

    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance =
            (particlesArray[a].x - particlesArray[b].x) *
              (particlesArray[a].x - particlesArray[b].x) +
            (particlesArray[a].y - particlesArray[b].y) *
              (particlesArray[a].y - particlesArray[b].y);
          if (distance < (cnvas.width / 7) * (cnvas.height / 7)) {
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

    function init() {
      particlesArray = [];
      let numberOfParticles = (cnvas.height * cnvas.width) / 20000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 5 + 1;
        let x =
          Math.random() * (window.innerWidth - size * 2 - (size * 2)) + size * 2;
        let y =
          Math.random() * (window.innerHeight - size * 2 - (size * 2)) +
          size * 2;
        let directionX = (Math.random() - 0.5) * 2;
        let directionY = (Math.random() - 0.5) * 2;
        let color = "#8C5523";

        particlesArray.push(
          new Particle(x, y, directionX, directionY, size, color)
        );
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, cnvas.width, cnvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    }

    window.addEventListener("resize", function () {
      resizeCanvas();
      mouse.radius = (cnvas.height / 80) * (cnvas.width / 80);
      init();
    });

    window.addEventListener("mouseout", function () {
      mouse.x = undefined;
      mouse.y = undefined;
    });

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", () => {});
      window.removeEventListener("resize", () => {});
      window.removeEventListener("mouseout", () => {});
    };
  }, []);

  // Function to scroll to the content section
  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <canvas
        id="canvas1"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      ></canvas>
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1
          style={{
            textAlign: "center",
            paddingTop: "50px",
            color: "white",
            fontSize: "100px",
            fontFamily: "cursive",
            animation: "fadeIn 2s ease-out",

          }}
        >
          Welcome to Frames of Reference
        </h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "20px",
            color: "white",
            marginTop: "20px",
            animation: "fadeIn 2s ease-out 1s",
          }}
        >
          A platform for exploring the intersections of art and technology.
        </p>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <button
            onClick={scrollToContent}
            style={{
              padding: "15px 30px",
              fontSize: "18px",
              backgroundColor: "#8C5523",
              color: "white",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Explore
          </button>
        </div>
      </div>
    </>
  );
};

export default ParticlesBackground;
