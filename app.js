/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init ();

//document.querySelector ('#current-' + activePlayer).innerHTML =
//'<em>' + dice + '</em>';

//var x = document.querySelector ('#score-0').textContent;
//console.log (x);

document.querySelector ('.btn-roll').addEventListener ('click', function () {
  if (gamePlaying) {
    //Random Number generator

    var dice = Math.floor (Math.random () * 6) + 1;
    var dice2 = Math.floor (Math.random () * 6) + 1;

    //Updates the dice images to display the score
    var diceDOM = document.querySelector ('.dice');
    var diceDOM2 = document.querySelector ('.dice2');
    diceDOM.style.display = 'block';
    diceDOM2.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';
    //Update the round score only if the generated random number in NOT one
    if (dice !== 1 && dice2 !== 1) {
      roundScore += dice + dice2;
      document.querySelector (
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer ();
    }
  }
});

document.querySelector ('.btn-hold').addEventListener ('click', function () {
  if (gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update the UI
    var global = (document.querySelector (
      '#score-' + activePlayer
    ).textContent =
      scores[activePlayer]);
    //check is player has won or //
    var Input = document.querySelector ('.input').value;
    var WinningScore;
    if (Input) {
      WinningScore = Input;
    } else {
      WinningScore = 100;
    }
    if (global >= WinningScore) {
      document.querySelector ('#name-' + activePlayer).textContent =
        'Winner..!';
      document.querySelector ('.dice').style.display = 'none';
      document.querySelector ('.dice2').style.display = 'none';
      document
        .querySelector ('.player-' + activePlayer + '-panel')
        .classList.add ('winner');
      document
        .querySelector ('.player-' + activePlayer + '-panel')
        .classList.remove ('active');
      gamePlaying = false;
    } else {
      //Next Player
      nextPlayer ();
    }
  }
});

function nextPlayer () {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById ('current-0').textContent = '0';
  document.getElementById ('current-1').textContent = '0';

  document.querySelector ('.player-0-panel').classList.toggle ('active');
  document.querySelector ('.player-1-panel').classList.toggle ('active');
  document.querySelector ('.dice').style.display = 'none';
  document.querySelector ('.dice2').style.display = 'none';
}

document.querySelector ('.btn-new').addEventListener ('click', init);

function init () {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.getElementById ('score-0').textContent = '0';
  document.getElementById ('current-0').textContent = '0';
  document.getElementById ('score-1').textContent = '0';
  document.getElementById ('current-1').textContent = '0';
  document.querySelector ('.dice').style.display = 'none';
  document.querySelector ('.dice2').style.display = 'none';
  document.querySelector ('#name-0').textContent = 'PLAYER 1';
  document.querySelector ('#name-1').textContent = 'PLAYER 2';
  document.querySelector ('.player-0-panel').classList.remove ('winner');
  document.querySelector ('.player-1-panel').classList.remove ('winner');
  document.querySelector ('.player-0-panel').classList.remove ('active');
  document.querySelector ('.player-1-panel').classList.remove ('active');
  document.querySelector ('.player-0-panel').classList.add ('active');
}
