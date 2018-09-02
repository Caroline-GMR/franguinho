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
        <h1>Franguinho</h1>
        <button>Start Game</button>
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
      gameOver(game.round);
    });
    game.onWon(function(){
      gameWon();
    });
  }

  function destroyGame() {
    game.destroy();
  }

  // -- game over 


  function gameOver(round) {
    destroyGame();
    buildGameOver(round);
  }

  function buildGameOver(round) {

    gameOverMain = buildDom(`
      <main>
        <h1>Game over</h1>
        <p>Your score: <span></span></p>
        <button>Restart Game</button>
      </main>
    `);

    var button = gameOverMain.querySelector('button');
    button.addEventListener('click', startGame);    
    
    var span = gameOverMain.querySelector('span');
    span.innerText = round;

    document.body.appendChild(gameOverMain);
  }

  function destroyGameOver() {
    if (gameOverMain) {
      gameOverMain.remove();
    }
  }

  // -- game won

  function gameWon(){
    destroyGame();
    buildGameWon();
  }

  function buildGameWon(){
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

/*     var span = gameWonMain.querySelector('span');
    span.innerText = round; */
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