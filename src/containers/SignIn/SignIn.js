import React, { Component } from 'react';
import './SignIn.css';
import TextInput from '../../components/UI/TextInput/TextInput';
import EmailInput from '../../components/UI/EmailInput/EmailInput';
import validate from '../Util/validate';
import { setTokenToLocalStorage, removeTokenFromLocalStorage, saveUserToLocalStorage } from '../Util/auth';
import { SERVER_API_URL } from '../../constants'
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
    }

    onSubmitForm = (event) => {
        removeTokenFromLocalStorage();
        this.setState({ isLoading: true })
        event.preventDefault();
        const formData = {};
        for (let formElementId in this.state.formControls) {
            formData[formElementId] = this.state.formControls[formElementId].value;
        }
        this.submitFormToApi(formData);
    }

    submitFormToApi = (formData) => {
        const url = `${SERVER_API_URL}/api/v1/login`
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: formData }),
            })
            .then(response => {
                if (response.ok) {
                    const auth = response.headers.get('authorization')
                    if (auth) setTokenToLocalStorage(auth.split(' ')[1]);
                    return response.json();
                } else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
            })
            .then(data => {
                this.setState({ isLoading: false })
                if (data.data) {
                    this.setState({ formControls: this.initialFormState(), formIsValid: false, formSuccess: true, formMessage: data.data.links.self })
                    saveUserToLocalStorage(data.data);
                    window.location.reload();
                    this.props.history.push('/home');
                } else {
                    this.setState({ formIsValid: false, formFailure: true, formMessage: data.error })
                }
                
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                this.setState({ formIsValid: true, formFailure: true, formMessage: "Network Error" })
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
                                            touched={this.state.formControls.email.touched.toString()}
                                            valid={this.state.formControls.email.valid.toString()}
                                            />
                                    </div>

                                    <div className="form-group">
                                        <label>Password:</label>
                                        <TextInput name="password" 
                                            placeholder={this.state.formControls.password.placeholderText}
                                            value={this.state.formControls.password.value}
                                            onChange={this.changeHandler}
                                            touched={this.state.formControls.password.touched.toString()}
                                            valid={this.state.formControls.password.valid.toString()}
                                            type="password"
                                            />
                                    </div>

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