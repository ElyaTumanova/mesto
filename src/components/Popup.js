export class Popup {
  constructor (popup) {
    this._popup = popup;
    this._closePopupByOvelayClick = this._closePopupByOvelayClick.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  openPopup () {
    this._popup.classList.add ('popup_opened');
    document.addEventListener('keydown',this._handleEscClose);
  }

  closePopup () {
    this._popup.classList.remove ('popup_opened');
    document.removeEventListener('keydown',this._handleEscClose);
  }

  setEventListeners () {
    const closeButton = this._popup.querySelector('.popup__close');
    closeButton.addEventListener ('click', () => this.closePopup ());
    this._popup.addEventListener('click', this._closePopupByOvelayClick);
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }     
  }

  _closePopupByOvelayClick (evt) {
    if (evt.target.classList.contains('popup')) {
      this.closePopup();
    }
  }
}

