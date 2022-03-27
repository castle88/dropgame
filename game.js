const danger = document.querySelector('.danger-zone')
// const spartan = document.querySelector('.spartan')
// const scoreboard = document.querySelector('.score-board')
// const shielbar = document.querySelector('.shield-bar')
const dropQueue = []

const createDropElement = () => {
	const element = document.createElement('div')
	element.className = 'drop'
	return element
}

class Drop{
	constructor(player){
		this.player = player
		this.element = createDropElement()
		this.location = { x: Math.random() * window.innerWidth, y: -100 }
		this.velocity = { x: 4 + Math.random() * 5, y: 4 + Math.random() * 5 }
		this.landed = false
	}
	updatePosition = () => {
		if(this.landed) return
		this.element.style.top = this.location.y + 'px'
		this.element.style.left = this.location.x - (this.element.clientWdith) + 'px'
	}
	addToPage = () => {
		document.body.appendChild(this.element)
		this.updatePosition()
	}
}

const createTargetElement = () => {
	const target = document.createElement('div')
	const spartan = document.createElement('spartan')
	const healthbar = document.createElement('div')
	const health = document.createElement('div')
	
	healthbar.className = 'shield-container'
	health.className = 'shield-bar'
	target.className = 'danger-zone'
	spartan.className = 'spartan'
	healthbar.appendChild(health)
	target.appendChild(healthbar)
	target.appendChild(spartan)
	return target
}

class Target{
	constructor(){
		this.element = createTargetElement()
		this.health = 100
	}
	addToPage = () => {
		document.body.appendChild(this.element)
		this.element.style.left = (this.element.clientWidth / 2) + (Math.random() * (window.innerWidth - (this.element.clientWidth))) + 'px'
		this.element.style.bottom = '0px'
		this.element.firstChild.firstChild.style.width = this.health
	}
	takeDamage = (score) => {
		this.health -= score
		this.element.firstChild.firstChild.style.width = this.health + '%'
	}
}

const p1 = new Drop('player1')
const spartan = new Target()
console.log(spartan)
spartan.addToPage()
console.log('width' + window.innerWidth)
console.log('spartan' + spartan.element.clientWidth)
console.log(spartan.element.lastChild)
console.log(spartan.element.lastChild.clientHeight)
console.log(spartan.element.lastChild.clientWidth)