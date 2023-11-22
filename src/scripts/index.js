const state = {
  view:{
    window: document.querySelectorAll('.window'),
    enemy: document.querySelector('.enemy'),
    time: document.querySelector('[time]'),
    score: document.querySelector('[score]')
    
  },
  values:{
    timerId: null,
    gameVelocity: 800,
    hitPosition: 0,
    result: 0,
    time: 20,
    currentTime: 20
  }
};

const countDown = () => {
  state.values.currentTime--;
  state.view.time.textContent = state.values.currentTime;
  if(state.values.currentTime < 0){
    clearInterval(state.values.timerId);
    clearInterval(countDownTimerId);
    alert('Game over! Sua pontuação foi: ' + state.values.result);
    state.values.currentTime = state.values.time;
    state.view.time.textContent = state.values.currentTime;
    state.values.result = 0;
    state.view.score.textContent = 0;
    moveEnemy();
    countDownTimerId = setInterval(countDown, 1000);
  };
}

let countDownTimerId = setInterval(countDown, 1000);


const moveEnemy = () => {
  state.values.timerId = setInterval(randomWindow, state.values.gameVelocity);
}

const randomWindow = ()=>{
  state.view.window.forEach((window)=>{
    window.classList.remove('enemy');
  });
  let randomNumber = Math.floor(Math.random() * 9);
  let randomWindow = state.view.window[randomNumber];
  randomWindow.classList.add('enemy');
  state.values.hitPosition = randomWindow.id;
}

const addEventListenerHitBox = () => {
  state.view.window.forEach((window)=>{
    window.addEventListener('click', ()=>{
      if( window.id === state.values.hitPosition){
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
      }
    })
  })
};

const initialize = () => {
  state.view.time.textContent = state.values.currentTime
  moveEnemy();
  addEventListenerHitBox();
};

initialize();