document.addEventListener("DOMContentLoaded", () => {
  // Stopwatch Variables
  let startStopBtn = document.getElementById("start-stop-btn");
  let resetBtn = document.getElementById("reset-btn");
  let timeDisplay = document.getElementById("time-left");
  let timer;
  let elapsedTime = 0;
  let running = false;

  // Settings Modal Elements
  let settingsBtn = document.getElementById("settings-btn");
  let settingsModal = document.getElementById("settings-modal");
  let closeBtn = document.querySelector(".close-btn");
  let saveBtn = document.getElementById("save-btn");
  let backgroundColorSelect = document.getElementById("background-color");
  let fontColorSelect = document.getElementById("font-color");

  // Load saved settings on page load
  loadSettings();

  // Stopwatch Start/Stop toggle
  startStopBtn.addEventListener("click", () => {
    if (!running) {
      startStopBtn.textContent = "Stop";
      running = true;
      timer = setInterval(updateTime, 1000);
    } else {
      startStopBtn.textContent = "Start";
      running = false;
      clearInterval(timer);
    }
  });

  // Reset Stopwatch
  resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    elapsedTime = 0;
    timeDisplay.textContent = "00:00";
    startStopBtn.textContent = "Start";
    running = false;
  });

  // Update stopwatch time
  function updateTime() {
    elapsedTime++;
    let minutes = Math.floor(elapsedTime / 60).toString().padStart(2, "0");
    let seconds = (elapsedTime % 60).toString().padStart(2, "0");
    timeDisplay.textContent = `${minutes}:${seconds}`;
  }

  // Open Settings Modal
  settingsBtn.addEventListener("click", () => {
    settingsModal.style.display = "flex";
  });

  // Close Settings Modal
  closeBtn.addEventListener("click", () => {
    settingsModal.style.display = "none";
  });

  // Save and apply settings
  saveBtn.addEventListener("click", () => {
    let selectedBackgroundColor = backgroundColorSelect.value;
    let selectedFontColor = fontColorSelect.value;

    // Apply styles
    document.body.style.backgroundColor = selectedBackgroundColor;
    applyFontColor(selectedFontColor);

    // Save to local storage
    localStorage.setItem("backgroundColor", selectedBackgroundColor);
    localStorage.setItem("fontColor", selectedFontColor);

    // Close modal
    settingsModal.style.display = "none";
  });

  // Apply font color to all relevant elements
  function applyFontColor(color) {
    let container = document.getElementById("container");
    container.style.color = color;

    // Apply font color to buttons and their borders
    let buttons = document.querySelectorAll(
      ".interval-btn, #start-stop-btn, #reset-btn, #settings-btn"
    );
    buttons.forEach((btn) => {
      btn.style.color = color;
      btn.style.borderColor = color;
    });
  }

  // Load settings from local storage
  function loadSettings() {
    let savedBackgroundColor = localStorage.getItem("backgroundColor");
    let savedFontColor = localStorage.getItem("fontColor");

    if (savedBackgroundColor) {
      document.body.style.backgroundColor = savedBackgroundColor;
      backgroundColorSelect.value = savedBackgroundColor;
    }

    if (savedFontColor) {
      applyFontColor(savedFontColor);
      fontColorSelect.value = savedFontColor;
    }
  }

  // Close modal when clicking outside of it
  window.onclick = function (event) {
    if (event.target == settingsModal) {
      settingsModal.style.display = "none";
    }
  };
});
