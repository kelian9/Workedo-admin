import React, { useEffect, useState } from 'react';
import './Passport.scss';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import checkLoggedIn from '../../../../common/checkLoggedIn';
import { PassportResponse } from '../../../../api/models/response/passport-response.model';
import { verifyPassport } from '../../../../store/actions/passport-actions';
import PassportsAPI from '../../../../api/passports';
import { AxiosResponse } from 'axios';

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

    const verifyUserPassport = () => {
        PassportsAPI.verifyClient(passportId ? +passportId : 0, true)
            .then((res:AxiosResponse<boolean>) => {
                if(res.data) {
                    dispatch(verifyPassport({
                        passportId: passportId ? +passportId : 0
                    }))
                }
            })
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
                    <img src={'http://194.177.23.9:998/' + item} alt=""/>
                )) }
            </p>
            <button className="main-btn" onClick={verifyUserPassport}>Верифицировать клиента</button>
        </div>
    );
})

export default Passport;