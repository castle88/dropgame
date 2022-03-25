const target = document.querySelector('.danger-zone')
const scoreboard = document.querySelector('.score-board')
const drops = []

function createDropElement() {
	const div = document.createElement('div')
	div.className = 'drop'
	return div
}
function createScore(drop, finalScore){
	const score = document.createElement('p')
	score.innerText = `${drop.id} - ${finalScore}`
	scoreboard.appendChild(score)
}
function doDrop(){
	const element = createDropElement()
	const drop = {
		id: Date.now() + Math.random(),
		element,
		location: {
			// random x axis start point
			x: window.innerWidth * Math.random(),
			// y axis start off screen
			y: -100,
		},
		velocity: {
			x: Math.random() * (Math.random() > 0.5 ? - 1 : 1) * 10,
			y: 5 + Math.random() * 5
		}
	}
	drops.push(drop)
	document.body.appendChild(element)
	updateDropPosition(drop)
}

function updateDropPosition(drop){
	if(drop.landed) return
	drop.element.style.top = drop.location.y + 'px'
	drop.element.style.left = (drop.location.x - (drop.element.clientWidth / 2)) + 'px'
}

// update the coordinates of a drop to progress it
function update(){
	const targetHalfWidth = target.clientWidth / 2
	drops.forEach(drop => {
		if(drop.landed) return
		drop.location.x += drop.velocity.x;
		drop.location.y += drop.velocity.y;
		const elementWidth = drop.element.clientWidth / 2;

		if(drop.location.x + elementWidth >= window.innerWidth){
			drop.velocity.x = -Math.abs(drop.velocity.x);
		}else if(drop.location.x - elementWidth < 0){
			drop.velocity.x = Math.abs(drop.velocity.x)
		}

		if(drop.location.y + drop.element.clientHeight >= window.innerHeight){
			drop.velocity.y = 0;
			drop.velocity.x = 0;
			drop.location.y = drop.element.clientHeight - drop.location.y
			drop.landed = true
			setTimeout(() => drop.element.classList.add('boom'), 1000)
			setTimeout(() => drop.element.classList.add('landed'), 1500)
			const { x } = drop.location;
			// const score = (1-Math.abs(window.innerWidth/2-x)/window.innerWidth/2)*100

			const score = Math.abs(window.innerWidth / 2 - x)
			if(score <= targetHalfWidth){
				console.log('target hit', drop)
				const finalScore = Math.floor(100 - (Math.abs(1 - (score / targetHalfWidth) * 100)))
				scoreboard.style.display = 'initial'
				createScore(drop, finalScore)
			}
		}
	})
}

function draw(){
	drops.forEach(updateDropPosition)
}

const testPlayers = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7']
testPlayers.forEach(doDrop)

function gameLoop(){
	update()
	draw()
	requestAnimationFrame(gameLoop)
}

gameLoop()