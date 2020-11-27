import React, { Component } from 'react';
import './SignUp.css';
import TextInput from '../../components/UI/TextInput/TextInput';
import EmailInput from '../../components/UI/EmailInput/EmailInput';
import ImageInput from '../../components/UI/ImageInput/ImageInput';

import validate from '../Util/validate';
import Loader from '../../components/UI/Loader/Loader';


import Modal from '../../components/UI/Modal/Modal';
import RequestDetails from '../RequestDetails/RequestDetails';
import ModalReact from '../../components/UI/ModalReact/ModalReact';


class SignUp extends Component {

    constructor () {
        super()
        this.state = {
            isLoading: false,
            error: null,
            formIsValid: false, //we will use this to track the overall form validity
            formControls: this.initialFormState(),
            formSuccess: false,
            formFailure: false,
            formMessage: null
        }
      
    }

    initialFormState() {
        return {
            firstname: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 5,
                    isRequired: true
                },
                placeholderText: 'Enter First Name',
                touched: false
            },
            lastname: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 5,
                    isRequired: true
                },
                placeholderText: 'Enter Last Name',
                touched: false
            },
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isRequired: true
                },
                placeholderText: 'Enter Email Address',
                touched: false
            },
            picture: {
                value: '',
                valid: false,
                validationRules: {
                    isRequired: true
                },
                placeholderText: 'Enter Picture',
                touched: false
            }
        }
    }
    
    changeHandler = event => {
        
        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = {
            ...this.state.formControls
        };
        const updatedFormElement = {
            ...updatedControls[name]
        };
        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

        // console.log(this.state.formControls)
    }

    onSubmitForm = (event) => {
        this.setState({ isLoading: true })
        event.preventDefault();
        const formData = {};
        for (let formElementId in this.state.formControls) {
            formData[formElementId] = this.state.formControls[formElementId].value;
        }
        
        console.dir(formData);
        this.submitFormToApi(formData);
    }

    submitFormToApi = (formData) => {
        const url = "http://localhost:5000/api/v1/signup"
        
        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ isLoading: false })
                console.log('Success:', data);
                if (data.status == "00") {
                    this.setState({ formControls: this.initialFormState(), formIsValid: false, formSuccess: true, formMessage: data.message })
                } else {
                    this.setState({ formIsValid: false, formFailure: true, formMessage: data.message })
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                console.error('Error:', error);
            });

    }
    
     render() {

        const { error, isLoading } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoading) {
            return <Loader show={this.state.isLoading} />;
        } else {

            return (

                <div className="SignUp">
                    <div className="container">

                        <div className="section-title">
                            <h2>SignUp For Help</h2>
                        </div>

                        <div className="row d-flex justify-content-center">
                            <div className="col-12">
                                { this.state.formSuccess ? (<h3>{ this.state.formMessage }</h3>) : null }
                                { this.state.formFailure ? (<h3>{ this.state.formMessage }</h3>) : null }
                                <form className="Contact">

                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <TextInput name="firstname" 
                                            placeholder={this.state.formControls.firstname.placeholderText}
                                            value={this.state.formControls.firstname.value}
                                            onChange={this.changeHandler}
                                            touched={this.state.formControls.firstname.touched}
                                            valid={this.state.formControls.firstname.valid}
                                            />
                                    </div>


                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <TextInput name="lastname" 
                                            placeholder={this.state.formControls.lastname.placeholderText}
                                            value={this.state.formControls.lastname.value}
                                            onChange={this.changeHandler}
                                            touched={this.state.formControls.lastname.touched}
                                            valid={this.state.formControls.lastname.valid}
                                            />
                                    </div>

                                    <div className="form-group">
                                        <label>Email Address:</label>
                                        <EmailInput name="email" 
                                            placeholder={this.state.formControls.email.placeholderText}
                                            value={this.state.formControls.email.value}
                                            onChange={this.changeHandler}
                                            touched={this.state.formControls.email.touched}
                                            valid={this.state.formControls.email.valid}
                                            />
                                    </div>

                                    <div className="form-group">
                                        <label>Picture:</label>
                                        <ImageInput name="picture" 
                                            placeholder={this.state.formControls.picture.placeholderText}
                                            value={this.state.formControls.picture.value}
                                            onChange={this.changeHandler}
                                            touched={this.state.formControls.picture.touched}
                                            valid={this.state.formControls.picture.valid}
                                            />
                                    </div>

                                    {/*                                     
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="customFile"/>
                                        <label className="custom-file-label" for="customFile">Choose file</label>
                                    </div> */}

                                    {/* <input type="btn btn-primary" value="submit" onClick={this.onSubmitForm} /> */}
                                    <button className="btn btn-primary" onClick={this.onSubmitForm} disabled={!this.state.formIsValid} > Sign Up </button>
                                    

                                </form> 

                                <ModalReact show={true} >
                                    <RequestDetails />
                                </ModalReact>

                            </div>
                        </div>

                    </div>
                </div>
                    
            );
        }
    }

};

export default SignUp;