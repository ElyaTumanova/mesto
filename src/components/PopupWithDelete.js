import {Popup} from './Popup.js'
export class PopupWithDelete extends Popup {
  constructor (popup) {
    super (popup);
    this._confirmButton = this._popup.querySelector('.form__submit-button');
  }

  openPopup () {
    super.openPopup();
  }

  closePopup () {
    super.closePopup();
  }

  setEventListeners () {
    super.setEventListeners();
    this._confirmButton.addEventListener ('click', () => this.closePopup ());
  }

  renderLoading () {
    super.renderLoading();
  }

  setSubmitAction(callback) {
    this._confirmButton.addEventListener ('click', callback);
  }

  _handleEscClose (evt) {
    super._handleEscClose(evt);    
  }

  _closePopupByOvelayClick (evt) {
    super._closePopupByOvelayClick(evt);
  }
}
