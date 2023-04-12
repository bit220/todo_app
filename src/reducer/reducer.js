import {createStore} from "redux";

const initialState = {
    projectHeader: 'Project 1',
    listOfTasks: [],
    currentId: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPLOAD_PROJECT":
            return {...action.payload}
        case "ADD_TASK":
            return {...state, listOfTasks: [...state.listOfTasks, action.payload]}
        case "CHANGE_TASKS":
            return {...state, listOfTasks: [...action.payload]}
        case "CHANGE_PROJECT_HEADER":
            return {...state, projectHeader: action.payload}
        case "CHANGE_CURRENT_ID":
            return {...state, currentId: action.payload}
        default:
            return state
    }
}

export const store = createStore(reducer)