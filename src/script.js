const popup = document.querySelector(".popup"); // окно попапа
const profileEditButton = document.querySelector(".profile__edit-button"); // кнопка открытия попапа
const popupCloseBtn = document.querySelector(".popup__close"); // кнопка закрытия попапа
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector("#formName");
const jobInput = document.querySelector("#formJob");
const cardAddButton = document.querySelector(".profile__add-button"); // кнопка открытия попапа добаления картинок
const cardCloseButton = document.querySelector(".popup__close_card"); // кнопка открытия попапа добаления картинок
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');


const popupEdit = document.querySelector(".popup_edit");
const newPopup = document.querySelector(".popup_card");
const popupImg = document.querySelector(".popup_img");

const popupSubmitButton = document.querySelector(".popup__submit-button");
const cardsContainer = document.querySelector(".elements");
const templateElement = document.querySelector(".template");





const clearErrorElement = (formSelector) => {

    const errorList = Array.from(formSelector.querySelectorAll('.popup__error'));
    errorList.forEach((error) => {
        error.classList.remove('popup__error_visible')
    });

    const errorInputList = Array.from(formSelector.querySelectorAll('.popup__form-text'));
    errorInputList.forEach((error) => {
        error.classList.remove('popup__form-text_type_error');
    })
}

//закрытие попап в области overlay
const closePopupInAnyArea = (evt) => {
    if (!evt.target.closest('.popup__form')) {
        closePopup(evt.target.closest('.popup'))
    }
};
popupEdit.addEventListener('click', closePopupInAnyArea);
newPopup.addEventListener('click', closePopupInAnyArea);
popupImg.addEventListener('click', closePopupInAnyArea);

//попап редактирования
profileEditButton.addEventListener("click", function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
    clearErrorElement(popupEdit)
    openPopup(popupEdit);
});
popupCloseBtn.addEventListener("click", () => closePopup(popupEdit));

// попап добавления карточек
cardAddButton.addEventListener("click", function() {
    invalidCreateButton(newPopup)
    clearErrorElement(newPopup)
    openPopup(newPopup)

});

cardCloseButton.addEventListener("click", function() {
    input.value = "";
    link.value = "";

    closePopup(newPopup)

});

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(popup);
}

formElement.addEventListener("submit", formSubmitHandler);



// удаление карточек с картинками
function deleteElementHandler(evt) {
    const target = evt.target;
    const currentTask = target.closest(".element");
    currentTask.remove();
}

// кнопка лайка
function likeButtonToggle(evt) {
    const likeAdd = evt.target;
    likeAdd.classList.toggle("element__group_theme_active");

}

function createCardDomNode(item) {
    const newItem = templateElement.content.cloneNode(true);
    const elementTitle = newItem.querySelector(".element__title");
    const elementLink = newItem.querySelector(".element__img");
    const deleteButton = newItem.querySelector(".element__trash-button");
    const likeButton = newItem.querySelector(".element__group");
    elementTitle.textContent = item.name;
    elementLink.src = item.link;
    elementLink.alt = item.name;

    likeButton.addEventListener("click", likeButtonToggle);
    deleteButton.addEventListener("click", deleteElementHandler);
    elementLink.addEventListener("click", () => openBigImgPopup(item));

    return newItem;
}



function renderCards() {
    const result = initialCards.map(createCardDomNode);
    cardsContainer.append(...result);
};


//попап большой картинки

const newText = popupImg.querySelector(".popup__text");
const newImages = popupImg.querySelector(".popup__big-img");


// большая картинка
function openBigImgPopup(item) {
    newText.textContent = item.name;
    newImages.src = item.link;
    newImages.alt = item.name;
    openPopup(popupImg);
}

const popupImgClose = document.querySelector(".popup__close_img");

popupImgClose.addEventListener("click", function() {
    closePopup(popupImg);
});

// добавить карточки
const formAddCard = document.querySelector(".popup__form_card");
const input = formAddCard.querySelector("#name");
const link = formAddCard.querySelector("#link");

function addFormListiner(evt) {
    evt.preventDefault();
    const item = { name: input.value, link: link.value };
    const newTask = createCardDomNode(item);
    cardsContainer.prepend(newTask);
    input.value = "";
    link.value = "";

    closePopup(newPopup);
}
renderCards();
formAddCard.addEventListener("submit", addFormListiner);


//закрытие попапа клавишей Esc 
const closePopupEscKey = (evt) => {
    const popup = document.querySelector('.popup_opened')
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
};

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscKey);
};



function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.addEventListener('keydown', closePopupEscKey);
};

// функция при повторном открытии попапа добавления карточки делает кнопку СОЗДАТЬ не активной до момента пока не будут введены название и URL
function invalidCreateButton(newPopup) {
    const saveButon = newPopup.querySelector('.popup__button-to-create');
    saveButon.classList.add('popup__submit-button_disabeld');
    saveButon.setAttribute('disabled', true);
}