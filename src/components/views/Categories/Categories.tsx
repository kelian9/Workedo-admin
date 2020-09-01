import React, { useEffect, useState } from 'react';
import './Categories.scss';
import DefaultTable from '../../ui/DefaultTable/DefaultTable';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { CategoriesResponse } from '../../../api/models/response/categories-response.model';
import { AxiosResponse } from 'axios';
import { setCategories, deleteCategory as buildDeleteCategory } from '../../../store/actions/categories-actions';
import checkLoggedIn from '../../../common/checkLoggedIn';
import CategoriesAPI from '../../../api/categories';

const Categories: React.FC = React.memo((props:any) => {

    checkLoggedIn();

    const history = useHistory();
    const categoriesState = useSelector((state:any) => state.CategoriesReducer);
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1)
    const [req, doReq] = useState(false)

    const getCategoriesList = (page?: number) => {
        CategoriesAPI.getCategories(8, page ? page : pageNumber)
            .then((response:AxiosResponse<CategoriesResponse[]>) => {
                doReq(true)
                if(response.data.length) {
                    dispatch(setCategories(response.data))
                    page ? setPageNumber(page) : null;
                    console.log(response.data)
                    console.log(categoriesState)
                }
            })
            .catch(err => console.log(err))
    }

    const deleteCategory = (e:number) => {
        // e.preventDefault();
        CategoriesAPI.deleteCategory(e ? +e : 0)
            .then((response:AxiosResponse) => {
                dispatch(buildDeleteCategory({id: e ? +e : 0}))
            })
            .catch(err => console.log(err))
    }

    const onSelectPrevPage = () => {
        if (pageNumber > 1) {
            getCategoriesList(pageNumber - 1)
        }
    }

    const onSelectNextPage = () => {
        getCategoriesList(pageNumber + 1);
    }

    useEffect(() => {
        if(!req) {
            getCategoriesList()
        }
        // categoriesState.length ? console.log(categoriesState) : null
    });

    return(
        <React.Fragment>
            <div className="table-container">
                <DefaultTable 
                    list={categoriesState.map((item:CategoriesResponse) => ({
                        id: item.id,
                        name: item.name,
                        imageUrl: item.imageUrl ? item.imageUrl : 'nothing'
                    }))}
                    // handleRowClick={(id) => history.push(`/categories/category/${id}`)}
                    handleEditRowClick={(id) => history.push(`/categories/category/${id}`)}
                    handleDeleteRowClick={(id) => deleteCategory(id)}
                    headings={['Category', 'Image url']}
                    caption="Категории"
                >
                    <React.Fragment>
                        <div className="page-switches">
                            <button className="prev-page" onClick={onSelectPrevPage}></button>
                            <div>{pageNumber}</div>
                            <button className="next-page" onClick={onSelectNextPage}></button>
                        </div>
                        <button onClick={() => history.push('/categories/category')} className="main-btn">Добавить категорию</button>
                    </React.Fragment>
                </DefaultTable>
            </div>
        </React.Fragment>
    );
})

export default Categories;