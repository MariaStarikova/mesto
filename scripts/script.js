const openPopupBtn = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_edit-profile');
const closePopupBtn = document.querySelector('.popup__close-button_edit');
const profileTitle = document.querySelector('.profile__title');
const titleInput = document.querySelector('.popup__input_title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const subtitleInput = document.querySelector('.popup__input_subtitle');
const editForm = document.querySelector('.popup__form');

function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');
}

function closePopup(popupEl) {
  popupEl.classList.remove('popup_opened');
}

openPopupBtn.addEventListener('click', function () {
  titleInput.value = profileTitle.textContent;
  subtitleInput.value = profileSubtitle.textContent;
  openPopup(editPopup);
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

openPopupAddBtn.addEventListener('click', function () {
  openPopup(editPopupAdd);
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
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

  mestoInput.value = '';
  imageInput.value = '';

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
