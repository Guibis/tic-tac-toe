const currentPlayer = document.querySelector(".currentPlayer");
const score = document.querySelector(".score");
const mainElement = document.querySelector("main");
const bodyElement = document.querySelector("body");
const dialog = document.getElementById("resultDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogMessage = document.getElementById("dialogMessage");
const dialogButton = document.getElementById("dialogButton");

const pLetters = ["X","O"];
let selected;
let scores = [0,0];
let player = pLetters[Math.floor(Math.random()*2)];

let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function init() {
  selected = [];

  currentPlayer.innerHTML = `Player's turn: ${player}`;

  playerBorder();

  score.innerHTML = `<div style="color:#02AB72">Player ${pLetters[0]}: ${scores[0]}</div><br/>
  <div style="color:#03D5FB">Player ${pLetters[1]}: ${scores[1]}</div>`;

  document.querySelectorAll(".tic-tac button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
}

init();

function showDialog(title, message){
  dialogTitle.innerHTML = title;
  dialogMessage.innerHTML = message;
  dialog.show();
}

const closeDialog = () => {
  dialog.close();
  init();
};

dialogButton.addEventListener("click", closeDialog);

function newMove(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = player;
  e.target.removeEventListener("click", newMove);
  selected[index] = player;

  setTimeout(() => {
    check();
  }, [100]);

  player = player === pLetters[0] ? pLetters[1] : pLetters[0];
  currentPlayer.innerHTML = `Player's turn: ${player}`;

  playerBorder();
}

function check() {
  let playerLastMove = player === pLetters[0] ? pLetters[1] : pLetters[0];

  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

  for (pos of positions) {
    
    if (pos.every((item) => items.includes(item))) {
      showDialog("VICTORY!!", `THE PLAYER '${playerLastMove}' WIN`);
      if(playerLastMove === pLetters[0]){
        scores[0]++;
        return;
      }
      if(playerLastMove === pLetters[1]){
        scores[1]++;
        return;
      }
    }
    if (selected.filter((item) => item).length === 9) {
      showDialog("DRAW!!", "No winner this time!");
    }
  }
}

function reset(){

    document.querySelectorAll(".tic-tac button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
  if(scores[0] > scores[1]){
      showDialog("VICTORY!!", `THE PLAYER '${pLetters[0]}' WON THIS MATCH!!`);
    }
    if(scores[1] > scores[0]){
        showDialog("VICTORY!!", `THE PLAYER '${pLetters[1]}' WON THIS MATCH!!`);
    }
    if(scores[0] == scores[1]){
        showDialog("DRAW!!", "No winner this time!");
    }
    
    scores[0] = 0;
    scores[1] = 0; 
}

function playerBorder(){
  if(player === pLetters[0]){
    mainElement.style.border = "4px inset rgb(0, 228, 0)";
    bodyElement.style.backgroundColor = "#02AB72";
  } else if(player === pLetters[1]){
    mainElement.style.border = "4px outset rgb(0, 0, 207)";
    bodyElement.style.backgroundColor = "#03D5FB";
  }
}