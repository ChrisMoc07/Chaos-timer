let timerInterval;
let isRunning = false;
let isPaused = false;
let totalTimeInSeconds;
let watchCheckInterval;

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);

function startTimer() {
  clearInterval(timerInterval);
  clearInterval(watchCheckInterval); // Clear any existing watch check
  isRunning = false;
  isPaused = false;

  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  if (minutes < 0 || minutes >= 60 || seconds < 0 || seconds >= 60 || hours < 0) {
    alert('Please enter valid minutes (0-59) and seconds (0-59).');
    return;
  }

  totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
  
  if (totalTimeInSeconds <= 0) {
    alert('Please enter a valid time greater than 0.');
    return;
  }

  updateTimerDisplay();
  isRunning = true;

  document.getElementById('startButton').disabled = true;
  document.getElementById('pauseButton').disabled = false;

  timerInterval = setInterval(updateTimer, 1000);
  
  // Start "Are you still watching?" check every 30 seconds
  watchCheckInterval = setInterval(askStillWatching, 30000);
}

function pauseTimer() {
  if (!isRunning) return;

  isPaused = !isPaused;
  if (isPaused) {
    clearInterval(timerInterval);
    document.getElementById('pauseButton').textContent = "Unpause";
  } else {
    document.getElementById('pauseButton').textContent = "Pause";
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  if (totalTimeInSeconds <= 0) {
    clearInterval(timerInterval);
    clearInterval(watchCheckInterval);
    document.getElementById('timerDisplay').textContent = '00:00';
    alert('Time\'s up!');
    resetButtons();
    return;
  }

  const randomTimeChange = Math.random() * 1.5; // Random decrease between 1 and 2.5
  totalTimeInSeconds -= Math.ceil(1 + randomTimeChange);

  totalTimeInSeconds = Math.max(0, Math.round(totalTimeInSeconds));
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const hours = Math.floor(totalTimeInSeconds / 3600);
  const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
  const seconds = totalTimeInSeconds % 60;

  const formattedTime = hours > 0
    ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  document.getElementById('timerDisplay').textContent = formattedTime;
}

function resetButtons() {
  isRunning = false;
  isPaused = false;
  clearInterval(watchCheckInterval);
  document.getElementById('startButton').disabled = false;
  document.getElementById('pauseButton').disabled = true;
  document.getElementById('pauseButton').textContent = 'Pause';
}

// Function to check if the user is still watching
function askStillWatching() {
  if (isRunning && !isPaused) {
    const userStillWatching = confirm("Press Ok to verify you are still there");
    if (!userStillWatching) {
      pauseTimer();
    }
  }
}
