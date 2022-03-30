const danger = document.querySelector(".danger-zone");
const scoreboard = document.querySelector(".score-board");
const dropQueue = [];
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

        // console.log("x", x);
        // console.log(leftHit, rightHit);

        if (leftHit && rightHit) {
          console.log("target hit", drop);

          // difference between center of traget and center of drop
          const score = Math.abs(center - (x + drop.element.clientWidth / 2));
          // console.log("score", score);

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

          // console.log(finalScore);

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

            // console.log("target health", this.target.health);
          }
        }
      }
    });
  };

  // update all drop positions in element style to progress the falling path visually
  draw = () => {
    dropQueue.forEach((drop) => drop.updatePosition());
  };
} // Game class closing bracket
