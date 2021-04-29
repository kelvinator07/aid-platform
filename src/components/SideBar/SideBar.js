import React from 'react';
import { NavLink } from "react-router-dom";
import './SideBar.css';

import logo from '../../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserCheck } from "@fortawesome/free-solid-svg-icons";


const SideBar = (props) => {

    return(

        <div className="SideBar">

            <header id="header">
                <div className="d-flex flex-column justify-content-center text-center">

                <div className="profile mt-5">
                    <img src={logo} alt="" className="img-fluid rounded-circle"/>
                    <h2>Aid Platform</h2>
                    <div className="social-links mt-3 text-center">
                    </div>
                </div>

                {props.currentUser ? <nav className="nav-menu d-flex flex-column mt-3">
                    <ul>
                        <NavLink to="/home"><li><FontAwesomeIcon icon={faHome} /> <span>Volunteer To Help</span></li>
                        </NavLink>
                        <NavLink to="/request"><li><FontAwesomeIcon icon={faUserCheck} /> <span>Ask For Help</span></li>
                        </NavLink>
                    </ul>
                </nav> : null}

                </div>
            </header>
            
        </div>
  
    );

    

}

export default SideBar;