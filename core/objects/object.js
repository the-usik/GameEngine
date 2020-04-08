import { Vector2D } from "/core/math/index.js";

export default class GameObject {
    position = new Vector2D(0, 0);
    velocity = new Vector2D(0, 0);
    size = { width: 0, height: 0 };

    constructor(options = {}) {
        if (options.position)
            this.position = Vector2D.createVector(
                options.position.x,
                options.position.y
            );

        if (options.velocity)
            this.velocity = Vector2D.createVector(
                options.velocity.x,
                options.velocity.y
            );

        if (options.size)
            this.size = options.size;
    }

    setPosition(x = 0, y = 0) {
        this.position.setX(x);
        this.position.setY(y);

        return this;
    }

    setVelocity(x = 0, y = 0) {
        this.velocity.setX(x);
        this.velocity.setY(y);

        return this;
    }

    setSize(width = 10, height = 10) {
        this.size.width = width;
        this.size.height = height;

        return this;
    }

    static isGameObject(value) {
        return value instanceof GameObject;
    }
}