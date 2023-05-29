import {Popup} from './Popup.js'
export class PopupWithImage extends Popup {
  constructor (name, link, popup) {
    super (popup);
    this._name = name;
    this._link = link;
  }

  openPopup () {
    super.openPopup();
    const popupPhotoDesc = this._popup.querySelector('.photo-popup__description');
    const popupPhotoPhoto = this._popup.querySelector('.photo-popup__photo');
    popupPhotoDesc.textContent = this._name;
    popupPhotoPhoto.src = this._link;
    popupPhotoPhoto.alt = this._name;
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