export function isDescendant(parentTask, childTask) {
    if (parentTask.id === childTask.id) {
        return true;
    }
    for (let i = 0; i < parentTask.children.length; i++) {
        if (isDescendant(parentTask.children[i], childTask)) {
            return true;
        }
    }
    return false;
}