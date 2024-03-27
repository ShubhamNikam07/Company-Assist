const validator = require('validator');

function isValidEmail(email) {
    console.log("emaill we have ",email)
    return validator.isEmail(email);
}
export {isValidEmail};