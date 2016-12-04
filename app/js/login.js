$(document).ready(function() {

  $.material.init();
  $('#login-alert').hide();

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
      url: 'http://localhost:3000/api/v1/login',
      headers: { 'X-Api-Token': '28b4cf3f845dc385ca86591d3e4063459e8c12eb59730718fb2988556325c2a700b2f0ec1aa8a5cc3190b239b26d56b877667a03da272f56a727216b255aaaa0' },
      data: terminal,
      dataType: 'json',
      cache: false,
      beforeSend: function() {
        $('button').prop('disabled', true);
      }
    }).done(function(data) {
      localStorage.setItem('terminalId', data.id);
      localStorage.setItem('terminalOwnerId', data.owner_id);
      localStorage.setItem('terminalToken', data.token);
      localStorage.setItem('terminalTitle', data.title);

      $('button').prop('disabled', false);
      window.location.href = 'index.html';
    }).fail(function() {
      $('#login-alert').show();
      $('button').prop('disabled', false);
    });
  });

});
