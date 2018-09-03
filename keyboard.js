'use strict';

function handleKeyDown (event){
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

function handleKeyUp(event){
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
