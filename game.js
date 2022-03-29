const danger = document.querySelector(".danger-zone");
const scoreboard = document.querySelector(".score-board");

const dropQueue = [];

const createScore = (drop, finalScore) => {
  const score = document.createElement("p");
  score.innerText = `${drop.player} - ${finalScore}`;

  scoreboard.appendChild(score);
};

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
      x: Math.random() * (Math.random() > 0.5 ? -1 : 1) * 8,
      y: 2 + Math.random() * 5,
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

// drop single grenade
const getDrop = (player) => {
  const plyr = new Drop(player);

  if (plyr.landed) console.log("landed", plyr);

  plyr.addToPage();
  dropQueue.push(plyr);
};

class Game {
  constructor() {
    this.target = new Target();
    this.scores = [];
  }
  startGame = () => {
    this.target.addToPage();
    this.gameLoop();
  };

  // loop function to repeat drop progress update
  gameLoop = () => {
    this.update();
    this.draw();
    requestAnimationFrame(this.gameLoop);
  };

  // force end of gameLoop ******* would like a more elegant way to solve this
  stopGame = () => {
    console.log("gameover");
    //     this.target.removeFromPage();
    setTimeout(() => location.reload(), 5000);
  };

  // main logic for game, update drop location determined by the drop velocity or stop if landed
  update = () => {
    dropQueue.forEach((drop) => {
      if (drop.landed) return;

      // change drop position to progress the drop
      drop.location.x += drop.velocity.x;
      drop.location.y += drop.velocity.y;

      // if drop element is at either edge of the window reverse direction
      if (drop.location.x + drop.element.clientWidth / 2 >= window.innerWidth) {
        drop.velocity.x = -Math.abs(drop.velocity.x);
      } else if (drop.location.x - drop.element.clientWidth / 2 <= 0) {
        drop.velocity.x = Math.abs(drop.velocity.x);
      }

      // if drop is at botton of window stop
      if (drop.location.y + drop.element.clientHeight >= window.innerHeight) {
        drop.velocity.y = 0;
        drop.velocity.x = 0;
        drop.landed = true;
        // add animation class
        setTimeout(() => drop.element.classList.add("boom"), 1000);
        setTimeout(() => drop.element.classList.add("landed"), 1500);

        const { x } = drop.location;

        // center of target element on window
        const center = this.target.element.style.left.replace("px", "");

        // left most edge of damage area
        const leftHit =
          center - this.target.element.clientWidth / 2 <
          x - drop.element.clientWidth / 2;

        // right most edge of damage area
        const rightHit =
          +center + this.target.element.clientWidth / 2 >
          x - drop.element.clientWidth / 2;

        console.log("x", x);
        console.log(leftHit, rightHit);

        if (leftHit && rightHit) {
          console.log("target hit", drop);

          // difference between center of traget and center of drop
          const score = Math.abs(center - (x + drop.element.clientWidth / 2));
          console.log("score", score);

          // probably redundant ****
          // dont really know why this calc is made
          const finalScore = Math.abs(
            Math.floor(
              100 -
                Math.abs(
                  1 - (score / (this.target.element.clientWidth / 2)) * 100
                )
            )
          );

          console.log(finalScore);

          // if drop is a slaying blow
          if (this.target.health - finalScore <= 0) {
            // add score to scoreboard
            createScore(drop, finalScore);
            this.target.removeFromPage();
            // end game reload page
            this.stopGame();
            // drop is a hit but not slaying
          } else {
            // add drop to scoreboard
            createScore(drop, finalScore);
            this.target.takeDamage(finalScore);

            console.log("target health", this.target.health);
          }
        }
      }
    });
  };

  // update all drop positions in element style to progress the falling path visually
  draw = () => {
    dropQueue.forEach((drop) => drop.updatePosition());
  };
} // Game class close

// create new game object
const startNewGame = () => {
  const newGame = new Game();
  newGame.startGame();
};
// startNewGame();
const playas = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"];
playas.forEach((p) => {
  getDrop(p);
});

const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: "bot-name",
    password: "oauth:my-bot-token",
  },
  channels: ["my-channel"],
});

client.connect().catch(console.error);

client.on("message", (channel, tags, message, self) => {
  // if (self) return;
  if (message.toLowerCase() === "!hello") {
    console.log(channel, `@${tags.username}, heya!`);
  }
});
