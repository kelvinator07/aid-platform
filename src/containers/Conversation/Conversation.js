import React, { Component } from "react";
import './Conversation.css';
import TextInput from '../../components/UI/TextInput/TextInput';
import { getCurrentUser } from '../../containers/Util/auth';


const DUMMY_DATA = [
    {
        requestId:1,
        name: "perborgen",
        body: "who'll win?"
    },
    {
        requestId:2,
        name: "janedoe",
        body: "who'll win?"
    }
  ]

class Conversation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            requests: [],
            places: [],
            messages: DUMMY_DATA,
            message: "",
            query: "",
            requestId: null,
            name: "",
            currentUser: getCurrentUser()
        }
    }

    // Mark as fufilled
    // Re activate updated_at

    componentDidMount() {
        const { currentUser }  = this.state
        this.setState({ name: currentUser.firstname + " " + currentUser.lastname });
        this.setState({ requestId: this.props.location.search.split("=")[1] });
        console.log("requestId ", this.props.location.search.split("=")[1]);
        this.fetchMessages(this.props.location.search.split("=")[1]);
    }

    fetchMessages = (requestId) => {
        const url = `http://localhost:5000/api/v1/messages/${requestId}`;
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
        const url = `http://localhost:5000/api/v1/messages`;
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
                    console.log('sendMessage > ', result)
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
                request_id: parseInt(this.state.requestId)
            }
            console.log("FD " , data)
            this.sendMessage(data);
        }
        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // console.log("m ", this.state.message)
        // this.props.sendMessage(this.state.message)
        // this.setState({ message: ''})
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