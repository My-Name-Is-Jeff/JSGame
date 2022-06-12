/*
 *     Meteor Mania - HTML5 Game for School
 *     Copyright (C) 2022  My-Name-Is-Jeff
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Affero General Public License as
 *     published by the Free Software Foundation, either version 3 of the
 *     License, or any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU Affero General Public License for more details.
 *
 *     You should have received a copy of the GNU Affero General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

let lastGame = JSON.parse(localStorage.getItem("lastGameState"));
if (!lastGame) window.location.href = "index.html";

let bestGame = JSON.parse(localStorage.getItem("bestGameState")) ?? lastGame;
let isNewBest = false;
if (bestGame.score <= lastGame.score && bestGame.lives <= lastGame.score && bestGame.time <= lastGame.time) {
    bestGame = lastGame;
    isNewBest = true;
}
localStorage.setItem("bestGameState", JSON.stringify(bestGame));

let elements = {
    result: document.getElementById("result"),
    taunt: document.getElementById("taunt"),
    score: document.getElementById("score"),
    lives: document.getElementById("lives"),
    time: document.getElementById("time"),
    bestScore: document.getElementById("highest-score"),
    bestLives: document.getElementById("highest-lives"),
    bestTime: document.getElementById("highest-time"),
}

elements.result.innerHTML = `You ${lastGame.won ? "won" : "died"}!`;
elements.result.classList.add(`text-bg-${lastGame.won ? "success" : "danger"}`);

let taunts;
if (!lastGame.won) {
    taunts = [
        "You can do it!",
        "Better luck next time!",
        "You're not bad... Are you?",
        "Your score sucks...",
        "I'm disappointed",
        "Oh no, you died!",
        "Featuring 0% win rate!",
        "You're a terrible player!",
        "How'd you lose?",
        "I went easy...",
        "Nice shot! Oh wait you missed",
        "Try harder!"
    ];
} else {
    taunts = [
        "I knew you could do it!",
        "You're a winner!",
        "Nice job!",
        "I never lost faith in you!",
        "You must have cheated!",
        "I want a rematch!",
        "How...",
        "That's unexpected."
    ];
}

elements.taunt.innerHTML = taunts[Math.floor(Math.random() * taunts.length)];

if (isNewBest) {
    elements.taunt.innerHTML = "New high score!";
}

elements.score.innerHTML = lastGame.score;
elements.lives.innerHTML = lastGame.lives;
elements.time.innerHTML = lastGame.time;

elements.bestScore.innerHTML = bestGame.score;
elements.bestLives.innerHTML = bestGame.lives;
elements.bestTime.innerHTML = bestGame.time;

history.pushState(null, document.title, `game/${lastGame.won ? "win" : "loss"}`);