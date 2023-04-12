export const findTasks = (tasks, searchQuery) => {
    let filteredTasks = [];

    tasks.forEach(task => {
        if (task.text.includes(searchQuery)) {
            filteredTasks.push(task);
        }

        if (task.children && task.children.length > 0) {
            task.children.forEach(child => {
                filteredTasks = filteredTasks.concat(findTasks([child], searchQuery));
            });
        }
    });

    return filteredTasks;
};