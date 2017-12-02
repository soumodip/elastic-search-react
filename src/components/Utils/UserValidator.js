import validator from 'validator';

export default function validateUser(data){

    let errors = {};
  
    if (validator.isEmpty(data.firstName)) {
      errors.firstName = "** First Name is Required";
    }
  
    if (validator.isEmpty(data.lastName)) {
        errors.lastName = "** Last Name is Required";
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "** Email is Required";
    } else if(!validator.isEmail(data.email)) {
        errors.email = "** Enter a Correct Email";
    }

    if (validator.isEmpty(data.description)) {
        errors.description = "** Description is Required";
    }
  
    return {
      errors: errors,
      isValid: (Object.keys(errors).length === 0 ? true : false)
    };

}