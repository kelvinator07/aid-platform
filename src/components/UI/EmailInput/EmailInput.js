import React from 'react'

const EmailInput = props => {
    
    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    const prop = { ...props };
    const { valid, ...propNoA } = prop;
    // console.log(propNoA); // => { b: 2, c: 3 }

    return (
        <div className="form-group">
            <input type="email" className={formControl} {...propNoA} />
        </div>
    );
}

export default EmailInput;