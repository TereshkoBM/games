console.log(`
1. Вёрстка +10
  - реализован интерфейс игры +5
  -в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При кликах по игровому полю по очереди отображаются крестики и нолики. Первая фигура всегда крестик +10
3. Игра завершается, когда три фигуры (крестики-нолики), пять фигур (Рэндзю и Гомоку) выстроились в ряд по вертикали, горизонтали или диагонали +10
4. По окончанию игры выводится её результат - выигравшая фигура и количество ходов от начала игры до её завершения +10
5. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой отображаются результаты предыдущих 10 игр +10
6. Звуки по результам игры.  +10
7. Дополнительный не предусмотренный в задании функционал (игры Рэндзю и Гомоку, сохранение и загрузки игры, смена языка интерфейса), улучшающий качество приложения +10
 Итого : 70 (max 60)
`);
const runGameRenju = document.getElementById("renju");
const runGameGomoku = document.getElementById("gomoku");
const runGameTictactoe = document.getElementById("tictactoe");
const runReset = document.getElementById("reset");
const runSave = document.getElementById("save");
const runLoad = document.getElementById("load");
const runResults = document.getElementById("results");
const el_hamburger = document.querySelector(".hamburger");
const el_nav = document.querySelector(".nav");
const nav_links = document.querySelectorAll(".nav-link");
const switchLngEn = document.getElementById("switch-lng_en");
const switchLngRu = document.getElementById("switch-lng_ru");
const main = document.getElementById("main");
const elementList = document.querySelectorAll("[data-i18n]");
const moveGamer = document.getElementById("move");
const contentResults = document.getElementById("content-results");
const modalResult = document.getElementById("modal-results");
const overlay = document.getElementById("overlay");
const btnClose = document.getElementById("btn-close");

const audio = new Audio();
const i18Obj = {
  en: {
    name: "5 stones",
    renju: "Renju: 15x15",
    gomoku: "Gomoku: 19x19",
    tictactoe: "Tic-tac-toe",
    reset: "Reset",
    save: "Save",
    load: "Load",
    gamer: "The player ",
    btnClose: "Close window",
    results: "Results",
  },
  ru: {
    name: "5 камней",
    renju: "Рэндзю: 15x15",
    gomoku: "Гомоку: 19x19",
    tictactoe: "Крестики-нолики",
    reset: "Сброс",
    save: "Cохранить",
    load: "Загрузить",
    gamer: "Игрок ",
    btnClose: "Закрыть окно",
    results: "Результаты",
  },
};
let gameNow = 0;
let lang = "ru";
let move = 0;
let moves = [];
let box = [];
let resGameLS = [];
let sizeBox = 40;
let sizeArea = 15;
let runGame = true;
let stones = 5;
let gameDate = new Date();



runGameRenju.addEventListener("click", () => {
  if (gameNow) {
    startGameRenju();
  }
});

function startGameRenju() {
  main.innerHTML = "";
  gameNow = 0;
  runGame = true;
  sizeBox = 40;
  sizeArea = 15;
  stones = 5;
  move = 0;
  moves = [];
  moveGamer.innerHTML = "X";
  runGameRenju.classList.add("game-active");
  runGameGomoku.classList.remove("game-active");
  runGameTictactoe.classList.remove("game-active");
  addElementArea();
}

runGameGomoku.addEventListener("click", () => {
  if (!(gameNow === 1)) {
    startGameGomoku();
  }
});
function startGameGomoku() {
  main.innerHTML = "";
  gameNow = 1;
  runGame = true;
  sizeBox = 30;
  sizeArea = 19;
  stones = 5;
  move = 0;
  moves = [];
  moveGamer.innerHTML = "X";
  runGameRenju.classList.remove("game-active");
  runGameGomoku.classList.add("game-active");
  runGameTictactoe.classList.remove("game-active");
  addElementArea();
}

runGameTictactoe.addEventListener("click", () => {
  if (!(gameNow === 2)) {
    startGameTictactoe();
  }
});
function startGameTictactoe() {
  main.innerHTML = "";
  gameNow = 2;
  runGame = true;
  sizeBox = 100;
  sizeArea = 3;
  stones = 3;
  move = 0;
  moves = [];
  moveGamer.innerHTML = "X";
  runGameRenju.classList.remove("game-active");
  runGameGomoku.classList.remove("game-active");
  runGameTictactoe.classList.add("game-active");
  addElementArea();
}

