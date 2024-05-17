import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const datepickerEl = document.querySelector('#datetime-picker');
const startButtonEl = document.querySelector('#start-btn');
const timerEl = document.querySelector('.timer');
let userSelectedDate;

// #region DATEPICKER

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      callPastDateAlert();
      startButtonEl.disabled = true;
      return;
    }
    userSelectedDate = selectedDates[0];
    startButtonEl.disabled = false;
  },
};

flatpickr(datepickerEl, options);

// #endregion DATEPICKER

// #region LAUNCH-TIMER

startButtonEl.addEventListener('click', () => {
  if (Date.now() >= userSelectedDate) {
    callPastDateAlert();
    startButtonEl.disabled = true;
    return;
  }

  const intervalId = setInterval(() => {
    if (userSelectedDate - Date.now() < 1000) {
      endTimer(intervalId);
    }

    updateMarkupWithTimeLeft();
  }, 1000);

  callTimerStartedAlert();
  startButtonEl.disabled = true;
  datepickerEl.disabled = true;
});

// #endregion LAUNCH-TIMER

// #region FUNCTIONS

function endTimer(interval) {
  clearInterval(interval);
  startButtonEl.disabled = false;
  datepickerEl.disabled = false;
  callTimerEndedAlert();
}

function callPastDateAlert() {
  iziToast.show({
    message: 'Please choose a date in the future',
    color: 'red',
    timeout: 5000,
    displayMode: 'replace',
    position: 'topRight',
  });
}

function callTimerStartedAlert() {
  iziToast.show({
    message:
      'Timer is on. Please note: you cannot change timer while it is working',
    color: 'yellow',
    timeout: 5000,
    displayMode: 'replace',
    position: 'topRight',
  });
}

function callTimerEndedAlert() {
  iziToast.show({
    message: 'Time is up! Set a new timer!',
    color: 'green',
    timeout: 5000,
    displayMode: 'replace',
    position: 'topRight',
  });
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateMarkupWithTimeLeft() {
  const timeLeft = convertMs(userSelectedDate - Date.now());
  const { days, hours, minutes, seconds } = timeLeft;

  timerEl.querySelector('[data-days]').textContent = addZero(days);
  timerEl.querySelector('[data-hours]').textContent = addZero(hours);
  timerEl.querySelector('[data-minutes]').textContent = addZero(minutes);
  timerEl.querySelector('[data-seconds]').textContent = addZero(seconds);
}

function addZero(value) {
  return String(value).padStart(2, '0');
}
// #endregion FUNCTIONS
