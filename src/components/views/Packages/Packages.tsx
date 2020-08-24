import React, { useEffect, useState } from 'react';
import './Packages.scss';
import DefaultTable from '../../ui/DefaultTable/DefaultTable';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import checkLoggedIn from '../../../common/checkLoggedIn';
import PackagesAPI from '../../../api/packages';
import { PackageResponse } from '../../../api/models/response/package-response.model';
import { setPackages } from '../../../store/actions/packages-actions';

const Packages: React.FC = React.memo((props:any) => {

    checkLoggedIn();

    const history = useHistory();
    const packagesState = useSelector((state:any) => state.PackagesReducer);
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1)

    const getPackagesList = () => {
        PackagesAPI.getPackages()
            .then((response:AxiosResponse<PackageResponse[]>) => {
                dispatch(setPackages(response.data))
                console.log(response.data)
                console.log(packagesState)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if(!packagesState.length) {
            getPackagesList()
        }
        // categoriesState.length ? console.log(categoriesState) : null
    });

    return(
        <React.Fragment>
            <div className="table-container">
                <DefaultTable 
                    list={packagesState.map((item:PackageResponse) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        countCalls: item.countСalls,
                        packageType: item.packageType
                    }))}
                    handleCellClick={(id) => history.push(`/packages/package/${id}`)}
                    headings={['Package', 'Цена', 'Кол-во заявок', 'Тип пакета']}
                    caption="Пакеты"
                >
                    <button onClick={() => history.push('/packages/package')} className="main-btn">Добавить пакет</button>
                </DefaultTable>
            </div>
        </React.Fragment>
    );
})

export default Packages;