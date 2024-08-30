# Lagoons

Lagoons is an interactive web-based audio playground that lets you create and manipulate audio loops, and play synthesized notes in real-time. Whether you're a musician, a developer, or just someone who loves to experiment with sound, Lagoons provides an intuitive interface for exploring your creativity.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Playing Loops](#playing-loops)
  - [Playing Notes](#playing-notes)
  - [Adjusting Effects](#adjusting-effects)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Demo

Check out a live demo [here](https://alanmaizon.github.io/lagoons/).

![Lagoons Demo](piano.png)

## Features

- **Audio Looping**: Load and play audio loops with zero latency.
- **Real-time Synthesis**: Play notes in real-time using your keyboard.
- **Effects Control**: Adjust volume, reverb, delay, attack, decay, sustain, and release.
- **Interactive UI**: Intuitive interface for manipulating sound and controlling playback.
- **Customizable Key Mapping**: Easily map keys to specific notes.

## Getting Started

### Prerequisites

To run Lagoons locally, you will need:

- A modern web browser (Chrome, Firefox, Safari, etc.).
- A text editor or IDE (VS Code, Sublime Text, etc.) if you plan to modify the code.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/alanmaizon/lagoons.git
   cd lagoons
   ```

2. **Open `index.html` in your web browser:**

   You can either double-click the `index.html` file or serve it using a local server like `http-server` or `Live Server` in VS Code.

   ```bash
   # If you have npm installed
   npx http-server .
   ```

3. **Load audio samples:**

   Place your audio files (e.g., `groove.mp3`) in the `assets/audio` directory. Modify the JavaScript to load these files as needed.

## Usage

### Playing Loops

1. **Load an audio loop:**
   - Ensure your audio file is located in the correct directory.
   - Modify the JavaScript code to load your file (e.g., `groove.mp3`).

2. **Control the loop:**
   - Use the `Play Loop` and `Stop Loop` buttons to start and stop the loop.

### Playing Notes

1. **Keyboard Interaction:**
   - Use your keyboard to play notes. The keys are mapped to specific notes (e.g., `A` plays `C4`, `W` plays `C#4`).

2. **Mouse Interaction:**
   - Click on the on-screen piano keys to play notes.

### Adjusting Effects

- **Volume, Reverb, Delay:** Use the sliders and checkboxes to adjust these parameters in real-time.

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions, suggestions, or just want to say hi, feel free to reach out!

- **Alan Maizon** - [alanmaizon@hotmail.com](mailto:alanmaizon@hotmail.com)
- [GitHub Profile](https://github.com/alanmaizon)
- [Project Repository](https://github.com/alanmaizon/lagoons)
