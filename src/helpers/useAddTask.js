import {useDispatch, useSelector} from "react-redux";
import {findTaskById} from "./findTaskById";

const useAddTask = () => {

    const listOfTasks = useSelector(state => state.listOfTasks);
    const dispatch = useDispatch();

    const currentId = localStorage.getItem('currentId')
    if (!currentId) {
        localStorage.setItem('currentId', '0')
    }

    return (e, parentId = null) => {
        if (e.key === 'Enter') {
            const newTask = {
                id: Number(currentId) + 1,
                order: Number(currentId) + 1,
                parentId: parentId,
                checked: false,
                text: e.target.value,
                children: []
            };

            if (parentId) {
                const parentTask = findTaskById(listOfTasks, parentId);
                // newTask.order = parentTask.children.length + 1;
                parentTask.children.push(newTask);
                dispatch({type: 'CHANGE_TASKS', payload: [...listOfTasks]});
            } else {
                // newTask.order = listOfTasks.length + 1;
                dispatch({type: 'ADD_TASK', payload: newTask});
            }

            e.target.value = '';
            console.log(newTask)
            localStorage.setItem('currentId', (Number(currentId) + 1).toString())

            dispatch({type: 'CHANGE_CURRENT_ID', payload: Number(currentId) + 1});
        }
    }
}

export default useAddTask;