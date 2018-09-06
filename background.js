'use strict';

function Background(canvas, lanes, width, height){
  var self = this;

  self.lanes = lanes;
  self.linesToDraw = self.lanes + 1;
  self.width = width;
  self.height = height;
  self.canvas = canvas;
  self.ctx = self.canvas.getContext('2d');
}

Background.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'green';
  self.ctx.fillRect(0, 0, self.width, 50);
  self.ctx.fillRect(0, self.height-50, self.width, 50);

  self.ctx.fillStyle = 'grey';
  self.ctx.fillRect(0, 50, self.width, self.height-100);

  for (var i = 1; i <= self.linesToDraw; i++){
    var lineDash = [];
    if (i > 1 && i < self.linesToDraw) {
      lineDash.push(10, 10)
    }
    self.ctx.strokeStyle = 'white';
    self.ctx.beginPath();
    self.ctx.setLineDash(lineDash);
    self.ctx.moveTo(0, i * 80);
    self.ctx.lineTo(1200, i * 80);
    self.ctx.stroke();
  }
};