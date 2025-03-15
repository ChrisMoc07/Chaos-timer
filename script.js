let timerInterval;
let isRunning = false;
let isPaused = false;
let totalTimeInSeconds;

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);

function startTimer() {
  clearInterval(timerInterval); 
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  if (minutes < 0 || minutes >= 60 || seconds < 0 || seconds >= 60 || hours < 0) {
    alert('Please enter valid hours (0-59), minutes (0-59), and seconds (0-59).');
    return;
  }

  totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
  
  if (totalTimeInSeconds <= 0) {
    alert('Please enter a valid time greater than 0.');
    return;
  }

  updateTimerDisplay();
  isRunning = true;
  isPaused = false;

  document.getElementById('startButton').disabled = false;
  document.getElementById('pauseButton').disabled = false;

  timerInterval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
  if (isRunning) {
    isPaused = !isPaused;
    if (isPaused) {
      clearInterval(timerInterval);
      document.getElementById('pauseButton').textContent = "Unpause";
    } else {
      document.getElementById('pauseButton').textContent = "Pause";
      timerInterval = setInterval(updateTimer, 1000);
    }
  }
}

// if ((totalTimeInSeconds % 30) == 0) {
//     alert('are you still there :)');
//     pauseTimer();
//     return;
//   }

function updateTimer() {
  if (totalTimeInSeconds <= 0) {
    clearInterval(timerInterval);
    document.getElementById('timerDisplay').textContent = '00:00';
    playAlarm();
    alert('Time\'s up!');
    resetButtons();
    return;
  }

  const randomFactor = Math.random();
  const randomTimeChange = (randomFactor > 0.5 ? 1 : -1) * (Math.random() * 1); // Random +/- small variation
  totalTimeInSeconds -= 1 + randomTimeChange;

  totalTimeInSeconds = Math.max(0, Math.round(totalTimeInSeconds));
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const hours = Math.floor(totalTimeInSeconds / 3600);
  const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
  const seconds = totalTimeInSeconds % 60;

  const formattedTime = hours > 0
    ? `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    : `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  document.getElementById('timerDisplay').textContent = formattedTime;
}

function resetButtons() {
  isRunning = false;
  isPaused = false;
  document.getElementById('startButton').disabled = false;
  document.getElementById('pauseButton').disabled = true;
  document.getElementById('pauseButton').textContent = 'Pause';
}
function playAlarm() {
  const alarmSound = document.getElementById('alarmSound');
  alarmSound.play(); // Play the sound
}
