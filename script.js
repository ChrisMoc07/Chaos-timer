let timerInterval;
let isRunning = false;
let isPaused = false;
let totalTimeInSeconds;

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);

function startTimer() {
  // Get the input values for hours, minutes, and seconds
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  // Validate input: Hours should be between 0 and 59, Minutes between 0 and 59, Seconds between 0 and 59
  if (minutes < 0 || minutes >= 60 || seconds < 0 || seconds >= 60 || hours < 0) {
    alert('minutes (0-59), and seconds (0-59).');
    return;
  }

  // Convert the total time to seconds
  totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
  
  // If the total time is 0 (for example, 00:00 or invalid input), alert the user
  if (totalTimeInSeconds <= 0) {
    alert('Please enter a valid time greater than 0.');
    return;
  }

  updateTimerDisplay();
  isRunning = true;
  isPaused = false;

  // Disable the start button and enable the pause button
  document.getElementById('startButton').disabled = true;
  document.getElementById('pauseButton').disabled = false;

  // Start the timer
  timerInterval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
  if (isRunning) {
    isPaused = !isPaused;
    if (isPaused) {
      // Pause the timer
      clearInterval(timerInterval);
      document.getElementById('pauseButton').textContent = "Unpause";
    } else {
      // Unpause the timer
      document.getElementById('pauseButton').textContent = "Pause";
      timerInterval = setInterval(updateTimer, 1000);
    }
  }
}

function updateTimer() {
  if (totalTimeInSeconds <= 0) {
    clearInterval(timerInterval);
    document.getElementById('timerDisplay').textContent = '00:00';
    alert('Time\'s up!');
    resetButtons();
    return;
  }

  // Decrease the time randomly (faster or slower)
  const randomFactor = Math.random() * 10;
  const randomTimeChange = (randomFactor > 0.5 ? 1 : -1) * (Math.random() * 10); // Random +/- small variation
  totalTimeInSeconds -= 1 + randomTimeChange;

  // Ensure time doesn't go negative
  totalTimeInSeconds = Math.max(0, Math.round(totalTimeInSeconds));
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const hours = Math.floor(totalTimeInSeconds / 3600);
  const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
  const seconds = totalTimeInSeconds % 60;

  // Format as HH:MM:SS or MM:SS
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
