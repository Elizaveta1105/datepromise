import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    dateInput: document.getElementById("datetime-picker"),
    startBtn: document.querySelector("button[data-start]"),
    dayNumber: document.querySelector("[data-days]"),
    hourNumber: document.querySelector("[data-hours]"),
    minuteNumber: document.querySelector("[data-minutes]"),
    secondNumber: document.querySelector("[data-seconds]")
}
const DELAY_MS = 1000

let intervalID = null
refs.startBtn.disabled = true

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const startDate = Date.now()
        const futureDate = Date.parse(selectedDates)
    
        if(futureDate <= startDate) {
            return Notiflix.Notify.failure('Please, select future date.');
        } 

        refs.startBtn.disabled = false;
        refs.startBtn.addEventListener("click", () => {
           intervalID = setInterval(() => { 
            const startDate = Date.now()
            const futureDate = Date.parse(selectedDates)
            const dateInMs = futureDate - startDate
            const {days, hours, minutes, seconds} = convertMs(dateInMs)
            
            updateTimerInterface({days, hours, minutes, seconds})

            if(days && hours && minutes && seconds === "00") {
                clearInterval(intervalID)
            }
         
        }, DELAY_MS)

       
     })
    },
};

refs.dateInput.addEventListener("input", flatpickr(refs.dateInput, options))

function updateTimerInterface({days, hours, minutes, seconds}) {
   
     refs.dayNumber.textContent = days; 
     refs.hourNumber.textContent  = hours;
     refs.minuteNumber.textContent = minutes;
     refs.secondNumber.textContent  = seconds;
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0")
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
