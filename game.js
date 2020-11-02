
let univRow = document.getElementsByTagName('tr');
let hole = document.getElementsByTagName('td');
const turn = document.querySelector('.otherPlayer');


//players
let currentPlayer = 'R';
turn.textContent = `Player 1's turn!`;
player1Color='red';
player2Color='yellow';

//just a little helper
function newGame(){
  currentPlayer = 'R';
  turn.textContent = `Player 1's turn!`;
}


//basically make it happen, kinda like the main??
Array.prototype.forEach.call(hole, (cell)=>{
  cell.addEventListener('click', discColor);
  cell.style.backgroundColor = 'white';
});

function discColor(e) {
  let col = e.target.cellIndex;
  let funcRow = [];
  for(let i =5; i > -1; i--){
    if(univRow[i].children[col].style.backgroundColor == 'white'){ //if sqaure is empty
      funcRow.push(univRow[i].children[col]); //push adds to end of array, bc you can only drop a disc to the bottom
      if(currentPlayer == 'R'){
        funcRow[0].style.backgroundColor = player1Color;
        if(allPossBingos()){
          return(alert("Player 1 is the Winner!"));
        }
        else if(noBingos()){
          return(alert("It's a tie!"));
        }
        turn.textContent = `Player 2's turn!`;
        return currentPlayer = 'Y';
      }
      else if(currentPlayer =='Y')
      {
        funcRow[0].style.backgroundColor = player2Color;
        if(allPossBingos()){
          return(alert("Player 2 is the Winner!"));
        }
        else if(noBingos()){
          return(alert("It's a tie!"));
        }
        turn.textContent = `Player 1's turn!`;
        return currentPlayer = 'R';
      }
    }
  }
}

//to check for a 'bingo', pass in 4 adjacent args and AND their bools and check they arent just empty holes
function bingo(holeA, holeB, holeC, holeD){
  return((holeA == holeB)&&(holeA == holeC)&&(holeC == holeD)&&(holeA !== 'white'));
}

//now check for bingos in all directions --- make a function that does this all at once
function horizontalBingo(){
  for(let i = 0; i<univRow.length; i++){
    for(let j =0; j<4;j++){
      if(bingo(univRow[i].children[j].style.backgroundColor,univRow[i].children[j+1].style.backgroundColor,
        univRow[i].children[j+2].style.backgroundColor,univRow[i].children[j+3].style.backgroundColor)){
          return true;
        }
    }
  }
}

function verticalBingo(){
  for(let j=0; j<7; j++){
    for(let i =0; i<3;i++){
      if(bingo(univRow[i].children[j].style.backgroundColor,univRow[i+1].children[j].style.backgroundColor,
        univRow[i+2].children[j].style.backgroundColor,univRow[i+3].children[j].style.backgroundColor)){
          return true;
        }
      }
    }
}

//bingo moving down and to the right
function posDiagonalBingo(){
  for(let j=0; j<4; j++){
    for(let i =0; i<3;i++){
      if(bingo(univRow[i].children[j].style.backgroundColor,univRow[i+1].children[j+1].style.backgroundColor,
        univRow[i+2].children[j+2].style.backgroundColor,univRow[i+3].children[j+3].style.backgroundColor)){
          return true;
        }
      }
    }
}

//bingo moving up and to the right
function negDiagonalBingo(){
  for(let j=0; j<4; j++){
    for(let i =5; i>2;i--){
      if(bingo(univRow[i].children[j].style.backgroundColor,univRow[i-1].children[j+1].style.backgroundColor,
        univRow[i-2].children[j+2].style.backgroundColor,univRow[i-3].children[j+3].style.backgroundColor)){
          return true;
        }
      }
    }
}

//checks bingos in all directions, just shortens discColor()
function allPossBingos(){
  if(negDiagonalBingo() || posDiagonalBingo() || horizontalBingo() || verticalBingo() ){
    return true;
  }
}

//in case no one wins
function noBingos(){
  let noWins = []; //empty array
  for(let i =0; i<hole.length; i++){
    if(hole[i].style.backgroundColor != 'white'){
      noWins.push(hole[i]); //for every full hole, adds one into the empty array
    }
  }
  if(noWins.length == hole.length){ //if we make it through the whole board with no winner, return true for noBingos
    return true;
  }
}

//clear the board without refreshing page
document.querySelector("#clear").addEventListener("click",()=>{
  for(let i =0; i<hole.length; i++){
    hole[i].style.backgroundColor = 'white';
  }
  console.log("new game now");
  newGame();
});
