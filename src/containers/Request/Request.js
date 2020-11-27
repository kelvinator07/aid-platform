import React, { Component } from 'react';
import './Request.css';
import TextInput from '../../components/UI/TextInput/TextInput';
import Button from '../../components/UI/Button/Button';
import SelectInput from '../../components/UI/SelectInput/SelectInput';
import validate from '../Util/validate';
import Loader from '../../components/UI/Loader/Loader';

//Makes sure location accuracy is high
const options = {
    enableHighAccuracy: true
}
    
class Request extends Component {

    constructor () {
        super()
        this.state = {
            isLoading: false,
            error: null,
            formIsValid: false, //we will use this to track the overall form validity
            formControls: this.initialFormState(),
            formSuccess: false
        }
      
    }
    // selected
    initialFormState() {
        return {
            description: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 10,
                    maxLength: 300,
                    isRequired: true
                },
                placeholderText: 'Enter Description',
                touched: false
            },
            type: {
                value: '',
                valid: true,
                validationRules: {
                    isRequired: true
                },
                options: ['One Time', 'Material Need'],
                placeholderText: 'Select Type',
                touched: false
            },
            lat: {
                value: '',
                valid: false,
                validationRules: {
                    isRequiredNumber: true
                },
                placeholderText: 'Latitude',
                touched: false
            },
            long: {
                value: '',
                valid: false,
                validationRules: {
                    isRequiredNumber: true
                },
                placeholderText: 'Longitude',
                touched: false
            }
        }
    }

    getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.updatePosition, this.showError, options);
        } else { 
            alert("Geolocation is not supported by this browser.");
        }
    }
      
    updatePosition = position => {
        const updatedControls = {
            ...this.state.formControls
        };
       
        updatedControls.lat.value = position.coords.latitude.toFixed(3)
        updatedControls.long.value = position.coords.longitude.toFixed(3)

        updatedControls.lat.valid = validate(position.coords.latitude, updatedControls.lat.validationRules);
        updatedControls.long.valid = validate(position.coords.longitude, updatedControls.long.validationRules);

        this.setState({
            formControls: updatedControls
        })

        console.log(this.state.formControls)

        console.log(`Current Latitude is ${position.coords.latitude} and your longitude is ${position.coords.longitude}`);
    }

    // Displays the different error messages
    showError = error => {
        //mapArea.style.display = "block"
        switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("You denied the request for your location.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Your Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("Your request timed out. Please try again");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred please try again after some time.");
            break;
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

        if (Number(value) === value && value % 1 !== 0) value = value.toFixed(2);

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

        console.log(this.state.formControls)
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
        const url = "http://localhost:5000/api/v1/request"

        
            // fetch("/", {
            //     method: "post",
            //     headers: {
            //       "Content-Type": "application/json",
            //       Authorization: `bearer ${JWT_TOKEN}`,
            //     },
            //     body: JSON.stringify(requestBody),
            //   })
        
        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ isLoading: false })
                console.log('Success:', data);
                this.setState({ formControls: this.initialFormState(), formIsValid: false, formSuccess: true })
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

                <div className="Request">
                    <div className="container">

                        <div className="section-title">
                            <h2>Request For Help</h2>
                        </div>

                        <div className="row d-flex justify-content-center">
                            <div className="col-12">
                                { this.state.formSuccess ? (<h3>Your Entry Has Been Submitted. Thank You!</h3>) : null }
                                <form className="Contact">

                                    <div className="form-group">
                                        <label>Description:</label>
                                        <TextInput name="description" 
                                            placeholder={this.state.formControls.description.placeholderText}
                                            value={this.state.formControls.description.value}
                                            onChange={this.changeHandler}
                                            touched={this.state.formControls.description.touched}
                                            valid={this.state.formControls.description.valid}
                                            />
                                    </div>


                                    <div className="form-group">
                                        <label>Type:</label>
                                        <SelectInput name="type" 
                                            placeholder={this.state.formControls.type.placeholderText}
                                            value={this.state.formControls.type.value}
                                            onChange={this.changeHandler}
                                            touched={this.state.formControls.type.touched}
                                            valid={this.state.formControls.type.valid}
                                            options={this.state.formControls.type.options}
                                            />
                                    </div>

                                    <div className="form-group">
                                        <label>Location:</label>
                                        <div className="d-flex flex-row">
                                            <TextInput name="lat"
                                                placeholder={this.state.formControls.lat.placeholderText}
                                                value={this.state.formControls.lat.value}
                                                onChange={this.changeHandler}
                                                touched={this.state.formControls.lat.touched}
                                                valid={this.state.formControls.lat.valid}
                                                disabled
                                                />

                                                <TextInput name="long" className="form-control ml-3"
                                                placeholder={this.state.formControls.long.placeholderText}
                                                value={this.state.formControls.long.value}
                                                onChange={this.changeHandler}
                                                touched={this.state.formControls.long.touched}
                                                valid={this.state.formControls.long.valid}
                                                disabled
                                                />

                                                <div className="form-group">
                                                <button className="btn btn-primary mx-4" type="button" onClick={this.getLocation}>Get My Location</button>
                                                </div>
                                                {/* <Button type="button" btnType="Primary" clicked={this.getLocation}>Get Location</Button> */}
                                        </div>
                                        
                                    </div>

                                    {/* <input type="btn btn-primary" value="submit" onClick={this.onSubmitForm} /> */}
                                    <button className="btn btn-primary" onClick={this.onSubmitForm} disabled={!this.state.formIsValid} > Submit Request </button>
                                

                                </form> 

                            </div>
                        </div>

                    </div>
                </div>
                    
            );
        }
    }

};

export default Request;

// {
//     "id": 1,
//     "name": "Leanne Graham",
//     "username": "Bret",
//     "email": "Sincere@april.biz",
//     "address": {
//       "street": "Kulas Light",
//       "suite": "Apt. 556",
//       "city": "Gwenborough",
//       "zipcode": "92998-3874",
//       "geo": {
//         "lat": "-37.3159",
//         "lng": "81.1496"
//       }
//     },
//     "phone": "1-770-736-8031 x56442",
//     "website": "hildegard.org",
//     "company": {
//       "name": "Romaguera-Crona",
//       "catchPhrase": "Multi-layered client-server neural-net",
//       "bs": "harness real-time e-markets"
//     }
//   },