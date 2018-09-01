'use strict';

function Chicken(canvas, y, lives, speed){
  var self = this;

  self.canvas = canvas;
  self.lives = 3;
  self.size = 20;
  self.x = 10 + self.size / 2;
  self.y = canvas.height / 2;
  self.direction = 0;
  self.speed = 5;
  self.ctx = self.canvas.getContext('2d');
};


Chicken.prototype.setDirectionY = function (direction) {
  var self = this;

  self.direction = direction;
};

Chicken.prototype.setDirectionX = function (direction) {
  var self = this;

  self.direction = direction;
};

Chicken.prototype.update = function(move){
  var self = this;

  self.y = self.y + self.direction * self.speed;
  self.y = self.y + self.direction * self.speed;


  if (self.y < 0) {

    self.direction = 1;
  }

  if (self.y > self.canvas.height) {
    self.direction = -1;
  }

  if (self.x < 0) {

    self.direction = 1;
  }

  if (self.x > self.canvas.width) {
    self.direction = -1;
  }

};



Chicken.prototype.draw = function() {
  var self = this;

  self.ctx.fillStyle = 'yellow';
  self.ctx.fillRect(self.x - self.size / 2, self.y - self.size / 2, self.size, self.size);

}

