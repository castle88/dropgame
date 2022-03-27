# Redesign game

- create new game loop

- create drop element
[] create element
[] add class name to element
[] make drop object
	[] playername
	[] position x 
	[] position y (above screen)
	[] velocity x
	[] velocity y
- update drop x and y position css
[] element style left = position x
[] element style top = position y
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
