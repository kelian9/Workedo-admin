import React, { useEffect, useState } from 'react';
import './Passports.scss';
import DefaultTable from '../../ui/DefaultTable/DefaultTable';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import checkLoggedIn from '../../../common/checkLoggedIn';
import PassportsAPI from '../../../api/passports';
import { PassportResponse } from '../../../api/models/response/passport-response.model';
import { setPassports } from '../../../store/actions/passport-actions';

const Passports: React.FC = React.memo((props:any) => {

    checkLoggedIn();

    // const { id } = useParams();
    const history = useHistory();
    const passportsState = useSelector((state:any) => state.PassportsReducer);
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1)
    const [req, doReq] = useState(false)

    const getPassportsList = () => {
        PassportsAPI.getPassports(8, pageNumber)
            .then((response:AxiosResponse<PassportResponse[]>) => {
                doReq(true)
                dispatch(setPassports(response.data))
                console.log(response.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        !req ? getPassportsList() : null
    });

    return(
        <React.Fragment>
            <div className="table-container">
                <DefaultTable 
                    list={passportsState?.map((item:PassportResponse) => ({
                        id: item.passportId,
                        name: item.user.person.name,
                        city: item.user?.person?.city?.name,
                        date: item.date,
                        status: item.statusConfirm ? true : false
                    }))}
                    handleRowClick={(id) => history.push(`/passports/${id}`)}
                    headings={['Имя', 'Город', 'Дата', 'Статус']}
                    caption="Паспорта"
                >
                    {/* <button onClick={() => history.push(`/categories/category/${id}/subcategory/${subCategoryId}/servant/${servantId}/task`)} className="main-btn">Добавить задание</button> */}
                </DefaultTable>
            </div>
        </React.Fragment>
    );
})

export default Passports;