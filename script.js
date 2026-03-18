const tracks = [
  { name: "1974 AD - CROSSINGS", file: "Songs/1974-AD-CROSSINGS.mp3" },
  { name: "Kicktracks - Midnight Lovers", file: "Songs/Kicktracks-Midnight-Lovers.mp3" },
  { name: "Samjhinu Hai - Astha Tamang-Maskey", file: "Songs/Samjhinu-Hai-Astha-Tamang-Maskey.mp3" },
  { name: "Tajdar-e-Haram - Atif Aslam", file: "Songs/Tajdar-e-Haram-Atif-Aslam.mp3" },
  { name: "Zakir - Naalayak", file: "Songs/Zakir-Naalayak.mp3" }
];

const trackSelect = document.getElementById('trackSelect');
const audioPlayer = document.getElementById('audioPlayer');
const trackName = document.getElementById('trackName');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const vinyl = document.querySelector('.vinyl');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

let currentIndex = 0;
let isPlaying = false;

// Populate dropdown
tracks.forEach((track, index) => {
  const option = document.createElement('option');
  option.value = index;
  option.text = track.name;
  trackSelect.appendChild(option);
});

// Load track
function loadTrack(index) {
  currentIndex = index;
  audioPlayer.src = tracks[currentIndex].file;
  trackName.textContent = `Now Playing: ${tracks[currentIndex].name}`;
  trackSelect.value = index;
  if(isPlaying) audioPlayer.play();
}

// Play/Pause toggle
playPauseBtn.addEventListener('click', () => {
  if(audioPlayer.paused){
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
});

audioPlayer.addEventListener('play', () => {
  isPlaying = true;
  playPauseBtn.textContent = "⏸ Pause";
  vinyl.classList.add('spinning');
  startVisualizer();
});

audioPlayer.addEventListener('pause', () => {
  isPlaying = false;
  playPauseBtn.textContent = "▶ Play";
  vinyl.classList.remove('spinning');
});

// Previous/Next
prevBtn.addEventListener('click', () => {
  let newIndex = currentIndex - 1;
  if(newIndex < 0) newIndex = tracks.length - 1;
  loadTrack(newIndex);
  audioPlayer.play();
});

nextBtn.addEventListener('click', () => {
  let newIndex = currentIndex + 1;
  if(newIndex >= tracks.length) newIndex = 0;
  loadTrack(newIndex);
  audioPlayer.play();
});

// Dropdown change
trackSelect.addEventListener('change', () => {
  loadTrack(Number(trackSelect.value));
  audioPlayer.play();
});

// Auto next track
audioPlayer.addEventListener('ended', () => {
  let nextIndex = currentIndex + 1;
  if(nextIndex >= tracks.length) nextIndex = 0;
  loadTrack(nextIndex);
  audioPlayer.play();
});

// Initialize first track
loadTrack(0);

// ----------------- Visualizer -----------------
let audioContext, analyser, source, dataArray;

function startVisualizer() {
  if(!audioContext){
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    source = audioContext.createMediaElementSource(audioPlayer);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    drawVisualizer();
  }
}

function drawVisualizer() {
  requestAnimationFrame(drawVisualizer);
  analyser.getByteFrequencyData(dataArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = canvas.width / 3 - 20;
  const spacing = 20;
  for(let i=0; i<3; i++){
    const barHeight = dataArray[i * 2];
    ctx.fillStyle = "#1db954";
    ctx.fillRect(i*(barWidth+spacing)+spacing/2, canvas.height-barHeight, barWidth, barHeight);
  }
}
