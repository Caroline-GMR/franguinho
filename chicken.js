'use strict';

function Chicken(canvas, y, lives, speed){
  var self = this;

  self.canvas = canvas;
  self.lives = 3;
  self.size = 20;
  self.x = canvas.width + self.size;
  self.y = y;
  //self.direction = ;
  self.speed = speed;
  self.ctx = self.canvas.getContext('2d');
};

Chicken.prototype.update = function(){
  var self = this;

  self.x = self.x - self.speed;
  self.y = self.y - self.speed;
}

Chicken.prototype.draw = function() {
  var self = this;

  self.ctx.fillStyle = 'yellow';
  self.ctx.fillRect(self.x - self.size / 2, self.y - self.size / 2, self.size, self.size);

}
