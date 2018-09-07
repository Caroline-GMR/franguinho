'use strict';


function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main() {

  var splashMain;
  var musicSplash;
  var gameOverMain;
  var gameWonMain;
  
  var game;

  // -- splash

  function buildSplash() {

    musicSplash = new Audio("../franguinho/mp3/chickensong1.mp3");
    musicSplash.autoplay(); 
    musicSplash.volume = 0.1;

    splashMain = buildDom(`
      <main class="splash">
        <div class="wrap">
        <h1>Franguinho</h1>
        </div>
        <div class="instructions">
        <h4>You are a chicken and you need to cross the road.</h4>
        <h4>Use the keyboard arrows to move up, down, left and right.</h4>
        <h4>You have 60 seconds to cross the highway as many as you can.</h4>
        <h4>You have 5 lives and if you are hit by a car, you lose 1 live and some score.</h4>
        <h4>Good luck!</h4>
        <button class="button">Start Game</button>
        <div class="chicken-img1">
        <img src="https://i.imgur.com/CakSl7k.png">
        </div>
        <div class="chicken-img">
        <img src="https://i.imgur.com/cupcAuy.png"></img>
        </div>

      </main>
    `);
    
    document.body.appendChild(splashMain);

    var button = splashMain.querySelector('button');
    button.addEventListener('click', startGame);

  }

  function destroySplash() {
    splashMain.remove();
    musicSplash.pause();
  }

  
  // -- game
  var musicGame;
  function startGame() {
    destroySplash();
    destroyGameOver();
    destroyGameWon();
    musicGame = new Audio("../franguinho/mp3/game.mp3");
    musicGame.play();

    game = new Game();
    game.start();
    game.onOver(function () {
      gameOver(game.score);
      musicGame.pause();
      timerSound.pause();


    });
    game.onWon(function(){
      gameWon(game.score);
    });
  }

  function destroyGame() {
    musicGame.pause();
    timerSound.pause();
    game.destroy();
  }

  // -- game over 

  var musicGameOver = new Audio("../franguinho/mp3/lose.mp3");

  function gameOver(score) {
    destroyGame();
    buildGameOver(score);
    musicGameOver.play();
  }

  function buildGameOver(score) {
    gameOverMain = buildDom(`
      <main class="gameover">
        <h1>Game over</h1>
        <img class="chicken-gameover" src="https://i.imgur.com/z2BwXuL.png">
        <p>Your score: <span></span></p>
        <button class="button restart">Restart Game</button>
        </main>
        `);
        
    var button = gameOverMain.querySelector('button');
    button.addEventListener('click', startGame);    
    
    var span = gameOverMain.querySelector('span');
    span.innerText = score;

    document.body.appendChild(gameOverMain);
  }

  function destroyGameOver() {
    if (gameOverMain) {
      gameOverMain.remove();
    }
  }

  // -- game won

  var winSound;
  winSound = new Audio("../franguinho/mp3/win.mp3");
  function gameWon(score){
    destroyGame();
    buildGameWon(score);
    winSound.play();
    musicGame.pause();
    timerSound.pause();
  }

  function buildGameWon(score){
    gameWonMain = buildDom(`
      <main class="won">
        <h1>You win!</h1>
        <img class="chicken-gamewon" src="https://i.imgur.com/C05LoSt.png">
        <p>Your score: <span></span></p>
        <button class="button">Restart Game</button>
      </main>
    `);
    
    document.body.appendChild(gameWonMain);

    var button = gameWonMain.querySelector('button');
    button.addEventListener('click', startGame);

    var span = gameWonMain.querySelector('span');
    span.innerText = score;
  }

  function destroyGameWon(){
    if (gameWonMain) {
    gameWonMain.remove();
    winSound.pause();
    }
  }

  // -- initialize

  buildSplash();

}
window.addEventListener('load', main);