runReset.addEventListener("click", () => {
  startReset();
});

function startReset() {
  main.innerHTML = "";
  runGame = true;
  move = 0;
  moves = [];
  moveGamer.innerHTML = "X";
  addElementArea();
}

function openMenu() {
  el_hamburger.classList.toggle("open");
  el_nav.classList.toggle("open");
  if (!el_nav.classList.contains("open")) {
    document.documentElement.style.setProperty("--color-font-nav", "#fff");
  }
}

function closeMenu(event) {
  document.documentElement.style.setProperty("--color-font-nav", "#fff");
  if (event.target.classList.contains("nav-link")) {
    el_hamburger.classList.remove("open");
    el_nav.classList.remove("open");
  }
}

el_hamburger.addEventListener("click", openMenu);

el_nav.addEventListener("click", closeMenu);
nav_links.forEach((el_link) => {
  el_link.addEventListener("click", closeMenu);
});

function getTranslate(lng) {
  elementList.forEach(function (currentElement) {
    currentElement.textContent = i18Obj[lng][currentElement.dataset.i18n];
  });
  if (lng === "en") {
    switchLngEn.classList.add("switch-lng-active");
    switchLngRu.classList.remove("switch-lng-active");
  } else {
    switchLngRu.classList.add("switch-lng-active");
    switchLngEn.classList.remove("switch-lng-active");
  }
}

switchLngEn.addEventListener("click", () => {
  if (switchLngRu.classList.contains("switch-lng-active")) {
    lang = "en";
    getTranslate("en");
  }
});

switchLngRu.addEventListener("click", () => {
  if (switchLngEn.classList.contains("switch-lng-active")) {
    lang = "ru";
    getTranslate("ru");
  }
});

function addElementArea() {
  var newDivContainer = document.createElement("div");
  newDivContainer.style.className = "container";
  newDivContainer.style.width = "100%";
  newDivContainer.style.height = "100%";
  newDivContainer.style.display = "flex";
  newDivContainer.style.justifyContent = "center";
  newDivContainer.style.alignContent = "center";
  main.append(newDivContainer);

  var newDivAreaBoxes = document.createElement("div");
  newDivAreaBoxes.style.className = "area-boxes";
  newDivAreaBoxes.style.width = sizeArea * sizeBox + "px";
  newDivAreaBoxes.style.height = sizeArea * sizeBox + "px";
  newDivAreaBoxes.style.backgroundColor = "var(--background-color-area)";
  newDivAreaBoxes.style.display = "flex";
  newDivAreaBoxes.style.flexWrap = "wrap";
  newDivContainer.append(newDivAreaBoxes);

  box = [];
  for (let i = 0; i < sizeArea * sizeArea; i++) {
    box[i] = document.createElement("div");
    box[i].classList.add("box");
    box[i].style.width = sizeBox + "px";
    box[i].style.height = sizeBox + "px";
    box[i].id = i;
    newDivAreaBoxes.append(box[i]);
  }

  newDivAreaBoxes.addEventListener("click", (e) => {
    if (e.target.className === "box") {
      if (runGame) {
        if (e.target.innerHTML === "") {
          if (move % 2) {
            e.target.innerHTML = "0";
            moveGamer.innerHTML = "X";
            e.target.style.backgroundColor = "var(--background-color-0)";
            moves[move] = Number(e.target.id);
            if (checkWinner(e.target.id)) {
              runGame = false;
              playAudioWon();
              saveEndGameLocalStorage(0);
              if (lang === "ru")
                moveGamer.innerHTML = `0 - ВЫИГРАЛ (${moves.length} ходов)`;
              else moveGamer.innerHTML = `0 - WON (${Mathmoves.length} moves)`;
            }
          } else {
            e.target.innerHTML = "X";
            moveGamer.innerHTML = "0";
            e.target.style.backgroundColor = "var(--background-color-X)";
            moves[move] = Number(e.target.id);
            if (checkWinner(e.target.id)) {
              runGame = false;
              playAudioWon();
              saveEndGameLocalStorage(1);
              if (lang === "ru")
                moveGamer.innerHTML = `X - ВЫИГРАЛ  (${moves.length} ходов)`;
              else moveGamer.innerHTML = `X - WON (${moves.length} moves)`;
            }
          }
          if (move === sizeArea * sizeArea - 1) {
            if (lang === "ru") moveGamer.innerHTML = "НИЧЬЯ";
            else moveGamer.innerHTML = "DRAW";
            runGame = false;
            saveEndGameLocalStorage(2);
            playAudioDraw();
          }
          move++;
        }
      }
    }
  });
}
addElementArea();

