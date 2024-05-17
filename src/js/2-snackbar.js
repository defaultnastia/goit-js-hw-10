import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const delayInputEl = formEl.querySelector('input[name="delay"]');
const stateFulfilledEl = formEl.querySelector('input[value="fulfilled"]');
const stateRejectedEl = formEl.querySelector('input[value="rejected"]');

formEl.addEventListener('submit', event => {
  event.preventDefault();
  const delay = delayInputEl.value;
  if (
    !delay ||
    isNaN(delay) ||
    (!stateFulfilledEl.checked && !stateRejectedEl.checked)
  ) {
    return;
  }

  const isFulfilled = stateFulfilledEl.checked ? true : false;

  makePromise(isFulfilled, delay)
    .then(resolvedDelay => showResolvedMessage(resolvedDelay))
    .catch(rejectedDelay => showRejectedMessage(rejectedDelay));

  formEl.reset();
});

// ============ functions ============

function makePromise(isFulfilled, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isFulfilled ? resolve(delay) : reject(delay);
    }, delay);
  });
}

function showResolvedMessage(delay) {
  iziToast.show({
    message: `✅ Fulfilled promise in ${delay}ms`,
    color: 'green',
    timeout: 5000,
    displayMode: 'replace',
    position: 'topRight',
  });
}

function showRejectedMessage(delay) {
  iziToast.show({
    message: `❌ Rejected promise in ${delay}ms`,
    color: 'red',
    timeout: 5000,
    displayMode: 'replace',
    position: 'topRight',
  });
}
