import React, { Component } from 'react';
import './SignUp.css';
import TextInput from '../../components/UI/TextInput/TextInput';
import EmailInput from '../../components/UI/EmailInput/EmailInput';
import ImageInput from '../../components/UI/ImageInput/ImageInput';

import validate from '../Util/validate';
import Loader from '../../components/UI/Loader/Loader';
import { SERVER_API_URL } from '../../constants'


class SignUp extends Component {

    constructor () {
        super()
        this.myRef = React.createRef();
        this.state = {
            isLoading: false,
            error: null,
            formIsValid: false, //we will use this to track the overall form validity
            formControls: this.initialFormState(),
            formSuccess: false,
            formFailure: false,
            formMessage: null,
            file: null 
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
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 5,
                    isRequired: true
                },
                placeholderText: 'Enter password',
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

    imageValueHandler = (event) => {
        console.log("imageValueHandler ", event)
    }

    imageHandler = event => {
        this.imageValueHandler(event);
        // this.changeHandler(event);
    }

    onSubmitForm = (event) => {
        this.setState({ isLoading: true })
        event.preventDefault();
        const formData = new FormData()

        for (let formElementId in this.state.formControls) {
            formData[formElementId] = this.state.formControls[formElementId].value;
            formData.append(formElementId, this.state.formControls[formElementId].value);
        }

        // let photoInput = document.getElementById('picture');
        // if (photoInput.files[0]) {
        //     let upload_file = photoInput.files[0]
        //     formData.append("picture", this.state.file);            
        // }

        let file = this.myRef.current.files[0];
        // debugger;
        formData.append("picture", file);

        console.log('myRef ', this.myRef.current.files[0])
        for(var pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
        }
        // console.log('formData ', formData)
        this.submitFormToApi(formData);

    }

    _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
            console.log("file ", file);
          this.setState({
            file: file,
            // imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }

    submitFormToApi = (formData) => {
        const url = `${SERVER_API_URL}/api/v1/signup`
        
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: formData,
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ isLoading: false })

                if (data.data) {
                    this.setState({ formControls: this.initialFormState(), formIsValid: false, formSuccess: true, formMessage: 'Registration Successful.' })
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

                <div className="SignUp">
                    <div className="container">

                        <div className="section-title">
                            <h2>SignUp For Help</h2>
                        </div>

                        <div className="row d-flex justify-content-center">
                            <div className="col-12">
                                { this.state.formSuccess ? (<h3>{ this.state.formMessage }</h3>) : null }
                                { this.state.formFailure ? (<h3>{ this.state.formMessage }</h3>) : null }
                                <form className="Contact" encType="multipart/form-data">

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
                                        <label>Password:</label>
                                        <TextInput name="password" 
                                            type="password"
                                            placeholder={this.state.formControls.password.placeholderText}
                                            value={this.state.formControls.password.value}
                                            onChange={this.changeHandler}
                                            touched={this.state.formControls.password.touched}
                                            valid={this.state.formControls.password.valid}
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
                                        <label htmlFor="picture">Picture:</label>
                                        <input type="file" ref={this.myRef}  name="picture"
                                        accept="image/png, image/jpeg, image/pdf" className="form-control-file" />

                                        {/* <ImageInput name="picture" 
                                            ref={this.myRef}
                                            placeholder="Choose a pic"
                                            // onChange={this.changeHandler}
                                            // onChange={(e)=>this._handleImageChange(e)}
                                            /> */}
                                    </div>

                                    <button className="btn btn-primary" onClick={this.onSubmitForm} disabled={!this.state.formIsValid} > Sign Up </button>

                                </form>

                            </div>
                        </div>

                    </div>
                </div>
                    
            );
        }
    }

};

export default SignUp;