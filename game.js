const danger = document.querySelector(".danger-zone");
const scoreboard = document.querySelector(".score-board");
const dropQueue = [];

function createScore(drop, finalScore) {
  const score = document.createElement("p");
  score.innerText = `${drop.player} - ${finalScore}`;
  scoreboard.appendChild(score);
}

const createDropElement = () => {
  const element = document.createElement("div");
  element.className = "drop";
  return element;
};

class Drop {
  constructor(player) {
    this.player = player;
    this.element = createDropElement();
    this.location = { x: Math.random() * window.innerWidth, y: -100 };
    this.velocity = {
      x: Math.random() * (Math.random() > 0.5 ? -1 : 1) * 10,
      y: 2 + Math.random() * 3,
    };
    this.landed = false;
  }
  updatePosition = () => {
    if (this.landed) return;
    this.element.style.top = this.location.y + "px";
    this.element.style.left =
      this.location.x - this.element.clientWidth / 2 + "px";
  };
  addToPage = () => {
    document.body.appendChild(this.element);
    this.updatePosition();
  };
}

const createTargetElement = () => {
  const target = document.createElement("div");
  const spartan = document.createElement("div");
  const healthbar = document.createElement("div");
  const health = document.createElement("div");

  healthbar.className = "shield-container";
  health.className = "shield-bar";
  target.className = "danger-zone";
  spartan.className = "spartan";
  healthbar.appendChild(health);
  target.appendChild(healthbar);
  target.appendChild(spartan);
  return target;
};

class Target {
  constructor() {
    this.element = createTargetElement();
    this.health = 100;
  }
  addToPage = () => {
    document.body.appendChild(this.element);
    this.element.style.left =
      this.element.clientWidth / 2 +
      Math.random() * (window.innerWidth - this.element.clientWidth) +
      "px";
    this.element.style.bottom = "0px";
    this.element.firstChild.firstChild.style.width = this.health;
  };
  takeDamage = (score) => {
    this.health -= score;
    this.element.firstChild.firstChild.style.width = this.health + "%";
  };
  removeFromPage = () => {
    document.body.removeChild(this.element);
  };
}

const getDrop = (player) => {
  const plyr = new Drop(player);

  if (plyr.landed) console.log("landed", plyr);

  plyr.addToPage();
  dropQueue.push(plyr);
};

class Game {
  constructor() {
    this.target = new Target();
  }
  startGame = () => {
    this.target.addToPage();
    this.gameLoop();
  };
  gameLoop = () => {
    this.update();
    this.draw();
    requestAnimationFrame(this.gameLoop);
  };
  stopGame = () => {
    console.log("gameover");
    this.target.removeFromPage();
    setTimeout(() => location.reload(), 3000);
  };
  update = () => {
    dropQueue.forEach((drop) => {
      if (drop.landed) return;

      drop.location.x += drop.velocity.x;
      drop.location.y += drop.velocity.y;

      if (drop.location.x + drop.element.clientWidth / 2 >= window.innerWidth) {
        drop.velocity.x = -Math.abs(drop.velocity.x);
      } else if (drop.location.x - drop.element.clientWidth / 2 <= 0) {
        drop.velocity.x = Math.abs(drop.velocity.x);
      }

      if (drop.location.y + drop.element.clientHeight >= window.innerHeight) {
        drop.velocity.y = 0;
        drop.velocity.x = 0;
        drop.landed = true;
        setTimeout(() => drop.element.classList.add("boom"), 1000);
        setTimeout(() => drop.element.classList.add("landed"), 1500);

        const { x } = drop.location;

        const center = this.target.element.style.left.replace("px", "");
        const leftHit =
          center - this.target.element.clientWidth / 2 <
          x - drop.element.clientWidth / 2;
        const rightHit =
          +center + this.target.element.clientWidth / 2 >
          x - drop.element.clientWidth / 2;
        console.log("x", x);
        console.log(leftHit, rightHit);

        if (leftHit && rightHit) {
          console.log("target hit", drop);

          const score = Math.abs(center - (x + drop.element.clientWidth / 2));
          console.log("score", score);

          const finalScore = Math.abs(
            Math.floor(
              100 -
                Math.abs(
                  1 - (score / (this.target.element.clientWidth / 2)) * 100
                )
            )
          );
          console.log(finalScore);
          if (this.target.health - finalScore <= 0) {
            createScore(drop, finalScore);
            setTimeout(() => this.stopGame(), 1500);
          } else {
            createScore(drop, finalScore);
            this.target.takeDamage(finalScore);
            console.log("target health", this.target.health);
          }
        }
      }
    });
  };

  draw = () => {
    dropQueue.forEach((drop) => drop.updatePosition());
  };
}
const startNewGame = () => {
  const newGame = new Game();
  newGame.startGame();
};
