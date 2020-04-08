export const keyMirror = (array = []) => {
    let object = {};

    for (let element of array) {
        object[element] = element;
    }

    return object;
}