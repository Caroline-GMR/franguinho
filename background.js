'use strict';

function Background(canvas, lanes, width, height){
  var self = this;

  self.lanes = lanes;
  self.width = width;
  self.height = height;
  self.canvas = canvas;
  self.ctx = self.canvas.getContext('2d');
}

Background.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'green';
  self.ctx.fillRect(0, 0, self.width, 40);
  self.ctx.fillRect(0, self.height-40, self.width, 50);

  self.ctx.fillStyle = 'lightgrey';
  self.ctx.fillRect(0, 40, self.width, self.height-80);

  for (var i = 0; i < self.lanes; i++){
    self.ctx.beginPath();
    self.ctx.moveTo(0, 40 + i*25);
    self.ctx.lineTo(self.width, i*25);
    self.ctx.stroke()
  }
};
