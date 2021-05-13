import React, { Component } from "react";
import './Inbox.css';
import { getCurrentUser } from '../../containers/Util/auth';
import { NavLink } from "react-router-dom";
import { SERVER_API_URL } from '../../constants'


class Inbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            requests: [],
            places: [],
            request: null,
            requestSelected: false,
            messages: [],
            message: "",
            query: "",
            requestId: null,
            currentUser: getCurrentUser(),
            inbox: []
        }
    }

    componentDidMount() {
        this.fetchMessages(this.state.currentUser.id);
    }

    fetchMessages = (user_id) => {
        const url = `${SERVER_API_URL}/api/v1/responses`;
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
                    let inbox = []
                     let res = [];
                     result.requests.forEach(req => {
                        res = req.messages.map(obj => {

                            const container = {};

                            container.id = obj.id;
                            container.content = obj.content;
                            container.request_id = obj.request_id;
                            container.response_id = obj.response_id;
                            container.request_description = req.description;

                            return container;
                         })
                     })

                     const uniqueResponses = Array.from(new Set(res.map(a => a.response_id)))
                        .map(id => {
                        return res.find(a => a.response_id === id)
                        })

                    inbox = [...inbox, ...uniqueResponses]
                     result.responses.forEach(obj => {
                        let fina =  {
                            id: obj.id,
                            content: obj.messages[0].content,
                            request_id: obj.request_id,
                            response_id: obj.id,
                            request_description: obj.request.description
                        }
                        inbox.push(fina)
                     })
                     
                    this.setState({
                        isLoading: false,
                        inbox: inbox
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

    render () {
        return(

                <div className="Inbox">
                    <div className="container">

                        <div className="section-title">
                            <h2>Inbox...</h2>
                        </div>

                        <div className="row d-flex flex-column justify-content-space-between">
                            <div className="col-12">

                            <div  className="card mb-auto">
                                    <ul className="list-group list-group-flush message-list flex-container column">                 
                                        {this.state.inbox.map(message => {
                                        return (
                                        <NavLink key={message.id}
                                                to={`/chat?response_id=${message.response_id}`} >
                                                <li className="list-group-item" key={message.id}>
                                                    
                                                    <div className="name">
                                                    {message.request_description}
                                                    </div>
                                                    <div className="text">
                                                    {message.content}
                                                    </div>
                                                </li>
                                        </NavLink>
                                        )
                                    })}
                                    </ul>
                                    
                            </div>
                            </div>
                        </div>

                    </div>
                </div>
        );
    };
}

export default Inbox;