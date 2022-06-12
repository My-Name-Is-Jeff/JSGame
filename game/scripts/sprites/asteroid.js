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

class Asteroid extends Sprite {
    constructor() {
        super(scene, "assets/asteroid.png", 50, 50);
        // set it to continue because the asteroid spawns off screen
        this.setBoundAction(CONTINUE);

        this.setupPosition();
    }

    setupPosition() {
        if (Math.random() < 0.5) {
            // come in from the top or bottom
            this.setPosition(Math.random() * scene.width, Math.random() < 0.5 ? -50 : scene.height + 50);
        } else {
            // come in from the left or right
            this.setPosition(Math.random() < 0.5 ? -50 : scene.width + 50, Math.random() * scene.height);
        }

        // set a speed that slowly exponentially increases based on time
        this.setSpeed(-Math.log(1/game.timer.getElapsedTime()) + 10);

        // align the asteroid to the spaceship
        let distX = game.spaceship.x - this.x;
        let distY = game.spaceship.y - this.y;
        let hyp = pythagoras(distX, distY);
        this.setDX(distX / hyp * this.speed);
        this.setDY(distY / hyp * this.speed);


        // point the asteroid towards the spaceship
        this.setImgAngle(
            toDegress(Math.acos(
                dotProduct(
                    game.spaceship.positionVector,
                    [this.x, this.y]
                ) /
                (pythagoras(this.x, this.y) * game.spaceship.hypotenuse)
            ))
        );
    }

    die() {
        this.hide();
    }

    tick() {
        // check to see if the asteroid touched the spaceship
        if (this.collidesWith(game.spaceship)) {
            game.spaceship.hit();
            this.die();
        }
        this.update();
    }
}