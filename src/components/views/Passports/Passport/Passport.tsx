import React, { useEffect, useState } from 'react';
import './Passport.scss';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import checkLoggedIn from '../../../../common/checkLoggedIn';
import { PassportResponse } from '../../../../api/models/response/passport-response.model';

const Passport: React.FC = React.memo((props:any) => {

    checkLoggedIn();

    const { passportId } = useParams();
    const history = useHistory();
    const passportsState = useSelector((state:any) => state.PassportsReducer);
    const [passport, setPassport] = useState<PassportResponse>(Object)
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1)
    const [req, doReq] = useState(false)

    const getPassport = () => {
        doReq(true)
        setPassport(passportsState?.find((item: PassportResponse) => passportId && item.passportId === +passportId))
    }

    useEffect(() => {
        !req ? getPassport() : null
    });

    return(
        <div className="passport">
            <h2>Паспорт {passport?.passportId}</h2>
            <p>Дата: {passport?.date}</p>
            <p>Id пользователя: {passport?.user?.id}</p>
            <p>Имя пользователя: {passport?.user?.person.name}</p>
            <p>Статус: {passport?.statusConfirm}</p>
            <p className="photos-row">
                { passport?.photos?.map((item: string) => (
                    <img src={item} alt=""/>
                )) }
            </p>
            <button className="main-btn">Верифицировать клиента</button>
        </div>
    );
})

export default Passport;