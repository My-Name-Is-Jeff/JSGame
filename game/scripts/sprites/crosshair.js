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

class Crosshair extends Sprite {

    static hitSound = new Howl({
        src: ["assets/hit.mp3"]
    });
    static missSound = new Howl({
        src: ["assets/miss.mp3"],
        volume: 0.2
    });

    constructor() {
        super(scene, "assets/crosshair.png", 50, 50);
        // stop the crosshair from wrapping
        this.setBoundAction(STOP);
        // bind the shoot handler to mouseup so it can't be held down
        document.addEventListener("mouseup", this.shoot.bind(this))
    }

    tick() {
/*        if (scene.getMouseClicked())
            this.shoot();*/
        let [x, y] = game.getMousePos();
        this.setPosition(x, y);
        this.update();
    }

    shoot(e) {
        let hitAny = false;
        // Loop through all the asteroids
        game.asteroids = game.asteroids.filter(asteroid => {
            // check if the crosshair hit the asteroid
           if (this.collidesWith(asteroid)) {
               hitAny = true;
               game.addScore();
               asteroid.die();
               Crosshair.hitSound.play();
               // remove the asteroid from future ticks
               return false;
           }
           // keep the asteroid
           return true;
        });
        // check if the crosshair shot the spaceship
        if (this.collidesWith(game.spaceship)) {
            hitAny = true;
            game.spaceship.hit();
            Crosshair.hitSound.play();
        }
        if (!hitAny) {
            // play a sound if the crosshair missed
            Crosshair.missSound.play();
        }
    }
}