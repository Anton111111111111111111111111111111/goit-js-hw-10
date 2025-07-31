import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
const btnInputElem = document.querySelector('.js-timer-btn');
const inputElem = document.querySelector('.js-input');
btnInputElem.disabled = true;

const printDays = document.querySelector('.js-days');
const printHours = document.querySelector('.js-hours');
const printMins = document.querySelector('.js-mins');
const printSecs = document.querySelector('.js-secs');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0].getTime();
    const currentDate = Date.now();
    if (userSelectedDate < currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      btnInputElem.disabled = false;
    }
  },
};
flatpickr('.js-input', options);

let intervalID = null;
btnInputElem.addEventListener('click', evt => {
  evt.preventDefault();
  inputElem.disabled = true;
  if (intervalID !== null) {
    clearInterval(intervalID);
  }
  intervalID = setInterval(() => {
    const currentDate = Date.now();
    const ms = userSelectedDate - currentDate;
    if (ms < 1000) {
      clearInterval(intervalID);
      printSecs.textContent = '00';
      inputElem.disabled = false;
      btnInputElem.disabled = true;
    } else {
      btnInputElem.disabled = true;
      const { days, hours, minutes, seconds } = convertMs(ms);
      printDays.textContent = String(days).padStart(2, '0');
      printHours.textContent = String(hours).padStart(2, '0');
      printMins.textContent = String(minutes).padStart(2, '0');
      printSecs.textContent = String(seconds).padStart(2, '0');
    }
  }, 1000);
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
