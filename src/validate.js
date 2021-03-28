// Вынесем все необходимые элементы формы в константы
const formSelector = document.querySelector('.popup__form');
const inputSelector = formSelector.querySelector('.popup__form-text');

const allFieldsAreEmpty = (inputList) => {
    return !inputList.some(inputSelector => inputSelector.value.length > 0);
};
const hasInvalidInput = (inputList) => {
    return inputList.some(inputSelector => !inputSelector.validity.valid);
};



const toggleButton = (inputList, submitButtonSelector) => {
    if (hasInvalidInput(inputList) || allFieldsAreEmpty(inputList)) {
        submitButtonSelector.classList.add('popup__submit-button_disabeld');
        submitButtonSelector.setAttribute('disabled', true);
    } else {
        submitButtonSelector.classList.remove('popup__submit-button_disabeld');
        submitButtonSelector.removeAttribute('disabled');
    }
}

// Функция, которая добавляет класс с ошибкой
const showInputError = (formSelector, inputSelector) => {
    const errorClass = formSelector.querySelector(`#${inputSelector.id}-error`);
    inputSelector.classList.add('popup__form-text_type_error');
    errorClass.textContent = inputSelector.validationMessage;
    errorClass.classList.add('popup__error_visible');


};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formSelector, inputSelector) => {
    const errorClass = formSelector.querySelector(`#${inputSelector.id}-error`);
    inputSelector.classList.remove('popup__form-text_type_error');
    errorClass.classList.remove('popup__error_visible');
    errorClass.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formSelector, inputSelector) => {
    if (inputSelector.validity.valid) {

        hideInputError(formSelector, inputSelector);
    } else {
        showInputError(formSelector, inputSelector);

    }
};

formSelector.addEventListener('submit', function(evt) {
    // Отменим стандартное поведение по сабмиту
    evt.preventDefault();
});


const setEventListeners = (formSelector) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formSelector.querySelectorAll('.popup__form-text'));
    const submitButtonSelector = formSelector.querySelector('.popup__submit-button');
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputSelector) => {
        // каждому полю добавим обработчик события input
        inputSelector.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,
            // передав ей форму и проверяемый элемент
            isValid(formSelector, inputSelector);
            toggleButton(inputList, submitButtonSelector);
        });
        toggleButton(inputList, submitButtonSelector);
    });
};

const enableValidation = ({ formSelector, ...rest }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, rest);
    });

};
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__form-text',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabeld',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});


// удаляет ошибки валидации при повторно открытии окна попапов
const clearErrorElement = (formSelector) => {

    const errorList = Array.from(formSelector.querySelectorAll('.popup__error'));
    errorList.forEach((error) => {
        error.classList.remove('popup__error_visible')
    });

    const errorInputList = Array.from(formSelector.querySelectorAll('.popup__form-text'));
    errorInputList.forEach((error) => {
        error.classList.remove('popup__form-text_type_error');
    })
};