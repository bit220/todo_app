import React from 'react';
import './List.css';
import {useSelector} from "react-redux";
import Task from "../Task/Task";
import {sortTasks} from "../../helpers/sortTasks";
import {useDragNdrop} from "../../helpers/useDragNdrop";

const List = () => {

    const listOfTasks = useSelector(state => state.listOfTasks);

    const [dragStartHandler, dragOverHandler, dragEndHandler, dropHandler] = useDragNdrop();

    const renderTask = task => (
        <div
            className="task__wrapper"
            key={task.id}
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, task)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, task)}
        >
            <Task
                task={task}
                renderTask={renderTask}
            />
        </div>
    );

    return (
        <>
            {listOfTasks.length > 0
                ?
                <div>
                    {listOfTasks.sort(sortTasks).map(task =>
                        renderTask(task)
                    )}
                </div>
                :
                <div>Нет задач</div>
            }
        </>
    );
};

export default List;