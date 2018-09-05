'use strict';

function Background(canvas, lanes, width, height){
  var self = this;

  self.lanes = lanes;
  self.linesToDraw = lanes + 1;
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

  self.ctx.fillStyle = 'grey';
  self.ctx.fillRect(0, 40, self.width, self.height-80);

 /*  self.ctx.strokeStyle = 'white';
  self.ctx.beginPath();
  self.ctx.setLineDash([]);
  self.ctx.moveTo(0, 50);
  self.ctx.lineTo(1200, 50);
  self.ctx.stroke();

  self.ctx.strokeStyle = 'white';
  self.ctx.beginPath();
  self.ctx.setLineDash([]);
  self.ctx.moveTo(0, 400);
  self.ctx.lineTo(1200, 400);
  self.ctx.stroke(); */

  for (var i = 1; i <= self.linesToDraw; i++){
    var lineDash = [];
    if (i > 1 && i < self.linesToDraw) {
      lineDash.push(10, 10)
    }
    self.ctx.strokeStyle = 'white';
    self.ctx.beginPath();
    self.ctx.setLineDash(lineDash);
    self.ctx.moveTo(0, i * 50);
    self.ctx.lineTo(1200, i * 50);
    self.ctx.stroke();
  }
};
