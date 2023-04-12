export const changeOrder = (t, task, currentTask) => {

    if (currentTask.order === task.order) {
        task.order = currentTask.order + 1
    }
    if (t.id === task.id) {
        return {...t, order: currentTask.order}
    }
    if (t.id === currentTask.id) {
        return {...t, order: task.order}
    }
    return t

}