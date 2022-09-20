import Notiflix from 'notiflix';

refs = {
 formEl: document.querySelector(".form")
}

const {elements: {delay, step, amount, button}} = refs.formEl;


refs.formEl.addEventListener("submit", onSubmitForm) 


function onSubmitForm(e) {
  e.preventDefault()
  console.log(e)
  let delayVal = Number(delay.value);
  let stepVal = Number(step.value);
  let amountVal = Number(amount.value);

  for(let i = 1; i <= amountVal; i += 1) {
    createPromise(i, delayVal).then(({position, delay}) => {
      return Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`)
    }).catch(({position, delay}) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`)
    })

    delayVal += stepVal
    refs.formEl.reset()
  }
  
}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({position, delay});
        } else {
          reject({position, delay});
        }
     }, delay)
    })
   }

