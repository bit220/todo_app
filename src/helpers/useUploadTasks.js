import {useDispatch} from "react-redux";

export const useUploadTasks = () => {
    const dispatch = useDispatch();

    return () => {
        let file = document.getElementById('file').files[0]
        let reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function() {
            let result = JSON.parse('' + reader.result);
            dispatch({type: 'UPLOAD_PROJECT', payload: {...result}});

            dispatch({type: 'CHANGE_PROJECT_HEADER', payload: result.projectHeader});
            localStorage.setItem('projectHeader', result.projectHeader);

            dispatch({type: 'CHANGE_CURRENT_ID', payload: result.currentId});
            localStorage.setItem('currentId', result.currentId);
        }
    }
}