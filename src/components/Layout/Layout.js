import React, { Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import SideBar from '../SideBar/SideBar';
import './Layout.css';
import ScrollArrow from '../UI/ScrollArrow/ScrollArrow';
import { getCurrentUser, signoutUser } from '../../containers/Util/auth';


class Layout extends Component {

    constructor () {
        super()
    }

    componentDidMount =() => {
        this.setState( { currentUser: getCurrentUser() } );
        console.log("Props Layout > ", this.props)
    }

    state = {
        showSideDrawer: false,
        navBarColor: true,
        currentUser: null,
        authenticated: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    signout = () => {
        signoutUser();
        this.setState( { currentUser: null } );
    }

    render() {
        return(
            <>
                <Toolbar navBarColor={this.state.navBarColor} drawerToggleClicked={this.sideDrawerToggleHandler} 
                            currentUser={this.state.currentUser} signout={this.signout} />
                <div className="">
                    <div className="row">
                        <div className="col-md-3">
                            <SideBar currentUser={this.state.currentUser} />
                        </div>

                        <div className="col-md-9">
                        <SideDrawer
                            currentUser={this.state.currentUser}
                            open={this.state.showSideDrawer}
                            closed={this.sideDrawerClosedHandler}      
                            drawerToggleClicked={this.sideDrawerClosedHandler}/>
                             <main className="Layout">
                                {this.props.children}
                            </main>
                        </div>

                    </div>

                </div>
                <ScrollArrow />
            </>                
        );
    }
}

export default Layout;