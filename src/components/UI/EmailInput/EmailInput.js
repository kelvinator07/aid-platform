import React from 'react'

const EmailInput = props => {
    
    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    const prop = { ...props };
    const { valid, ...propNoA } = prop;

    return (
        <div className="form-group">
            <input type="email" className={formControl} {...propNoA} />
        </div>
    );
}

export default EmailInput;