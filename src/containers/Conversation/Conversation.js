import React, { Component } from "react";
import './Conversation.css';
import TextInput from '../../components/UI/TextInput/TextInput';
import { getCurrentUser } from '../../containers/Util/auth';
import { SERVER_API_URL } from '../../constants'

class Conversation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            requests: [],
            places: [],
            messages: [],
            message: "",
            query: "",
            requestId: null,
            conversationId: null,
            name: "",
            currentUser: getCurrentUser()
        }
    }

    componentDidMount() {
        const { currentUser }  = this.state
        this.setState({ name: currentUser.firstname + " " + currentUser.lastname });
        this.setState({ requestId: this.props.location.search.split("=")[1] });
        this.fetchConversationsByRequestId(this.props.location.search.split("=")[1]);
    }

    fetchMessages = (requestId) => {
        const url = `${SERVER_API_URL}/api/v1/messages/${requestId}`;
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

    fetchConversationsByRequestId = (requestId) => {
        const url = `${SERVER_API_URL}/api/v1/conversations/requestid/${requestId}`;
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
                    console.log("fetchConversationsByRequestId ", result)              
                    this.setState({
                        conversationId: result.data.id,
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

    sendMessage = (formData) => {
        console.log("")
        const url = `${SERVER_API_URL}/api/v1/messages`;
        fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData),
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoading: false,
                        message: '',
                        messages: [ ...this.state.messages, formData ]
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

    submitForm = (e) => {
        if (e.key === 'Enter') {
            let data = {
                body: this.state.message,
                name: this.state.name,
                conversation_id: this.state.conversationId,
                user_id: parseInt(this.state.currentUser.id)
            }
            console.log("submitForm ", this.state.conversationId)
            this.sendMessage(data);
        }
        
    }

    handleSubmit = (e) => {
        e.preventDefault()
      }

    handleChange = (e) => {
        this.setState({ message: e.target.value })
    }

    render () {
        return(

                <div className="Conversation">
                    <div className="container">

                        <div className="section-title">
                            <h2>Chats</h2>
                        </div>

                        <div className="row d-flex flex-column justify-content-space-between">
                            <div className="col-12">

                            <div  className="mb-auto">
                                    <ul className="message-list flex-container column">                 
                                        {this.state.messages.map(message => {
                                        return (
                                        <li key={message.id}>
                                            <div className="name">
                                            {message.name}
                                            </div>
                                            <div className="text">
                                            {message.body}
                                            </div>
                                        </li>
                                        )
                                    })}
                                    </ul>

                            </div>
                                

                            <div className="mt-auto">

                                    <div className="form-group" onSubmit={this.handleSubmit} className="send-message-form">
                                        <TextInput name="send-message-form" 
                                            placeholder="Type your message and hit ENTER"
                                            value={this.state.message}
                                            onChange={this.handleChange}
                                            onKeyPress={this.submitForm}
                                            />
                                    </div>

                            </div>
                                    

                            </div>
                        </div>

                    </div>
                </div>
        );
    };
}

export default Conversation;