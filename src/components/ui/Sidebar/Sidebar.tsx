import React, { useState, useEffect } from 'react';
import './Sidebar.scss';
import activityIcon from '../../../assets/images/sidebar/activity.svg';
import creditCardIcon from '../../../assets/images/sidebar/credit-card.svg';
import { CSSTransition } from 'react-transition-group';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { UserModel } from '../../../api/models/user.model';

const activityStyle = {
    // backgroundImage: `url(${activityIcon})`
}

const Sidebar = (props:any) => {

    // const profileState = useSelector((state:any) => state.SettingsReducer);
    const dispatch = useDispatch()

    const [clientWidth, changeClientWidth] = useState(document.documentElement.clientWidth)
    const [menu, toggleMenu] = useState(false)
    const [wallet, walletVision] = useState(false)
    const [profileMenu, profileMenuVision] = useState(false)
    // const [profileState, setProfileState] = useState<UserModel>(Object)
    let profileState = localStorage.getItem('user')

    // const getPhoto = () => {
    //     getAvatar()
    //         .then((response:AxiosResponse<AvatarResponse>) => {
    //             dispatch(setAvatarState({photoUrl: response.data.url}))
    //         })
    //         .catch(err => console.log(err));
    // }

    useEffect(() => {
        // if(profileState.avatar === undefined) {
        //     setProfileState()
        // }
        window.addEventListener('resize', () => {
            changeClientWidth(document.documentElement.clientWidth);
        })
    })

    // Handlers
    const showMenu = () => {
        toggleMenu(!menu);
        props.showMenuComponent(!menu);
        profileMenu && profileMenuVision(false)
        wallet && walletVision(false)
    }

    const showProfileMenu = () => {
        profileMenuVision(!profileMenu)
        wallet && walletVision(false)
    }

    return (
        <div className="sidebar">

            {/* <NavLink to="/home/withdrawal" className="withdrawal-btn"><img src={creditCardIcon} alt=""/> Transfer HUB</NavLink> */}

            {/* <button style={activityStyle} className="activity-btn" /> */}

            {/* Profile Menu */}
            <div className="profile-menu-toggle" onClick={showProfileMenu}>
                <img src={'http://194.177.23.9:998/' + JSON.parse(profileState ? profileState : '')?.avatar} alt=" " className="avatar"/>
            </div>
            <div className="profile-menu-container">
                <CSSTransition in={profileMenu} timeout={300} unmountOnExit classNames="show-hide-animation">
                    <ProfileMenu closeMenu={() => showMenu()} />
                </CSSTransition>
            </div>

            {/* Mobile Menu toggle-btn */}
            {
                clientWidth <= 600 ? 
                    <button onClick={showMenu} className={menu ? 'burger-menu-btn burger-menu-btn__active':'burger-menu-btn'}><span></span><span></span><span></span></button> :
                    null
            }
        </div>
    );
}

export default Sidebar;