var i;
var playlist;
var videoPlayer;
var imagePlayer;

var verifyUpdate = function () {
  var newPlaylist = JSON.parse(localStorage.getItem('playlist'));

  if (newPlaylist.id != playlist.id) {
    playlist = newPlaylist;
  } else {
    playlistDate = new Date(playlist.updated_at);
    newPlaylistDate = new Date(newPlaylist.updated_at);

    if (newPlaylistDate > playlistDate) {
      playlist = newPlaylist;
    }
  }
}

var iterate = function () {
  verifyUpdate();

  if (i == playlist.playlist_items.length) {
    i = 0;
  }

  playlist_item = playlist.playlist_items[i];

  if (playlist_item.type == "Video") {
    imagePlayer.style.display = 'none';
    videoPlayer.style.display = 'block';
    videoPlayer.src = playlist_item.file_url;
    videoPlayer.play();
  } else {
    videoPlayer.style.display = 'none';
    imagePlayer.style.display = 'block';
    imagePlayer.src = playlist_item.file_url;
    setTimeout(iterate, 5000);
  }

  i++;
}

$(document).ready(function() {

  $.material.init();
  $('#login-alert').hide();

  if (localStorage.getItem('terminalToken')) {
    subscribe();
  } else {
    newPlaylistEvent();
  }

  i = 0;
  playlist = JSON.parse(localStorage.getItem('playlist'));
  videoPlayer = document.getElementById("player-video");
  imagePlayer = document.getElementById("player-image");

  videoPlayer.onended = function () {
    iterate();
  }

  iterate();

});
