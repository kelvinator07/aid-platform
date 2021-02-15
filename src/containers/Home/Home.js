import React, { Component } from "react";
import './Home.css';
import Map from "../Map/Map";
import ModalReact from '../../components/UI/ModalReact/ModalReact';
import RequestDetails from '../RequestDetails/RequestDetails';
import getLocation from '../Util/location';
import authHeader from '../Util/auth-header';
import { SERVER_API_URL } from '../../constants'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            requests: [],
            places: [],
            request: {},
            requestSelected: false,
            location: []
        }
    }

    componentDidMount() {
        this.fetchRequests();
        const loc = getLocation();
        this.setState({ location : loc })
    }

    fetchRequests = () => {
        const url = `${SERVER_API_URL}/api/v1/requests`;
        fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.total > 0) {
                        const oneDay = 60 * 60 * 24 * 1000;
                        const filt = result.requests.filter(res => res.fulfilled == false || (res.fulfilled == false && res.fulfilcount < 5) || (res.fulfilcount >= 5 && (Date.parse(new Date()) - Date.parse(res.updated_at)) < oneDay));
                        console.log("1 ", filt)
                         let newObject = filt.map(obj => {
                            let fina =  {}
                            fina = { ...obj, latlng:[] }
                            fina['latlng'].push(obj.lat, obj.lng)
                            return fina
                         })
                         this.setState({ requests: newObject});
                    }
                    this.setState({
                        isLoading: false,
                        // request: result.data
                    });
                },
                (error) => {
                    console.log('Error > ', error)
                    this.setState({
                        isLoading: false,
                        error
                    });
                }
            )
    }

    updateRequest = (request) => {
        const url = `${SERVER_API_URL}/api/v1/requests/${request.id}`;
        fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(request),
            })
            .then(res => res.json())
            .then(
                (result) => {                    
                    this.setState({
                        isLoading: false,
                        request: result.data
                    });
                },
                (error) => {
                    console.log('Error > ', error)
                    this.setState({
                        isLoading: false,
                        error
                    });
                }
            )
    }

    requestHandler = (request) => {        
        this.setState({
            request,
            requestSelected: true
        })
    }

    requestConvo = (request) => {        
        this.setState({
            request,
            requestSelected: true
        })
    }

    handleClick() {
        this.props.history.push('/conversation');
        // onClick={() => this.handleClick()}
      }

    requestCancel = () => {
        this.setState({requestSelected: false})
    }

    handleVolunteer = () => {
        let request = { ...this.state.request }
        request.fulfilcount = request.fulfilcount + 1
        this.updateRequest(request);
    }

    render () {
        return(
            <div className="Home">
                <div className="hero-container mb-5">
                    <div>
                         <h1>Unfufilled Requests: {this.state.requests.length}</h1>
                    </div>
                    <Map className="" location={this.state.location} requests={this.state.requests} clicked={this.requestHandler} />
                    {/* <Modal show={this.state.requestSelected} modalClosed={this.requestCancel}>
                        <RequestDetails  request={this.state.request} />
                    </Modal> */}

                    <ModalReact show={this.state.requestSelected} modalClosed={this.requestCancel}
                     open={this.state.requestSelected}
                     closed={this.requestCancel}>
                                <RequestDetails 
                                    volunteer={this.handleVolunteer}
                                    handleClick={this.handleClick}
                                    closed={this.requestCancel} 
                                    request={this.state.request} />
                                </ModalReact>
                </div>
                
            </div>
        );
    };
}

export default Home;