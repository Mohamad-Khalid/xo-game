'use strict'

// Array contains square ids to check which one has been clicked
const ids = ['s0','s1','s2',
             's3','s4','s5',
             's6','s7','s8']

const marked = [];
const valid = [0,1,2,3,4,5,6,7,8]

let xChar = 'X'              
let yChar = 'O'              
let turn = true;


let onGame = true;
for(let i = 0 ;i<9 ;i++){
  let square  = document.getElementById(ids[i]);
  square.onclick = function(){
    if(!marked.includes(i)){  
      square.textContent = (turn? xChar : yChar);
      turn= !turn;
      marked.push(i);
      valid.splice(valid.indexOf(i),1);
       if(winStatus(i,square.textContent)){
        return;
       }

      // program turn | setTimeout --> to delay for a time 
      setTimeout(function(){
      let proSquare = valid[(Math.floor(Math.random()*100))%valid.length];
      // console.log(proSquare)
      let progrmPress = document.getElementById(ids[proSquare]);
      progrmPress.textContent = (turn? xChar : yChar);
      turn= !turn;
      marked.push(proSquare);
      valid.splice(valid.indexOf(proSquare),1);
       // win
       if(winStatus(proSquare,progrmPress.textContent)){
        return;
       }
      }, 400);  
      
    }
  }
}




//---------------------------------------------

function winStatus(cell , char ){
  // check if the player won
  let win = checkIfWin(cell,char);
  if(win){
    for(let i=0 ;i<9 ;i++){
      if(!marked.includes(i))
        marked.push(i)
    }

    let prg = document.getElementById('prg');
    prg.textContent = char + ' is the winner';
    playAgain()
  }
   // if there is no winner 
   if(!win && marked.length==9){
     prg.textContent ='No winner';
     playAgain() 
   }
   return win;
}


function playAgain(){
  let playAgain = document.getElementById('btn');
  playAgain.style.visibility = 'visible';  
  playAgain.onclick = function(){
    window.location.reload();
    // setTimeout(function(){window.location.reload();}, 0);  
  }   
}



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
