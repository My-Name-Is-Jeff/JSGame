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

class Spaceship extends Sprite {
    static hurtSound = new Howl({
        src: ["assets/hurt.mp3"]
    });

    constructor() {
        super(scene, "assets/spaceship.png", 50, 50);
        // put the spaceship in the center of the screen
        this.setPosition(scene.width / 2, scene.height / 2);
        // calculate helpers to save time
        this.positionVector = [this.x, this.y];
        this.hypotenuse = pythagoras(this.x, this.y);
    }

    tick() {
        this.update();
    }

    /**
     * Called when the spaceship is hit by an asteroid or the spaceship itself
     * Removes 1 life from the spaceship
    */
    hit() {
        Spaceship.hurtSound.play();
        game.removeLives();
    }
}