import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback, api, userInfo) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._api = api;
    this._userInfo = userInfo;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputs = this._formElement.querySelectorAll('.popup__input');
    this._submitButton = this._formElement.querySelector('.popup__button');
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', event => {
      event.preventDefault();

      const formData = this._getInputValues();

      const originalButtonText = this._submitButton.textContent;

      this._submitButton.textContent = 'Сохранение...';

      const result = this._submitCallback(formData);

      if (result && typeof result.then === 'function') {
        result.finally(() => {
          this._submitButton.textContent = originalButtonText;
        });
      } else {
        this._submitButton.textContent = originalButtonText;
      }
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
