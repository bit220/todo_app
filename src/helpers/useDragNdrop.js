import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {isDescendant} from "./isDescendant";
import {findTaskById} from "./findTaskById";
import {changeOrder} from "./changeOrder";


export const useDragNdrop = () => {

    const listOfTasks = useSelector(state => state.listOfTasks)
    const dispatch = useDispatch()

    const [currentTask, setCurrentTask] = useState(null)

    function dragStartHandler(e, task) {
        console.log('drag', task)
        e.stopPropagation()
        setCurrentTask(task)
    }

    function dragEndHandler(e) {
        e.target.style.background = 'white'
    }

    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.background = 'lightgray'
    }

    function dropHandler(e, task) {
        console.log('drop', task)
        e.stopPropagation()

        e.preventDefault();
        let newList = [...listOfTasks];

        // предотвратить перенос родителя в своих же потомков
        if (isDescendant(currentTask, task)) {
            e.target.style.background = "white";
            return;
        }

        // Если перемещаемая задача является подзадачей
        if (currentTask.parentId !== null) {

            // если задача переносится внутри одного родителя, то должен меняться порядок
            if (currentTask.parentId === task.parentId) {
                const parentTask = findTaskById(newList, currentTask.parentId);
                parentTask.children = parentTask.children.map(t => changeOrder(t, task, currentTask))

                dispatch({ type: "CHANGE_TASKS", payload: [...newList] });
            } else { // если у задач различаются родители, то переносимая задача должна добавляться в task.children

                if (currentTask.parentId > task.parentId || currentTask.parentId < task.parentId) {
                    if (currentTask.parentId !== task.id) {
                        const oldParentTask = findTaskById(newList, currentTask.parentId);
                        oldParentTask.children = oldParentTask.children.filter(
                            (task) => task.id !== currentTask.id
                        );

                        const newParentTask = findTaskById(newList, task.id);
                        currentTask.order = newParentTask.children.length + 1;
                        currentTask.parentId = newParentTask.id;
                        newParentTask.children.push(currentTask);
                        dispatch({ type: "CHANGE_TASKS", payload: [...newList] });
                    }
                }
            }
        } else {
            // Если перемещаемая задача является задачей нулевого уровня
            if (currentTask.parentId === task.parentId) {
                let newTasks = listOfTasks.map(t => changeOrder(t, task, currentTask))
                dispatch({ type: "CHANGE_TASKS", payload: [...newTasks] });
            }
        }

        e.target.style.background = "white";
    }

    return [dragStartHandler, dragOverHandler, dragEndHandler, dropHandler]
}