//start - валидация форм

export const validationConfig = {
  formSelector: 'form',
  inputSelector: 'form__input',
  submitButtonSelector: 'form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_disabled',
  errorClass: 'form__error-message'
}

export {checkValidation,isValid,removeValidationErrors};

enableValidation (validationConfig);

function enableValidation (validationConfig) {
  const allForms = Array.from(document.forms);
  const allFormsInputs = Array.from(document.querySelectorAll(`.${validationConfig.inputSelector}`));
  setEventListener (allForms,allFormsInputs,validationConfig)
}

function setEventListener (allForms,allFormsInputs,validationConfig) {
  allForms.forEach ((form)=>{form.addEventListener ('input', () => {checkValidation(form,validationConfig)})});

  allFormsInputs.forEach(function (input) {
    const form = input.closest(`.${validationConfig.formSelector}`);
    input.addEventListener('input', () => {isValid(form,input,validationConfig)});
  });
}

function checkValidation (form,validationConfig) {
  const formInputs = Array.from(form.querySelectorAll(`.${validationConfig.inputSelector}`));
  const formButton = form.querySelector(`.${validationConfig.submitButtonSelector}`);
  const check = formInputs.some(function (input){
    return !input.validity.valid
  });
  toggleButton (check,formButton,validationConfig)
}

function toggleButton (check,button,validationConfig) {
  if (check) {
    button.classList.add(`${validationConfig.inactiveButtonClass}`);
    button.disabled = true;
  } else {
    button.classList.remove(`${validationConfig.inactiveButtonClass}`);
    button.disabled = false;
  }
}

function isValid (form,input,validationConfig) {
  if (!input.validity.valid) {
    const inputErrorMessage = input.validationMessage;
    showError (form,input,inputErrorMessage,validationConfig);
  } else {
    hideError(form,input,validationConfig);
  }
}

function showError (form,input,message,validationConfig) {
  input.classList.add(`${validationConfig.inputErrorClass}`);
  const errorMessageField = form.querySelector(`.${input.name}-error-message`);
  errorMessageField.textContent = message;
}

function hideError (form,input,validationConfig) {
  input.classList.remove(`${validationConfig.inputErrorClass}`);
  const errorMessageField = form.querySelector(`.${input.name}-error-message`);
  errorMessageField.textContent = "";
}

function removeValidationErrors (inputs,form) {
  inputs.forEach((input)=>{isValid(form,input,validationConfig)});
}

//end - валидация форм