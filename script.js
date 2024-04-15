const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
let totalDurationSeconds = 0;
// Music
const songs = [
    {
        name: 'baebae',
        displayName: 'Bae Bae',
        artist: 'Big Bang',
    },
    {
        name: 'sheesh',
        displayName: 'Sheesh',
        artist: 'Babymonster'
    },
    {
        name:'fiance',
        displayName:'Fiance',
        artist:'Mino'
    },
    {
        name:'pinkvenom',
        displayName:'Pink Venom',
        artist: 'Blackpink'
    },
    {
        name:'shutdown',
        displayName:'Shut Down',
        artist:'Blackpink'
    }
];

//Check if Playing
let isPlaying = false;

//Play
playSong = ()=> {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause
pauseSong = ()=> {
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//Play or Pause Event Listener
playBtn.addEventListener('click', ()=> (isPlaying ? pauseSong() : playSong()));

// Update DOM
const loadSong=(song)=>{
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current Song
let songIndex = 0;

//Previous Song 
prevSong = ()=> {
    songIndex--;
    if(songIndex != 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Next Song 
nextSong = ()=> {
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
updateProgressBar = (e)=>{
    if(isPlaying){
        const {duration, currentTime} = e.srcElement;

        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes  = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds <10){
            durationSeconds =  `0${durationSeconds}`
        }

        // Delay switching duration Element to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        totalDurationSeconds = (durationMinutes*60) + durationSeconds;
        
        // Calculate display for current
        const currentMinutes  = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if( currentSeconds < 10 ){
            currentSeconds =  `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

setProgressBar = (e)=> {
    const width = progressContainer.offsetWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * totalDurationSeconds;
}
//Event Listeners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);