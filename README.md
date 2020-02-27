# Tic Tac Toe
A simple Tic Tac Toe game, you can only play yourself. Page layout is divided to 3 parts.

## Main Game
### 1. Create Gaming Board
Two functions are used to generate gaming board:
`createGamingBoard()` is used to build the overall gaming board
`createCell()` is used to build cells inside gaming board.

### 2. Bind Clinking Function to Cells
`cellClicking(_this)` is the function bound to each cell generated in 1st step. There are also some functions built in this function to check who is winner and when the game is over
`playClickSound()`: when a cell is clicked, browser will play a clicking sound

## Control Panel
Controllers are wrapped in control panel, each controller is made of 2 input: 1 text input and 1 range input. There are 2 functions bound to each input.
`matchSliderValueWithInputText(_this)` so two input’s value can match each other.
`resetBoard()`: Every time change the value will resetBoard. 

