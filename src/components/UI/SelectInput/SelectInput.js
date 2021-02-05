import React from 'react'

const SelectInput = props => {
    
    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group"> 
            <select className={formControl} {...props}>
                {props.options.map((option, key) => {
                    return (
                        <option value={option.toLowerCase().replace(" ","_")} key={key}>{option}</option>
                    )
                })}
            </select>
        </div>
    );
}

export default SelectInput;