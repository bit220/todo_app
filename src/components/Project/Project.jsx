import React, {useEffect, useLayoutEffect, useState} from 'react';
import List from "../List/List";
import './Project.css'
import {useDispatch, useSelector} from "react-redux";
import useAddTask from "../../helpers/useAddTask";
import Task from "../Task/Task";
import {useUploadTasks} from "../../helpers/useUploadTasks";
import {useDownloadTasks} from "../../helpers/useDownloadTasks";
import {findTasks} from "../../helpers/findTasks";

const Project = () => {

    const dispatch = useDispatch()

    const project = useSelector(state => state)
    const listOfTasks = useSelector(state => state.listOfTasks)
    const currentId = useSelector(state => state.currentId)
    const projectHeader = useSelector(state => state.projectHeader)

    const [searchQuery, setSearchQuery] = useState('')
    const [filteredList, setFilteredList] = useState([])

    const [isEditHeader, setIsEditHeader] = useState(false);
    const editHeader = (e) => {
        e.preventDefault()
        setIsEditHeader(!isEditHeader)
    }

    const changeHeader = (e) => {
        if (e.key === 'Enter') {
            setIsEditHeader(false);
            dispatch({type: 'CHANGE_PROJECT_HEADER', payload: e.target.value});
            localStorage.setItem('projectHeader', e.target.value);
        }
    }

    useLayoutEffect(() => {
        const searchQuery = localStorage.getItem('searchQuery');
        const projectHeader = localStorage.getItem('projectHeader');
        const currentId = localStorage.getItem('currentId');

        if (searchQuery) {
            setSearchQuery(searchQuery)
        }
        if (projectHeader) {
            dispatch({type: 'CHANGE_PROJECT_HEADER', payload: projectHeader});
        }
        if (currentId) {
            dispatch({type: 'CHANGE_CURRENT_ID', payload: currentId});
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('project', JSON.stringify({...project}))
    }, [project])


    useEffect(() => {
        if (searchQuery === '') {
            setFilteredList([]);
            localStorage.setItem('searchQuery', '');
        } else if (searchQuery && searchQuery !== '') {
            setFilteredList(findTasks(listOfTasks, searchQuery));
            localStorage.setItem('searchQuery', searchQuery);
        } else {
            setFilteredList([])
        }
    }, [searchQuery, listOfTasks])


    const addTask = useAddTask()
    const uploadTasks = useUploadTasks()
    const [downloadTasks, projectToDownload] = useDownloadTasks()


    return (
        <div>
            <div>
                <input id="file" type="file" onChange={uploadTasks}/>
                <label htmlFor="file" className="upload_btn">Загрузить список задач </label>
                <a
                    className="download_btn"
                    href={projectToDownload}
                    download="tasks.txt"
                    onClick={downloadTasks}
                >
                    Скачать список задач
                </a>
            </div>

            <div className="header__block">
                {isEditHeader 
                    ?
                    <input
                        autoFocus={true}
                        onBlur={() => setIsEditHeader(false)}
                        className="header__input"
                        onKeyUp={changeHeader}
                        type="text"
                    />
                    :
                    <h1 className="header">{projectHeader}</h1>
                }

                <a href="" onClick={editHeader} className={isEditHeader ? "btn cancel-btn" : "btn edit-btn"}>
                </a>
            </div>

            <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search__input"
                type="text"
                placeholder="Поиск"
            />

            {filteredList.length > 0
                ?
                filteredList.map(task =>
                    <Task
                        key={task.id}
                        task={task}
                    />
                )
                :
                searchQuery === '' ? <List/> : <div>Ничего не найдено</div>
            }

            <input className="new-task-input" onKeyUp={addTask} type="text" placeholder="Новая задача"/>
        </div>
    );
};

export default Project;