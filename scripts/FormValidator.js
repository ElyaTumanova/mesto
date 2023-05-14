export const validationConfig = {
  formSelector: 'form',
  inputSelector: 'form__input',
  submitButtonSelector: 'form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_disabled',
  errorClass: 'form__error-message'
}

export class FormValidator {
  constructor (validationConfig, validationForm) {
    this._formSelector = validationConfig.formSelector
    this._inputSelector = validationConfig.inputSelector
    this._submitButtonSelector = validationConfig.submitButtonSelector
    this._inactiveButtonClass = validationConfig.inactiveButtonClass
    this._inputErrorClass = validationConfig.inputErrorClass
    this._errorClass = validationConfig.errorClass

    this._validationForm = validationForm

    this._formInputs = Array.from(this._validationForm.querySelectorAll(`.${validationConfig.inputSelector}`))
  }

  enableValidation () {
    this._setEventListener (this._validationForm,this._formInputs)
  }

  _setEventListener (form,formInputs) {
    form.addEventListener ('input', () => {this.checkValidation(form)});

    formInputs.forEach( (input) => {
      input.addEventListener('input', () => {this._isValid(this._validationForm,input)});
    });
  }

  _isValid (form,input) {
    if (!input.validity.valid) {
      const inputErrorMessage = input.validationMessage;
      this._showError (form,input,inputErrorMessage);
    } else {
      this._hideError(form,input);
    }
  }

  _showError (form,input,message) {
    input.classList.add(`${this._errorClass}`);
    const errorMessageField = form.querySelector(`.${input.name}-error-message`);
    errorMessageField.textContent = message;
  }
  
  _hideError (form,input) {
    input.classList.remove(`${this._errorClass}`);
    const errorMessageField = form.querySelector(`.${input.name}-error-message`);
    errorMessageField.textContent = "";
  }


  checkValidation () {
    const formButton = this._validationForm.querySelector(`.${this._submitButtonSelector}`);
    const check = this._formInputs.some(function (input){
      return !input.validity.valid
    });

    this._toggleButton (check,formButton)
  }

  _toggleButton (check,button) {
    if (check) {
      button.classList.add(`${this._inactiveButtonClass}`);
      button.disabled = true;
    } else {
      button.classList.remove(`${this._inactiveButtonClass}`);
      button.disabled = false;
    }
  }

  removeValidationErrors () {
    const inputsPopupProfile = Array.from(this._validationForm.querySelectorAll (`.${this._inputSelector}`));
    inputsPopupProfile.forEach((input)=>{this._isValid(this._validationForm,input)});
  }
}