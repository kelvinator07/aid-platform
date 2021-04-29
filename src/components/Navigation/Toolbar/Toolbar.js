import React from 'react';

import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import { NavLink } from 'react-router-dom';

const toolbar = ( props ) => {

    return(
        <header className="Toolbar" >
            <div style={{height: '100%', padding: '1px'}}>
                <NavLink to="/home"> <Logo/> </NavLink>
            </div>
            <nav className="DesktopOnly">
                <NavigationItems currentUser={props.currentUser} signout={props.signout} />
            </nav>
            <DrawerToggle clicked={props.drawerToggleClicked} />
        </header>
    );
};

export default toolbar;