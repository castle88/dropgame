const target = document.querySelector('.danger-zone')
const spartan = document.querySelector('.spartan')
const scoreboard = document.querySelector('.score-board')
const shieldbar = document.querySelector('.shield-bar')
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
function doDrop(player){
	const element = createDropElement()
	const drop = {
		id: player,
		element,
		location: {
			// random x axis start point
			x: window.innerWidth * Math.random(),
			// y axis start off screen
			y: -100,
		},
		velocity: {
			x: Math.random() * (Math.random() > 0.5 ? - 1 : 1) * 10,
			y: 3 + Math.random() * 3
		}
	}
	drops.push(drop)
	document.body.appendChild(element)
	updateDropPosition(drop)
}

// set drop coordinates to css properties
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

			// distance from center
			const score = Math.abs(window.innerWidth / 2 - x)
			if(score <= targetHalfWidth){
				console.log('target hit', drop)
				// within scoring zone reduce shielbar width by 'finalScore' % and add to scoreboard
				const finalScore = Math.floor(100 - (Math.abs(1 - (score / targetHalfWidth) * 100)))
				scoreboard.style.display = 'initial'
				shieldbar.style.width = 100 - finalScore + '%'
				createScore(drop, finalScore)
			}
		}
	})
}


// modify css for each drop element on screen
function draw(){
	drops.forEach(updateDropPosition)
}

// create test drops
const testPlayers = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7']
testPlayers.forEach(player => doDrop(player))

// update as soon as possible 
function gameLoop(){
	update()
	draw()
	// continue updating
	requestAnimationFrame(gameLoop)
}

gameLoop()