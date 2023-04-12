export const findTaskById = (tasks, id) => {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            return tasks[i];
        }

        if (tasks[i].children.length > 0) {
            const childTask = findTaskById(tasks[i].children, id);

            if (childTask) {
                return childTask;
            }
        }
    }

    return null;
};
