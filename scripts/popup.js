import { editFormValidator } from './index.js';

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    console.log(this._popupSelector);
  }

  open() {
    const popupElement = document.querySelector(this._popupSelector);
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    const popupElement = document.querySelector(this._popupSelector);
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._openEditPopup = document.querySelector('.profile__edit-button');
    this._openAddPopup = document.querySelector('.profile__add-button');
    this._closeEditPopup = document.querySelector('.popup__close-button_edit');
    this._closeAddPopup = document.querySelector('.popup__close-button_add');

    this._openEditPopup.addEventListener('click', () => {
      this.open(this._popupSelector);
      editFormValidator.toggleButtonState();
    });

    this._closeEditPopup.addEventListener('click', () => {
      this.close(this._popupSelector);
    });

    this._openAddPopup.addEventListener('click', () => {
      this.open(this._popupSelector);
      editFormValidator.toggleButtonState();
    });

    this._closeAddPopup.addEventListener('click', () => {
      this.close(this._popupSelector);
    });
  }
}
