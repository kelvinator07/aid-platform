import React, { Component } from 'react';
import './SignIn.css';
import TextInput from '../../components/UI/TextInput/TextInput';
import EmailInput from '../../components/UI/EmailInput/EmailInput';
import validate from '../Util/validate';
import setTokenToLocalStorage from '../Util/auth';

import Loader from '../../components/UI/Loader/Loader';

class SignIn extends Component {

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
            
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isRequired: true
                },
                placeholderText: 'Enter Email Address',
                touched: false
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 5,
                    maxLength: 50,
                    isRequired: true
                },
                placeholderText: 'Enter Password',
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
        const url = "http://localhost:5000/api/v1/login"
        
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
                    setTokenToLocalStorage(JSON.stringify(data.data.token));
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

                <div className="SignIn">
                    <div className="container">

                        <div className="section-title">
                            <h2>Login</h2>
                        </div>

                        <div className="row d-flex justify-content-center">
                            <div className="col-12">
                                { this.state.formSuccess ? (<h3>{ this.state.formMessage }</h3>) : null }
                                { this.state.formFailure ? (<h3>{ this.state.formMessage }</h3>) : null }
                                <form className="Contact">

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
                                        <label>Password:</label>
                                        <TextInput name="password" 
                                            placeholder={this.state.formControls.password.placeholderText}
                                            value={this.state.formControls.password.value}
                                            onChange={this.changeHandler}
                                            touched={this.state.formControls.password.touched}
                                            valid={this.state.formControls.password.valid}
                                            type="password"
                                            />
                                    </div>

                                    {/* <input type="btn btn-primary" value="submit" onClick={this.onSubmitForm} /> */}
                                    <button className="btn btn-primary" onClick={this.onSubmitForm} disabled={!this.state.formIsValid} > Log In </button>
                                    

                                </form> 

                            </div>
                        </div>

                    </div>
                </div>
                    
            );
        }
    }

};

export default SignIn;