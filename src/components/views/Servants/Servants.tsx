import React, { useEffect, useState } from 'react';
import './Servants.scss';
import DefaultTable from '../../ui/DefaultTable/DefaultTable';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import checkLoggedIn from '../../../common/checkLoggedIn';
import { ServantsResponse } from '../../../api/models/response/servants-response.model';
import { setServants, deleteServant as buildDeleteServant } from '../../../store/actions/servants-actions';
import ServantsAPI from '../../../api/servants';

const Servants: React.FC = React.memo((props:any) => {

    checkLoggedIn();

    const { id } = useParams();
    const { subCategoryId } = useParams();
    const history = useHistory();
    const servantsState = useSelector((state:any) => state.ServantsReducer);
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1)
    const [req, doReq] = useState(false)

    const getServantsList = () => {
        localStorage.setItem('subCategoryId', subCategoryId ? subCategoryId : '')
        console.log('update')
        subCategoryId ? 
            ServantsAPI.getServants(subCategoryId ? +subCategoryId : 0, 8, pageNumber, id ? +id : NaN)
                .then((response:AxiosResponse<ServantsResponse[]>) => {
                    doReq(true)
                    dispatch(setServants(response.data))
                })
                .catch(err => console.log(err)) :
            null
    }

    const deleteServant = (e:any) => {
        e.preventDefault();
        ServantsAPI.deleteServant(id ? +id : 0)
            .then((response:AxiosResponse) => {
                dispatch(buildDeleteServant({id: id ? +id : 0}))
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        localStorage.getItem('subCategoryId') != subCategoryId || !req ? getServantsList() : null
    });

    return(
        <React.Fragment>
            <div className="table-container">
                <DefaultTable 
                    list={servantsState?.map((item:ServantsResponse) => ({
                        id: item.id,
                        name: item.name,
                        imageUrl: item.imageUrl ? item.imageUrl : 'nothing',
                        subcategory: item.subCategory.id
                    }))}
                    // handleRowClick={(servantId) => history.push(`/categories/category/${id}/subcategory/${subCategoryId}/servant/${servantId}`)}
                    handleEditRowClick={(servantId) => history.push(`/categories/category/${id}/subcategory/${subCategoryId}/servant/${servantId}`)}
                    handleDeleteRowClick={(servantId) => deleteServant(servantId)}
                    headings={['Услуга', 'Image url', 'Subcategory number']}
                    caption="Услуги"
                >
                    <button onClick={() => history.push(`/categories/category/${id}/subcategory/${subCategoryId}/servant`)} className="main-btn">Добавить услугу</button>
                </DefaultTable>
            </div>
        </React.Fragment>
    );
})

export default Servants;