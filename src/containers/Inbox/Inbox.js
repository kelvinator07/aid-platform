import React, { Component } from "react";
import './Inbox.css';
import TextInput from '../../components/UI/TextInput/TextInput';


const DUMMY_DATA = [
    {
        id:1,
      senderId: "perborgen",
      text: "who'll win?"
    },
    {
        id:2,
      senderId: "janedoe",
      text: "who'll win?"
    }
  ]

class Inbox extends Component {

    constructor(props) {
        super(props);
        console.log("props con ", this.props)
        this.state = {
            error: null,
            isLoading: true,
            requests: [],
            places: [],
            request: null,
            requestSelected: false,
            messages: DUMMY_DATA,
            message: "",
            query: "",
            requestId: null
        }
    }

    // Get all requests by user id
    // Get all messages where request id in requests
    componentDidMount() {
        this.fetchMessages();
        // this.setState({ requestId: this.props.location.search.split("=")[1] });
        // console.log("requestId ", this.props.location.search.split("=")[1]);
    }


    fetchMessages = () => {
        const url = "http://localhost:5000/api/v1/messages";
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
                    console.log('Data > ', result)
                    
                    this.setState({
                        isLoading: false,
                        requests: result.requests
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
                                        <li className="list-group-item" key={message.id}>
                                            <div className="name">
                                            {message.senderId}
                                            </div>
                                            <div className="text">
                                            {message.text}
                                            </div>
                                        </li>
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