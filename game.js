const danger = document.querySelector(".danger-zone");
// const spartan = document.querySelector('.spartan')
// const scoreboard = document.querySelector('.score-board')
// const shielbar = document.querySelector('.shield-bar')
const dropQueue = [];

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
      x: Math.random() > 0.5 ? Math.random() * 5 : Math.random() * -5,
      y: Math.random() * 10,
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

// update = (target) =>{
// 	dropQueue.forEach(drop => {
// 		if(drop.landed) return

// 		// console.log('location', drop.location)

// 		drop.location.x += drop.velocity.x
// 		drop.location.y += drop.velocity.y

// 		if(drop.location.x + (drop.element.clientWidth / 2) >= window.innerWidth){
// 			drop.velocity.x = -Math.abs(drop.velocity.x)
// 		}else if(drop.location.x - (drop.element.clientWidth / 2) <= 0){
// 			drop.velocity.x = Math.abs(drop.velocity.x)
// 		}

// 		if(drop.location.y + drop.element.clientHeight >= window.innerHeight){
// 			drop.velocity.y = 0
// 			drop.velocity.x = 0
// 			drop.landed = true
// 			setTimeout(() => drop.element.classList.add('boom'), 1000)
// 			setTimeout(() => drop.element.classList.add('landed'), 1500)

// 			const { x } = drop.location

// 			const score = Math.abs(window.innerWidth / 2 - x)
// 			if(score <= target.element.clientWidth / 2){
// 				console.log('target hit', drop)
// 				const finalScore = Math.floor(100 - (Math.abs(1 - (score / target.element.clientWidth / 2) * 100)))
// 				target.takeDamage(finalScore)
// 				console.log('target health', target.health)
// 			}
// 		}
// 	})
// }

// draw = () => {
// 	dropQueue.forEach(drop => drop.updatePosition())
// }

// const gameLoop = () => {}

// const newGame = () => {
// 	const target = new Target
// 	target.addToPage()
// 	gameLoop()
// 	console.log()
// 	if(target.health <= 0){
// 		target.removeFromPage()
// 		window.cancelAnimationFrame(gameLoop)
// 	}
// }

const getDrop = (player) => {
  const plyr = new Drop(player);

  if (plyr.landed) console.log("landed", plyr);

  plyr.addToPage();
  dropQueue.push(plyr);
};

// const p1 = new Drop('player1')
// const spartan = new Target()
// console.log(spartan)
// spartan.addToPage()
// console.log('width' + window.innerWidth)
// console.log('spartan' + spartan.element.clientWidth)
// console.log(spartan.element.lastChild)
// console.log(spartan.element.lastChild.clientHeight)
// console.log(spartan.element.lastChild.clientWidth)
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

    if (this.target.health <= 0) {
      this.stopGame();
    }
  };
  stopGame = () => {
    console.log("gameover");
    this.target.removeFromPage();
    cancelAnimationFrame(this.gameLoop);
  };
  update = () => {
    dropQueue.forEach((drop) => {
      if (drop.landed) return;

      // console.log('location', drop.location)

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
        // setTimeout(() => drop.element.classList.add("landed"), 1500);

        const { x } = drop.location;

        // const score = Math.abs(window.innerWidth / 2 - x);
        const targetLeft =
          +this.target.element.style.left.replace("px", "") -
          this.target.element.clientWidth / 2;
        const hitLeft = targetLeft < x - drop.element.clientWidth / 2;
        const hitRight =
          targetLeft + this.target.element.clientWidth >
          x - drop.element.clientWidth / 2;
        console.log("width", this.target.element.clientWidth);
        console.log("left hit", hitLeft);
        console.log("right hit", hitRight);
        console.log("x", x);

        console.log(+this.target.element.style.left.replace("px", ""));

        console.log(
          +this.target.element.style.left.replace("px", "") +
            this.target.element.clientWidth
        );
        if (hitLeft && hitRight) {
          console.log("target hit", drop);
          const score = Math.abs(
            this.target.element.clientWidth / 2 +
              targetLeft -
              (x + drop.element.clientWidth / 2)
          );
          console.log("score", score);
          //   const finalScore = Math.floor(
          //     100 -
          //       Math.abs(
          //         // 1 - (score / (this.target.element.clientWidth / 2)) * 100
          //       )
          //   );
          //   console.log(finalScore);
          //   this.target.takeDamage(finalScore);
          //   console.log("target health", this.target.health);
        }
      }
    });
  };

  draw = () => {
    dropQueue.forEach((drop) => drop.updatePosition());
  };
}

const newGame = new Game();
