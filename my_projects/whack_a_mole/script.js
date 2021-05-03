'use strict';

const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');

const time = document.querySelector('#time-left');
const score = document.querySelector('#score');

const circles = document.querySelectorAll('.square');

let peepIntervalDestroyer;

let currentScore;

let currentTime;

let randomNumber;

function getRandomTime() {
  randomNumber = Math.trunc(Math.random() * 30) + 1;
  return randomNumber > 10 ? randomNumber : 10;
}

function displayTime(currentTime) {
  time.textContent = currentTime;
}

function displayScore(currentScore) {
  score.textContent = currentScore;
}

function displayMole() {
  resetMole();
  randomNumber = Math.trunc(Math.random() * 9);
  circles[randomNumber].classList.add('mole');
}

function resetTime() {
  clearInterval(peepIntervalDestroyer);
  currentTime = 0;
  displayTime(currentTime);
}

function resetScore() {
  currentScore = 0;
  displayScore(currentScore);
}

function resetMole() {
  circles.forEach(circle => {
    circle.classList.remove('mole');
  });
}

function reset() {
  resetTime();
  resetScore();
  resetMole();
}

function toggleDisabledButton() {
  startBtn.disabled = !startBtn.disabled;
  resetBtn.disabled = !resetBtn.disabled;
}

startBtn.addEventListener('click', function () {
  toggleDisabledButton();
  reset();
  currentTime = getRandomTime();
  displayMole();
  displayScore(currentScore);
  displayTime(currentTime);
  currentTime--;
  peepIntervalDestroyer = setInterval(() => {
    displayMole();
    displayTime(currentTime);
    if (currentTime <= 0) {
      const finalScore = currentScore;
      toggleDisabledButton();
      reset();
      displayScore(finalScore);
    }
    currentTime--;
  }, 1000);
});

circles.forEach(circle => {
  circle.addEventListener('click', function () {
    if (circle.classList.contains('mole')) {
      currentScore++;
      displayScore(currentScore);
    }
  });
});

resetBtn.addEventListener('click', function () {
  toggleDisabledButton();
  reset();
});
