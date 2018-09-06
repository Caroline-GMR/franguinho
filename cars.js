'use strict';

function Car(canvas, y, speed) {
  var self = this;

  self.canvas = canvas;
  self.size = 50;
  self.x = canvas.width + self.size;
  self.y = y;
  self.speed = speed;
  self.ctx = self.canvas.getContext('2d');

}

Car.prototype.update = function(){
  var self = this;

  self.x = self.x - self.speed;
}

Car.prototype.draw = function(){
  var self = this;
  
  //self.ctx.fillStyle = 'black';
  //self.ctx.fillRect(self.x - self.size / 2, self.y - self.size / 2, self.size, self.size);
  var image = document.getElementById('car');
  self.ctx.drawImage(image, self.x - self.size / 2, self.y - self.size / 2, self.size, self.size);

}

Car.prototype.isInScreen = function() {
  var self = this;
  return self.x + self.size / 2 > 0;
}

