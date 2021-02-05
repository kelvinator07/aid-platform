import React, { Component } from 'react';
import './Request.css';
import TextInput from '../../components/UI/TextInput/TextInput';
import Button from '../../components/UI/Button/Button';
import SelectInput from '../../components/UI/SelectInput/SelectInput';
import validate from '../Util/validate';
import Loader from '../../components/UI/Loader/Loader';
import { getCurrentUser } from '../../containers/Util/auth';
import Tabs from "../../components/Tabs/Tabs"; 


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
            formSuccess: false,
            formFailure: false,
            formMessage: null,
            allRequests: true,
            requests: [],
            currentUser: getCurrentUser()
        }
      
    }

    componentDidMount() {
        this.fetchRequests(this.state.currentUser.id);
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
            request_type: {
                value: 'one_time',
                valid: true,
                options: ['One Time', 'Material Need'],
                placeholderText: 'Select Type'
            },
            lat: {
                value: '',
                valid: true,
                validationRules: {
                    isRequiredNumber: true
                },
                placeholderText: 'Latitude',
                touched: false
            },
            lng: {
                value: '',
                valid: true,
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
        updatedControls.lng.value = position.coords.longitude.toFixed(3)

        updatedControls.lat.valid = validate(position.coords.latitude, updatedControls.lat.validationRules);
        updatedControls.lng.valid = validate(position.coords.longitude, updatedControls.lng.validationRules);

        // debugger;
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
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

    fetchRequests = (user_id) => {
        const url = `http://localhost:5000/api/v1/requests/user/${user_id}`;
        console.log("fetchRequests url ", url);
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
                    console.log('fetchRequests > ', result)
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
        // updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        // debugger;

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
        const url = "http://localhost:5000/api/v1/requests"
        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ isLoading: false })
                console.log('Success:', data);
                if (data.status === "00") {
                    this.setState({ formControls: this.initialFormState(), formIsValid: false, formSuccess: true })
                } else {
                    this.setState({ formFailure: true, formMessage: data.message })
                }
                
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                console.error('Error:', error);
            });
    }
    
     render() {

        const { error, isLoading, requests } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoading) {
            return <Loader show={this.state.isLoading} />;
        } else {

            return(
                
                <div className="Request">
                    <div className="container">

                        <div className="section-title">
                            <h2>Requests</h2>
                        </div>

                        <div className="row d-flex justify-content-center">
                            <div className="col-12">

                            <Tabs> 
                                
                                <div label="Request Form"> 
                                    
                                    { this.state.formSuccess ? (<h3>Your Entry Has Been Submitted. Thank You!</h3>) : null }
                                    <form className="Contact">

                                        <div className="form-group">
                                            <label>Description:</label>
                                            <TextInput name="description"  type="text"
                                                placeholder={this.state.formControls.description.placeholderText}
                                                value={this.state.formControls.description.value}
                                                onChange={this.changeHandler}
                                                touched={this.state.formControls.description.touched}
                                                valid={this.state.formControls.description.valid}
                                                />
                                        </div>


                                        <div className="form-group">
                                            <label>Type:</label>
                                            <SelectInput name="request_type" 
                                                placeholder={this.state.formControls.request_type.placeholderText}
                                                value={this.state.formControls.request_type.value}
                                                onChange={this.changeHandler}
                                                options={this.state.formControls.request_type.options}
                                                />
                                        </div>

                                        <div className="form-group">
                                            <label>Location:</label>
                                            <div className="d-flex flex-row">
                                                <TextInput name="lat" type="number"
                                                    placeholder={this.state.formControls.lat.placeholderText}
                                                    value={this.state.formControls.lat.value}
                                                    onChange={this.changeHandler}
                                                    touched={this.state.formControls.lat.touched}
                                                    valid={this.state.formControls.lat.valid}
                                                    // disabled
                                                    />

                                                    <TextInput name="lng" type="number" className="form-control ml-3"
                                                    placeholder={this.state.formControls.lng.placeholderText}
                                                    value={this.state.formControls.lng.value}
                                                    onChange={this.changeHandler}
                                                    touched={this.state.formControls.lng.touched}
                                                    valid={this.state.formControls.lng.valid}
                                                    // disabled
                                                    />

                                                    <div className="form-group">
                                                    <button className="btn btn-primary mx-4" type="button" onClick={this.getLocation}>Get My Location</button>
                                                    </div>
                                                    {/* <Button type="button" btnType="Primary" clicked={this.getLocation}>Get Location</Button> */}
                                            </div>
                                            
                                        </div>

                                        {/* <input type="btn btn-primary" value="submit" onClick={this.onSubmitForm} /> disabled={!this.state.formIsValid} */}
                                        <button className="btn btn-primary" onClick={this.onSubmitForm}  > Submit Request </button>
                                    

                                    </form> 
                                    
                                </div> 

                                <div label="Requests"> 
                                    
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">First</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Fulfilled</th>
                                                <th scope="col">Fulfilcount</th>
                                                <th scope="col">Request Type</th>
                                                <th scope="col">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {requests.map((value, key) => {
                                                let count = 1;
                                                return(
                                                    <tr key={key}>
                                                        <th scope="row">{value.id}</th>
                                                        <td>{count + 1}</td>
                                                        <td>{value.description}</td>
                                                        <td>{value.fulfilled ? "True" : "False"}</td>
                                                        <td>{value.fulfilcount}</td>
                                                        <td>{value.request_type}</td>
                                                        <td>{value.created_at}</td>
                                                    </tr>
                                                );
                                            })}
                                            
                                        </tbody>
                                    </table>

                                </div> 

                            </Tabs> 
                        </div>
                    </div>
                </div>
            </div>
            );

        //     return ( allRequests ? 

                // <div className="Request">
                //     <div className="container">

                //         <div className="section-title">
                //             <h2>All Requests</h2>
                //         </div>

                //         <div className="row d-flex justify-content-center">
                //             <div className="col-12">
                             

        //                     </div>
        //                 </div>

        //             </div>
        //         </div>
                    
        //     : <div className="Request">
        //             <div className="container">

        //                 <div className="section-title">
        //                     <h2>Request For Help</h2>
        //                 </div>

        //                 <div className="row d-flex justify-content-center">
        //                     <div className="col-12">
                               

        //                     </div>
        //                 </div>

        //             </div>
        //         </div>
        // );
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