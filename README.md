# dropgame
dropgame clone

# inspiration
inspired by the drop game on twitch i dont know who made it or what its really called but if 
youve seen it you know what im talking about.

A streamer I watch has a channel point redemption of 'Nade friendly' I was dissatisfied with this redemption, 
so I adapted Coding-Garden - CJ's drop game clone logic to fit my idea of a cool channel point redemption.

# how to test
right now it is in a janky but working state.

to start a game type in your browsers console *** startNewGame() ***

to drop a single grenade in your browsers console type *** getDrop('any string') ***
  - example getDrop('whoa dude')
  
to drop a bunch of grenades 
  in your browsers console type *** ['a','b','c','d','e','f','g','h'].forEach(player => getDrop(player)) ***
