import React, { Component } from "react";
import './Chat.css';
import TextInput from '../../components/UI/TextInput/TextInput';
import { getCurrentUser } from '../../containers/Util/auth';
import { SERVER_API_URL, ACTION_CABLE_URL } from '../../constants'
import { createConsumer } from '@rails/actioncable';

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
        this.createSocket();
    }
      
    createSocket() {
        let cable = createConsumer(ACTION_CABLE_URL);
        this.chats = cable.subscriptions.create({
            channel: 'MessagesChannel',
            id: this.props.location.search.split("=")[1]
        }, {
          connected: () => {
            console.log("Connected")
          },
          disconnected: () => {
            // Called when the subscription has been terminated by the server
            console.log("disconnected")
          },
          received: (data) => {
            // Called when there's incoming data on the websocket for this channel
              let msg = {
                    id: data.id,
                    user: {
                        firstname: data.firstname
                    },
                    content: data.content
                }

                let chatMessages = this.state.messages;
                chatMessages.push(msg);
                this.setState({ messages: chatMessages , message: ''});
          }
        });
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