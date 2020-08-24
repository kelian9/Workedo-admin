import React, { useEffect, useState } from 'react';
import './SubCategories.scss';
import DefaultTable from '../../ui/DefaultTable/DefaultTable';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import checkLoggedIn from '../../../common/checkLoggedIn';
import CategoriesAPI from '../../../api/categories';
import { SubCategoriesResponse } from '../../../api/models/response/sub-categories-response.model';
import { setSubCategories } from '../../../store/actions/subcategories-actions';

const SubCategories: React.FC = React.memo((props:any) => {

    checkLoggedIn();

    const { id } = useParams();
    const history = useHistory();
    const subCategoriesState = useSelector((state:any) => state.SubCategoriesReducer);
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1)

    const getSubCategoriesList = () => {
        localStorage.setItem('categoryId', id ? id : '')
        console.log('update')
        CategoriesAPI.getSubCategories(id ? +id : 0, 8, pageNumber)
            .then((response:AxiosResponse<SubCategoriesResponse[]>) => {
                dispatch(setSubCategories(response.data))
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        localStorage.getItem('categoryId') != id || !subCategoriesState.length ? getSubCategoriesList() : null
    });

    return(
        <React.Fragment>
            <div className="table-container">
                <DefaultTable 
                    list={subCategoriesState?.map((item:SubCategoriesResponse) => ({
                        id: item.id,
                        name: item.name,
                        imageUrl: item.imageUrl ? item.imageUrl : 'nothing',
                        category: item.category.id
                    }))}
                    handleCellClick={(identificator) => history.push(`/categories/category/${id}/subcategory/${identificator}`)}
                    headings={['Subcategory', 'Image url', 'Subcategory number']}
                    caption="Подкатегории"
                >
                    <button onClick={() => history.push(`/categories/category/${id}/subcategory`)} className="main-btn">Добавить подкатегорию</button>
                </DefaultTable>
            </div>
        </React.Fragment>
    );
})

export default SubCategories;