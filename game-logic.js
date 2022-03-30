const createScore = (drop, finalScore) => {
  const score = document.createElement("p");
  score.innerText = `${drop.player} - ${finalScore}`;

  scoreboard.appendChild(score);
};

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

// drop single grenade
const getDrop = (player) => {
  const plyr = new Drop(player);

  if (plyr.landed) console.log("landed", plyr);

  plyr.addToPage();
  dropQueue.push(plyr);
};

// create new game object
const startNewGame = () => {
  // const newGame = new Game();
  // newGame.startGame();
  new Game().startGame();
};

// const playas = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"];
// playas.forEach((p) => {
//   getDrop(p);
// });

const client = new tmi.Client({
  channels: ["whoa_dood"],
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  if (message === "!start") {
    console.log("self", self);
    console.log("channel", channel);
    console.log("tags", tags);
    startNewGame();
  }

  if (message === "!nade") {
    getDrop(tags.username);
  }
});
