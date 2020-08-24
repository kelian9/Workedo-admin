import React, { useEffect, useState } from 'react';
import './User.scss';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import checkLoggedIn from '../../../../common/checkLoggedIn';
import { UserModel } from '../../../../api/models/user.model';
import UsersAPI from '../../../../api/users';
import { setDeleteUser } from '../../../../store/actions/users-actions'

const User: React.FC = React.memo((props:any) => {

    checkLoggedIn();

    const { userId } = useParams();

    const history = useHistory();
    const usersState = useSelector((state:any) => state.UsersReducer);
    const [user, setUser] = useState<UserModel>(Object)
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1)
    const [req, doReq] = useState(false)

    const getUser = () => {
        setUser(usersState?.find((item:UserModel) => userId && item.id === +userId))
    }

    const deleteUser = () => {
        UsersAPI.deleteUser(userId ? +userId : 0)
            .then((res:AxiosResponse<UserModel[]>) => {
                dispatch(setDeleteUser({userId: userId ? +userId : 0}))
            })
    }

    useEffect(() => {
        if(userId && user === null) {
            getUser()
        }
        // categoriesState.length ? console.log(categoriesState) : null
    });

    return(
        <React.Fragment>
            <h1>Пользователь</h1>
            {Object.entries(user).map(item => (<div className="user-row">
                <h2>{item[0]}</h2>
                <span>{item[1]}</span>
            </div>))}
            <a onClick={deleteUser}>Удалить пользователя</a>
        </React.Fragment>
    );
})

export default User;