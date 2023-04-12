import {useState} from "react";

export const useDownloadTasks = () => {

    const [projectToDownload, setProjectToDownload] = useState('')

    const downloadTasks = () => {
        const data = localStorage.getItem('project');
        const blob = new Blob([data], {type: 'text/plain'});
        setProjectToDownload(URL.createObjectURL(blob));
        URL.revokeObjectURL(projectToDownload);
    }

    return [downloadTasks, projectToDownload]
}