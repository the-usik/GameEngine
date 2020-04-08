export default class GameRender {
    deltaTime = 0;
    currentTime = Date.now();
    previosTime = 0;

    constructor(parentContext = {}) {
        this.parentContext = parentContext;
        this.canvasContext = parentContext.canvasContext;
    }

    clearCanvas() {
        this.canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    renderObjects() {
        let { objects, camera, canvasContext } = this.parentContext;

        canvasContext.save();

        canvasContext.strokeStyle = "#000";

        for (let object of objects) {
            canvasContext.beginPath();
            canvasContext.rect(
                object.position.x - camera.offset.x, object.position.y - camera.offset.y,
                object.size.width, object.size.height);
            canvasContext.stroke();
            canvasContext.closePath();
        }

        canvasContext.restore();
    }


    renderPlayer() {
        let { player, camera, canvasContext, keyboardController } = this.parentContext;

        canvasContext.save();
        canvasContext.beginPath();
        canvasContext.fillStyle = "#333";
        canvasContext.strokeStyle = "steelBlue";
        canvasContext.rect(
            player.position.x - camera.offset.x, player.position.y - camera.offset.y,
            player.size.width, player.size.height
        );
        canvasContext.stroke();

        canvasContext.fillStyle = "#ddd";
        let pressedKeyName = "";
        if (keyboardController.pressedKeys.has(38))
            pressedKeyName = "Стрелка вверх";
        if (keyboardController.pressedKeys.has(40))
            pressedKeyName = "Стрелка вниз";
        if (keyboardController.pressedKeys.has(37))
            pressedKeyName = "Стрелка влево";
        if (keyboardController.pressedKeys.has(39))
            pressedKeyName = "Стрелка вправо";

        canvasContext.textAlign = "center";
        canvasContext.font = "1em SF Mono Light";
        canvasContext.fillText(`${pressedKeyName}`, player.position.x - camera.offset.x, player.position.y - 10 - camera.offset.y);
        canvasContext.closePath();
        canvasContext.restore();
    }

    renderDebugMenu() {
        let { player, camera, canvasContext } = this.parentContext;
        let padding = 10;
        let fontSize = 12;
        let lines = [
            `Camera:`,
            `   offset:`,
            `       x: ${camera.offset.x.toFixed(4)}`,
            `       y: ${camera.offset.y.toFixed(4)}`,
            `Player:`,
            `   position:`,
            `       x: ${player.position.x.toFixed(4)}`,
            `       y: ${player.position.y.toFixed(4)}`,
            `   velocity:`,
            `       x: ${player.velocity.x.toFixed(4)}`,
            `       y: ${player.velocity.y.toFixed(4)}`
        ];
        canvasContext.save();
        canvasContext.beginPath();
        canvasContext.globalAlpha = .5;
        canvasContext.fillStyle = "#000";
        canvasContext.rect(padding, padding, 180, CANVAS_HEIGHT - (fontSize ** 2));
        canvasContext.fill();
        canvasContext.stroke();
        canvasContext.closePath();

        canvasContext.globalAlpha = 1;
        canvasContext.font = fontSize + "px SF Mono Light";
        canvasContext.fillStyle = "#fff";
        for (let lineIndex in lines) {
            let lineContent = lines[lineIndex];

            canvasContext.fillText(lineContent, padding + 5, padding + (fontSize + 5) + ((fontSize + 5) * lineIndex));
        }
        canvasContext.restore();
    }

    getDeltaTime() {
        return this.deltaTime;
    }

    draw() {
        this.previosTime = this.currentTime;
        this.currentTime = Date.now();
        this.deltaTime = this.currentTime - this.previosTime;

        this.clearCanvas();
        this.renderPlayer();
        this.renderObjects();
        this.renderDebugMenu();
    }
}
