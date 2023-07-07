import { openPopupView } from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('#template-element')
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const imageElement = this._element.querySelector('.element__image');
    imageElement.src = this._link;
    imageElement.alt = this._name;

    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _handleLikeButton() {
    this._element
      .querySelector('.element__button-like')
      .classList.toggle('element__button-like_active');
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _handleOpenPopup() {
    openPopupView({ name: this._name, link: this._link });
  }

  _setEventListeners() {
    this._element.querySelector('.element__button-like').addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._element.querySelector('.element__button-remove').addEventListener('click', () => {
      this._handleDeleteButton();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }
}
