export const Fire = {
  methods: {
    fire() {
      var canvas;
      var stage;
      var width = 510;
      var height = 710;
      var particles = [];
      var max = 60;
      var mouseX = 0;
      var mouseY = 0;

      var speed = 3;
      var size = 20;

      //The class we will use to store particles. It includes x and y
      //coordinates, horizontal and vertical speed, and how long it's
      //been "alive" for.
      function Particle(x, y, xs, ys) {
        this.x = x;
        this.y = y;
        this.xs = xs;
        this.ys = ys;
        this.life = 0;
      }

      function resizeCanvas() {
        setTimeout(function () {
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = 510;
          canvas.height = 710;
          canvas.style.width = 510 + "px";
          canvas.style.height = 710 + "px";
          mouseX = canvas.width / 2;
          mouseY = canvas.height * 0.8;
          stage.globalCompositeOperation = "lighter";
        }, 0);
      }

      function init() {
        //Reference to the HTML element
        canvas = document.getElementById("fire");

        resizeCanvas();

        //See if the browser supports canvas
        if (canvas.getContext) {
          //Get the canvas context to draw onto
          stage = canvas.getContext("2d");

          //Makes the colors add onto each other, producing
          //that nice white in the middle of the fire
          stage.globalCompositeOperation = "xor";

          window.addEventListener("resize", function () {
            resizeCanvas();
            stage.globalCompositeOperation = "lighter";
            mouseX = canvas.width / 2;
            mouseY = canvas.height * 0.8;
          });

          //Update the particles every frame
          setInterval(update, 40);
        } else {
          alert("Canvas not supported.");
        }
      }

      function update() {
        //Adds ten new particles every frame
        for (var i = 0; i < 10; i++) {
          //Adds a particle at the mouse position, with random horizontal and vertical speeds
          var p = new Particle(
            mouseX,
            mouseY,
            (Math.random() * 2 * speed - speed) / 2,
            0 - Math.random() * 2 * speed
          );
          particles.push(p);
        }

        //Clear the stage so we can draw the new frame
        stage.clearRect(0, 0, width, height);

        //Cycle through all the particles to draw them
        for (i = 0; i < particles.length; i++) {
          //Set the file colour to an RGBA value where it starts off red-orange, but progressively gets more grey and transparent the longer the particle has been alive for
          stage.fillStyle =
            "rgba(" +
            (260 - particles[i].life * 2) +
            "," +
            (particles[i].life * 2 + 50) +
            "," +
            particles[i].life * 2 +
            "," +
            ((max - particles[i].life) / max) * 0.4 +
            ")";

          stage.beginPath();
          //Draw the particle as a circle, which gets slightly smaller the longer it's been alive for
          stage.arc(
            particles[i].x,
            particles[i].y,
            ((max - particles[i].life) / max) * (size / 2) + size / 2,
            0,
            2 * Math.PI
          );
          stage.fill();

          //Move the particle based on its horizontal and vertical speeds
          particles[i].x += particles[i].xs;
          particles[i].y += particles[i].ys;

          particles[i].life++;
          //If the particle has lived longer than we are allowing, remove it from the array.
          if (particles[i].life >= max) {
            particles.splice(i, 1);
            i--;
          }
        }
      }

      init();
    },
  },
};
