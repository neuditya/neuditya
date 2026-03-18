const trackSelect = document.getElementById('trackSelect');
const audioPlayer = document.getElementById('audioPlayer');

trackSelect.addEventListener('change', () => {
  const selectedTrack = trackSelect.value;
  audioPlayer.src = selectedTrack;
  audioPlayer.play();
});
