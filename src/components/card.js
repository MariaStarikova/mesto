export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._setEventListeners();

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('element__button-like_active');
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _handleOpenPopup = () => {
    this._handleCardClick({ name: this._name, link: this._link });
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._element.querySelector('.element__button-remove').addEventListener('click', () => {
      this._handleDeleteButton();
    });

    this._imageElement.addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }
}
