import {Popup} from './Popup.js'
export class PopupWithImage extends Popup {
  constructor (popup) {
    super (popup);
    this._popupPhotoDesc = this._popup.querySelector('.photo-popup__description');
    this._popupPhotoPhoto = this._popup.querySelector('.photo-popup__photo');
  }

  openPopup (name, link) {
    super.openPopup();
    this._popupPhotoDesc.textContent = name;
    this._popupPhotoPhoto.src = link;
    this._popupPhotoPhoto.alt = name;
  }

  closePopup () {
    super.closePopup();
  }

  setEventListeners () {
    super.setEventListeners();
  }

  _handleEscClose (evt) {
    super._handleEscClose(evt);    
  }

  _closePopupByOvelayClick (evt) {
    super._closePopupByOvelayClick(evt);
  }
}