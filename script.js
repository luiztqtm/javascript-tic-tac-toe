//BOARD

const gameBoard = (() => {
  const board = ['','','','','','','','','']

  const update = (i, marker) => {
    board[i] = marker;
  }

  function get (i) {
    return board[i]
  }

  function check(){
    if (
        (board[0] === board[1] && board[0] === board[2] && board[2] != '')
      ||(board[3] === board[4] && board[3] === board[5] && board[5] != '')
      ||(board[6] === board[7] && board[6] === board[8] && board[8] != '')
      ||(board[0] === board[3] && board[0] === board[6] && board[6] != '')
      ||(board[0] === board[3] && board[0] === board[6] && board[6] != '')
      ||(board[1] === board[4] && board[1] === board[7] && board[7] != '')
      ||(board[2] === board[5] && board[2] === board[8] && board[8] != '')
      ||(board[0] === board[4] && board[0] === board[8] && board[8] != '')
      ||(board[2] === board[4] && board[2] === board[6] && board[6] != '')
      )  {
        gameOver = true;
        return 'win'
      } else if (board.indexOf('') == -1 ){
        gameOver = true;
        return 'tie'
      }
  }
 
  return {update, check, get}
})();

//PLAYERS

const createPlayer = (name, marker) =>{
  return {name, marker}
}   


//GAME CONTROL

const gameFlow = (() => {

  let gameOver = true;
  let p1;
  let p2; 

  function start (name1 = 'Player1', name2 = 'Player2') {
    p1 = createPlayer(name1, 'x');
    p2 = createPlayer(name2, 'o');
    gameOver = false;
    currentPlayer = p1;
    display.updateMessage('Now playing: ' + currentPlayer.name)
  }


  function passTurn() {
    currentPlayer === p1 ? currentPlayer = p2 : currentPlayer = p1;
    display.updateMessage('Now playing: ' + currentPlayer.name)
  }

  function handleMove(e) {
    let i = e.target.id
    if(gameBoard.get(i) == '' && !gameOver){
      gameBoard.update(i, currentPlayer.marker);
      display.markSquare(i, currentPlayer.marker);
      if(gameBoard.check() === 'win') {
        display.updateMessage(currentPlayer.name + ' wins!');
        gameOver = true;
      } else if (gameBoard.check() === 'tie') {
        display.updateMessage('game tied')
        gameOver = true;
      } else {
        passTurn();       
      }
    }  
  }

  function reset() {
    for (let i = 0; i < 9; i++) {
      gameBoard.update(i, '');
      display.markSquare(i, '');
    };
    gameOver = false;
    passTurn();
  }

  return {start, handleMove, reset}
})();

//DISPLAY

const display = (() => {
  const gameDisplay = document.getElementById('gameboard');
  const resetBtn = document.getElementById('reset');
  const startBtn = document.getElementById('start');

  startBtn.addEventListener('click', start);
  resetBtn.addEventListener('click', gameFlow.reset);

  for(i = 0; i < 9; i++ ) {
    
    const square = document.createElement('div');
    square.setAttribute('id', i);
    square.classList.add('square');
    gameDisplay.appendChild(square);
    square.addEventListener('click', gameFlow.handleMove);
    square.textContent = ''
  };

  function start () {
    let modal = document.querySelector(".modal");
    modal.classList.toggle("hide")
    let name1 = document.getElementById('p1-name').value;
    let name2 = document.getElementById('p2-name').value;
    gameFlow.start(name1, name2);
  }

  function markSquare(i, marker) {
    document.getElementById(i.toString()).textContent = marker;
  }
  
  function updateMessage(text) {
    const message = document.getElementById('message');
    message.textContent = text;
  }
  return {updateMessage, markSquare}

})();

