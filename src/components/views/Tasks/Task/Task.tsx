import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { TaskResponse } from '../../../../api/models/response/task-response.model';


const Task:React.FC = React.memo((props:any) => {
    const { id } = useParams();
    const { subCategoryId } = useParams();
    const { servantId } = useParams();
    const { taskId } = useParams();
    const history = useHistory();
    const tasksState = useSelector((state:any) => state.TasksReducer);
    const [task, setTask] = useState<TaskResponse>(Object)
    const dispatch = useDispatch();

    const getTask = () => {
        localStorage.setItem('taskId', taskId ? taskId : '')
        setTask(tasksState.filter((task:TaskResponse) => taskId && task.id == +taskId).map((item:TaskResponse) => ({
            ...item,
            servant: item.servant.name,
            city: item.city.name,
            owner: item.owner.id + ' ' + item.owner.person.name
        }))[0])
    }

    useEffect(() => {
        localStorage.getItem('taskId') != taskId || task === null ? getTask() : null
    })

    return (
        <React.Fragment>
            {Object.entries(task).map(item => (<div className="task-row">
                <h2>{item[0]}</h2>
                <span>{item[1]}</span>
            </div>))}
        </React.Fragment>
    )
})

export default Task;