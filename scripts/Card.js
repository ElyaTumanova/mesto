import {openPopup} from './utils.js'

export class Card {
  constructor(item, template) {
    this._name = item.name;
    this._link = item.link;
    this._template = template
  }
  // создание карточки места
  createNewPlaceCard() {
    this._element = this._getElement();
    const placeCardElementPhoto = this._element.querySelector('.place__photo');
    const placeCardElementName = this._element.querySelector('.place__name');
    placeCardElementPhoto.src = this._link;
    placeCardElementName.textContent = this._name;
    placeCardElementPhoto.alt = this._name;

    this._addEventListenerForCard (this._element.querySelector('.place'));

    return this._element;
  }
  // создание элемента для карточки места
  _getElement () {
    const placeCardElement = document
    .querySelector(this._template)
    .content
    .cloneNode(true)
 
    return placeCardElement;
  }

// добавление event listeners на карточку места
_addEventListenerForCard (placeSelector) {
  const elementDeleteCard = placeSelector.querySelector ('.place__delete-btn')
  const like = placeSelector.querySelector ('.place__like')
  const photo = placeSelector.querySelector ('.place__photo-wrap')

  elementDeleteCard.addEventListener ('click', function (event) {
    placeSelector.remove()
    event.preventDefault();
  })

  like.addEventListener ('click',function (event) {
    like.classList.toggle('place__like_active')
    event.preventDefault();
  }) 
  photo.addEventListener ('click',this._showPhotoPopup);  
}

//вывод попапа фото
_showPhotoPopup (evt) {
  const placeOpened = evt.target.closest('.place')
  const placeName = placeOpened.querySelector('.place__name').textContent;
  const placePhotoLink = placeOpened.querySelector('.place__photo').src;
  const popupPhoto = document.querySelector('.popup_photo');
  const popupPhotoDesc = popupPhoto.querySelector('.photo-popup__description');
  const popupPhotoPhoto = popupPhoto.querySelector('.photo-popup__photo');
  popupPhotoDesc.textContent = placeName;
  popupPhotoPhoto.src = placePhotoLink;
  popupPhotoPhoto.alt = placeName;
  openPopup (popupPhoto);
}
}