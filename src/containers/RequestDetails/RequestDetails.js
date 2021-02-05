import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import { render } from '@testing-library/react';

const RequestDetails = (props) => {

    // This could be a functional component, doesn't have to be a class
    // componentDidUpdate() {
    //     console.log('[RequestDetails] WillUpdate', this.props.request);
    // }  
        
      
        // const ingredientSummary = Object.keys( this.props.ingredients )
        //     .map( igKey => {
        //         return (
        //             <li key={igKey}>
        //                 <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
        //             </li> );
        //     } );

        const history = useHistory();
        const handleClick = () => history.push('/conversation');
        let match = useRouteMatch();

        // console.log("match s ", match.url)
            console.log("props sun ", props.request)

            return (
                <>
                {props.request.id && (
                    <div>

                    <h3>Help Request Details</h3>                
                    <p><strong>Description: {props.request.description}</strong></p>
                    <p><strong>Request Type: {props.request.request_type.replace("_"," ")}</strong></p>
                    <p><strong>Status: {props.request.fulfilled ? "Fulfilled" : "Unfulfilled"}</strong></p>
                    <Link to={`/conversation?requestid=${props.request.id}`} onClick={props.volunteer}><Button btnType="Success"> VOLUNTEER </Button></Link>
                    
                    <Button className="m-2" btnType="Danger" clicked={props.closed}> CANCEL </Button>
                    </div>

                )}
                   
                </>
            );
       
}

export default RequestDetails;