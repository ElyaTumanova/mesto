//start - валидация форм

export const classes = {
  formSelector: 'form',
  inputSelector: 'form__input',
  submitButtonSelector: 'form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_disabled',
  errorClass: 'form__error-message'
}

export {checkValidation,isValid};

enableValidation (classes);

function enableValidation (classes) {
  const allForms = Array.from(document.forms);
  const allFormsInputs = Array.from(document.querySelectorAll(`.${classes.inputSelector}`));
  setEventListener (allForms,allFormsInputs,classes)
}

function setEventListener (allForms,allFormsInputs,classes) {
  allForms.forEach ((form)=>{form.addEventListener ('input', () => {checkValidation(form,classes)})});

  allFormsInputs.forEach(function (input) {
    const form = input.closest(`.${classes.formSelector}`);
    input.addEventListener('input', () => {isValid(form,input,classes)});
  });
}

function checkValidation (form,classes) {
  const formInputs = Array.from(form.querySelectorAll(`.${classes.inputSelector}`));
  const formButton = form.querySelector(`.${classes.submitButtonSelector}`);
  const check = formInputs.some(function (input){
    return !input.validity.valid
  });
  toggleButton (check,formButton,classes)
}

function toggleButton (check,button,classes) {
  if (check) {
    button.classList.add(`${classes.inactiveButtonClass}`);
  } else {
    button.classList.remove(`${classes.inactiveButtonClass}`);
  }
}

function isValid (form,input,classes) {
  if (!input.validity.valid) {
    const inputErrorMessage = input.validationMessage;
    showError (form,input,inputErrorMessage,classes);
  } else {
    hideError(form,input,classes);
  }
}

function showError (form,input,message,classes) {
  input.classList.add(`${classes.inputErrorClass}`);
  const errorMessageField = form.querySelector(`.${input.name}-error-message`);
  errorMessageField.textContent = message;
}

function hideError (form,input,classes) {
  input.classList.remove(`${classes.inputErrorClass}`);
  const errorMessageField = form.querySelector(`.${input.name}-error-message`);
  errorMessageField.textContent = "";
}
//end - валидация форм