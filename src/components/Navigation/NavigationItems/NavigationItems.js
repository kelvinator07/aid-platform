import React from 'react';
import { NavLink } from "react-router-dom";
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

    return (
    
        props.currentUser ? <ul className="NavigationItems"> 
                    <NavigationItem navSelected={props.clicked} link="/home">Home</NavigationItem>
                    <NavigationItem navSelected={props.clicked} link="/inbox" >Inbox</NavigationItem>
                    <NavigationItem navSelected={props.clicked} link="/request" >Request</NavigationItem>
                    <li className="NavigationItem">
                        <NavLink 
                            to='/signin' 
                            onClick={props.signout} >
                                Logout                            
                        </NavLink>
                    </li>
                    
                </ul> : 
                <ul className="NavigationItems"> 
                    <NavigationItem link="/signup" >SignUp</NavigationItem>
                    <NavigationItem link="/signin" >SignIn</NavigationItem>
                </ul>
    
    );
}


export default navigationItems;