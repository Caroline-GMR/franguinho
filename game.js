'use strict';

function Game() {
  var self = this;

  self.gameIsOver = false;
  self.timeLeft = null;
  self.round = 0;
}

Game.prototype.start = function () {
  var self = this;

  self.gameMain = buildDom(`
    <main class="game container">
      <header>
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>
        <div class="round">
          <span class="label">Round:</span>
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
    </main>
  `);

  self.canvasParentElement = self.gameMain.querySelector('.canvas');
  self.canvasElement = self.gameMain.querySelector('canvas');

  self.livesElement = self.gameMain.querySelector('.lives .value');
  self.roundElement = self.gameMain.querySelector('.round .value');
  self.timeLeftElement = self.gameMain.querySelector('.timer .value');


  document.body.appendChild(self.gameMain);

  self.width = self.canvasParentElement.offsetWidth;
  self.height = self.canvasParentElement.offsetHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.chicken = new Chicken(self.canvasElement, 5);
  self.livesElement.innerText = self.chicken.lives;
  self.startTimer();

  self.handleKeyDown = function(event){
    switch (event.key){
      case 'ArrowUp':
      self.chicken.setDirection(-1);
      case 'ArrowDown':
      self.chicken.setDirection(1);
   /*    case 'ArrowLeft':
      self.chicken.setDirection(-1);
      case 'ArrowRight':
      self.chicken.setDirection(1); */
    }
  }

  document.body.addEventListener('keydown', self.handleKeyDown);

  var height = self.canvasElement.height;
  var width = self.canvasElement.width;


  self.cars = [];

  self.startLoop();

};

Game.prototype.startTimer = function () {
  var self = this;

  self.timeLeft = 60;
  self.timeLeftElement.innerText = self.timeLeft;
  self.intervalId = window.setInterval(function () {
    self.timeLeft--;
    self.timeLeftElement.innerText = self.timeLeft;

    if (self.timeLeft === 0) {
      clearInterval(self.intervalId);
      self.timeout();
    }
  }, 1000);
};

Game.prototype.timeout = function () {
  var self = this;

  self.gameOver();
};



Game.prototype.startLoop = function () {
  var self = this;

  var ctx = self.canvasElement.getContext('2d');

  var lanes = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  
  function loop(){
    
    var random = Math.floor(Math.random() * lanes.length);
    var y = lanes[random];
    self.cars.push(new Cars(self.canvasElement, y, self.speed));
    

    self.chicken.update();

    self.cars.forEach(function(item){
      item.update();
    });
  
    self.cars = self.cars.filter(function(item){
      return item.isInScreen();
    })
 
    self.CheckIfCollides();

    ctx.clearRect(0, 0, self.width, self.height);
    self.chicken.draw();
    self.cars.forEach(function(item){
      item.draw();
    });

    if (!self.gameIsOver) {
      window.requestAnimationFrame(loop);
    }
  }

  window.requestAnimationFrame(loop);
};

Game.prototype.CheckIfCollides = function () {
  var self = this;
  
  self.cars.forEach(function(item){
    if(self.chicken.collidesWithCar(item)) {
      self.chicken.collided();
      self.livesElement.innerText = self.chicken.lives;
      if(!self.chicken.lives) {
        self.gameOver();
      }
    }
  });
}

Game.prototype.gameOver = function (callback) {
  var self = this;
  self.gameIsOver = true;

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
