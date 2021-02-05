import React from 'react';

const validate = (value, rules) => {
  // debugger;
    let isValid = true;
    
    for (let rule in rules) {
    
      switch (rule) {
          case 'minLength': isValid = isValid && minLengthValidator(value, rules[rule]); break;

          case 'maxLength': isValid = isValid && maxLengthValidator(value, rules[rule]); break;
          
          case 'isRequired': isValid = isValid && requiredValidator(value); break;

          case 'isRequiredNumber': isValid = isValid && requiredNumberValidator(value); break;
              
          case 'isEmail': isValid = isValid && emailValidator(value); break;
          
            default: isValid = true;
      }
  
    }
    
    return isValid;
  }
  
  
  /**
   * minLength Val
   * @param  value 
   * @param  minLength
   * @return          
   */
  const minLengthValidator = (value, minLength) => {
      return value.length >= minLength;
  }

  /**
   * maxLength Val
   * @param  value 
   * @param  maxLength
   * @return          
   */
  const maxLengthValidator = (value, maxLength) => {
    return value.length <= maxLength;
}
  
  /**
   * Check to confirm that feild is required
   * 
   * @param  value 
   * @return       
   */
  const requiredValidator = value => {
      return value.trim() !== '';	
  }

  /**
   * Check to confirm that field is a number
   * 
   * @param  value 
   * @return       
   */
  const requiredNumberValidator = value => {
    return Number(value) === value && value % 1 !== 0;
}

  
  /**
   * Email validation
   * 
   * @param value
   * @return 
   */
  const emailValidator = value => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
  }
  
  
  
  export default validate;