const audio = new Audio('js/triangle_mesh/portal_song.mp3'); // Replace 'path_to_your_audio_file.mp3' with the actual path to your audio file

// Add event listeners
const footer = document.getElementById('footer');

footer.addEventListener('click', function() {
    defaultText.style.display = 'none';
    hoverText.style.display = 'inline';
    audio.play();
});
