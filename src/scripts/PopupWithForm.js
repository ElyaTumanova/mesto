import {Popup} from './Popup.js'
export class PopupWithForm extends Popup {
  constructor (popup,formSubmit) {
    super (popup);
    this._formSubmit = formSubmit;
    this._popupForm = this._popup.querySelector('.form')
  }

  openPopup () {
    super.openPopup();
  }

  closePopup () {
    super.closePopup();
    this._popupForm.reset();
  }

  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._formSubmit);
  }

  _handleEscClose (evt) {
    super._handleEscClose(evt);    
  }

  _closePopupByOvelayClick (evt) {
    super._closePopupByOvelayClick(evt);
  }

  _getInputValues () {
    const inputs = this._popup.querySelectorAll('.form__input');
    const inputsValues = Array.from(inputs).map(function (item) {
      return item.value;
    })  
    return inputsValues;
  }

}