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
      headers: { 'X-Api-Token': '' },
      data: terminal,
      dataType: 'json',
      cache: false,
      beforeSend: function() {
        $('button').prop('disabled', true);
      }
    }).done(function() {
      alert('Done!');
      $('button').prop('disabled', false);
    }).fail(function() {
      $('#login-alert').show();
      $('button').prop('disabled', false);
    });
  });

});
