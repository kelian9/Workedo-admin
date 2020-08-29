import React, { useEffect, useState } from 'react';
import './Tasks.scss';
import DefaultTable from '../../ui/DefaultTable/DefaultTable';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import checkLoggedIn from '../../../common/checkLoggedIn';
import { setTasks, deleteTask as buildDeleteTask } from '../../../store/actions/tasks-actions';
import { TaskResponse } from '../../../api/models/response/task-response.model';
import TasksAPI from '../../../api/tasks';

const Tasks: React.FC = React.memo((props:any) => {

    checkLoggedIn();

    const { id } = useParams();
    const { subCategoryId } = useParams();
    const { servantId } = useParams();
    const history = useHistory();
    const tasksState = useSelector((state:any) => state.TasksReducer);
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1)

    const getTasksList = () => {
        localStorage.setItem('servantId', servantId ? servantId : '')
        console.log('update')
        servantId ? 
            TasksAPI.getTasks(+servantId, 8, pageNumber)
                .then((response:AxiosResponse<TaskResponse[]>) => {
                    dispatch(setTasks(response.data))
                    console.log(response.data)
                })
                .catch(err => console.log(err)) :
            null
    }

    const deleteTask = (taskId:number) => {
        TasksAPI.deleteTask(taskId ? +taskId : 0)
            .then((response:AxiosResponse<TaskResponse>) => {
                dispatch(buildDeleteTask({taskId: taskId ? +taskId : 0}))
            })
    }

    useEffect(() => {
        localStorage.getItem('servantId') != servantId || !tasksState.length ? getTasksList() : null
    });

    return(
        <React.Fragment>
            <div className="table-container">
                <DefaultTable 
                    list={tasksState?.map((item:TaskResponse) => ({
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        owner: item.owner ? `Id ${item.owner.id} ${item.owner.person.name}` : '',
                        city: item.city ? item.city.name : ''
                    }))}
                    // handleRowClick={(taskId) => history.push(`/categories/category/${id}/subcategory/${subCategoryId}/servant/${servantId}/task/${taskId}`)}
                    handleEditRowClick={(taskId) => history.push(`/categories/category/${id}/subcategory/${subCategoryId}/servant/${servantId}/task/${taskId}`)}
                    handleDeleteRowClick={(taskId) => deleteTask(taskId)}
                    headings={['Задание', 'Описание', 'Owner', 'Город']}
                    caption="Задания"
                >
                    {/* <button onClick={() => history.push(`/categories/category/${id}/subcategory/${subCategoryId}/servant/${servantId}/task`)} className="main-btn">Добавить задание</button> */}
                </DefaultTable>
            </div>
        </React.Fragment>
    );
})

export default Tasks;