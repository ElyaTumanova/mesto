import {Popup} from './Popup.js'
export class PopupWithImage extends Popup {
  constructor (popup,name, link) {
    super (popup);
    this.name = name;
    this.link = link;
    this._popupPhotoDesc = this._popup.querySelector('.photo-popup__description');
    this._popupPhotoPhoto = this._popup.querySelector('.photo-popup__photo');
  }

  openPopup () {
    super.openPopup();
    console.log (this.name);
    this._popupPhotoDesc.textContent = this.name;
    this._popupPhotoPhoto.src = this.link;
    this._popupPhotoPhoto.alt = this._name;
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