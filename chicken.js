'use strict';

function Chicken(canvas, lives){
  var self = this;

  self.canvas = canvas;
  self.lives = lives;
  self.size = 20;
  self.x = canvas.width / 2;
  self.y = canvas.height - self.size;
  self.direction = 0;
  self.speed = 4;
  self.ctx = self.canvas.getContext('2d');
  self.keyState = [false, false, false, false];
};


Chicken.prototype.setDirection = function (direction) {
  var self = this;

  self.direction = direction;
};


Chicken.prototype.update = function(){
  var self = this;

  if(self.keyState[0] === true || self.keyState[2] === true){
  self.y = self.y + self.direction;
  }
  if(self.keyState[1] === true || self.keyState[3] === true ){
  self.x = self.x + self.direction;
  }
  if (self.y < 0 || self.x < 0) {
    self.direction = 1;
  }
  if (self.y > self.canvas.height || self.x > self.canvas.width) {
    self.direction = -1;
  }
};



Chicken.prototype.draw = function() {
  var self = this;

  self.ctx.fillStyle = 'yellow';
  self.ctx.fillRect(self.x - self.size / 2, self.y - self.size / 2, self.size, self.size);

}

Chicken.prototype.collidesWithCar = function (car) {
  var self = this;

  const collidesRight = self.x + self.size / 2 > car.x - car.size / 2;
  const collidesLeft = self.x - self.size / 2 < car.x + car.size / 2;
  const collidesTop = self.y - self.size / 2 < car.y + car.size / 2;
  const collidesBottom = self.y + self.size / 2 > car.y - car.size / 2;

  if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
    return true;
  }
  
  return false;
}

Chicken.prototype.collided = function () {
  var self = this;
  self.lives--;
 
}

Chicken.prototype.isCrossed = function () {
  var self = this;
  if(self.y === self.size){
    return true;
  }
  return false;
}

Chicken.prototype.removeChicken = function () {
  var self = this;

  self.x -= 50;
  self.y = self.canvas.height - self.size;

}
