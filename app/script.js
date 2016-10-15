const Pusher = require('pusher-js/node')

var pusherData = {
  encrypted: true,
  authEndpoint: '',
  auth: {
    headers: {}
  }
}

var newPlaylistEvent = function(data) {
  if($.isEmptyObject(data)) {
    localStorage.setItem('playlist', localStorage.getItem('playlistDefault'));
  } else {
    localStorage.setItem('playlist', JSON.stringify(data));
  }
}

$(document).ready(function() {

  $.material.init();
  $('#login-alert').hide();

  $.getJSON("playlistDefault.json", function(data) {
    localStorage.setItem('playlistDefault', JSON.stringify(data));
  });

  $('form').on('submit', function() {
    event.preventDefault();
    $('#login-alert').hide();

    var $form = $(this);

    var terminal = {
      'title': $form.find('input[name="terminal[title]"]').val().toString(),
      'password': $form.find('input[name="terminal[password]"]').val().toString(),
    }

    $.ajax({
      type: 'POST',
      url: '',
      headers: { 'X-Api-Token': '' },
      data: terminal,
      dataType: 'json',
      cache: false,
      beforeSend: function() {
        $('button').prop('disabled', true);
      }
    }).done(function(data) {   
      localStorage.setItem('terminalId', data.id);
      localStorage.setItem('terminalToken', data.token);
      localStorage.setItem('terminalTitle', data.title);

      pusherData.auth.headers = {
        'X-Api-Token': '',
        'X-Terminal-Token': data.token,
        'X-Terminal-Title': data.title
      }

      const pusher = new Pusher('', pusherData);
      pusher.subscribe('presence-user-' + data.owner_id);

      var privateChannel = pusher.subscribe('private-terminal-' + data.id);
      privateChannel.bind('new_playlist', newPlaylistEvent);

      $('button').prop('disabled', false);
    }).fail(function() {
      $('#login-alert').show();
      $('button').prop('disabled', false);
    });
  });

});
