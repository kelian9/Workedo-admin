import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './Menu.scss';
import homeIcon from '../../../assets/images/menu/home.svg';
import restaurantIcon from '../../../assets/images/menu/restaurant.svg';
import reviewsIcon from '../../../assets/images/menu/reviews.svg';
import waiterIcon from '../../../assets/images/menu/waiter.svg';
import walletIcon from '../../../assets/images/menu/wallet-icon.svg';
import logo from '../../../assets/images/menu/logo.svg';
import qrIcon from '../../../assets/images/menu/qr.svg';
import privacyIcon from '../../../assets/images/menu/union.svg';
import logoutIcon from '../../../assets/images/logout.svg';

const Menu = (props:{vision:boolean}) => {
    const links = [
        { icon: logo, path: '/main' },
        // { icon: homeIcon, path: '/rest' },
        { icon: restaurantIcon, path: '/categories' },
        { icon: reviewsIcon, path: '/passports' },
        { icon: waiterIcon, path: '/users' },
        { icon: walletIcon, path: '/packages' },
        // { icon: qrIcon, path: '/home/qr-code' },
        { icon: privacyIcon, path: '/policy-privacy' }
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
                        <NavLink exact to={link.path} activeClassName="active-link" key={link.path}><img src={link.icon} alt=""/></NavLink>
                    )}
                    <a onClick={handleLogoutClick}><img src={logoutIcon} alt=""/></a>
                </ul>
            </div>
        </nav>
    ); 
};

export default Menu;