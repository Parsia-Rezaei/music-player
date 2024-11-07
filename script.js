const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration")
const image = document.getElementById('img');
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const prevBtn = document.getElementById("prev")
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")

const songs = [
    {
        name:'jacinto-1',
        displayName:'song one',
        artist: 'jacinto design'
    },
    {
        name:'jacinto-2',
        displayName:'song two',
        artist:'jacinto design 2'
    },
    {
        name:'jacinto-3',
        displayName:'song three',
        artist:'jacinto design 3'
    },
    {
        name:'metric-1',
        displayName:'song four',
        artist:'jacinto design 4'
    },
]

let isPlaying = false;

const loadSong = (song) => {
    title.textContent = song.name;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
    document.body.style.backgroundImage = `url("img/${song.name}.jpg")`;

}


const playSong = () => {
    isPlaying = true;
    playBtn.classList.replace("fa-play" , "fa-pause");
    playBtn.setAttribute('title' , 'Pause');
    music.play();
}

const pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace("fa-pause" , 'fa-play');
    playBtn.setAttribute("title"  ,'Play');
    music.pause();
}

// init index of songs
let songIndex = 0;

const nextSong = () => {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong()
}

const prevSong = () => {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1
    } ;
    loadSong(songs[songIndex]);
    playSong()
}

const updateProgressbar = (e) => {
    console.log(e)
    const {duration , currentTime} = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // duration 
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`
    };
    if(durationSeconds){
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // current time
    const curreTimeMinutes = Math.floor((currentTime / 60));
    let currentTimeseconds = Math.floor((currentTime % 60));
    if(currentTimeseconds < 10) {
        currentTimeseconds = `0${currentTimeseconds}`
    }
    currentTimeEl.textContent = `${curreTimeMinutes}:${currentTimeseconds}`;
}

const  setProgressbar = (e) =>  {
    // console.log(e)
    const {offsetWidth} = e.srcElement;
    const width = offsetWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    // console.log((clickX / width) * duration)
    music.currentTime = (clickX / width) * duration;

}




// events
playBtn.addEventListener('click' , () => isPlaying ? pauseSong() : playSong())
nextBtn.addEventListener('click' , nextSong);
prevBtn.addEventListener('click' , prevSong);
music.addEventListener('timeupdate' , updateProgressbar)
progressContainer.addEventListener('click' , setProgressbar)
music.addEventListener('ended' , nextSong);
window.addEventListener('load' , () => loadSong(songs[songIndex]))
