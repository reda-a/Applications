const clock = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let period = "AM";
  
    if (hours >= 12) {
      period = "PM";
    }
  
    if (hours > 12) {
      hours -= 12;
    }
  
    if (hours === 0) {
      hours = 12;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
  
    const time = `${hours}:${minutes}:${seconds} ${period}`;
    document.getElementById("clock").innerText = time;
  };
  
  setInterval(clock, 1000);
  