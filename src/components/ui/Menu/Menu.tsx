import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './Menu.scss';
import homeIcon from '../../../assets/images/menu/home.svg';
import restaurantIcon from '../../../assets/images/menu/restaurant.svg';
import passportsIcon from '../../../assets/images/menu/passports.svg';
import usersIcon from '../../../assets/images/menu/user-icon.svg';
import packagesIcon from '../../../assets/images/menu/packages.svg';
import logo from '../../../assets/images/menu/logo.svg';
import qrIcon from '../../../assets/images/menu/qr.svg';
import privacyIcon from '../../../assets/images/menu/union.svg';
import logoutIcon from '../../../assets/images/logout.svg';

const Menu = (props:{vision:boolean}) => {
    const links = [
        { icon: logo, path: '/categories' },
        // { icon: homeIcon, path: '/rest' },
        { icon: homeIcon, path: '/categories' },
        { icon: passportsIcon, path: '/passports' },
        { icon: usersIcon, path: '/users' },
        { icon: packagesIcon, path: '/packages' },
        // { icon: qrIcon, path: '/home/qr-code' },
    ];

    const history = useHistory();
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expireDate');
        localStorage.clear();
        history.push('/authorization');
    }
    
    return (
        <nav style={props.vision ? {left: 0} : {left: '-100%'}}>
            <div className="navigation-inner">
                <ul>
                    {links.map((link) => 
                        <NavLink exact to={link.path} activeClassName={link.icon != logo ? "active-link" : ''} key={link.path}><img src={link.icon} alt="" style={link.icon === logo ? {width: '60px'} : {width: '35px'}} /></NavLink>
                    )}
                    <a onClick={handleLogoutClick}><img src={logoutIcon} alt=""/></a>
                </ul>
            </div>
        </nav>
    ); 
};

export default Menu;