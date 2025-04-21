
    let currentlyPlaying = null;

    function toggleSidebar() {
      const sidebar = document.getElementById("sidebar");
      const menuBtn = document.getElementById("menuBtn");

      sidebar.classList.toggle("open");
      menuBtn.textContent = sidebar.classList.contains("open") ? "Close" : "Menu";
    }

    function startStars() {
      const stars = document.getElementById('stars');
      stars.style.display = 'block';
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 5 + 2}px`;
        star.style.height = star.style.width;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        star.style.left = `${Math.random() * 100}%`;
        stars.appendChild(star);
      }
    }

    function stopStars() {
      const stars = document.getElementById('stars');
      stars.innerHTML = '';
      stars.style.display = 'none';
    }

    function togglePlay(id) {
      const audio = document.getElementById('audio' + id);
      const btn = document.getElementById('playBtn' + id);
      const player = document.getElementById('player' + id);
      const visualizer = document.getElementById('viz' + id);

      if (currentlyPlaying && currentlyPlaying !== id) {
        const otherAudio = document.getElementById('audio' + currentlyPlaying);
        const otherBtn = document.getElementById('playBtn' + currentlyPlaying);
        const otherPlayer = document.getElementById('player' + currentlyPlaying);
        const otherViz = document.getElementById('viz' + currentlyPlaying);

        otherAudio.pause();
        otherAudio.currentTime = 0;
        otherBtn.innerText = "Play";
        otherPlayer.classList.remove("playing");
        otherViz.classList.remove("active");
        stopStars();
      }

      if (audio.paused) {
        audio.play();
        btn.innerText = "Pause";
        player.classList.add("playing");
        visualizer.classList.add("active");
        startStars();
        currentlyPlaying = id;
      } else {
        audio.pause();
        btn.innerText = "Play";
        player.classList.remove("playing");
        visualizer.classList.remove("active");
        stopStars();
        currentlyPlaying = null;
      }
    }

    function updateProgress(id) {
      const audio = document.getElementById('audio' + id);
      const progress = document.getElementById('progress' + id);
      const timeDisplay = document.getElementById('time' + id);
      const percent = (audio.currentTime / audio.duration) * 100;
      progress.style.width = percent + '%';

      const formatTime = (t) => {
        const mins = Math.floor(t / 60);
        const secs = Math.floor(t % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      };

      timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration || 0)}`;
    }

    function seek(e, id) {
      const audio = document.getElementById('audio' + id);
      const progress = e.currentTarget;
      const width = progress.offsetWidth;
      const offsetX = e.offsetX;
      const duration = audio.duration;
      audio.currentTime = (offsetX / width) * duration;
    }
  
  function searchSong() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const players = document.querySelectorAll('.player');

  // Update the URL with search query
  const newURL = new URL(window.location);
  if (query) {
    newURL.searchParams.set('search', query);
  } else {
    newURL.searchParams.delete('search');
  }
  window.history.replaceState({}, '', newURL);

  players.forEach(player => {
    const title = player.querySelector('.song-title').innerText.toLowerCase();
    const artist = player.querySelector('.artist').innerText.toLowerCase();

    // Show player if either title or artist matches the search query
    player.style.display = title.includes(query) || artist.includes(query) ? 'block' : 'none';
  });
}


    // Run filter on page load if search param exists
    window.addEventListener('DOMContentLoaded', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get('search');
      if (query) {
        const searchBar = document.getElementById('searchBar');
        searchBar.value = query;
        searchSong();
      }
    });

    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(id => {
      const audio = document.getElementById('audio' + id);
      audio.addEventListener('timeupdate', () => updateProgress(id));
      audio.addEventListener('ended', () => {
        document.getElementById('progress' + id).style.width = '0%';
        document.getElementById('playBtn' + id).innerText = 'Play';
        document.getElementById('player' + id).classList.remove("playing");
        document.getElementById('viz' + id).classList.remove("active");
        stopStars();
        currentlyPlaying = null;
      });
    });
