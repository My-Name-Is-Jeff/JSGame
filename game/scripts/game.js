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

class Game {
    init() {
        //setup the DOM
        window.scene = this.scene = new Scene();
        document.getElementById("game").appendChild(this.scene.canvas);
        this.scene.setSize(800, 600);
        this.scene.hideCursor();
        this.scene.setPos(0, 0);
        document.addEventListener("keydown", this.onKeyPress.bind(this));

        // setup counters
        this.scoreElement = document.getElementById("score-counter");
        this.livesElement = document.getElementById("lives-counter");

        this.score = 0;
        this.lives = 3;
        this.addScore(0);
        this.removeLives(0);


        // setup sprites
        this.background = new Background();
        this.crosshair = new Crosshair();
        this.spaceship = new Spaceship();

        // setup asteroids
        this.asteroids = [];
        this.queuedSpawns = 0;

        // setup konami
        this.konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
        this.konamiIndex = 0;

        // setup timer
        this.timer = new Timer();

        // setup game loop
        this.scene.start();
    }

    tick() {
        // clear the screen
        this.scene.clear();
        // draw the background
        this.background.tick();
        this.spaceship.tick();

        // spawn asteroids
        this.queuedSpawns += Math.log(this.timer.getElapsedTime() + 1) / 20;
        while (this.queuedSpawns >= 1) {
            this.queuedSpawns--;
            this.spawnAsteroid();
        }

        // update and draw the asteroids, remove if off screen
        let newArr = [];
        for (const asteroid of this.asteroids) {
            asteroid.tick();
            if (asteroid.visible) newArr.push(asteroid);
        }
        this.asteroids = newArr;

        // update and draw the crosshair
        this.crosshair.tick();
    }

    spawnAsteroid() {
        this.asteroids.push(new Asteroid());
    }

    getMousePos() {
        // actually accurate mouse function
        let bounds = scene.canvas.getBoundingClientRect();
        return [document.mouseX - bounds.left, document.mouseY - bounds.top];
    }

    addScore(amount = 1) {
        // add score and update the score counter
        this.score += amount;
        this.scoreElement.innerHTML = this.score;
        this.checkGameState();
    }

    removeLives(amount = 1) {
        // remove lives and update the lives counter
        this.lives -= amount;
        this.livesElement.innerHTML = this.lives;
        this.checkGameState();
    }

    onKeyPress(e) {
        this.checkKonami(e);
    }

    checkGameState() {
        // check if the game is over
        if (this.lives > 0 && this.score < 50) return;
        let gameState = {
            won: this.lives > 0 && this.score >= 50,
            time: this.timer.getElapsedTime(),
            score: this.score,
            lives: this.lives
        }
        scene.stop();
        // save the game stats
        localStorage.setItem("lastGameState", JSON.stringify(gameState));
        // show the game over screen
        window.location.href = "../gameended.html";
    }

    checkKonami(e) {
        if (e.key === this.konami[this.konamiIndex]) {
            this.konamiIndex++;
            if (this.konamiIndex === this.konami.length) {
                this.konamiIndex = 0;
                this.removeLives(-100);
            }
        } else this.konamiIndex = 0;
    }
}

function update() {
    game.tick();
}