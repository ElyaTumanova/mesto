import {Popup} from './Popup.js'
export class PopupWithDelete extends Popup {
  constructor (popup) {
    super (popup);
    this._popupForm = this._popup.querySelector('.form');
    this._formSubmitButtonText = this._popupForm.querySelector ('.form__submit-button').textContent;
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
      this.deleteCard();
    });
  }

  renderLoading (isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = this._formSubmitButtonText
    }
  }

  setSubmitAction(callback) {
    this.deleteCard = callback;
    };

  _handleEscClose (evt) {
    super._handleEscClose(evt);    
  }

  _closePopupByOvelayClick (evt) {
    super._closePopupByOvelayClick(evt);
  }
}