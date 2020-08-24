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
        name: useFormState(''),
        price: useFormState(''),
        countCalls: useFormState(''),
        packageType: useFormState('')
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
            <h2>Пакет #{packageId}</h2>
            <form className="category-form" noValidate onSubmit={(e) => submitForm(e)}>
                <input type="text" {...packageState.name} className="main-input" placeholder="Пакет" />
                <input type="text" {...packageState.price} className="main-input" placeholder="Цена" />
                <input type="text" {...packageState.countCalls} className="main-input" placeholder="Кол-во" />
                <input type="text" {...packageState.packageType} className="main-input" placeholder="Тип" />
                {/* <input type="text" {...testRestaurant.regLink} className="main-input" placeholder="Ссылка для регистрации" /> */}
                <button type="submit" className="main-btn">{ packageId != undefined ? 'Сохранить' : 'Добавить' }</button>
                {packageId !== undefined ? <a onClick={deletePackage}>Удалить пакет</a> : null }
            </form>
        </React.Fragment>
    );
}

export default Package;