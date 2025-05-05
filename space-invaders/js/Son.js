// space‑invaders/js/sounds.js
const menu   = new Audio('../../assets/Son/menu.mp3');
const game   = new Audio('../../assets/Son/gameplay.mp3');
const over   = new Audio('../../assets/Son/gameover.mp3');

menu.loop = game.loop = true;
let muted = false;
function stopAll(){
  [menu, game, over].forEach(a=>{
    a.pause();
    a.currentTime = 0;
  });
}
export function playMenu(){
  stopAll();
  if(!muted){ menu.play(); }
}
export function playGame(){
  stopAll();
  if(!muted){ game.play(); }
}
export function playGameOver(){
  stopAll();
  if(!muted){ over.play(); }
}
export function toggleMute(){
  muted = !muted;
  [menu, game, over].forEach(a=> a.muted = muted);
  return muted;                
}
export function setMuted(state){
    muted = state;
    [menu, game, over].forEach(a => a.muted = muted);
  }
  
