$(document).ready(function() {

  $.material.init();
  $('#login-alert').hide();

  $.getJSON("playlistDefault.json", function(data) {
    localStorage.setItem('playlistDefault', JSON.stringify(data));
  });

  if (localStorage.getItem('terminalToken')) {
    subscribe();
    document.getElementById("auth-button").innerHTML = "Logout";
  } else {
    document.getElementById("auth-button").innerHTML = "Login";
  }

  $('#auth-button').on('click', function() {
    event.preventDefault();

    if (!localStorage.getItem('terminalToken')) {
      window.location.href = 'login.html';
    } else {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/v1/logout',
        headers: { 
          'X-Api-Token': '28b4cf3f845dc385ca86591d3e4063459e8c12eb59730718fb2988556325c2a700b2f0ec1aa8a5cc3190b239b26d56b877667a03da272f56a727216b255aaaa0',
          'X-Terminal-Token': localStorage.getItem('terminalToken')
        },
        dataType: 'json',
        cache: false,
        beforeSend: function() {
          $('button').prop('disabled', true);
        }
      }).done(function(data) {
        localStorage.removeItem('terminalId');
        localStorage.removeItem('terminalOwnerId');
        localStorage.removeItem('terminalToken');
        localStorage.removeItem('terminalTitle');

        $('button').prop('disabled', false);
        document.getElementById("auth-button").innerHTML = "Login";
      }).fail(function() {
        $('button').prop('disabled', false);
      });
    }
  });

});
