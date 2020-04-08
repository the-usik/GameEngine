import { Vector2D } from "/core/math/index.js";
import { GameObject } from "/core/objects/index.js";
import CollisionDetection from "./collision.js";
import { COLLIDE_SIDES } from "/core/utils/constants.js";

export default class GamePhysics {
    constructor(parentContext = {}) {
        this.parentContext = parentContext;
    }

    updateCameraPosition() {
        let { camera, render } = this.parentContext;
        let deltaTime = render.getDeltaTime() / FPS;

        camera.velocity.x = (camera.direction.x - camera.offset.x) * .1;
        camera.velocity.y = (camera.direction.y - camera.offset.y) * .1;

        camera.offset.x += camera.velocity.x * deltaTime;
        camera.offset.y += camera.velocity.y * deltaTime;

        if (camera.followingGameObject) {
            let { followingGameObject } = camera;

            camera.direction.x = followingGameObject.position.x - CANVAS_WIDTH / 2;
            camera.direction.y = followingGameObject.position.y - CANVAS_HEIGHT / 2;
        }
    }

    updatePlayerPosition() {
        let { player, render, objects } = this.parentContext;
        let deltaTime = render.getDeltaTime() / FPS;

        let collidingObjects = objects.filter(
            object => CollisionDetection.detectCollision(player, object)
        );

        // if (player.isFalling)
        // player.velocity.y += player.gravity * deltaTime;
        player.velocity.y = (player.direction.y - player.position.y) * deltaTime;
        player.velocity.x = (player.direction.x - player.position.x) * deltaTime;

        if (collidingObjects.length < 1) {
            player.isFalling = true;
            player.isCollide = false;
            player.collideSide = null;
        } else {
            player.isCollide = true;

            for (let collideObject of collidingObjects) {
                let isTopSideCollide = CollisionDetection.isCollideFromTop(player, collideObject);
                let isLeftSideCollide = CollisionDetection.isCollideFromLeft(player, collideObject);
                let isRightSideCollide = CollisionDetection.isCollideFromRight(player, collideObject);
                let isBottomSideCollide = CollisionDetection.isCollideFromBottom(player, collideObject);

                if (isTopSideCollide) {
                    player.collideSide = COLLIDE_SIDES.TOP;
                    player.velocity.y = 0;
                    player.direction.y = collideObject.position.y - player.size.height;
                    player.isFalling = false;
                }

                if (isLeftSideCollide) {
                    player.collideSide = COLLIDE_SIDES.LEFT;
                    player.velocity.x = 0;
                    player.direction.x = collideObject.position.x + collideObject.size.width;
                }

                if (isRightSideCollide) {
                    player.collideSide = COLLIDE_SIDES.RIGHT;
                    player.velocity.x = 0;
                    player.direction.x = collideObject.position.x - player.size.width;
                    console.log("RIGHT COLLISION");
                }

                if (isBottomSideCollide) {
                    player.collideSide = COLLIDE_SIDES.BOTTOM;
                    player.velocity.y = 0;
                    console.log("BOTTOM COLLISION")
                }
            }
        }

        player.oldPosition.x = player.position.x;
        player.oldPosition.y = player.position.y;

        player.position.x += player.velocity.x * deltaTime;
        player.position.y += player.velocity.y * deltaTime;
    }

    update() {
        this.updatePlayerPosition();
        this.updateCameraPosition();
    }
}