const openPopupBtn = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_edit-profile');
const closePopupBtn = document.querySelector('.popup__close-button_edit');
const profileTitle = document.querySelector('.profile__title');
const titleInput = document.querySelector('.popup__input_title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const subtitleInput = document.querySelector('.popup__input_subtitle');

function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popupEl) {
  popupEl.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

const editForm = document.querySelector('.popup__form');
const inputList = Array.from(editForm.querySelectorAll('.popup__input'));
const submitButton = editForm.querySelector('.popup__button');

openPopupBtn.addEventListener('click', function () {
  titleInput.value = profileTitle.textContent;
  subtitleInput.value = profileSubtitle.textContent;
  openPopup(editPopup);

  toggleButtonState(inputList, submitButton, settings);
});

closePopupBtn.addEventListener('click', function () {
  closePopup(editPopup);
});

editForm.addEventListener('submit', function (event) {
  event.preventDefault();

  profileTitle.textContent = titleInput.value;

  profileSubtitle.textContent = subtitleInput.value;

  closePopup(editPopup);
});

const openPopupAddBtn = document.querySelector('.profile__add-button');
const editPopupAdd = document.querySelector('.popup_add-card');
const closePopupAddBtn = document.querySelector('.popup__close-button_add');
const addForm = document.querySelector('.popup__form_add-card');
const inputListAdd = Array.from(addForm.querySelectorAll('.popup__input'));
const submitButtonAdd = addForm.querySelector('.popup__button');

openPopupAddBtn.addEventListener('click', function () {
  openPopup(editPopupAdd);
  toggleButtonState(inputListAdd, submitButtonAdd, settings);
});

closePopupAddBtn.addEventListener('click', function () {
  closePopup(editPopupAdd);
});

const template = document.querySelector('#template-element');
const templateContent = template.content;
const templateList = document.querySelector('.elements__list');
const templateListEl = templateContent.querySelector('.element');
const mestoInput = document.querySelector('.popup__input_mesto');
const imageInput = document.querySelector('.popup__input_image');

initialCards.forEach(function (item) {
  const newCard = createCard(item);
  templateList.prepend(newCard);
});

function createCard(value) {
  const newCard = templateListEl.cloneNode(true);

  const mestoTextEl = newCard.querySelector('.element__title');
  mestoTextEl.textContent = value.name;

  const imageEl = newCard.querySelector('.element__image');
  imageEl.src = value.link;
  imageEl.alt = value.name;

  const likeButton = newCard.querySelector('.element__button-like');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('element__button-like_active');
  });

  const deleteButton = newCard.querySelector('.element__button-remove');
  deleteButton.addEventListener('click', function () {
    templateList.removeChild(newCard);
  });

  imageEl.addEventListener('click', function () {
    openPopupView(value);
  });

  return newCard;
}

addForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const newCardData = {
    name: mestoInput.value,
    link: imageInput.value
  };

  const newCard = createCard(newCardData);
  templateList.prepend(newCard);

  addForm.reset();

  editPopupAdd.classList.remove('popup_opened');
});

const popupView = document.querySelector('.popup_image');
const popupImage = popupView.querySelector('.popup__image');
const popupTitle = popupView.querySelector('.popup__title-image');

function openPopupView(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupTitle.textContent = data.name;

  openPopup(popupView);
}

const popupViewCloseBtn = document.querySelector('.popup__close-button_view');

popupViewCloseBtn.addEventListener('click', function () {
  closePopup(popupView);
});

const popups = document.querySelectorAll('.popup');

popups.forEach(popup => {
  popup.addEventListener('click', event => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
});

function closePopupEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
