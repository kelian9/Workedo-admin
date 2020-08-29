import React, { useEffect, useState } from 'react';
import './Users.scss';
import DefaultTable from '../../ui/DefaultTable/DefaultTable';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import checkLoggedIn from '../../../common/checkLoggedIn';
import { UserModel } from '../../../api/models/user.model';
import UsersAPI from '../../../api/users';
import { setUsers } from '../../../store/actions/users-actions';

const Users: React.FC = React.memo((props:any) => {

    checkLoggedIn();

    const history = useHistory();
    const usersState = useSelector((state:any) => state.UsersReducer);
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1)
    const [req, doReq] = useState(false)

    const getUsersList = () => {
        UsersAPI.getUsers(8, pageNumber)
            .then((response:AxiosResponse<UserModel[]>) => {
                doReq(true)
                dispatch(setUsers(response.data))
                console.log(response.data)
                console.log(usersState)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if(!usersState.length && !req) {
            getUsersList()
        }
        // categoriesState.length ? console.log(categoriesState) : null
    });

    return(
        <React.Fragment>
            <div className="table-container">
                <DefaultTable 
                    list={usersState.map((item:UserModel) => ({
                        id: item.id,
                        avatar: 'http://194.177.23.9:998/' + item.avatar,
                        name: item.person.name,
                        averageClientRating: item.averageClientRating,
                        averageJobRating: item.averageJobRating
                    }))}
                    handleRowClick={(id) => history.push(`/users/${id}`)}
                    headings={['', 'Имя', 'Рейтинг заказчика', 'Рейтинг исполнителя']}
                    caption="Пользователи"
                >
                </DefaultTable>
            </div>
        </React.Fragment>
    );
})

export default Users;