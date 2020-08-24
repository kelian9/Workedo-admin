import React, { useEffect, useState } from 'react';
import './Tasks.scss';
import DefaultTable from '../../ui/DefaultTable/DefaultTable';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import checkLoggedIn from '../../../common/checkLoggedIn';
import { setTasks } from '../../../store/actions/tasks-actions';
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
        TasksAPI.getTasks(servantId ? +servantId : 0, 8, pageNumber)
            .then((response:AxiosResponse<TaskResponse[]>) => {
                dispatch(setTasks(response.data))
                console.log(response.data)
            })
            .catch(err => console.log(err))
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
                    handleCellClick={(taskId) => history.push(`/categories/category/${id}/subcategory/${subCategoryId}/servant/${servantId}/task/${taskId}`)}
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