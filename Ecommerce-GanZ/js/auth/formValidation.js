function Validator(options) {

    const validate = (inputElement, rule) => {
        let errorMessage = rule.test(inputElement.value);
        let errorElement = inputElement.parentElement.querySelector('.form-message');

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            if (errorElement.innerText = inputElement.value) {
                errorElement.style.display = "none";
            }
            
        }
    }
    let formElement = document.querySelector(options.form);

    if (formElement) {

        options.rules.forEach(rule => {
            let inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                inputElement.onblur = () => {
                    validate(inputElement, rule);
                }
            }

        });
    }
}

//Check Input
function checkInput(value){
    return value.trim() ? undefined : "Vui lòng nhập trường này!"
}
Validator.isRequired = (selector) => {
    return {
        selector : selector,
        test: checkInput
    };
}

//Check email
function checkIsEmail(value){
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexEmail.test(value) ? value : `Vui lòng nhập Email!`
}
Validator.isEmail = (selector) => {
    return {
        selector : selector,
        test: checkIsEmail
    };
}


//Check PhoneNumber
function checkPhoneNumber(value){
    let regexPhone = /^\+?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regexPhone.test(value) ? value : `Vui lòng nhập số điện thoại!`
}
Validator.isPhoneNumber = (selector) => {
    return {
        selector : selector,
        test: checkPhoneNumber
    };
}

//Check length
Validator.minLength = (selector, min) => {
    return {
        selector : selector,
        test: (value) => {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiếu ${min} kí tự!`;
        }
    };
}
Validator.isConfirmed = (selector, getConfirmValue) => {
    return {
        selector : selector,
        test: (value) => {
            return value === getConfirmValue() ? undefined : `Giá trị nhập vào không trùng khớp!`;
        }
    };
}