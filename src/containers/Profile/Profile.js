import React, { Component } from "react";
import './Profile.css';
import { getCurrentUser } from '../../containers/Util/auth';
import ImageInput from '../../components/UI/ImageInput/ImageInput';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            picture: "",
            currentUser: getCurrentUser()
        }
    }

    // Get all requests by user id
    // Get all messages where request id in requests
    componentDidMount() {
        // this.fetchMessages();
        // this.setState({ requestId: this.props.location.search.split("=")[1] });
        // console.log("requestId ", this.props.location.search.split("=")[1]);
        // this.setState( { currentUser: getCurrentUser() } );

    }


    updatePicture = (formData) => {
        const url = "http://localhost:5000/api/v1/user";
        fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData),
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
            picture: e.target.value
        })
    }

    onSubmitForm = (event) => {
        this.setState({ isLoading: true })
        event.preventDefault();
        const formData = new FormData()

        const fileField = document.querySelector('input[type="file"]');
        console.log("fileField " ,fileField);

        let photoInput = document.getElementById('picture');
        if (photoInput.files[0]) {
            let upload_file = photoInput.files[0]
            formData.append("picture", upload_file);      
            
             
            for(var pair of formData.entries()) {
                console.log(pair[0]+ ', '+ pair[1]); 
            }

            this.updatePicture(formData);
        }

    }

    render () {
        const { currentUser } = this.state;

        return(

                <div className="Inbox">
                    <div className="container">

                        <div className="section-title">
                            <h2>Profile</h2>
                        </div>

                        <div className="row d-flex flex-column justify-content-space-between">
                            <div className="col-12">
                                <div className="">
                                    
                                    <p>First name: {currentUser.firstname}</p>
                                    <p>Last name: {currentUser.lastname}</p>
                                    <p>Email: {currentUser.email}</p>
                                    <p>Date Registered: {currentUser.created_at}</p>

                                </div>

                                <div className="form-group">
                                    <label>Picture:</label>
                                    <ImageInput name="picture" 
                                        placeholder="Upload a picture"
                                        value={this.state.picture}
                                        onChange={this.changeHandler}
                                        // onChange={(e)=>this._handleImageChange(e)}
                                        />
                                </div>
                                
                                <button className="btn btn-primary" onClick={this.onSubmitForm} > Save </button>
                            
                            </div>
                        </div>

                    </div>
                </div>
        );
    };
}

export default Profile;