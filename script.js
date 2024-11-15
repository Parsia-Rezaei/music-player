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
        name:'Enemy',
        displayName:'song one',
        artist: 'Imagine Dragons',
        img:"/music-player/img/imagine-dragons-1.jpg",
        src:'/music-player/music/20_Imagine_Dragons,_JID,_Arcane,_League_Of_Legends_Enemy_from_the.mp3',
    },
    {
        name:'Eyes Closed',
        displayName:'song two',
        artist:'Imagine Dragons',
        img:'/music-player/img/imagine-dragons-2.jpg',
        src:'/music-player/music/Imagine Dragons – Eyes Closed.mp3',
    },
    {
        name:'jumpsuit',
        displayName:'song three',
        artist:'Twenty One Pilots',
        img:'/music-player/img/twenty-one-pilots-1.jpg',
        src:'/music-player/music/Jumpsuit - TWENTY ONE PILOTS.mp3',
    },
    {
        name:'Saturday',
        displayName:'song four',
        artist:'Twenty One Pilots',
        img:'/music-player/img/twenty-one-pilots-2.jpg',
        src:'/music-player/music/Twenty One Pilots - Saturday.mp3',
    },
]

let isPlaying = false;

const loadSong = (song) => {
    title.textContent = song.name;
    artist.textContent = song.artist;
    music.src = song.src;
    image.src = song.img;
    document.body.style.backgroundImage = `url(${song.img})`;

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
