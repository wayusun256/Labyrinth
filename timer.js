// timer.js
export function startTimer() {
  const textEl = document.querySelector('#timerText');

  let time = 60;

  textEl.setAttribute("text", `value: ${time}`);

  const interval = setInterval(() => {
    time -= 1;
    textEl.setAttribute("text", `value: ${time}`);

    if (time <= 0) {
      clearInterval(interval);
      alert("時間切れです！");
    }
  }, 1000);
}