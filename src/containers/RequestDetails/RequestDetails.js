import React from 'react';

import Button from '../../components/UI/Button/Button';

const RequestDetails = (props) => {

            return (
                <>
                {props.request.id && (
                    <div>
                        <h3>Help Request Details</h3>                
                        <p><strong>Description: {props.request.description}</strong></p>
                        <p><strong>Request Type: {props.request.request_type.replace("_"," ")}</strong></p>
                        <p><strong>Status: {props.request.fulfilled ? "Fulfilled" : "Unfulfilled"}</strong></p>
                        <Button className="btn btn-primary m-2" btnType="Success" disabled={props.request.user_id == props.currentUser.id} clicked={props.volunteer}> VOLUNTEER </Button>
                        <Button className="m-2" btnType="Danger" clicked={props.closed}> CANCEL </Button>
                    </div>

                )}
                </>
            );
       
}

export default RequestDetails;