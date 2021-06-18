let player1 = document.querySelector('.player1');
let player2 = document.querySelector('.player2');
let snitch = document.querySelector('.snitch');
let harrysScore = document.querySelector('.de-score');
let deScore = document.querySelector('.harrys-score');
let startGame = document.querySelector('.start-game');
let gameStarted = false;

// PLAYER OBJECTS
let playerStats1 = {
  lrcount: 250,
  udcount: 250,
  score: 0
}
let playerStats2 = {
  lrcount: 850,
  udcount: 250,
  score: 0
}

// CHECKS WHICH KEY IS BEING PRESSED TO DETERMINE 
// WHAT DIRECTION TO SEND THE PLAYERS IN
// PLAYER 2
document.addEventListener('keydown', (e) => {
  function dirCount(val) {
      if(val === 39) {
        player2.style.transform = 'scaleX(-1)';
        playerStats2.lrcount = playerStats2.lrcount + 50;
        player2.style.left = playerStats2.lrcount + 'px';
      } else if (val === 37) {
        player2.style.transform = 'scaleX(1)';
        playerStats2.lrcount = playerStats2.lrcount + -50;
        player2.style.left = playerStats2.lrcount + 'px';
      } else if (val === 38) {
        playerStats2.udcount = playerStats2.udcount + -50;
        player2.style.top = playerStats2.udcount + 'px';
      } else if (val === 40) {
        playerStats2.udcount = playerStats2.udcount + 50;
        player2.style.top = playerStats2.udcount + 'px';
      } 
  };
  
  if (e.keyCode === 39) {
    dirCount(39);
  } else if (e.keyCode === 37) {
    dirCount(37);
  } else if (e.keyCode === 38) {
    dirCount(38);
  } else if (e.keyCode === 40) {
    dirCount(40);
  }
  
  if(e.keyCode === 32 && !gameStarted) {
    startTheGame();
    gameStarted = true;
  }

  checkOverlapP2();
});

// PLAYER 1
document.addEventListener('keydown', (e) => {
  function dirCount(val) {
        if (val === 68) {
        player1.style.transform = 'scaleX(1)';
        playerStats1.lrcount = playerStats1.lrcount + 50;
        player1.style.left = playerStats1.lrcount + 'px';
      } else if (val === 65) {
        player1.style.transform = 'scaleX(-1)';
        playerStats1.lrcount = playerStats1.lrcount + -50;
        player1.style.left = playerStats1.lrcount + 'px';
      } else if (val === 87) {
        playerStats1.udcount = playerStats1.udcount + -50;
        player1.style.top = playerStats1.udcount + 'px';
      } else if (val === 83) {
        playerStats1.udcount = playerStats1.udcount + 50;
        player1.style.top = playerStats1.udcount + 'px';
      }
  };
  
    if (e.keyCode === 68) {
    dirCount(68);
  } else if (e.keyCode === 65) {
    dirCount(65);
  } else if (e.keyCode === 87) {
    dirCount(87);
  } else if (e.keyCode === 83) {
    dirCount(83);
  }

  checkOverlapP1();
});

// CHECKS WHETHER GAME HAS STARTED, STARTS GAME AND SPAWNS SNITCH IF IT HASNT
startGame.addEventListener('click', () => {
  gameStarted ? null : (startTheGame(), gameStarted = true);
})
function startTheGame() {
  randVal1 = Math.floor(Math.random() * 440);
  randVal2 = Math.floor(Math.random() * 1220);
  snitch.style.top = randVal1 + 'px';
  snitch.style.left = randVal2 + 'px';
  snitch.style.display = "block";
}

//CHECKS IF PLAYER HAS 'CAUGHT' SNITCH, IF IT HAS, RE-SPAWN 
//SNITCH AND ENLARGE THE SIZE OF THE PLAYER
function checkOverlapP1() {
  let rect1 = player1.getBoundingClientRect();
  let rect2 = snitch.getBoundingClientRect();
  let overlap = !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
  overlap ? (startTheGame(), increaseScoreP1()) : null;
}
function checkOverlapP2() {
  let rect1 = player2.getBoundingClientRect();
  let rect2 = snitch.getBoundingClientRect();
  let overlap = !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
  overlap ? (startTheGame(), increaseScoreP2()) : null;
}

//INCREASE SCORE
function increaseScoreP2() {
  playerStats1.score = playerStats1.score + 1;
  harrysScore.innerHTML = `${playerStats1.score}`;
}
function increaseScoreP1() {
  playerStats2.score = playerStats2.score + 1;
  deScore.innerHTML = `${playerStats2.score}`;
}
 