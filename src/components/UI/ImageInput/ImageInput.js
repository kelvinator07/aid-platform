import React from 'react'

const ImageInput = props => {
    
    let formControl = "form-control-file";

    if (props.touched && !props.valid) {
        formControl = 'form-control-file control-error';
    }

    return (
        <div className="form-group">
            <input type="file" ref={props.ref} accept="image/png, image/jpeg, image/pdf" className={formControl} {...props} id={props.name} />
        </div>
    );
}

export default ImageInput;