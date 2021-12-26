import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
}
const STORAGE_KEY = "feedback-form-state";
const getStorageKey = JSON.parse(localStorage.getItem(STORAGE_KEY));

refs.form.addEventListener('submit', getSubmitValue);
refs.form.addEventListener('input', throttle(onFeedbackFornInput, 500));

let formData = {};

recoveryFormValue();

function recoveryFormValue() { 
  if (getStorageKey) {
    formData = getStorageKey;
  }
  const savedValue = getStorageKey;
  if (!savedValue) {
    return
  }
  if (savedValue.email) {
    refs.form.email.value = savedValue.email;
  }
  if (savedValue.message) {
    refs.form.message.value = savedValue.message;
  }
}

function getSubmitValue(event) {
  event.preventDefault();
  const { elements: { email, message } } = event.currentTarget;
  if (email.value === '' || message.value === '') { 
    return
  }

  console.log(`Email: ${email.value}, Message: ${message.value}`);
  event.currentTarget.reset();
  formData = {};
  localStorage.removeItem(STORAGE_KEY);
}

function onFeedbackFornInput(event) { 
  console.log(formData);
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}




