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
