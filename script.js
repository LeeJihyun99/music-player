const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

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
    
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

//Next Song 
nextSong = ()=> {
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}
//On Load - Select First Song
loadSong(songs[songIndex]);

//Event Listeners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
