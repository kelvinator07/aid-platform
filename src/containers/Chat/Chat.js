import React, { Component } from "react";
import './Chat.css';
import TextInput from '../../components/UI/TextInput/TextInput';
import { getCurrentUser } from '../../containers/Util/auth';
import { SERVER_API_URL } from '../../constants'

class Chat extends Component {

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
            responseId: null,
            name: "",
            currentUser: getCurrentUser()
        }
    }

    componentDidMount() {
        this.setState({ responseId: this.props.location.search.split("=")[1] });
        this.fetchMessages(this.props.location.search.split("=")[1]);
    }

    fetchMessages = (responseId) => {
        const url = `${SERVER_API_URL}/api/v1/messages/${responseId}`;
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
                        messages: result
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

    sendMessage = (formData) => {
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
                    result = result.message
                    let msg = {
                        id: result.id,
                        user: {
                            firstname: result.firstname
                        },
                        content: result.content
                    }
                    this.setState({
                        isLoading: false,
                        message: '',
                        messages: [ ...this.state.messages, msg ]
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
                content: this.state.message,
                response_id: parseInt(this.state.responseId),
                user_id: parseInt(this.state.currentUser.id)
            }
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

                <div className="Chat">
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
                                            {message.user.firstname}
                                            </div>
                                            <div className="text">
                                            {message.content}
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

export default Chat;