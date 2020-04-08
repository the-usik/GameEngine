export default class Vector2D {
    x = 0;
    y = 0;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    set(value) {
        if (this.isVector2D(value)) {
            this.x = value.x;
            this.y = value.y;
        }

        return this;
    }

    setX(value) {
        this.x = value;

        return this;
    }

    setY(value) {
        this.y = value;

        return this;
    }


    add(value = 0) {
        this.x += this.isVector2D(value) ? value.x : value;
        this.y += this.isVector2D(value) ? value.y : value;

        return this;
    }

    subtract(value = 0) {
        this.x -= this.isVector2D(value) ? value.x : value;
        this.y -= this.isVector2D(value) ? value.y : value;

        return this;
    }


    multiply(value = 0) {
        this.x *= this.isVector2D(value) ? value.x : value;
        this.y *= this.isVector2D(value) ? value.y : value;

        return this;
    }


    divide(value = 0) {
        this.x /= this.isVector2D(value) ? value.x : value;
        this.y /= this.isVector2D(value) ? value.y : value;

        return this;
    }

    isVector2D(object) {
        return Vector2D.isVector2D(object);
    }

    toVector(x, y) {
        return new Vector2D(x, y);
    }

    static createVector(x, y) {
        return new Vector2D(x, y);
    }

    static isVector2D(object) {
        return object instanceof Vector2D;
    }

    static add(a, b) {
        if (!Vector2D.isVector2D(a) || !Vector2D.isVector2D(b))
            return NaN;

        return new Vector2D(a.x + b.x, a.y + b.y);
    }

    static subtract(a, b) {
        if (!Vector2D.isVector2D(a) || !Vector2D.isVector2D(b))
            return NaN;

        return new Vector2D(a.x - b.x, a.y - b.y);
    }

    static multiply(a, b) {
        if (!Vector2D.isVector2D(a) || !Vector2D.isVector2D(b))
            return NaN;

        return new Vector2D(a.x * b.x, a.y * b.y);
    }

    static divide(a, b) {
        if (!Vector2D.isVector2D(a) || !Vector2D.isVector2D(b))
            return NaN;

        return new Vector2D(a.x / b.x, a.y / b.y);
    }
}