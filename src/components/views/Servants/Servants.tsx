import React, { useEffect, useState } from 'react';
import './Servants.scss';
import DefaultTable from '../../ui/DefaultTable/DefaultTable';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import checkLoggedIn from '../../../common/checkLoggedIn';
import { ServantsResponse } from '../../../api/models/response/servants-response.model';
import { setServants } from '../../../store/actions/servants-actions';
import ServantsAPI from '../../../api/servants';

const Servants: React.FC = React.memo((props:any) => {

    checkLoggedIn();

    const { id } = useParams();
    const { subCategoryId } = useParams();
    const history = useHistory();
    const servantsState = useSelector((state:any) => state.ServantsReducer);
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1)

    const getServantsList = () => {
        localStorage.setItem('subCategoryId', subCategoryId ? subCategoryId : '')
        console.log('update')
        ServantsAPI.getServants(subCategoryId ? +subCategoryId : 0, 8, pageNumber)
            .then((response:AxiosResponse<ServantsResponse[]>) => {
                dispatch(setServants(response.data))
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        localStorage.getItem('subCategoryId') != subCategoryId || !servantsState.length ? getServantsList() : null
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
                    handleCellClick={(servantId) => history.push(`/categories/category/${id}/subcategory/${subCategoryId}/servant/${servantId}`)}
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