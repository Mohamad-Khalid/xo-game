'use strict'

// Array contains square ids to check which one has been clicked
const ids = ['s1','s2','s3',
              's4','s5','s6',
              's7','s8','s9']

// Mark clicked square and put in the array marked 
const marked = [];

let xChar = 'X'              
let yChar = 'O'              
let turn = true;

// check the row , col , and digonals
function checkIfWin(cell , char){
  let winRow = true , winCol=true , winDig1=true , winDig2=true;
  // check rows
  if(cell >= 0  && cell <= 2){
    for( let i = 0 ; i<3;i++){
      let c = document.getElementById(ids[i]);
      if(!(c.textContent==char)) {
        winRow = false;
        break;
      }
    } 
  } 

  if(cell >= 3  && cell <= 5){
    for( let i = 3 ; i<=5;i++){
      let c = document.getElementById(ids[i]);
      if(!(c.textContent==char)) {
        winRow = false;
        break;
      }
    } 
  } 

  if(cell >= 6  && cell <= 8){
    for( let i = 6 ; i<9;i++){
      let c = document.getElementById(ids[i]);
      if(!(c.textContent==char)) {
        winRow = false;
        break;
      }
    } 
  } 

 
  // check columns 
  if(cell == 0 || cell==3 || cell==6  ){
    for( let i = 0 ; i<=6;i+=3){
      let c = document.getElementById(ids[i]);
      if(!(c.textContent==char)) {
        winCol = false;
        break;
      }
    } 
  } 

  if(cell == 1 || cell==4 || cell==7  ){
    for( let i = 1 ; i<=7;i+=3){
      let c = document.getElementById(ids[i]);
      if(!(c.textContent==char)) {
        winCol = false;
        break;
      }
    } 
  } 

  if(cell == 2 || cell==5 || cell==8  ){
    for( let i = 2 ; i<=8;i+=3){
      let c = document.getElementById(ids[i]);
      if(!(c.textContent==char)) {
        winCol = false;
        break;
      }
    } 
  } 

  //check digonals
    for( let i = 0 ;i<=8 ;i+=4){
      let c = document.getElementById(ids[i]);
      if(!(c.textContent==char)){
        winDig1 = false;
        break;
      }
    }

    for( let i = 2 ;i<=6 ;i+=2){
      let c = document.getElementById(ids[i]);
      if(!(c.textContent==char)){
        winDig2 = false;
        break;
      }
    }
  
  return  winRow || winCol  || winDig1 || winDig2;
}


function playAgain(){
  let playAgain = document.getElementById('btn');
  playAgain.style.visibility = 'visible';  
  playAgain.onclick = function(){
    window.location.reload();
    // setTimeout(function(){window.location.reload();}, 0);  
  }   
}

for(let i=0 ; i<9 ;i++){
  let x = document.getElementById(ids[i]);
    x.onclick = function(){
    if(!marked.includes(i)){
      x.textContent = (turn==true? xChar : yChar);
      turn = !turn;
      marked.push(i);
      // check if the player won
      let win = checkIfWin(i,x.textContent);
      if(win){
        for(let i=0 ;i<9 ;i++){
          if(!marked.includes(i))
            marked.push(i)
        }

        let prg = document.getElementById('prg');
        prg.textContent = x.textContent + ' is the winner';
        playAgain()
      }
      // if there is no winner 
      if(!win && marked.length==9){
        prg.textContent ='No winner';
        playAgain() 
      }
    } 
  } 
}