const checkWinner = (id) => {
  let direction = 0;
  let count = 1;
  let current = Number(id);

  // check horizontal
  while (direction < 2) {
    if (direction === 0) {
      current--;
      if (current % sizeArea > id % sizeArea || current < 0) {
        direction++;
        current = Number(id);
      } else {
        if (box[id].innerHTML === box[current].innerHTML) {
          if (++count === stones) return true;
        } else {
          direction++;
          current = Number(id);
        }
      }
    } else {
      current++;
      if (
        !(current % sizeArea < id % sizeArea || current >= sizeArea * sizeArea)
      ) {
        if (box[id].innerHTML === box[current].innerHTML) {
          if (++count === stones) return true;
        } else {
          direction++;
        }
      } else direction++;
    }
  }

  // check vertical
  direction = 0;
  count = 1;
  current = Number(id);
  while (direction < 2) {
    if (direction === 0) {
      current -= Number(sizeArea);
      if (current < 0) {
        direction++;
        current = Number(id);
      } else {
        if (box[id].innerHTML === box[current].innerHTML) {
          if (++count === stones) return true;
        } else {
          direction++;
          current = Number(id);
        }
      }
    } else {
      current += Number(sizeArea);
      if (current < sizeArea * sizeArea) {
        if (box[id].innerHTML === box[current].innerHTML) {
          if (++count === stones) return true;
        } else {
          direction++;
        }
      } else direction++;
    }
  }

  // check left diagonal
  direction = 0;
  count = 1;
  current = Number(id);
  while (direction < 2) {
    if (direction === 0) {
      current -= Number(sizeArea + 1);
      if (current % sizeArea > id % sizeArea || current < 0) {
        direction++;
        current = Number(id);
      } else {
        if (box[id].innerHTML === box[current].innerHTML) {
          if (++count === stones) return true;
        } else {
          direction++;
          current = Number(id);
        }
      }
    } else {
      current += Number(sizeArea + 1);
      if (
        !(current % sizeArea < id % sizeArea || current >= sizeArea * sizeArea)
      ) {
        if (box[id].innerHTML === box[current].innerHTML) {
          if (++count === stones) return true;
        } else {
          direction++;
        }
      } else direction++;
    }
  }
  // check right diagonal
  direction = 0;
  count = 1;
  current = Number(id);
  while (direction < 2) {
    if (direction === 0) {
      current -= Number(sizeArea - 1);
      if (current % sizeArea < id % sizeArea || current < 0) {
        direction++;
        current = Number(id);
      } else {
        if (box[id].innerHTML === box[current].innerHTML) {
          if (++count === stones) return true;
        } else {
          direction++;
          current = Number(id);
        }
      }
    } else {
      current += Number(sizeArea - 1);
      if (
        !(current % sizeArea > id % sizeArea || current >= sizeArea * sizeArea)
      ) {
        if (box[id].innerHTML === box[current].innerHTML) {
          if (++count === stones) return true;
        } else {
          direction++;
        }
      } else direction++;
    }
  }
  return false;
};

function preloadAudio() {
  const audio = new Audio();
  audio.src = "./assets/audio/won.mp3";
  audio.src = "./assets/audio/draw.mp3";
}
preloadAudio();

function playAudioWon() {
  audio.src = "./assets/audio/won.mp3";
  audio.currentTime = 0;
  audio.play();
}

