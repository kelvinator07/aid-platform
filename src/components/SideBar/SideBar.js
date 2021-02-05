import React from 'react';
import { NavLink } from "react-router-dom";

import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import './SideBar.css';
import Backdrop from '../UI/Backdrop/Backdrop';

import logo from '../../logo.svg';
import routes from '../../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHome, faUserCheck } from "@fortawesome/free-solid-svg-icons";

const Openn = {
    transform: 'translateX(0)'
}

const Close = {
    transform: 'translateX(-100%)'
}

const SideBar = (props) => {

    let attachedclassNamees = {...Close};
    if (props.open) {
        attachedclassNamees = {...Openn};
    }

    return(

        <div className="SideBar">

            <header id="header">
                <div className="d-flex flex-column justify-content-center text-center">

                <div className="profile mt-5">
                    <img src={logo} alt="" className="img-fluid rounded-circle"/>
                    <h2>Aid Platform</h2>
                    <div className="social-links mt-3 text-center">
                        {/* <a href="#" className="twitter"><span><FontAwesomeIcon icon={faTwitter} /></span></a> */}
                        {/* <a href="#" className="facebook"><span><FontAwesomeIcon icon={faFacebook} /></span></a> */}
                    </div>
                </div>

                {props.currentUser ? <nav className="nav-menu d-flex flex-column mt-3">
                    <ul>
                        <NavLink to="/home"><li><FontAwesomeIcon icon={faHome} /> <span>Volunteer To Help</span></li>
                        </NavLink>
                        <NavLink to="/request"><li><FontAwesomeIcon icon={faUserCheck} /> <span>Ask For Help</span></li>
                        </NavLink>
                    </ul>
                     {/* < NavigationItems /> */}
                </nav> : null}

                </div>
            </header>
            
        </div>
  
    );

    

}

export default SideBar;