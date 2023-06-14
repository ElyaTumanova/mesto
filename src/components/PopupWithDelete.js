import {Popup} from './Popup.js'
export class PopupWithDelete extends Popup {
  constructor (popup) {
    super (popup);
    this._popupForm = this._popup.querySelector('.form');
  }

  openPopup () {
    super.openPopup();
  }

  closePopup () {
    super.closePopup();
  }

  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener  ('submit', (evt) => {
      evt.preventDefault();
      this.closePopup ();
    });
  }

  renderLoading () {
    super.renderLoading();
  }

  setSubmitAction(callback) {
    this._popupForm.addEventListener ('submit', (evt) => {
      evt.preventDefault();
      callback();
    });
  }

  _handleEscClose (evt) {
    super._handleEscClose(evt);    
  }

  _closePopupByOvelayClick (evt) {
    super._closePopupByOvelayClick(evt);
  }
}