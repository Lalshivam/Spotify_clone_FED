let curr_song = new Audio();
async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/")
  let res = await a.text();
  // console.log(res);
  let div = document.createElement("div");
  div.innerHTML = res;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for(let index = 0; index < as.length; index++){
    const ele  = as[index];
    if(ele.href.endsWith(".mp3")){
      songs.push(ele.href.split("/songs/")[1]);
    }
  }
  return songs;
}
const playmusic = async (songName) => {
  // let audio = new Audio("songs/"+ songName+".mp3");
  curr_song.src = "songs/"+ songName+".mp3";
  curr_song.play();
  play.src = "pause.svg";
}

async function main(){

  // Get the songs list
  let songs = await getSongs();
  console.log(songs);

  let songList = document.querySelector(".songList").getElementsByTagName("ul")[0];
  for (const song of songs) {
    songList.innerHTML += `<li><img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ").replace(".mp3","")}</div>
                            </div>
                            <img src="play.svg" class="invert" alt="">
                            </li>`;
  }
 //attach a event listener to the play button
 Array.from(document.querySelector(".songList ").getElementsByTagName("li")).forEach((e)=>{
  e.addEventListener("click",()=>{
    let songName = e.querySelector(".info").firstElementChild.innerHTML.trim();
    playmusic(songName);    
 });
 //attach a event listener to the play next and previous buttons
 let play = document.querySelector("img[src='play.svg']");
 play.addEventListener("click",()=>{
  if(curr_song.paused){
    curr_song.play();
    play.src = "pause.svg";
  }else{
    curr_song.pause();
    play.src = "play.svg";

  }
 });
      
});
}
document.getElementById("play").addEventListener("click", () => {
  if (curr_song.paused) {
    curr_song.play();
    play.src = "pause.svg";
  } else {
    curr_song.pause();
    play.src = "play.svg";
  }
});

main();