import React from 'react';
import { Switch, Redirect, Route } from 'react-router';
import Header from '../components/layouts/Header/Header';
import Registration from '../components/views/Auth/Registration/Registration';
import AuthLayout from '../components/layouts/AuthLayout/AuthLayout';
import Categories from '../components/views/Categories/Categories';
import Category from '../components/views/Categories/Category/Category';
import SubCategory from '../components/views/SubCategories/SubCategory/SubCategory';
import Servant from '../components/views/Servants/Servant/Servant';
import Task from '../components/views/Tasks/Task/Task';
import Passports from '../components/views/Passports/Passports';
import Passport from '../components/views/Passports/Passport/Passport';
import Users from '../components/views/Users/Users';
import User from '../components/views/Users/User/User';
import Packages from '../components/views/Packages/Packages';
import Package from '../components/views/Packages/Package/Package';
const Authorization = React.lazy(() => import('../components/views/Auth/Authorization/Authorization'));

// const Home = React.lazy(() => import('../components/views/Home/Home'));


const RenderAppComponent = (props:any) => (
    <Header>
        {props}
    </Header>
);

const RenderAuthComponent = (props:any) => (
    <AuthLayout>
        {props}
    </AuthLayout>
);

const Router = () => {
    return(
        <Switch>
            <Route path="/authorization" render={props => RenderAuthComponent(<Authorization />)} />
            <Route path="/registration" component={Registration} />
            <Route path="/packages/package/:packageId" render={props => RenderAppComponent(<Package />)} />
            <Route path="/packages" render={props => RenderAppComponent(<Packages />)} />
            <Route path="/users/:userId" render={props => RenderAppComponent(<User />)} />
            <Route path="/users" render={props => RenderAppComponent(<Users />)} />
            <Route path="/passports/passport/:passportId" render={props => RenderAppComponent(<Passport />)} />
            <Route path="/passports" render={props => RenderAppComponent(<Passports />)} />
            <Route path="/categories/category/:id/subcategory/:subCategoryId/servant/:servantId/task/:taskId" render={props => RenderAppComponent(<Task />)} />
            <Route path="/categories/category/:id/subcategory/:subCategoryId/servant/:servantId" render={props => RenderAppComponent(<Servant />)} />
            <Route path="/categories/category/:id/subcategory/:subCategoryId/servant" render={props => RenderAppComponent(<Servant />)} />
            <Route path="/categories/category/:id/subcategory/:subCategoryId" render={props => RenderAppComponent(<SubCategory />)} />
            <Route path="/categories/category/:id/subcategory" render={props => RenderAppComponent(<SubCategory />)} />
            <Route path="/categories/category/:id" render={props => RenderAppComponent(<Category />)} />
            <Route path="/categories/category" render={props => RenderAppComponent(<Category />)} />
            <Route path="/categories" render={props => RenderAppComponent(<Categories />)} />
            <Redirect exact from="/" to="/authorization" />
        </Switch>
    );
};

export default Router;
