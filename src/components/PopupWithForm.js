import {Popup} from './Popup.js'
export class PopupWithForm extends Popup {
  constructor (popup,formSubmit) {
    super (popup);
    this._formSubmit = formSubmit;
    this._popupForm = this._popup.querySelector('.form')
    this._popupFormInputs = this._popupForm.querySelectorAll('.form__input');
    this._popupPlaceName = this._popupForm.querySelector('.place-form__input_type_name');
    this._popupPlaceLink = this._popupForm.querySelector('.place-form__input_type_link');
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

  getInputValues () {
    console.log(this._popupPlaceName)
    const inputValues = [{
      name: this._popupPlaceName.value,
      link: this._popupPlaceLink.value
    }]
    
    return inputValues;
  }
}