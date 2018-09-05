'use strict';


function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main() {

  var splashMain;
  var gameOverMain;
  var gameWonMain;

  var game;

  // -- splash

  function buildSplash() {

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
        <button>Start Game</button>
        </div>
        <div class="chicken-img">
        <img src="https://oreinsofblog.files.wordpress.com/2014/03/stock-vector-scared-cartoon-chicken-vector-clip-art-illustration-with-simple-gradients-all-in-a-single-layer-119505895.jpg"></img>
        </div>

      </main>
    `);
    
    document.body.appendChild(splashMain);

    var button = splashMain.querySelector('button');
    button.addEventListener('click', startGame);

  }

  function destroySplash() {
    splashMain.remove();
  }

  
  // -- game

  function startGame() {
    destroySplash();
    destroyGameOver();
    destroyGameWon();

    game = new Game();
    game.start();
    game.onOver(function () {
      gameOver(game.score);
    });
    game.onWon(function(){
      gameWon(game.score);
    });
  }

  function destroyGame() {
    game.destroy();
  }

  // -- game over 


  function gameOver(score) {
    destroyGame();
    buildGameOver(score);
  }

  function buildGameOver(score) {

    gameOverMain = buildDom(`
      <main class="gameover">
        <h1>Game over</h1>
        <p>Your score: <span></span></p>
        <button>Restart Game</button>
        <div class="chicken-img">
        </div>
        </main>
        `);
        
        /* <img src="https://i.imgur.com/haJ8bbI.jpg"> */
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

  function gameWon(score){
    destroyGame();
    buildGameWon(score);
  }

  function buildGameWon(score){
    gameWonMain = buildDom(`
      <main class="won">
        <h1>You win!</h1>
        <p>Your score: <span></span></p>
        <button>Restart Game</button>
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
    }
  }

  // -- initialize

  buildSplash();

}
window.addEventListener('load', main);