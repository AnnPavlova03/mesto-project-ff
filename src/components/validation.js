import { validationConfig } from "./config";

function showInputError(formElement, inputElement, errorMessage) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(validationConfig.errorClass);
}

function hideInputError(formElement, inputElement, validationConfig) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  formError.classList.remove(validationConfig.errorClass);
  formError.textContent = "";
}

function checkInputValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function setEventListener(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListener(formElement, validationConfig);
  });
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, validationConfig);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

// проверяет все инпуты на валидность
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
function clearValidation(formElement, validationConfig) {
  const inputErrorList = Array.from(
    formElement.querySelectorAll(`.${validationConfig.inputErrorClass}`)
  );
  inputErrorList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  disableSubmitButton(submitButton, validationConfig); // не поняла зачем это здесь, кнопка же и так в состоянии disable приходит после проверки toggleButtonState
  toggleButtonState(inputList, submitButton, validationConfig);
}

const disableSubmitButton = (button, config) => {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
};

export { clearValidation, enableValidation, validationConfig };
