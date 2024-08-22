document.addEventListener('DOMContentLoaded', function () {
  const actx = new (window.AudioContext || window.webkitAudioContext)();
  const keys = document.querySelectorAll('#piano-keyboard .white-key, #piano-keyboard .black-key');
  const activeOscillators = {};
  const volumeControl = document.getElementById('volume');
  const reverbControl = document.getElementById('reverb');
  const delayControl = document.getElementById('delay');
  const attackControl = document.getElementById('attack');
  const decayControl = document.getElementById('decay');
  const sustainControl = document.getElementById('sustain');
  const releaseControl = document.getElementById('release');

  let volumeValue = volumeControl.value;
  let attackValue = attackControl.value;
  let decayValue = decayControl.value;
  let sustainValue = sustainControl.value;
  let releaseValue = releaseControl.value;

  let loopSource = null;
  let loopBuffer = null;

  volumeControl.addEventListener('input', (e) => volumeValue = e.target.value);
  attackControl.addEventListener('input', (e) => attackValue = e.target.value);
  decayControl.addEventListener('input', (e) => decayValue = e.target.value);
  sustainControl.addEventListener('input', (e) => sustainValue = e.target.value);
  releaseControl.addEventListener('input', (e) => releaseValue = e.target.value);

  function loadLoop(url) {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(data => actx.decodeAudioData(data))
      .then(buffer => {
        loopBuffer = buffer;
      })
      .catch(error => console.error('Error loading the audio loop:', error));
  }

  function playLoop() {
    if (loopBuffer) {
      loopSource = actx.createBufferSource();
      loopSource.buffer = loopBuffer;
      loopSource.loop = true;
  
      // Optionally set loopStart and loopEnd to loop a specific segment
      // loopSource.loopStart = 0; // Start at the beginning
      // loopSource.loopEnd = loopBuffer.duration; // Loop till the end
  
      loopSource.connect(actx.destination);
  
      // Start the loop exactly at the next "audio clock" time to ensure precision
      loopSource.start(actx.currentTime);
    }
  }
  

  function stopLoop() {
    if (loopSource) {
      loopSource.stop();
      loopSource = null;
    }
  }

  loadLoop('groove.mp3');

  const playButton = document.getElementById('play-loop');
  const stopButton = document.getElementById('stop-loop');

  playButton.addEventListener('click', playLoop);
  stopButton.addEventListener('click', stopLoop);

  function getFrequency(note) {
    const notes = {
      'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
      'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
      'A#4': 466.16, 'B4': 493.88, 'C5': 523.25, 'C#5': 554.37, 'D5': 587.33,
      'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99,
      'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77, 'C6': 1046.50
    };
    return notes[note];
  }

  function startSound(note) {
    const frequency = getFrequency(note);
    const oscillator = actx.createOscillator();
    const gainNode = actx.createGain();
    const panNode = actx.createStereoPanner();
    const delayNode = actx.createDelay();
    const feedbackNode = actx.createGain();
    const filterNode = actx.createBiquadFilter();
    const convolverNode = actx.createConvolver();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(0, actx.currentTime);

    gainNode.gain.linearRampToValueAtTime(volumeValue, actx.currentTime + parseFloat(attackValue));
    gainNode.gain.linearRampToValueAtTime(volumeValue * sustainValue, actx.currentTime + parseFloat(attackValue) + parseFloat(decayValue));

    oscillator.connect(gainNode);
    gainNode.connect(panNode);

    if (delayControl.checked) {
      delayNode.delayTime.value = 0.3;
      feedbackNode.gain.value = 0.3;
      filterNode.frequency.value = 1000;

      gainNode.connect(delayNode);
      delayNode.connect(feedbackNode);
      feedbackNode.connect(filterNode);
      filterNode.connect(delayNode);
      delayNode.connect(actx.destination);
    } else {
      panNode.connect(actx.destination);
    }

    if (reverbControl.checked) {
      convolverNode.buffer = impulseResponse(2, 2, false, actx);
      gainNode.connect(convolverNode);
      convolverNode.connect(actx.destination);
    } else {
      panNode.connect(actx.destination);
    }

    oscillator.start();
    activeOscillators[note] = { oscillator, gainNode };

    document.querySelector(`[data-note="${note}"]`).classList.add('pressed');
  }

  function stopSound(note) {
    if (activeOscillators[note]) {
      const { oscillator, gainNode } = activeOscillators[note];
      gainNode.gain.cancelScheduledValues(actx.currentTime);
      gainNode.gain.setValueAtTime(gainNode.gain.value, actx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, actx.currentTime + parseFloat(releaseValue));
      oscillator.stop(actx.currentTime + parseFloat(releaseValue));
      delete activeOscillators[note];

      document.querySelector(`[data-note="${note}"]`).classList.remove('pressed');
    }
  }

  const keyMap = {
    'A': 'C4', 'W': 'C#4', 'S': 'D4', 'E': 'D#4', 'D': 'E4',
    'F': 'F4', 'T': 'F#4', 'G': 'G4', 'Y': 'G#4', 'H': 'A4',
    'U': 'A#4', 'J': 'B4', 'K': 'C5', 'O': 'C#5', 'L': 'D5',
    'P': 'D#5', ';': 'E5', '\'': 'F5', ']': 'F#5', '\\': 'G5',
    '[': 'G#5', 'Z': 'A5', 'X': 'A#5', 'C': 'B5', 'V': 'C6'
  };

  keys.forEach(key => {
    const note = key.getAttribute('data-note');

    key.addEventListener('mousedown', () => startSound(note));
    key.addEventListener('mouseup', () => stopSound(note));
    key.addEventListener('touchstart', () => startSound(note));
    key.addEventListener('touchend', () => stopSound(note));
  });

  document.addEventListener('keydown', (e) => {
    const note = keyMap[e.key.toUpperCase()];
    if (note && !activeOscillators[note]) {
      startSound(note);
    }
  });

  document.addEventListener('keyup', (e) => {
    const note = keyMap[e.key.toUpperCase()];
    if (note) {
      stopSound(note);
    }
  });
});
