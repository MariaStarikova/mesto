import { Popup } from './Popup.js';

export class PopupRemove extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popupElement.querySelector('.popup__button_remove');
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setDeleteInfo(api, cardId, cardElement) {
    this._api = api;
    this._cardId = cardId;
    this._cardElement = cardElement;
  }

  _handleSubmitForm(event) {
    event.preventDefault();
    this._confirmButton.textContent = 'Удаление...';

    this._api
      .deleteCard(this._cardId)
      .then(() => {
        this._cardElement.remove();
        this._cardElement = null;
        this.close();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        this._confirmButton.textContent = 'Да';
      });
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', event => this._handleSubmitForm(event));
  }
}
