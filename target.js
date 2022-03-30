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
