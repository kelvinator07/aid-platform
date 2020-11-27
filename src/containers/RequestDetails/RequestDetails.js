import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';

class RequestDetails extends Component {
    // This could be a functional component, doesn't have to be a class
    componentDidUpdate() {
        console.log('[RequestDetails] WillUpdate', this.props.request);
        
    }

    render () {
        // const ingredientSummary = Object.keys( this.props.ingredients )
        //     .map( igKey => {
        //         return (
        //             <li key={igKey}>
        //                 <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
        //             </li> );
        //     } );

        return (
            <>
                <h3>Help Request Details</h3>                
                <p><strong>Description: {this.props.request}</strong></p>
                <Button btnType="Success" >FUFILL NEED</Button>
                <Button btnType="Danger" >CANCEL</Button>

            </>
        );
    }
}

export default RequestDetails;