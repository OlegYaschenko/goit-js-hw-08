import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const savedSettings = localStorage.getItem("videoplayer-current-time");
const parsedSettings = JSON.parse(savedSettings);


if (parsedSettings) {
  player.setCurrentTime(parsedSettings);
}

player.on('timeupdate', throttle(saveCurrentTimeVideo, 1000));

function saveCurrentTimeVideo() { 
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem("videoplayer-current-time", JSON.stringify(seconds));
  });
};


