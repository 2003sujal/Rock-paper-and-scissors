document.addEventListener('DOMContentLoaded', () => {
  let userscore = 0;
  let compscore = 0;
  const puserscore = document.getElementById("user_score");
  const pcompscore = document.getElementById("comp_score");
  const choices = document.querySelectorAll(".choice");
  const msg = document.querySelector(".content");
  const userMoveImg = document.getElementById('user_move_img');
  const compMoveImg = document.getElementById('comp_move_img');
  const resetBtn = document.getElementById('reset');

  const imgMap = {
    rock: 'images/rock-paper-scissors-hand-icons 3.PNG',
    paper: 'images/rock-paper-scissors-hand-icons.PNG',
    scissors: 'images/rock-paper-scissors-hand-icons 2.PNG'
  };

  const saveScores = () => {
    localStorage.setItem('rps_user', String(userscore));
    localStorage.setItem('rps_comp', String(compscore));
  };

  const loadScores = () => {
    const u = parseInt(localStorage.getItem('rps_user'));
    const c = parseInt(localStorage.getItem('rps_comp'));
    if (!Number.isNaN(u)) userscore = u;
    if (!Number.isNaN(c)) compscore = c;
    puserscore.innerText = userscore;
    pcompscore.innerText = compscore;
  };

  const generate = () => {
    const options = ["rock", "paper", "scissors"];
    const rnd = Math.floor(Math.random() * 3);
    return options[rnd];
  };

  const drawGame = () => {
    msg.innerText = `Game was a draw`;
    msg.style.backgroundColor = "#536493";
  };

  const showWinner = (userwin, compchoice) => {
    if (userwin) {
      userscore++;
      puserscore.innerText = userscore;
      msg.innerText = `You won! Comp chose ${compchoice}`;
      msg.style.backgroundColor = "green";
    } else {
      compscore++;
      pcompscore.innerText = compscore;
      msg.innerText = `You lost. Comp chose ${compchoice}`;
      msg.style.backgroundColor = "red";
    }
    saveScores();
  };

  const highlightChoice = (el) => {
    if (!el) return;
    el.classList.add('highlight');
    setTimeout(() => el.classList.remove('highlight'), 600);
  };

  const game = (userchoice, choiceEl) => {
    const compchoice = generate();
    // update move images
    if (userMoveImg) userMoveImg.src = imgMap[userchoice] || '';
    if (compMoveImg) compMoveImg.src = imgMap[compchoice] || '';

    if (userchoice === compchoice) {
      drawGame();
    } else {
      let userWin = true;
      if (userchoice === "rock") {
        userWin = compchoice === "paper" ? false : true;
      } else if (userchoice === "paper") {
        userWin = compchoice === "scissors" ? false : true;
      } else {
        userWin = compchoice === "rock" ? false : true;
      }
      showWinner(userWin, compchoice);
    }

    // visual feedback
    highlightChoice(choiceEl);
    // highlight computer's corresponding element
    const compEl = document.getElementById(compchoice);
    highlightChoice(compEl);
  };

  // wire up choice buttons
  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      const userchoice = choice.getAttribute("id");
      game(userchoice, choice);
    });
  });

  // reset button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      userscore = 0;
      compscore = 0;
      puserscore.innerText = userscore;
      pcompscore.innerText = compscore;
      localStorage.removeItem('rps_user');
      localStorage.removeItem('rps_comp');
      msg.innerText = 'Scores reset';
      msg.style.backgroundColor = '#536493';
      if (userMoveImg) userMoveImg.src = '';
      if (compMoveImg) compMoveImg.src = '';
    });
  }

  loadScores();
});
