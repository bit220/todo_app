import {useDispatch, useSelector} from "react-redux";

export const useRemoveTask = () => {
    const dispatch = useDispatch();
    const listOfTasks = useSelector(state => state.listOfTasks);

    return (e, id) => {
        e.preventDefault();
        const removeFunc = (tasks) => {
            return tasks.filter((task) => {
                if (task.id === id) {
                    return false;
                }
                if (task.children && task.children.length > 0) {
                    task.children = removeFunc(task.children);
                }
                return true;
            });
        };

        const newTasks = removeFunc(listOfTasks);
        dispatch({ type: "CHANGE_TASKS", payload: newTasks });
    }
};