function playAudioDraw() {
  audio.src = "./assets/audio/draw.mp3";
  audio.currentTime = 0;
  audio.play();
}
function saveEndGameLocalStorage(res) {
  let resGameOld = localStorage.getItem("resGame");
  d = new Date();  
  let resGame = `${d.getDate()},${d.getMonth()+1},${d.getFullYear()},${d.getHours()},${d.getMinutes()},${gameNow},${move+1},${res}`;
  if (resGameOld !== null) resGame = `${resGame},${resGameOld}`;
  localStorage.setItem("resGame", resGame);
}

function loadEndGameLocalStorage() {
  let resGameOld = localStorage.getItem("resGame").split(",");
  resGameLS = resGameOld.map(Number);
}

function saveGameLocalStorage() {
  localStorage.setItem("gameNow", gameNow);
  localStorage.setItem("moves", moves);
}

function loadGameLocalStorage() {
  gameNow = Number(localStorage.getItem("gameNow"));
  switch (gameNow) {
    case 0:
      startGameRenju();
      break;
    case 1:
      startGameGomoku();
      break;
    case 2:
      startGameTictactoe();
      break;
  }
  movesOld = localStorage.getItem("moves").split(",");
  moves = movesOld.map(Number);
  for (let i = 0; i < moves.length; i++) {
    if (i % 2) {
      box[moves[i]].innerHTML = "0";
      box[moves[i]].style.backgroundColor = "var(--background-color-0)";
    } else {
      box[moves[i]].innerHTML = "X";
      box[moves[i]].style.backgroundColor = "var(--background-color-X)";
    }
  }
  move = moves.length;

  if (move % 2) {
    moveGamer.innerHTML = "0";
    if (checkWinner(moves[moves.length - 1])) {
      runGame = false;
      playAudioWon();
      if (lang === "ru")
        moveGamer.innerHTML = `0 - ВЫИГРАЛ (${moves.length} ходов)`;
      else moveGamer.innerHTML = `0 - WON (${moves.length} moves)`;
    }
  } else {
    moveGamer.innerHTML = "X";
    if (checkWinner(moves[moves.length - 1])) {
      runGame = false;
      playAudioWon();
      if (lang === "ru")
        moveGamer.innerHTML = `X - ВЫИГРАЛ (${moves.length} ходов)`;
      else moveGamer.innerHTML = `X - WON (${moves.length} moves)`;
    }
  }
  if (move === sizeArea * sizeArea - 1) {
    if (lang === "ru") moveGamer.innerHTML = "НИЧЬЯ";
    else moveGamer.innerHTML = "DRAW";
    runGame = false;
    playAudioDraw();
  }
}

runSave.addEventListener("click", () => {
  saveGameLocalStorage();
});

runLoad.addEventListener("click", () => {
  loadGameLocalStorage();
});

function setLocalStorage() {
  localStorage.setItem("lang", lang);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("lang")) {
    lang = localStorage.getItem("lang");
    getTranslate(lang);
  }
}
window.addEventListener("load", getLocalStorage);

function showGameResults() {
  let tableResults='';
  let numRes=0;
  loadEndGameLocalStorage();
  if(resGameLS.length>80) numRes=10;
  else numRes=parseInt(resGameLS.length / 8);
  for(let i=0; i<numRes;i++)
  {
    let nameGame='';
    let whatResult='';
    let step='';
    let date = `${resGameLS[i*8]}/${resGameLS[i*8+1]}/${resGameLS[i*8+2]} ${resGameLS[i*8+3]}:${resGameLS[i*8+4]}`;
    switch(resGameLS[i*8+5]){
      case 0: nameGame='Рэндзю';break;
      case 1: nameGame='Гомоку';break;
      case 2: nameGame='Крестики-нолики';break;
    }
    switch(resGameLS[i*8+7]){
      case 0: whatResult='Выиграл 0';break;
      case 1: whatResult='Выиграл X';break;
      case 2: whatResult='Ничья';break;
    }
    if((resGameLS[i*8+7]) !== 2) step=`(${resGameLS[i*8+6]} ходов)`;
    tableResults+=`${i+1}. ${date} ${nameGame} ${whatResult} ${step}<BR>`;
  }
  contentResults.innerHTML = tableResults;
  modalResult.style.display = "block";
}

const closeModal = () => {
  modalResult.style.display = "none";
};

runResults.addEventListener("click", () => {
  showGameResults();
});

btnClose.addEventListener("click", () => {
  closeModal();
});