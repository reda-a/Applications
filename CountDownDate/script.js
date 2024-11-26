const countDownDate = new Date("Jan 1, 2026 00:00:00").getTime();
const countdown = document.querySelector("#countdown");
const daysEl = document.querySelector("#days");
const hoursEl = document.querySelector("#hours");
const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = countDownDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.innerHTML = `${days} Days`;
  hoursEl.innerHTML = `${hours} Hours`;
  minutesEl.innerHTML = `${minutes} Minutes`;
  secondsEl.innerHTML = `${seconds} Seconds`;

  if (distance < 0) {
    clearInterval(x);
    countdown.innerHTML = "EXPIRED";
  }
};

const x = setInterval(updateCountdown, 1000);
