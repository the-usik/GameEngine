import { keyMirror } from "./helpers.js";

export const KEY_CODES = {
    JUMP: 38,
    MOVE_DOWN: 40,
    MOVE_LEFT: 37,
    MOVE_RIGHT: 39,

    SPACE: 32
};

export const COLLIDE_SIDES = keyMirror(["TOP", "LEFT", "RIGHT", "DOWN"]);