'use strict';

function Game() {
  var self = this;

  self.gameIsOver = false;
  self.gameIsWon = false;
  self.timeLeft = null;
  self.score = 0;
  self.lanes = [80, 190, 300, 410];

}


Game.prototype.start = function () {
  var self = this;

  self.gameMain = buildDom(`
    <main class="game container">
      <header>
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value">
          </span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
        <div class="timer">
          <span class="label">Time left:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="canvas">
        <canvas></canvas>
      </div>
      <div>
      <img id="chicken" src="https://i.imgur.com/MwPH1p3.png" class="hidden">
      <img id="car" src="https://i.imgur.com/IXoLdvq.png" class="hidden">
      
  
      </div>
    </main>
  `);
//    https://i.imgur.com/ED2fQlZ.png
  self.canvasParentElement = self.gameMain.querySelector('.canvas');
  self.canvasElement = self.gameMain.querySelector('canvas');

  self.livesElement = self.gameMain.querySelector('.lives .value');
  self.scoreElement = self.gameMain.querySelector('.score .value');
  self.timeLeftElement = self.gameMain.querySelector('.timer .value');

  document.body.appendChild(self.gameMain);

  //self.width = self.canvasParentElement.offsetWidth;
  //self.height = self.canvasParentElement.offsetHeight;
  self.width = 1200;
  self.height = 500;


  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.background = new Background(self.canvasElement, self.lanes.length, self.width, self.height);
  self.car = [];

  self.startLoop();

  self.chicken = new Chicken(self.canvasElement, 5);
  self.livesElement.innerText = self.chicken.lives;
  self.scoreElement.innerText = self.score;
  self.startTimer();

  self.handleKeyDown = function(event){
    if (event.key === 'ArrowUp'){
      self.chicken.keyState[0] = true;
      self.chicken.setDirection(-1);
    }
    if(event.key === 'ArrowDown'){
      self.chicken.keyState[2] = true;
      self.chicken.setDirection(1);
    }
    if(event.key === 'ArrowLeft'){
      self.chicken.keyState[3] = true;
      self.chicken.setDirection(-1);
    }
    if(event.key === 'ArrowRight'){
      self.chicken.keyState[1] = true;
      self.chicken.setDirection(1);
    }
  }
  
  document.body.addEventListener('keydown', self.handleKeyDown);
  
  self.handleKeyUp = function(event){
    if (event.key === 'ArrowUp'){
      self.chicken.keyState[0] = false;
    }
    if(event.key === 'ArrowRight'){
      self.chicken.keyState[1] = false;
    }
    if(event.key === 'ArrowDown'){
      self.chicken.keyState[2] = false;
    }
    if(event.key === 'ArrowLeft'){
      self.chicken.keyState[3] = false;
    }
  }
  
  document.body.addEventListener('keyup', self.handleKeyUp);
  
};

Game.prototype.startTimer = function () {
  var self = this;
  
  self.timeLeft = 60;
  self.timeLeftElement.innerText = self.timeLeft;
  self.intervalId = window.setInterval(function () {
    self.timeLeft--;
    self.timeLeftElement.innerText = self.timeLeft;
    if(self.timeLeft % 7 === 0 && self.timeLeft > 5){
      soundCar.play();
    }
    if (self.timeLeft === 5){
      timerSound.play();
    }
    if (self.timeLeft === 0) {
      clearInterval(self.intervalId);
      if (self.chicken.lives === 5 && self.score > 0){
        self.winGame();
      } else {
        self.timeout();
      }
    }
  }, 1000);
};

var pointSound;
pointSound = new Audio("../franguinho/mp3/point.mp3");


var collidedSound;
collidedSound = new Audio("../franguinho/mp3/ouch.mp3");

var soundCar;
soundCar = new Audio("./mp3/horn.mp3");
soundCar.volume = 0.2;

var timerSound;
timerSound = new Audio("../franguinho/mp3/timer.mp3");

Game.prototype.timeout = function () {
  var self = this;
  if (!self.isGameEnded()){
    
    self.gameOver();
  }
};

Game.prototype.startLoop = function () {
  var self = this;
  
  var ctx = self.canvasElement.getContext('2d');
  
  function loop(){
    
    /* var height = self.canvasElement.height;
    var width = self.canvasElement.width; */

    var random = Math.floor(Math.random() * self.lanes.length);
    var y = self.lanes[random];
    var speed = (900 / y); // @todo make setSpeed function
    if(Math.random() > 0.98){
        self.car.push(new Car(self.canvasElement, y, speed));
    } 

    self.chicken.update();

    self.car.forEach(function(item){
      item.update();
    });
  
    self.car = self.car.filter(function(item){
      return item.isInScreen();
    })
 
    self.checkIfCollides();
    
    // -- erase and paint everything again

    ctx.clearRect(0, 0, self.width, self.height);

    self.background.draw();
    self.chicken.draw();
    self.car.forEach(function(item){
      item.draw();
    });

    if (self.chicken.isCrossed()) {
      pointSound.play();
      self.addPoint();
    }

    
    if (!self.isGameEnded()) {
      window.requestAnimationFrame(loop);
    }


  }

  window.requestAnimationFrame(loop);
};

Game.prototype.checkIfCollides = function () {
  var self = this;
  
  self.car.forEach(function(item){
    if(self.chicken.collidesWithCar(item)) {
      self.chicken.collided();
      collidedSound.play();
      self.chicken.removeChicken();
      self.livesElement.innerText = self.chicken.lives;
      self.scoreElement.innerText = self.score;
      if(self.chicken.lives === 0) {
        self.gameOver();
      }
    }
  });
}

Game.prototype.isGameEnded = function () {
  var self = this;

  return ((self.gameIsOver) || (self.gameIsWon));
};

Game.prototype.gameOver = function (callback) {
  var self = this;

  self.gameIsOver = true;
  clearInterval(self.intervalId)
  self.onGameOverCallback();
};

Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
};

Game.prototype.destroy = function () {
  var self = this;
  
  self.gameMain.remove();
};

Game.prototype.winGame = function () {
  var self = this;

  self.gameIsWon = true;
  self.onGameWonCallback();
};

Game.prototype.onWon = function (callback) {
  var self = this;

  self.onGameWonCallback = callback;
};

Game.prototype.addPoint = function(){
  var self = this;
  self.timeLeft = self.timeLeft + 10;
  self.timeLeftElement.innerText = self.timeLeft;
  self.score = self.score + 100;
  self.scoreElement.innerText = self.score;
  self.chicken.removeChicken();

};







