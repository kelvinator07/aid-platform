import React, { Component } from "react";
import './Home.css';
import Map from "../Map/Map";
import ModalReact from '../../components/UI/ModalReact/ModalReact';
import RequestDetails from '../RequestDetails/RequestDetails';
import getLocation from '../Util/location';
import { SERVER_API_URL } from '../../constants'
import { getCurrentUser } from '../../containers/Util/auth';

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
            location: [],
            conversationId: null,
            responseId:null,
            currentUser: getCurrentUser()
        }
    }

    componentDidMount() {
        this.fetchRequests();
        this.setState({ location : getLocation() })
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
                         let newObject = result.requests.map(obj => {
                            let fina =  {}
                            fina = { ...obj, latlng:[] }
                            fina['latlng'].push(obj.lat, obj.lng)
                            return fina
                         })
                         this.setState({ requests: newObject});
                    }
                    this.setState({
                        isLoading: false,
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

    createVolunteer = (volunteer) => {
        const url = `${SERVER_API_URL}/api/v1/volunteers`;
        fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(volunteer),
            })
            .then(res => res.json())
            .then(
                (result) => {   
                    this.setState({
                        isLoading: false
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

    createConversation = (conversation) => {
        console.log("createConversation ", conversation)
        const url = `${SERVER_API_URL}/api/v1/conversations`;
        fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(conversation),
            })
            .then(res => res.json())
            .then(
                (result) => {   
                    this.setState({
                        conversationId: result.id,
                        isLoading: false
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
      }

    requestCancel = () => {
        this.setState({requestSelected: false})
    }

    handleVolunteer = () => {
        let request = { ...this.state.request }
        let conversation = {
            recipient_id: request.user_id,
            sender_id: this.state.currentUser.id,
            request_id: request.id
        }
        this.createConversation(conversation);

        let volunteer = {
            user_id: this.state.currentUser.id,
            request_id: request.id
        }
        this.createVolunteer(volunteer);
    }

    
     handleResponse = async () => {
        
        try {
            const url = `${SERVER_API_URL}/api/v1/responses`;
            const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ request_id: this.state.request.id}),
                });
                let result = await res.json()
                this.setState({ responseId : result.data.id });
                this.props.history.push(`/chat?responseId=${this.state.responseId}`);
            } catch(e) {
                console.log(e);
            }
    }

    createResponse = async () => {
        try {
        const url = `${SERVER_API_URL}/api/v1/responses`;
        const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ request_id: this.state.request.id}),
            });
            let result = await res.json()
            this.setState({ responseId : result.data.id });
            this.props.history.push(`/chat?responseId=${this.state.responseId}`);
        } catch(e) {
            console.log(e);
          }
            
    }

    render () {
        return(
            <div className="Home">
                <div className="hero-container mb-5">
                    <div>
                         <h1>Unfufilled Requests: {this.state.requests.length}</h1>
                    </div>
                    { this.state.location.length > 1 &&
                    <Map location={this.state.location} requests={this.state.requests} clicked={this.requestHandler} />
                     }

                    <ModalReact show={this.state.requestSelected} modalClosed={this.requestCancel}
                     open={this.state.requestSelected}
                     closed={this.requestCancel}>
                                <RequestDetails 
                                currentUser={this.state.currentUser}
                                responseId={this.state.responseId}
                                    volunteer={this.handleResponse}
                                    closed={this.requestCancel} 
                                    request={this.state.request} />
                                </ModalReact>
                </div>
                
            </div>
        );
    };
}

export default Home;