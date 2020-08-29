import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { TaskResponse } from '../../../../api/models/response/task-response.model';
import TasksAPI from '../../../../api/tasks';
import {deleteTask as buildDeleteTask} from '../../../../store/actions/tasks-actions';
import { AxiosResponse } from 'axios';


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

    const deleteTask = () => {
        TasksAPI.deleteTask(taskId ? +taskId : 0)
            .then((response:AxiosResponse<TaskResponse>) => {
                dispatch(buildDeleteTask({taskId: taskId ? +taskId : 0}))
                setTimeout(() => history.push(`/categories/category/${id}/subcategory/${subCategoryId}/servant/${servantId}`), 0)
            })
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
            <button onClick={deleteTask} className="main-btn">Удалить задание</button>
        </React.Fragment>
    )
})

export default Task;