export class Card {
  constructor(data, templateSelector, handleCardClick, handleLike, handleDelete, currentUserId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes || [];
    this._likeCount = this._likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;
    this._currentUserId = currentUserId;
    this._ownerId = data.owner._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__button-like');
    this._likeCountElement = this._element.querySelector('.element__like-number');
    this._setEventListeners();

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._element.querySelector('.element__title').textContent = this._name;

    this._likeCountElement.textContent = this._likeCount;

    if (this._likes.some(like => like._id === this._currentUserId)) {
      this.toggleLikeState();
    }

    // console.log('Owner ID:', this._ownerId);
    // console.log('Current User ID:', this._currentUserId);

    const deleteButton = this._element.querySelector('.element__button-remove');
    if (this._ownerId === this._currentUserId) {
      deleteButton.style.display = 'block';
    } else {
      deleteButton.style.display = 'none';
    }

    return this._element;
  }

  getElement() {
    return this._element;
  }

  toggleLikeState() {
    this._likeButton.classList.toggle('element__button-like_active');
  }

  _isLikedByCurrentUser() {
    return this._likes.some(user => user._id === this._currentUserId);
  }

  _handleLikeButton() {
    const action = this._likeButton.classList.contains('element__button-like_active')
      ? 'remove'
      : 'add';
    this._handleLike(this._id, action).then(likesCount => {
      this.toggleLikeState();
      this.updateLikes(likesCount);
    });
  }

  updateLikes(likesCount) {
    this._likeCount = likesCount;
    this._likeCountElement.textContent = this._likeCount;
  }

  _handleOpenPopup = () => {
    this._handleCardClick({ name: this._name, link: this._link });
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._element.querySelector('.element__button-remove').addEventListener('click', () => {
      this._handleDelete(this._id, this.getElement());
    });

    this._imageElement.addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }
}
