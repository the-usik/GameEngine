import { Vector2D } from "../../math/index.js";
import { GameObject } from "../../objects/index.js";

export default class GameCamera {
    offset = new Vector2D(0, 0);
    velocity = new Vector2D(0, 0);
    direction = new Vector2D(0, 0);

    followingGameObject = null;

    constructor(parentContext = {}) {
        this.parentContext = parentContext;
    }
        
    followGameObject(value) {
        if (!GameObject.isGameObject(value))
            return false;

        this.followingGameObject = value;
    }
}