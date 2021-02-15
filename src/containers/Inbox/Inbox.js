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
            currentUser: getCurrentUser()
        }
    }

    // Get all requests by user id
    // Get all messages where request id in requests
    componentDidMount() {
        this.fetchMessages(this.state.currentUser.id);
    }

    fetchMessages = (user_id) => {
        const url = `${SERVER_API_URL}/api/v1/messagebyuser/${user_id}`;
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
                                        {this.state.messages.map(message => {
                                        return (
                                        <NavLink 
                                                to={`/conversation?requestid=${message.request_id}`} >
                                                <li className="list-group-item" key={message.id}>
                                                    
                                                    <div className="name">
                                                    {message.name}
                                                    </div>
                                                    <div className="text">
                                                    {message.body}
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