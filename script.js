let timerInterval;
let isRunning = false;
let isPaused = false;
let totalTimeInSeconds;
let watchCheckInterval; 

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);

const imageSources = [
    '/media/icon.webp'
];

// Function to generate random positions within the screen
function getRandomPosition() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const randomX = Math.floor(Math.random() * (width - 100)); // 100 is the image width
    const randomY = Math.floor(Math.random() * (height - 100)); // 100 is the image height
    return { x: randomX, y: randomY };
}

// Function to create a new popup image
function createPopupImage() {
    const popupContainer = document.getElementById('popup-container');
    const imageElement = document.createElement('div');
    
    // Set random position
    const { x, y } = getRandomPosition();
    imageElement.style.left = `${x}px`;
    imageElement.style.top = `${y}px`;

    // Set random image source
    const randomImage = imageSources[Math.floor(Math.random() * imageSources.length)];
    imageElement.style.backgroundImage = `url(${randomImage})`;
    imageElement.classList.add('popup-image');

    // Add a click event to delete the image when clicked
    imageElement.addEventListener('click', () => {
        popupContainer.removeChild(imageElement);
    });

    popupContainer.appendChild(imageElement);
}

// Function to generate popups at random intervals
function generateRandomPopups() {
    setInterval(createPopupImage, 1000); // Create a new image every 1 second
}

// Start generating popups
generateRandomPopups();

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

  watchCheckInterval = setInterval(askStillWatching, 30000);
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

function updateTimer() {
  if (totalTimeInSeconds <= 0) {
    clearInterval(timerInterval);
    clearInterval(watchCheckInterval);
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
  clearInterval(watchCheckInterval);
  document.getElementById('startButton').disabled = false;
  document.getElementById('pauseButton').disabled = true;
  document.getElementById('pauseButton').textContent = 'Pause';
}
function playAlarm() {
  const alarmSound = document.getElementById('alarmSound');
  alarmSound.play(); // Play the sound
}

function askStillWatching() {
  if (isRunning && !isPaused) {
    const userStillWatching = confirm("Are you still watching? press OK to confirm");
    if (!userStillWatching) {
      pauseTimer();
      return;
    }
    if (Math.random() < 0.5) {
      const reallySure = confirm("R u sure? press OK to confirm");
      if (!reallySure) {
        pauseTimer();
      }
    }
  }
}

