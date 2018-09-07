# franguinho

# Project's name
Franguinho


## Description
The player control a chicken who can be made to run across a lane highway filled with traffic, with cars travelling at different speeds, in an effort to 'get to the other side'. 
- START: 
The game starts with five lives and a countdown that starts with sixty seconds.
Every time the chicken gets across some points are earned. 
If hit by a car, a live is lost and the chicken is pushed back to the bottom of the screen.
- GAME OVER: 
When the countdown finish or there are no longer lifes, the game is over.
- CONTROL: 
The chicken is allowed to move up, down, left and right. 


## MVP (DOM - CANVAS)
- 4 screens: Start, Game, Game Over, Win;
- Start screen: Title and a START button;
- Game screen: canvas. At the center: some grey rows representing highway lanes. At the bottom: a row representing a sidewalk where the chicken appears when the game starts. At the top: Lives, score and timer counter.
- Game over screen: Game over message and a RESTART button;
- Win screen: Win message and a RESTART button;


## Backlog
- Add images;
- Multiple lanes;
- Cars travelling in opposition directions;
- Add music and sound effects;
- Add moves effects (cars smoke and chicken feathers);
- Increasing chicken and cars speeds when 10 seconds remain;
- Increase level;


## Data structure
Classes and methods definition.

- MAIN.JS

  - buildDOM() - creates HTML content;
  - main() - load page content
  - buildSplash() - creates splash screen;
  - destroySplash() - removes splash screen;
  - startGame() - starts a new game, removing splash or game over screen;
     
  - new Game() - creates a new game based on the Game constructor;
  - gameOnOver() - ;
  - destroyGame() - removes splash or game over screen;  

  - gameOver() - finishes the game;
  - buildGameOver() - creates a win screen with total score and RESTART button;
  - destroyGameOver(); - removes game over screen;

  - buildWin() - creates a win screen with total score and RESTART button;

- GAME.JS

  - Game constructor - properties: gameIsOver = false;
  - start() - build the DOM (Game Main), creating all the elements on the page - Score, lives, etc;
  - startTimer() - start the countdown (60 secs);
  - new Chicken - creates a chicken based on the chicken constructor;
  - handleKeys() - set the chicken direction up, down, left and right;
  - startLoop()- called by startGame(), creates a cars array, updates the position of the chicken and the car;
  - ifCollided() - checks if the chicken and the car collided, if yes, 1 live is lost;
  - triggerTimeOut() - if the countdown finishes, calls gameOver();
  - addAPoint() - adds 100 point to the Score if the chicken crosses the road.

- CARS.JS

  - Cars constructor - properties: canvas, size, x = where the car appears, y = represents the lane, speed;
  - update() - updates the x position, given a speed;
  - draw() - prints the car with a canvas element;
  - isInScreen() - Checks if the car is inside of the page;

- CHICKEN.JS

  - Chicken constructor - properties: canvas, lives(3), size, x, y, direction, speed;
  - setDirection() - sets the direction of the chicken (from bottom to top);
  - update() - updates y or x position given the selected key;
  - draw() - prints the chicken with a canvas element;
  - collidesWithCar() - Checks if the chicken collides with a car;
  - collided() - If a car hits the chicken, 1 live is lost;
  

## States y States Transitions
Definition of the different states and their transition (transition functions)

  buildDOM();
  main();

- splashScreen
  - When you click the start button you go to the game screen 

- gameScreen
  - If the chicken reach the other side you win and you go to the gameover screen (winning condition)
  - If the chicke lose the 3 lives or the time runs out you got to the gameover screen (losing condition)

- gameoverScreen
  - When you click the start button you go to the game screen 

## Task
Task definition in order of priority
- Create splash screen;
- Create game screen;
- Create game over screen;
- Create timer;
- Create a score;
- Create chicken element;
- Create car element;
- Set chicken movements;
- Set car movements;
- Set chicken update position function;
- Set car update position function;
- Create check collision functions (ifCollided, collidesWithACar, collided);
- Set game over if there is no longer time;
- Set 3 turns function;
- Create lives update function;
- Create score update function;



## Links


### Trello
[Link url](https://trello.com/b/CzLWHiMJ/franginho)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/Caroline-GMR/franguinho)
[Link Deploy](https://caroline-gmr.github.io/franguinho/)


### Slides
URls for the project presentation (slides)
[Link Slides.com](https://docs.google.com/presentation/d/1jOY2LA9R1Gi95OuXFTCMzi3nCLeBuWuUaXtUCPO_lzc/edit?usp=sharing)


## Development

This project uses SCSS. Use the following line to compile to CSS while you are coding:

```node-sass --output-style compressed --source-map true --watch style.scss style.css```