export class Card {
  constructor(item, template, handleCardClick, handleCardLike, userInfo, handleDeleteCard) {
    this._name = item.name;
    this._link = item.link;
    this._likesArr = item.likes;
    this._ownerId = item.owner._id;
    this._likeCount = item.likes.length;
    this._cardId = item._id;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._userInfo = userInfo;
    this._userId = userInfo._id;
    this._handleDeleteCard = handleDeleteCard;
  }
  // создание карточки места
  createNewPlaceCard() {
    this._element = this._getElement();
    this._placeCard = this._element.querySelector('.place');
    this._placeCardPhoto = this._element.querySelector('.place__photo');
    this._placeCardName = this._element.querySelector('.place__name');
    this._placeCardDeleteBtn = this._placeCard.querySelector ('.place__delete-btn');
    this._placeCardLikeBtn = this._placeCard.querySelector ('.place__like');
    this._likes = this._placeCard.querySelector ('.place__like-count');

    this._placeCardPhoto.src = this._link;
    this._placeCardName.textContent = this._name;
    this._placeCardPhoto.alt = this._name;
    this._likes.textContent = this._likeCount;

    this._setLike ();
    this._setDeleteButton ();

    this._addEventListenerForCard ();

    return this._element;
  }

  updateLikes (likes) {
    this._likes.textContent = likes.length;
    this._likesArr = likes;
  }

  // создание элемента для карточки места
  _getElement () {
    const placeCardElement = document
    .querySelector(this._template)
    .content
    .cloneNode(true)
 
    return placeCardElement;
  }

  _setLike () {
    if (this._likeStatus()) {
      this._placeCardLikeBtn.classList.add('place__like_active');
    }
  }

  _setDeleteButton () {
    if (this._userId === this._ownerId) {
      this._placeCardDeleteBtn.classList.remove('place__delete-btn_disabled') 
    } else {
      this._placeCardDeleteBtn.classList.add('place__delete-btn_disabled') 
    }
  }

// добавление event listeners на карточку места
_addEventListenerForCard () {
  
  this._placeCardDeleteBtn.addEventListener ('click', () => {
    this._handleDeleteCard (this);
  })

  this._placeCardLikeBtn.addEventListener ('click',() => {
    this._toggleLike();
  }) 

  this._placeCardPhoto.addEventListener ('click', () => {
    this._handleCardClick(this._name, this._link)
  });  
}

_toggleLike () {
  this._placeCardLikeBtn.classList.toggle('place__like_active');
  this._handleCardLike (this._cardId,this._likeStatus ());
}

_likeStatus () {
  let isLiked = false;
  this._likesArr.forEach(like => {
     if (like._id === this._userId) {
      isLiked = true;
    } 
  });
  return isLiked;
}
}