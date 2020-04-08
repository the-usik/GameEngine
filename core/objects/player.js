import GameObject from "./object.js";
import { Vector2D } from "../math/index.js";
import { COLLIDE_SIDES } from "/core/utils/constants.js";

export default class PlayerObject extends GameObject {
    gravity = .5;
    direction = new Vector2D(0, 0);
    oldPosition = new Vector2D(0, 0);

    isFalling = true;
    isCollide = false;
    collideSide = null;

    constructor(parentContext = {}, options = {}) {
        super(options);

        this.parentContext = parentContext;
    }

    moveUp() {
        if (this.collideSide != COLLIDE_SIDES.TOP)
            this.direction.y -= 20;

        return this;
    }

    moveDown() {
        if (this.collideSide != COLLIDE_SIDES.BOTTOM)
            this.direction.y += 20;

        return false;
    }
    moveLeft() {
        if (this.collideSide != COLLIDE_SIDES.LEFT)
            this.direction.x -= 20;

        return this;
    }

    moveRight() {
        if (this.collideSide != COLLIDE_SIDES.RIGHT)
            this.direction.x += 20;

        return this;
    }

    setDirection(x = 0, y = 0) {
        this.direction.set(
            Vector2D.createVector(x, y)
        );

        return this;
    }

    setGravity(value) {
        this.gravity = value;

        return this;
    }
}