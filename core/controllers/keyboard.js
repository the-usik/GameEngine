import { KEY_CODES } from "/core/utils/constants.js";

class KeyboardController {
    pressedKeys = new Set();

    constructor(parentContext = {}) {
        this.parentContext = parentContext;
    }

    onKeyDown(keyboardEvent) {
        this.pressedKeys.add(keyboardEvent.keyCode);

        let { player } = this.parentContext;
        let offset = 50;
        for (let keyCode of this.pressedKeys) {
            if (keyCode == 38) {
                player.moveUp();
                // player.direction.y -= offset;
            }

            if (keyCode == 40) {
                player.moveDown();
                // player.direction.y += offset;
            }

            if (keyCode == KEY_CODES.MOVE_LEFT) {
                player.moveLeft();
                // player.direction.x -= offset;
                // player.moveLeft();
            }

            if (keyCode == KEY_CODES.MOVE_RIGHT) {
                // player.direction.x += offset;
                player.moveRight();
            }
        }
    }

    onKeyUp(keyboardEvent) {
        this.pressedKeys.delete(keyboardEvent.keyCode);
    }

    onKeyPress(keyboardEvent) { console.log("key press") }
}

export default KeyboardController;