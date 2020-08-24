import React, { useState } from 'react';
import './Authorization.scss';
import useFormState from '../../../../common/customHooks/useFormState';
import { auth } from '../../../../api/auth';
import { AuthResponse } from '../../../../api/models/response/auth-response.model';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthState } from '../../../../store/actions/auth-actions';
import ErrorModal from '../../../ui/ErrorModal/ErrorModal';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router';

const Authorization = () => {

    const login = useFormState('');
    const password = useFormState('');

    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const history = useHistory();

    const logIn = (login:string,password:string, e:any) => {
        e.preventDefault();
        auth(login, password)
        .then((response:AxiosResponse<AuthResponse>) => {
            localStorage.setItem('token', `Bearer ${response.data.token.token}`);
            localStorage.setItem('expireDate', response.data.token.expireDate);
            localStorage.setItem('user', JSON.stringify(response.data.user))
            dispatch(setAuthState({isLoggedIn: true, token: `Bearer ${response.data.token.token}`}));
            setError(false);
            history.push('/categories');
        })
        .catch(err => {
            setError(true)
            setTimeout(() => setError(false), 3500);
        })
    }

    return (
        // <div className="auth-component authorization-component">
        <React.Fragment>
            <CSSTransition in={error} timeout={300} unmountOnExit classNames="show-hide-animation">
                <div className="error-modal-container"><ErrorModal /></div>
            </CSSTransition>
            <form noValidate className="auth-form" onSubmit={(e) => logIn(login.value, password.value, e)}>
                <h1>Sign in</h1>
                <input type="email" name="login" {...login} placeholder="Login" className="main-input" />
                <input type="password" name="password" {...password} placeholder="Password" className="main-input" />
                <button type="submit" className="main-btn">Continue</button>
            </form>
        </React.Fragment>
        // </div>
    );
}

export default Authorization;