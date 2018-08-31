# franguinho

# Project's name
Franguinho


## Description
The player control a chicken who can be made to run across a lane highway filled with traffic in an effort to 'get to the other side'. 
There is just one lane, with cars of different sizes and travelling at different speeds.
- START
The game starts with three lives and a countdown that starts with sixty seconds.
Every time the chicken gets across a point is earned. 
If hit by a car, a point and a live are lost and the chicken is pushed back to the bottom of the screen.
- GAME OVER
When the countdown finish or there are no longer lifes, the game is over.
- CONTROL
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

  - -main

      buildDOM() - creates HTML content;
      main() - load page content
      buildSplash() - creates splash screen;
      addEventListener - starts the game if START button is clicked;
      destroySplash() - removes splash screen;
      startGame() - starts a new game, removing splash or game over screen;
     
  - -start game

      new Game() - creates a new game based on the Game constructor;
      gameOnOver() - ;
      destroyGame() - removes splash or game over screen;  
      

  - -game over

      gameOver() - finishes the game;
      buildGameOver() - creates a win screen with total score and RESTART button;
      addEventListener - starts the game if RESTART button is clicked;
      destroyGameOver(); - removes game over screen;


  - -win game

      buildWin() - creates a win screen with total score and RESTART button;
      addEventListener - starts the game if RESTART button is clicked;

- GAME.JS

    Game constructor - properties: gameIsOver = false;
    start() - build the DOM (Game Main), creating all the elements on the page - Score, lives, etc;
    startTimer() - start the countdown (60 secs);
    new Chicken - creates a chicken based on the chicken constructor;
    handleKeys() - set the chicken direction up, down, left and right;
    AddEventListener - calls handleKeys, moving the chicken to up, down, left or right, depending on which key was pressed;
    startLoop()- called by startGame(), creates a cars array, updates the position of the chicken and the car;
    ifCollided() - checks if the chicken and the car collided, if yes, 1 live is lost;
    triggerTimeOut() - if the countdown finishes, calls gameOver();
    addAPoint - adds 1 point to the Score if the chicken crosses the road.


- CARS.JS
    Cars constructor - properties: canvas, size, x = where the car appears, y = represents the lane, speed;
    update() - updates the x position, given a speed;
    draw() - prints the car with a canvas element;
    isInScreen() - Checks if the car is inside of the page;
  

- -CHICKEN.JS
    Chicken constructor - properties: canvas, lives(3), size, x, y, direction, speed;
    setDirection() - sets the direction of the chicken (from bottom to top);
    update() - updates y or x position given the selected key;
    draw() - prints the chicken with a canvas element;
    collidesWithCar() - Checks if the chicken collides with a car;
    collided() - If a car hits the chicken, 1 live is lost;

## States y States Transitions
Definition of the different states and their transition (transition functions)

  buildDOM();
  main();

- splashScreen
  buildSplash() 
  AddEventListener(start button);

- gameScreen
  Game.buildDOM();

- gameoverScreen
  buildGameOver();
  AddEventListener(restart button);

- winScreen
  buildWinScreen();
  AddEventListener(restart button);


## Task
Task definition in order of priority
- Create splash screen;
- Create game screen;
- Create game over screen;
- Create win screen;
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
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
