class Drop {
  constructor(player) {
    this.player = player;
    this.element = this.createDropElement();
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

  createDropElement = () => {
    const element = document.createElement("div");
    element.className = "drop";

    return element;
  };
}
