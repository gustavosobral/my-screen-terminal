$(document).ready(function() {

  $('form').on('submit', function() {
    event.preventDefault();
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
    }).done(function() {
      alert('Done!');
    }).fail(function() {
      alert('Fail!');
    });
  });

});
