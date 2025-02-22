let currentSongIndex = 0;
let songs = [
    { name: "Ik Vaari Aa", url: "Songs/Ik Vaari Aa.mp3", image: "Songs/Ik Vaari Aa.jpeg" },
    { name: "kya mujhe pyar hai", url: "Songs/kya mujhe pyar hai.mp3", image: "Songs/kya mujhe pyar hai.jpeg" },
    { name: "Mera Mann Kehne Laga", url: "Songs/Mera Mann Kehne Laga.mp3", image: "Songs/Mera Mann Kehne Laga.jpeg" },
    { name: "Nadaaniyan", url: "Songs/Nadaaniyan.mp3", image: "Songs/Nadaaniyan.jpeg" },
    { name: "Saibo", url: "Songs/Saibo.mp3", image: "Songs/Saibo.jpeg" },
    { name: "Savera", url: "Songs/Savera.mp3", image: "Songs/Savera.jpeg" },
    { name: "Soulmate", url: "Songs/Soulmate.mp3", image: "Songs/Soulmate.jpeg" },
    { name: "Titli", url: "Songs/Titli.mp3", image: "Songs/Titli.jpeg" },
    { name: "Tu Hi Tu Reprise", url: "Songs/Tu Hi Tu Reprise.mp3", image: "Songs/Tu Hi Tu Reprise.jpeg" },
];
let isFirstSong = true; // Flag to check if it's the first song

// Display the list of songs in the UI
function displaySongs() {
    const songList = document.querySelector(".Songs");
    if (!songList) {
        console.error("Element with class 'Songs' not found!");
        return;
    }

    songList.innerHTML = ""; // Clear existing content

    if (songs.length === 0) {
        songList.innerHTML = "<div>No songs found.</div>";
        return;
    }

    songs.forEach((song, index) => {
        const songCard = document.createElement("div");
        songCard.className = "Songscards";
        songCard.innerHTML = `
            <img src="${song.image}" alt="${song.name}">
            <div class="Sont">${song.name}</div>
        `;
        songCard.addEventListener("click", () => playSong(song.url, song.name, index));
        songList.appendChild(songCard);
    });
}

// Play a specific song
function playSong(songUrl, songName, index = currentSongIndex) {
    const audioPlayer = document.getElementById('audioPlayer');
    const scard = document.querySelector('.scard');

    if (!audioPlayer || !scard) {
        console.error("Audio player or scard element not found!");
        return;
    }

    // Update the scard content
    scard.innerHTML = `
        <img src="Songs/${songName}.jpeg" alt="${songName}">
        <div class="CT">${songName}</div>
        <div class="Cbtn">
            <img id="lop" class="loop" src="Icons/loop.png" alt="">
            <div class="player">
                <img id="backward" src="Icons/backward.png" alt="" onclick="playPrevious()">
                <img id="play" src="Icons/play.png" alt="" onclick="togglePlayPause()">
                <img id="next" src="Icons/next.png" alt="" onclick="playNext()">
            </div>
            <img id="Vol" class="volume" src="Icons/volume.png" alt="">
        </div>
        <div class="CSB">
            <div class="time" id="currentTime">00:00</div>
            <div class="seakbar">
                <div class="circle" id="circle"></div>
            </div>
            <div class="time" id="totalTime">00:00</div>
        </div>
    `;

    // Set the audio source
    audioPlayer.src = songUrl;
    currentSongIndex = index;

    // Pause the first song only
    if (isFirstSong) {
        audioPlayer.pause();
        isFirstSong = false;
    } else {
        audioPlayer.play();
        document.getElementById('play').src = "Icons/pause.png";
    }

    // Update the total duration
    audioPlayer.onloadedmetadata = () => {
        document.getElementById('totalTime').textContent = formatTime(audioPlayer.duration);
    };

    // Update the current time and seek bar
    audioPlayer.ontimeupdate = () => {
        const currentTimeElement = document.getElementById('currentTime');
        const circle = document.getElementById('circle');
        const seekbar = document.querySelector('.seakbar');

        if (currentTimeElement && circle && seekbar) {
            currentTimeElement.textContent = formatTime(audioPlayer.currentTime);
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            circle.style.left = `${progress}%`;
        }
    };
}

// Toggle play/pause
function togglePlayPause() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.getElementById('play');
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.src = "Icons/pause.png";
    } else {
        audioPlayer.pause();
        playButton.src = "Icons/play.png";
    }
}

// Play the next song
function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    const nextSong = songs[currentSongIndex];
    playSong(nextSong.url, nextSong.name);
}

// Play the previous song
function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    const previousSong = songs[currentSongIndex];
    playSong(previousSong.url, previousSong.name);
}

// Format time in MM:SS format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Initialize the app
function initializeApp() {
    displaySongs();

    if (songs.length > 0) {
        const firstSong = songs[0];
        playSong(firstSong.url, firstSong.name, 0);
    }
}

initializeApp();