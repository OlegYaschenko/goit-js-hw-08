import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),

}
const STORAGE_KEY = "feedback-form-state";
let formData = {};

refs.form.addEventListener('submit', getSubmitValue);
refs.form.addEventListener('input', throttle(onFeedbackFornInput, 500));

recoveryFormValue();

function recoveryFormValue() { 
  const savedValue = JSON.parse(localStorage.getItem(STORAGE_KEY));
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
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}




