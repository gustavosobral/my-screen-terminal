const Pusher = require('pusher-js/node')

var pusher;

var pusherData = {
  encrypted: true,
  authEndpoint: 'http://localhost:3000/api/v1/login_channel',
  auth: {
    headers: {}
  }
}

var sendNotified = function () {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/api/v1/notified',
    headers: {
      'X-Api-Token': '28b4cf3f845dc385ca86591d3e4063459e8c12eb59730718fb2988556325c2a700b2f0ec1aa8a5cc3190b239b26d56b877667a03da272f56a727216b255aaaa0',
      'X-Terminal-Token': localStorage.getItem('terminalToken'),
      'X-Terminal-Title': localStorage.getItem('terminalTitle')
    },
    data: { "id": localStorage.getItem('terminalId') },
    dataType: 'json',
    cache: false
  });
}

var subscribe = function () {
  pusherData.auth.headers = {
    'X-Api-Token': '28b4cf3f845dc385ca86591d3e4063459e8c12eb59730718fb2988556325c2a700b2f0ec1aa8a5cc3190b239b26d56b877667a03da272f56a727216b255aaaa0',
    'X-Terminal-Token': localStorage.getItem('terminalToken'),
    'X-Terminal-Title': localStorage.getItem('terminalTitle')
  }

  pusher = new Pusher('02cdc5ce216d575e7d41', pusherData);
  pusher.subscribe('presence-user-' + localStorage.getItem('terminalOwnerId'));  

  var privateChannel = pusher.subscribe('private-terminal-' + localStorage.getItem('terminalId'));
  privateChannel.bind('new_playlist', newPlaylistEvent);
}

var newPlaylistEvent = function(data) {
  if($.isEmptyObject(data)) {
    localStorage.setItem('playlist', localStorage.getItem('playlistDefault'));
  } else {
    localStorage.setItem('playlist', JSON.stringify(data));
  }
  sendNotified();
}
