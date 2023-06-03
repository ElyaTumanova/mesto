export class Card {
  constructor(item, template, handleCardClick) {
    this._name = item.placeName;
    this._link = item.placeImageLink;
    this._template = template;
    this._handleCardClick = handleCardClick;  
  }
  // создание карточки места
  createNewPlaceCard() {
    this._element = this._getElement();
    this._placeCard = this._element.querySelector('.place');
    this._placeCardPhoto = this._element.querySelector('.place__photo');
    this._placeCardName = this._element.querySelector('.place__name');
    this._placeCardDeleteBtn = this._placeCard.querySelector ('.place__delete-btn');
    this._placeCardLikeBtn = this._placeCard.querySelector ('.place__like');

    this._placeCardPhoto.src = this._link;
    this._placeCardName.textContent = this._name;
    this._placeCardPhoto.alt = this._name;
        
    this._addEventListenerForCard ();

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
_addEventListenerForCard () {
  
  this._placeCardDeleteBtn.addEventListener ('click', () => {
    this._deleteCard();
  })

  this._placeCardLikeBtn.addEventListener ('click',() => {
    this._toggleLike();
  }) 

  this._placeCardPhoto.addEventListener ('click', () => {
    this._handleCardClick(this._name, this._link)
  });  
}

_deleteCard () {
  this._placeCard.remove();
  this._placeCard = null;
}

_toggleLike () {
  this._placeCardLikeBtn.classList.toggle('place__like_active')
}
}