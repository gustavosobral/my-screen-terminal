$(document).ready(function() {

  $.material.init();
  $('#login-alert').hide();

  $.getJSON("playlistDefault.json", function(data) {
    localStorage.setItem('playlistDefault', JSON.stringify(data));
  });

  if (localStorage.getItem('terminalToken')) {
    subscribe();
  }

});
