import React, { useEffect, useState } from 'react';
import './Package.scss';
import useFormState from '../../../../common/customHooks/useFormState';
import { useParams, useHistory } from 'react-router';
import { changePackage as buildChangePackage,
         deletePackage as buildDeletePackage,
         createPackage as buildCreatePackage  } from '../../../../store/actions/packages-actions';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { PackageResponse } from '../../../../api/models/response/package-response.model';
import PackagesAPI from '../../../../api/packages';

const Package = () => {
    const { packageId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const packagesState = useSelector((state:any) => state.PackagesReducer);
    const [req, doReq] = useState(false);
    const [formFile, setFormFile] = useState('')

    const packageState = {
        name: useFormState(packagesState?.find((item:PackageResponse) => packageId && item.id === +packageId)?.name),
        price: useFormState(packagesState?.find((item:PackageResponse) => packageId && item.id === +packageId)?.price),
        countCalls: useFormState(packagesState?.find((item:PackageResponse) => packageId && item.id === +packageId)?.countСalls),
        packageType: useFormState(packagesState?.find((item:PackageResponse) => packageId && item.id === +packageId)?.packageType)
    }

    const setLocalState = (state:PackageResponse) => {
        packageState.name.onChange({target: { value: state.name }})
    }

    const getPackageData = () => {
        let pack = packagesState?.find((item:PackageResponse) => packageId && item.id === +packageId)
        pack ? setLocalState(pack) : null
    }

    const changePackageData = () => {
        PackagesAPI.changePackage(
            packageId ? +packageId : 0,
            {
                name: packageState.name.value,
                price: +packageState.price.value,
                countСalls: +packageState.countCalls.value,
                packageType: +packageState.packageType.value,
            })
            .then((response:AxiosResponse<PackageResponse>) => {
                dispatch(buildChangePackage(response.data));
                setLocalState(response.data);
            })
            .catch(err => console.log(err))
    }

    const createPackage = () => {
        console.log(formFile)
        PackagesAPI.createPackage({
                name: packageState.name.value,
                price: packageState.price.value,
                countСalls: packageState.countCalls.value,
                packageType: packageState.packageType.value,
            })
            .then((response:AxiosResponse<PackageResponse>) => {
                dispatch(buildCreatePackage(response.data));
                history.push(`/categories/category/${response.data.id}`)
            })
            .catch(err => console.log(err))
    }

    const deletePackage = (e:any) => {
        e.preventDefault();
        PackagesAPI.deletePackage(packageId ? +packageId : 0)
            .then((response:AxiosResponse) => {
                dispatch(buildDeletePackage({packageId: packageId ? +packageId : 0}))
                setTimeout(()=>history.push('/categories'),0)
            })
            .catch(err => console.log(err))
    }

    const submitForm = (e:React.FormEvent) => {
        e.preventDefault();
        packageId ? changePackageData() : createPackage();
    }

    useEffect(() => {
        if(!req && packageId !== undefined) {
            getPackageData();
        }
    })

    return(
        <React.Fragment>
            <div className="package">
                <h2>Пакет #{packageId}</h2>
                <form className="category-form" noValidate onSubmit={(e) => submitForm(e)}>
                    <div className="main-input_with-label">
                        <input type="text" id="name" {...packageState.name} className="main-input" />
                        <label htmlFor="name" className={packageState.name.value === '' || packageState.name.value === undefined ? 'null' : 'filled-input_label'}>Имя</label>
                    </div>
                    <div className="main-input_with-label">
                        <input type="text" id="price" {...packageState.price} className="main-input" />
                        <label htmlFor="price" className={packageState.price.value === '' || packageState.price.value === undefined ? 'null' : 'filled-input_label'}>Цена</label>
                    </div>
                    <div className="main-input_with-label">
                        <input type="text" id="countCalls" {...packageState.countCalls} className="main-input" />
                        <label htmlFor="countCalls" className={packageState.countCalls.value === '' || packageState.countCalls.value === undefined ? 'null' : 'filled-input_label'}>Кол-во</label>
                    </div>
                    <div className="main-input_with-label">
                        <input type="text" id="packageType" {...packageState.packageType} className="main-input" />
                        <label htmlFor="packageType" className={packageState.packageType.value === '' || packageState.packageType.value === undefined ? 'null' : 'filled-input_label'}>Тип пакета</label>
                    </div>
                    {/* <input type="text" {...testRestaurant.regLink} className="main-input" placeholder="Ссылка для регистрации" /> */}
                    <button type="submit" className="main-btn">{ packageId != undefined ? 'Сохранить' : 'Добавить' }</button>
                    {packageId !== undefined ? <a onClick={deletePackage}>Удалить пакет</a> : null }
                </form>
            </div>
        </React.Fragment>
    );
}

export default Package;