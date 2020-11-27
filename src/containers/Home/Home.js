import React, { Component, useEffect, useState } from "react";
import './Home.css';
import { NavLink } from "react-router-dom";
import Map from "../Map/Map";

import Modal from '../../components/UI/Modal/Modal';
import RequestDetails from '../RequestDetails/RequestDetails';

const places  = [
    [51.505, -0.09],
    [51.506, -0.10],
    [51.507, -0.05]
]

class Home extends Component {

    state = {
        places: [],
        request: null,
        requestSelected: false
    }

    componentDidMount() {
        this.setState({
            places: [
                [51.505, -0.09],
                [51.506, -0.10],
                [51.507, -0.05]
            ]
        })
    }

    requestHandler = (request) => {        
        this.setState({
            request,
            requestSelected: true
        })
    }

    requestCancel = () => {
        this.setState({requestSelected: false})
    }

    render () {
        return(
            <div className="Home">
                <div className="hero-container mb-5">
                    <Map className="" places={this.state.places} clicked={this.requestHandler} />
                    <Modal show={this.state.requestSelected} modalClosed={this.requestCancel}>
                        <RequestDetails  request={this.state.request} />
                    </Modal>
                </div>
                
            </div>
        );
    };
}

export default Home;