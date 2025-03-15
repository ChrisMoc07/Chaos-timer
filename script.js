document.getElementById('startButton').addEventListener('click', startTimer);

function startTimer() {
  const inputLength = parseInt(document.getElementById('timerLength').value);
  if (isNaN(inputLength) || inputLength <= 0) {
    alert('Please enter a valid number greater than 0');
    return;
  }
  
  let totalTime = inputLength;
  const timerDisplay = document.getElementById('timerDisplay');
  let timerInterval;
  
  // Function to format the timer in MM:SS format
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  // Function to simulate the inconsistent timer behavior
  function updateTimer() {
    if (totalTime <= 0) {
      clearInterval(timerInterval);
      alert('Time\'s up!');
      return;
    }

    timerDisplay.textContent = formatTime(totalTime);

    // Decrease the total time by either a random slower or faster amount
    const randomFactor = Math.random();
    const randomTimeChange = (randomFactor > 0.5 ? 1 : -1) * (Math.random() * 2); // Random +/- small variation
    totalTime -= 1 + randomTimeChange;
    totalTime = Math.max(0, totalTime); // Prevent going negative
  }

  // Set the initial timer interval
  timerInterval = setInterval(updateTimer, 1000);
}
