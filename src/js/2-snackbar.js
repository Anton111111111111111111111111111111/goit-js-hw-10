import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElem = document.querySelector('.form');
const inputElem = document.querySelector('.js-input');

formElem.addEventListener('submit', evt => {
  evt.preventDefault();
  const delay = Number(inputElem.value);
  const selectedRadio = document.querySelector('input[name="state"]:checked');
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (selectedRadio.value === 'fulfilled') {
        res(delay);
      } else {
        rej(delay);
      }
    }, delay);
  });
  promise.then(onFulfilled, onRejected);
});

function onFulfilled(delay) {
  iziToast.success({
    title: 'Success',
    message: `✅ Fulfilled promise in ${delay}ms`,
  });
}
function onRejected(delay) {
  iziToast.error({
    title: 'Error',
    message: `❌ Rejected promise in ${delay}ms`,
  });
}
