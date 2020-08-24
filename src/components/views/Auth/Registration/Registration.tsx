import React, { useState } from 'react';
import './Registration.scss';
import useFormState from '../../../../common/customHooks/useFormState';
import { register } from '../../../../api/auth';
import { AxiosResponse } from 'axios';
import { RegistrationResponse } from '../../../../api/models/response/registration-response.model';
import { CSSTransition } from 'react-transition-group';
import ErrorModal from '../../../ui/ErrorModal/ErrorModal';

const Registration = () => {

    const account = {
        firstName: useFormState(''),
        secondName: useFormState(''),
        thirdName: useFormState(''),
        email: useFormState(''),
        password: useFormState(''),
        address: useFormState(''),
        passport: useFormState('')
    }

    const [error, setError] = useState(false);

    const registerAccount = ({firstName, secondName, thirdName, email, password, address, passport}:any, e:any) => {
        e.preventDefault();
        register({
            firstName: firstName.value,
            secondName: secondName.value,
            thirdName: thirdName.value,
            email: email.value,
            password: password.value,
            address: address.value,
            passport: passport.value
        })
        .then((response:AxiosResponse<RegistrationResponse>) => {
            alert('Success')
        })
        .catch(err => {
            setError(true)
            setTimeout(() => setError(false), 3500);
        })
    }

    return (
        <div className="auth-component registration-component">
            <form noValidate className="auth-form registration-form" onSubmit={(e) => registerAccount(account, e)}>
                <CSSTransition in={error} timeout={300} unmountOnExit classNames="show-hide-animation">
                    <div className="error-modal-container"><ErrorModal /></div>
                </CSSTransition>
                <h1>Sign up</h1>
                <input type="text" name="name" {...account.firstName} placeholder="NAME" className="main-input" />
                <input type="text" name="secondName" {...account.secondName} placeholder="SECOND NAME" className="main-input" />
                <input type="text" name="thirdName" {...account.thirdName} placeholder="PATRONYMIC" className="main-input" />
                <input type="email" name="email" {...account.email} placeholder="EMAIL" className="main-input" />
                <input type="password" name="password" {...account.password} placeholder="PASSWORD" className="main-input" />
                <input type="text" name="address" {...account.address} placeholder="ADDRESS" className="main-input" />
                <input type="text" name="passport" {...account.passport} placeholder="PASSPORT" className="main-input" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Registration;