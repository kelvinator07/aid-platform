import React from 'react';
import { NavLink } from "react-router-dom";
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import routes from '../../../routes';

const navigationItems = (props) => {

    return (
    
        props.currentUser ? <ul className="NavigationItems"> 
                    <NavigationItem link="/home">Home</NavigationItem>
                    <NavigationItem link="/profile">Profile</NavigationItem>
                    <NavigationItem link="/inbox" >Inbox</NavigationItem>
                    <NavigationItem link="/request" >Request</NavigationItem>
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


    // return ({ user ? 
    //             (
    //             <ul className="NavigationItems">
    //             {routes.map((value, key) => {
    //                 return (
    //                         <NavigationItem link={value.path} navSelected={props.clicked} key={key}>
    //                             {value.name}
    //                         </NavigationItem>
    //                 )
    //             })}
    //         </ul>
    //         ) : (<ul className="NavigationItems">
    //                  <NavigationItem link="/" active>Home</NavigationItem>
    //             </ul>) });
}
    

    // <ul className="NavigationItems">
    //     <NavigationItem link="/" active>Home</NavigationItem>
    //     <NavigationItem link="/">About</NavigationItem>
    //     <NavigationItem link="/">Resume</NavigationItem>
    //     <NavigationItem link="/">Portfolio</NavigationItem>
    //     <NavigationItem link="/">Services</NavigationItem>
    //     <NavigationItem link="/">Contact</NavigationItem>
    // </ul>

export default navigationItems;