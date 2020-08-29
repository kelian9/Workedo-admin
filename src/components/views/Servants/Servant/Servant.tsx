import React, { useEffect, useState } from 'react';
import './Servant.scss';
import useFormState from '../../../../common/customHooks/useFormState';
import { useParams, useHistory } from 'react-router';
import { changeServant as buildChangeServant,
         deleteServant as buildDeleteServant,
         createServant as buildCreateServant  } from '../../../../store/actions/servants-actions';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SubCategoriesResponse } from '../../../../api/models/response/sub-categories-response.model';
import SubCategoriesAPI from '../../../../api/subcategories';
import { ServantsResponse } from '../../../../api/models/response/servants-response.model';
import ServantsAPI from '../../../../api/servants';
import Tasks from '../../Tasks/Tasks';

const Servant = () => {
    const { id } = useParams();
    const { servantId } = useParams();
    const { subCategoryId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const servantsState = useSelector((state:any) => state.ServantsReducer);
    const [req, doReq] = useState(false);
    const [formFile, setFormFile] = useState('')

    const servant = {
        name: useFormState(servantsState?.find((item:SubCategoriesResponse) => servantId && item.id === +servantId)?.name),
        subCategoryId: useFormState(subCategoryId ? +subCategoryId : '')
    }

    // const setLocalState = (state:SubCategoriesResponse) => {
    //     subcategory.name.onChange({target: {value: state?.name}})
    // }

    const getServantData = () => {
        let cat = servantsState?.find((item:SubCategoriesResponse) => servantId && item.id === +servantId)
        // cat ? setLocalState(cat) : null
    }

    const onSelectFile = (event:any) => {
        if (event.target.files && event.target.files[0]) {
            let reader: FileReader = new FileReader();
      
            const file: File = event.target.files[0];
      
            const files1 = event.target.files || event.srcElement.files;
            const file1 = files1[0];
      
            reader.readAsBinaryString(file); // read file as data url
            reader.onload = (event: any) => { // called once readAsDataURL is completed
                console.log(event)
                setFormFile(event.target.result);
      
            }
          }
    }

    const changeServant = () => {
        let form = new FormData()
        console.log(formFile)
        form.append('Name', servant.name.value)
        form.append('FormFile', formFile)
        form.append('SubCategoryId', servant.subCategoryId.value)
        ServantsAPI.changeServant(
            subCategoryId ? +subCategoryId : 0,
            form)
            .then((response:AxiosResponse<ServantsResponse>) => {
                dispatch(buildChangeServant({
                    id: servantId ? +servantId : NaN,
                    name: servant.name.value,
                    subCategoryId: +servant.subCategoryId.value
                }));
            })
            .catch(err => console.log(err))
    }

    const createServant = () => {
        let form = new FormData()
        console.log(formFile)
        form.append('Name', servant.name.value)
        form.append('FormFile', formFile)
        form.append('SubCategoryId', subCategoryId ? subCategoryId : '')
        ServantsAPI.createServant(form)
            .then((response:AxiosResponse<ServantsResponse>) => {
                dispatch(buildCreateServant({
                    id: response.data.id,
                    name: response.data.name,
                    countTasks: response.data.countTasks,
                    imageUrl: response.data.imageUrl,
                    subCategoryId: response.data.subCategory.id
                }));
                history.push(`/categories/category/${id}/subcategory/${subCategoryId}`)
            })
            .catch(err => console.log(err))
    }

    const deleteServant = (e:any) => {
        e.preventDefault();
        ServantsAPI.deleteServant(id ? +id : 0)
            .then((response:AxiosResponse) => {
                dispatch(buildDeleteServant({id: id ? +id : 0}))
                setTimeout(() => history.push(`/categories/category/${id}/subcategory/${subCategoryId}`), 0)
            })
            .catch(err => console.log(err))
    }

    const submitForm = (e:React.FormEvent) => {
        e.preventDefault();
        subCategoryId ? changeServant() : createServant();
    }

    useEffect(() => {
        if(!req && servantId !== undefined) {
            getServantData();
        }
    })

    return(
        <React.Fragment>
            <div className="container">
                <div className="category subcategory">
                    <h2>Услуга #{servantId || 'new'}</h2>
                    <form className="category-form subcategory-form" noValidate onSubmit={(e) => submitForm(e)}>
                        <input type="text" {...servant.name} className="main-input" placeholder="Услуга" />
                        <div className="main-input_with-label">
                            <input type="text" id="categoryId" {...servant.subCategoryId} className="main-input" />
                            <label htmlFor="categoryId" className={servant.subCategoryId.value === '' ? 'null' : 'filled-input_label'}>ID Подкатегории</label>
                        </div>
                        <input type="file" onChange={onSelectFile} className="main-input" placeholder="File" />
                        {/* <input type="text" {...testRestaurant.regLink} className="main-input" placeholder="Ссылка для регистрации" /> */}
                        <button type="submit" className="main-btn">{ id != undefined ? 'Сохранить' : 'Добавить' }</button>
                        {id !== undefined ? <a onClick={deleteServant}>Удалить услугу</a> : null }
                    </form>
                </div>
            </div>
            <Tasks />
        </React.Fragment>
    );
}

export default Servant;