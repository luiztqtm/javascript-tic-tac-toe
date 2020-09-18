const gameDisplay = document.getElementById('gameboard')

const game = (()=> {

  const board = ['','','','','','','','','']

  const render = (() => {
    for(i = 0; i < 9; i++ ) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      square.classList.add('square');
      gameDisplay.appendChild(square);
      square.addEventListener('click', handleMove)
    }
  })();

    const update = (i) => {
      board[i] = currentPlayer.marker;
      document.getElementById(i.toString()).textContent = board[i];
    }
  
    return {board, update}
})();

//PLAYERS

const createPlayer = (name, marker) =>{
  return {name, marker}
}   

const p1 = createPlayer('Player One', 'x');
const p2 = createPlayer('Player Two', 'o')

//GAME FLOW

let currentPlayer = p1;


function handleMove(e) {
  let i = e.target.id
  if(game.board[i] == ''){
    game.update(i);
    if(checkWin() === true) {
      console.log('game over')
    } else {
      passTurn();
    }
  } else {
    console.log('invalid move')
  }  
}

function passTurn() {
  currentPlayer == p1 ? currentPlayer = p2 : currentPlayer = p1
}


function checkWin(){
  if (
      (game.board[0] === game.board[1] && game.board[0] === game.board[2] && game.board[2] != '')
    ||(game.board[3] === game.board[4] && game.board[3] === game.board[5] && game.board[5] != '')
    ||(game.board[6] === game.board[7] && game.board[6] === game.board[8] && game.board[8] != '')
    ||(game.board[0] === game.board[3] && game.board[0] === game.board[6] && game.board[6] != '')
    ||(game.board[0] === game.board[3] && game.board[0] === game.board[6] && game.board[6] != '')
    ||(game.board[1] === game.board[4] && game.board[1] === game.board[7] && game.board[7] != '')
    ||(game.board[2] === game.board[5] && game.board[2] === game.board[8] && game.board[8] != '')
    ||(game.board[0] === game.board[4] && game.board[0] === game.board[8] && game.board[8] != '')
    ||(game.board[2] === game.board[4] && game.board[2] === game.board[6] && game.board[6] != '')
    )  {
      return true
    }
}


