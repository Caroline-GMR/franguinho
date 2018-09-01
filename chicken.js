'use strict';

function Chicken(canvas, lives){
  var self = this;

  self.canvas = canvas;
  self.lives = lives;
  self.size = 20;
  self.x = 0 + self.size / 2;
  self.y = 0 + canvas.height / 2;
  self.direction = 0;
  self.speed = 5;
  self.ctx = self.canvas.getContext('2d');
};


Chicken.prototype.setDirection = function (direction) {
  var self = this;

  self.direction = direction;
};

Chicken.prototype.update = function(move){
  var self = this;

  self.y = self.y + self.direction * self.speed;

  if (self.y < 0) {

    self.direction = 1;
  }

  if (self.y > self.canvas.height) {
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
