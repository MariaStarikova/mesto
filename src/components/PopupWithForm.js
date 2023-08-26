import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback, api, userInfo) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._api = api;
    this._userInfo = userInfo;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputs = this._formElement.querySelectorAll('.popup__input');
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

      const submitButton = this._formElement.querySelector('.popup__button');
      const originalButtonText = submitButton.textContent;

      submitButton.textContent = 'Сохранение...';

      const result = this._submitCallback(formData);

      if (result && typeof result.then === 'function') {
        result.finally(() => {
          submitButton.textContent = originalButtonText;
        });
      } else {
        submitButton.textContent = originalButtonText;
      }
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
