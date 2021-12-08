/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */
var particleSpeed=0.5;
particlesJS("particles", {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 7 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 1,
      random: false,
      anim: { enable: true, speed: 0.5, opacity_min: 0.25, sync: false }
    },
    size: {
      value: 4,
      random: true,
      anim: { enable: false, speed: 4, size_min: 4, sync: false }
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: particleSpeed,
      direction: "top",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 600 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false, mode: "repulse" },
      onclick: { enable: false, mode: "repulse" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: {
        distance: 249.99999999999997,
        size: 0,
        duration: 2,
        opacity: 0,
        speed: 3
      },
      repulse: { distance: 400, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});

particlesJS("clouds", {
  particles: {
    number: {
      value: 7,
      density: { enable: true, value_area: 500 }
    },
    color: { value: "#ffffff" },
    shape: {
      type: "image",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 3 },
      image: {
        src: "res/particle_assets/cloud.png",
        width: 300,
        height: 300
      }
    },
    opacity: {
      value: 1,
      random: false,
      anim: { enable: false, speed: 0.5, opacity_min: 0.25, sync: false }
    },
    size: {
      value: 300,
      random: false,
      anim: { enable: false, speed: 4, size_min: 4, sync: false }
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: particleSpeed,
      direction: "right",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 600 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false, mode: "repulse" },
      onclick: { enable: false, mode: "repulse" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: {
        distance: 249.99999999999997,
        size: 0,
        duration: 2,
        opacity: 0,
        speed: 3
      },
      repulse: { distance: 400, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});

particlesJS("stars",{
    "fpsLimit":30,
    "fullScreen": {
      "enable": false,
      "zIndex": 1
    },
    "interactivity": {
      "events": {
        "onClick": {
          "mode": "repulse"
        },
        "onHover": {
          "enable": false,
          "mode": "connect"
        }
      },
      "modes": {
        "connect": {
          "distance": 70,
          "links": {
            "opacity": 0.2
          }
        }
      }
    },
    "particles": {
      "color": {
        "value": "#7BF1FF"
      },
      "links": {
        "color": {
          "value": "#ffffff"
        },
        "distance":120,
        "enable": true,
        "frequency": 0.1,
        "opacity": 0.7
      },
      "number": {
        "density": {
          "enable": true
        },
        "value": 100
      },
      "opacity": {
        "animation": {
          "enable": true,
          "speed": 1.5
        }
      },
      "shadow": {
        "blur": 15,
        "color": {
          "value": "#FFFFFF"
        },
        "enable": true
      },
      "size": {
        "random": {
          "enable": true
        },
        "animation": {
          "minimumValue": 0.3,
          "speed": 4
        }
      }
    }
});

particlesJS("starsW",{
  "fpsLimit":30,
  "fullScreen": {
    "enable": false,
    "zIndex": 1
  },
  "interactivity": {
    "events": {
      "onClick": {
        "mode": "repulse"
      },
      "onHover": {
        "enable": false,
        "mode": "connect"
      }
    },
    "modes": {
      "connect": {
        "distance": 70,
        "links": {
          "opacity": 0.2
        }
      }
    }
  },
  "particles": {
    "color": {
      "value": "#7BF1FF"
    },
    "links": {
      "color": {
        "value": "#ffffff"
      },
      "distance":120,
      "enable": true,
      "frequency": 0.1,
      "opacity": 0.7
    },
    "number": {
      "density": {
        "enable": true
      },
      "value": 100
    },
    "opacity": {
      "animation": {
        "enable": true,
        "speed": 1.5
      }
    },
    "shadow": {
      "blur": 15,
      "color": {
        "value": "#FFFFFF"
      },
      "enable": true
    },
    "size": {
      "random": {
        "enable": true
      },
      "animation": {
        "minimumValue": 0.3,
        "speed": 4
      }
    }
  }
});