let popup = document.querySelector('.popup'); // окно попапа
let profileEditButton = document.querySelector('.profile__edit-button'); // кнопка открытия попапа
let popupCloseBtn = document.querySelector('.popup__close-btn'); // кнопка закрытия попапа

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#formName');
let jobInput = document.querySelector('#formJob');

let newPopup = document.querySelector('.popup_card') // окно попапа добавления картинок
let cardAddButton = document.querySelector('.profile__add-button'); // кнопка открытия попапа добаления картинок
let cardCloseButton = document.querySelector('.popup_close-card'); // кнопка открытия попапа добаления картинок
let popupEdit = document.querySelector('.popup_edit');

// открыть попап
function openPopup(popup) {
    popup.classList.add('popup_opened')

}
// закрыть попап
function closePopup(popup) {
    popup.classList.remove('popup_opened')

}

//попап редактирования
profileEditButton.addEventListener('click', function() {
    openPopup(popupEdit);
    document.querySelector('#formName').value = document.querySelector('.profile__name').textContent
    document.querySelector('#formJob').value = document.querySelector('.profile__profession').textContent
});

popupCloseBtn.addEventListener('click', function() {
    closePopup(popupEdit)
});

// попап добавления карточек 
cardAddButton.addEventListener('click', function() {
    openPopup(newPopup);

});

cardCloseButton.addEventListener('click', function() {
    closePopup(newPopup)
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector('.profile__name').textContent = nameInput.value
    document.querySelector('.profile__profession').textContent = jobInput.value;
    popup.classList.remove('popup_opened');


}

formElement.addEventListener('submit', formSubmitHandler);

let popupSubmitButton = document.querySelector('.popup__submit-button');


const initialCards = [{
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


const cardsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('.template');

// удаление карточек с картинками
function deleteElementHandler(evt) {
    const target = evt.target;
    const currentTask = target.closest('.element');
    currentTask.remove();
}


function createTaskDomNode(item) {
    const newItem = templateElement.content.cloneNode(true);
    const elementTitle = newItem.querySelector('.element__title');
    const elementLink = newItem.querySelector('.element__img');
    elementTitle.textContent = item.name;
    elementLink.src = item.link;
    elementLink.alt = item.name;

    // нажатие кнопки лайк 
    const likeButton = newItem.querySelector('.element__group');

    function likeButtonToggle() {
        likeButton.classList.toggle('element__group_theme_active');
    }
    likeButton.addEventListener('click', likeButtonToggle);

    // удаление карточек
    const deleteButton = newItem.querySelector('.element__trash-button');
    deleteButton.addEventListener('click', deleteElementHandler);

    return newItem;
}

function renderList() {
    const result = initialCards.map(function(item) {
        const newTask = createElementDomNode(item);
        addTaskListeners(newTask);
        return newTask;
    });
    cardsContainer.append(...result);
}


function renderCards() {
    const result = initialCards.map(createTaskDomNode);
    cardsContainer.append(...result);
}
// добавить карточки 
const popupForm = document.querySelector('.popup_add-card');

function addFormListiner(evt) {
    evt.preventDefault();
    const input = popupForm.querySelector('#name');
    const link = popupForm.querySelector('#link');
    const item = { name: input.value, link: link.value }
    const newTask = createTaskDomNode(item);
    cardsContainer.prepend(newTask);
    input.value = '';
    link.value = '';

    closePopup(newPopup);
}
renderCards();
popupForm.addEventListener('submit', addFormListiner);