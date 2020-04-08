import { Logger } from "./debug/index.js";
import { MouseController, KeyboardController } from "./controllers/index.js";
import { GamePhysics, GameRender, GameCamera } from "./components/index.js";
import { PlayerObject, GameObject } from "./objects/index.js";

class GameEngine {
    canvasElement = canvasElement;
    canvasContext = canvasElement.getContext("2d");

    camera = new GameCamera(this);
    render = new GameRender(this);
    physics = new GamePhysics(this);

    objects = [
        new GameObject()
            .setPosition(0, CANVAS_HEIGHT - 100)
            .setSize(CANVAS_WIDTH, 100),
        new GameObject()
            .setPosition(100, 100)
            .setSize(50, 50),
        new GameObject()
            .setPosition(0, 10)
            .setSize(100, 50),
        new GameObject()
            .setPosition(250, 100)
            .setSize(150, 100),
        new GameObject()
            .setPosition(-100, 100)
            .setSize(150, 50),
        new GameObject()
            .setPosition(200, 30)
            .setSize(100, 100)
    ];
    player = new PlayerObject(this);

    mouseController = new MouseController(this);
    keyboardController = new KeyboardController(this);

    constructor() {
        this.subscribeToEvents();
        this.camera.followGameObject(this.player);
    }

    startUpdateProccess() {
        this.render.draw();
        this.physics.update();

        setTimeout(this.startUpdateProccess.bind(this), 1000 / FPS);
    }

    subscribeToEvents() {
        this.canvasElement.onclick = this.mouseController.onMouseClick.bind(this.mouseController);
        this.canvasElement.onmousedown = this.mouseController.onMouseDown.bind(this.mouseController);
        this.canvasElement.onmousemove = this.mouseController.onMouseMove.bind(this.mouseController);
        this.canvasElement.onmouseup = this.mouseController.onMouseUp.bind(this.mouseController);

        window.onkeyup = this.keyboardController.onKeyUp.bind(this.keyboardController);
        window.onkeydown = this.keyboardController.onKeyDown.bind(this.keyboardController);
        window.onkeypress = this.keyboardController.onKeyPress.bind(this.keyboardController);
    }
}

const gameEngine = new GameEngine();

window.gameEngine = gameEngine;

gameEngine.player.setSize(25, 50);
gameEngine.player.setPosition(0, 0);
gameEngine.player.setDirection(10, 10);
gameEngine.startUpdateProccess();

