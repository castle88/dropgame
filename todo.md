# Redesign game

- create new game loop

- create drop element
[x] create element
[x] add class name to element
[x] make drop object
	[x] playername
	[x] position x 
	[x] position y (above screen)
	[x] velocity x
	[x] velocity y
- update drop x and y position css
[x] element style left = position x
[x] element style top = position y
- if drop hits browser left/right edge reverse direction
[] get half width of drop element
[] check if position x + half width element <= 0 || >= window innerWidth
- if drop hits bottom, trigger boom animation


- create target element
- place target random x position at bottom of page
- if drop at bottom is inside target width remove distance from center of target from target health add player name to leaderboard with score
- if target health is 0 or below remove target from screen.
- finish drops to bottom of page
- boom remaining
