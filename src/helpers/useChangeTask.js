import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

const useChangeTask = () => {

    const dispatch = useDispatch();
    const listOfTasks = useSelector(state => state.listOfTasks);

    const [isEditTask, setIsEditTask] = useState(false);
    const editTask = (e) => {
        e.preventDefault();
        setIsEditTask(!isEditTask);
    }

    const changeTask = (e, id, field) => {
        const changeFunc = (task) => {
            if (task.id === id) {
                if (field === 'text') {
                    return { ...task, text: e.target.value };
                }
                if (field === 'checked') {
                    e.target.nextElementSibling.classList.toggle('checked')
                    return { ...task, checked: !task.checked };
                }
            }
            if (task.children && task.children.length > 0) {
                return { ...task, children: task.children.map((child) => changeFunc(child)) };
            }
            return task;
        }

        if (field === 'checked') {
            const newTasks = listOfTasks.map((task) => changeFunc(task));
            dispatch({ type: "CHANGE_TASKS", payload: newTasks });
        }

        if (e.key === "Enter" && field === 'text') {
            const newTasks = listOfTasks.map((task) => changeFunc(task));
            dispatch({ type: "CHANGE_TASKS", payload: newTasks });
            setIsEditTask(false);
        }
    }

    return [changeTask, editTask, isEditTask, setIsEditTask]
};

export default useChangeTask;