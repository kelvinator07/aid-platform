import React, { Component } from "react";
import './Inbox.css';
import TextInput from '../../components/UI/TextInput/TextInput';
import { getCurrentUser } from '../../containers/Util/auth';
import { NavLink, Link } from "react-router-dom";
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

    // Get all requests by user id
    // Get all messages where request id in requests
    componentDidMount() {
        this.fetchMessages(this.state.currentUser.id);
        // this.fetchConversations(this.state.currentUser.id);
    }

    fetchRequests = (user_id) => {
        const url = `${SERVER_API_URL}/api/v1/requests/user/${user_id}`;
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
                    const sortedRequests = result.requests.slice().sort((a, b) => a.created_at > b.created_at ? -1 : 1)
                    this.setState({
                        isLoading: false,
                        requests: sortedRequests
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
                    console.log('fetchMessages > ', result)

                    let inbox = []
                    result.responses.forEach(obj => {
                        let fina =  {
                            request_id: obj.request_id,
                            response_id: obj.id,
                            request_description: obj.request.description,
                            messages: obj.messages
                        }
                        inbox.push(fina)
                     })

                     result.requests.forEach(obj => {
                        let fina =  {
                            request_id: obj.id,
                            response_id: obj.messages[0].response_id,
                            request_description: obj.description,
                            messages: obj.messages
                        }
                        inbox.push(fina)
                     })

                    console.log('inbox > ', inbox)

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

    fetchConversations = (conversationId) => {
        const url = `${SERVER_API_URL}/api/v1/conversations/${conversationId}`;
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
                    this.setState({
                        isLoading: false,
                        messages: result.messages
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

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
          message: ''
        })
      }

    handleChange = (e) => {
        this.setState({
          message: e.target.value
        })
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
                                        <NavLink key={message.request_id}
                                                to={`/chat?response_id=${message.messages[0].response_id}`} >
                                                <li className="list-group-item" key={message.request_id}>
                                                    
                                                    <div className="name">
                                                    {message.request_description}
                                                    </div>
                                                    <div className="text">
                                                    {message.messages[0].content}
                                                    </div>
                                                </li>
                                        </NavLink>
                                        )
                                    })}
                                    </ul>
                                    {/* <Link to={`/conversation?requestid=${props.request.id}`} ><Button btnType="Success"> VOLUNTEER </Button></Link> */}

                                    {/* <div className="list-group">
                                            {this.state.messages.map(message => {
                                                return (
                                                    <li className="list-group-item" key={message.id}>
<Link 
                                                    to={`/conversation?requestid=${message.request_id}`} >
                                                        <div className="name">
                                                        {message.name}
                                                        </div>
                                                        <div className="text">
                                                        {message.body}
                                                        </div>
                                                </Link>

                                                    </li>
                                                    
                                                )
                                            })}
                                       
                                        {/* <a href="#" className="list-group-item list-group-item-action disabled">Vestibulum at eros</a> */}
                                    {/* </div> */}

                            </div>
                            </div>
                        </div>

                    </div>
                </div>
        );
    };
}

export default Inbox;