export class FormValidator {
  constructor (validationConfig, validationForm) {
    this._formSelector = validationConfig.formSelector
    this._inputSelector = validationConfig.inputSelector
    this._submitButtonSelector = validationConfig.submitButtonSelector
    this._inactiveButtonClass = validationConfig.inactiveButtonClass
    this._errorClass = validationConfig.errorClass
    this._validationForm = validationForm

    this._formInputs = Array.from(this._validationForm.querySelectorAll(`.${validationConfig.inputSelector}`));
    this._formButton = this._validationForm.querySelector(`.${this._submitButtonSelector}`);
  }

  enableValidation () {
    this._setEventListener (this._validationForm,this._formInputs)
  }

  _setEventListener () {
    this._validationForm.addEventListener ('input', () => {this.checkValidation()});
    this._formInputs.forEach( (input) => {
      input.addEventListener('input', () => {this._isValid(input)});
    });
  }

  _isValid (input) {
    if (!input.validity.valid) {
      const inputErrorMessage = input.validationMessage;
      this._showError (input,inputErrorMessage);
    } else {
      this._hideError(input);
    }
  }

  _showError (input,message) {
    input.classList.add(`${this._errorClass}`);
    const errorMessageField = this._validationForm.querySelector(`.${input.name}-error-message`);
    errorMessageField.textContent = message;
  }
  
  _hideError (input) {
    input.classList.remove(`${this._errorClass}`);
    const errorMessageField = this._validationForm.querySelector(`.${input.name}-error-message`);
    errorMessageField.textContent = "";
  }


  checkValidation () {
    const check = this._formInputs.some(function (input){
      return !input.validity.valid
    });

    this._toggleButton (check)
  }

  _toggleButton (check) {
    if (check) {
      this._formButton.classList.add(`${this._inactiveButtonClass}`);
      this._formButton.disabled = true;
    } else {
      this._formButton.classList.remove(`${this._inactiveButtonClass}`);
      this._formButton.disabled = false;
    }
  }

  removeValidationErrors () {
    this._formInputs.forEach((input)=>{this._isValid(input)});
  }
}