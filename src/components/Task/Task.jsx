import React, {useState} from 'react';
import './Task.css'
import {sortTasks} from "../../helpers/sortTasks";
import useChangeTask from "../../helpers/useChangeTask";
import {useRemoveTask} from "../../helpers/useremoveTask";
import useAddTask from "../../helpers/useAddTask";

const Task = ({task, renderTask}) => {

    const addTask = useAddTask()

    const [isAddTaskInputOpen, setIsAddTaskInputOpen] = useState(false)

    const openAddTaskInput = (e) => {
        e.preventDefault()
        setIsAddTaskInputOpen(true)
    }

    const [changeTask, editTask, isEditTask, setIsEditTask] = useChangeTask()

    const removeTask = useRemoveTask()

    const onChange = () => {

    }


    return (
        <>
            <div className="task__container">
                <input
                    id="checkbox"
                    type="checkbox"
                    className="task__checkbox"
                    checked={task.checked}
                    onChange={onChange}
                />
                <label
                    htmlFor="checkbox"
                    className="btn custom-task__checkbox"
                    onClick={e => changeTask(e, task.id, 'checked')}>
                </label>

                {isEditTask
                    ? <input
                        className="task__input"
                        onKeyUp={e => changeTask(e, task.id, 'text')}
                        type="text"
                        onBlur={() => setIsEditTask(false)}
                        autoFocus={true}
                    />
                    : <div className={task.checked ? 'task checked' : 'task'}> {task.text} </div>
                }

                {!isEditTask
                    ?
                    <a href="" onClick={editTask} className="btn edit-btn">
                    </a>
                    :
                    <div className="btn cancel-btn">
                    </div>
                }

                <a href="" onClick={e => removeTask(e, task.id)} className="btn delete-btn">
                </a>

                {isAddTaskInputOpen
                    ?
                    <input
                        autoFocus={true}
                        className="new-task-input"
                        onKeyUp={e => addTask(e, task.id)}
                        onBlur={() => setIsAddTaskInputOpen(false)}
                        type="text"
                        placeholder="Добавить подзадачу"
                    />
                    :
                    <a href="" onClick={openAddTaskInput} className="btn add-btn">
                    </a>
                }
            </div>

            {renderTask &&
                <div className="task__children">
                    {task.children && task.children.sort(sortTasks).map(child =>
                        renderTask(child)
                    )}
                </div>
            }
        </>
    );
};

export default Task;