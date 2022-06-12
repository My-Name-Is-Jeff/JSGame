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

class GameLoader {

    constructor(scripts) {
        this.requiredScripts = scripts;
    }

    async loadScripts() {
        for (let script of this.requiredScripts) {
            await this.#loadScript(`scripts/${script}.js`);
        }
        try {
            window.game = this.game = new Game();
            game.init();
        } catch (e) {
            console.error(e);
            window.location.reload();
        }
    }

    #loadScript(scriptName) {
        return new Promise((resolve, reject) => {
            try {
                // create a new script element
                let script = document.createElement("script");
                script.src = scriptName;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            } catch (e) {
                reject(e);
            }
        });
    }
}

const gameLoader = new GameLoader([
    "gamelib",
    "utils",
    "sprites/asteroid",
    "sprites/background",
    "sprites/crosshair",
    "sprites/spaceship",
    "game",
]);

gameLoader.loadScripts();