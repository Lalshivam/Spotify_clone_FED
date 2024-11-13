let curr_song = new Audio();
let songs;
async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/")
  let res = await a.text();
  // console.log(res);
  let div = document.createElement("div");
  div.innerHTML = res;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const ele = as[index];
    if (ele.href.endsWith(".mp3")) {
      songs.push(ele.href.split("/songs/")[1]);
    }
  }
  return songs;
}
const playmusic = async (songName) => {
  // let audio = new Audio("songs/"+ songName+".mp3");
  curr_song.src = "songs/" + songName + ".mp3";
  curr_song.play();
  play.src = "pause.svg";
  document.querySelector(".songName").innerHTML = songName;
  document.querySelector(".songTime").innerHTML = "00:00/00:00";
}
async function main() {
  // Get the songs list
  songs = await getSongs();
  console.log(songs);

  let songList = document.querySelector(".songList").getElementsByTagName("ul")[0];
  for (const song of songs) {
    songList.innerHTML += `<li><img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ").replace(".mp3", "")}</div>
                            </div>
                            <img src="play.svg" class="invert" alt="">
                            </li>`;
  }
  //attach a event listener to the play button
  Array.from(document.querySelector(".songList ").getElementsByTagName("li")).forEach((e) => {
    e.addEventListener("click", () => {
      let songName = e.querySelector(".info").firstElementChild.innerHTML.trim();
      // console.log("songname: ",songName);
      playmusic(songName);
    });
    //attach a event listener to the play next and previous buttons
    let play = document.querySelector("img[src='play.svg']");
    play.addEventListener("click", () => {
      if (curr_song.paused) {
        curr_song.play();
        play.src = "pause.svg";
      } else {
        curr_song.pause();
        play.src = "play.svg";

      }
    });

  });
  
  document.getElementById("play").addEventListener("click", () => {
    if (curr_song.paused) {
      curr_song.play();
      play.src = "pause.svg";
    } else {
      curr_song.pause();
      play.src = "play.svg";
    }
  });
  
   //Listen to the time update event of the audio element
   curr_song.addEventListener("timeupdate", () => {
    let currentTime = curr_song.currentTime;
    let duration = curr_song.duration;
    let mins = Math.floor(currentTime / 60);
    let secs = Math.floor(currentTime % 60);
    let mins2 = Math.floor(duration / 60);
    let secs2 = Math.floor(duration % 60);
    if (secs < 10) {
      secs = "0" + secs;
    }
    if (secs2 < 10) {
      secs2 = "0" + secs2;
    }
    document.querySelector(".songTime").innerHTML = mins + ":" + secs + "/" + mins2 + ":" + secs2;
    document.querySelector(".circle").style.left = (currentTime / duration) * 100 + "%";
  }); 
  
  //attach an event listener to the progress bar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width)*100;
    document.querySelector(".circle").style.left = percent + "%";
    curr_song.currentTime = (percent * curr_song.duration)/100;
  });

  //attach an event listener for hamburger
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });

    //attach an event listener for close svg
    document.querySelector(".close").addEventListener("click", () => {
      document.querySelector(".left").style.left = "-100%";
    });


    
     // Add event listener for the previous
     prev.addEventListener("click", (e) => {
      console.log("prev")
      let index = songs.indexOf(curr_song.src.split("/").slice(-1)[0]);
      if (index == 0) {
        index = songs.length - 1;
      } else {
        index--;
      }
      playmusic(songs[index].replaceAll("%20", " ").replace(".mp3", ""));
    });

    // Add event listener for the  next
    nex.addEventListener("click", (e) => {
      console.log("next")
      let index = songs.indexOf(curr_song.src.split("/").slice(-1)[0]);
      if (index == songs.length - 1) {
        index = 0;
      } else {
        index++;
      }
      playmusic(songs[index].replaceAll("%20", " ").replace(".mp3", ""));
    });

}


main();