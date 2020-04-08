export default class CollisionDetection {
    static detectCollision(entity = {}, object = {}) {
        return (
            entity.position.x + entity.size.width >= object.position.x &&
            object.position.x + object.size.width >= entity.position.x &&
            entity.position.y + entity.size.height >= object.position.y &&
            object.position.y + object.size.height >= entity.position.y
        )
    }

    static isCollideFromRight(entity = {}, collideObject = {}) {
        return (
            entity.oldPosition.x + entity.size.width < collideObject.position.x &&
            entity.position.x + entity.size.width >= collideObject.position.x
        );
    }

    static isCollideFromTop(entity = {}, collideObject = {}) {
        return (
            entity.oldPosition.y + entity.size.height < collideObject.position.y &&
            entity.position.y + entity.size.height >= collideObject.position.y
        );
    }

    static isCollideFromLeft(entity = {}, collideObject = {}) {
        return (
            entity.oldPosition.x >= collideObject.position.x + collideObject.size.width &&
            entity.position.x < collideObject.position.x + collideObject.size.width
        );
    }

    static isCollideFromBottom(entity = {}, collideObject = {}) {
        return (
            entity.oldPosition.y >= collideObject.position.y + collideObject.size.height &&
            entity.position.y < collideObject.position.y + collideObject.size.height
        );
    }
}