var handler = StripeCheckout.configure({
  key: 'pk_test_f77KTv04uQVE6PiHNURCZXuq',
  locale: 'auto',
  token: function(token, args) {
    ga('send', 'post data');
    $.ajax({
      url: 'https://55kuk29vd4.execute-api.us-east-1.amazonaws.com/Prod',
      method: 'POST',
      data: JSON.stringify(window._registrants),
      dataType: 'json'
    }).done(function (res) { 
      $('#registerModal').find('.close').trigger('click'); 
    });
  }
});

window.renderRegistrants = function () {
  $('#registrants-list').empty();
  window._registrants.forEach(function (item) {
    $('#registrants-list').append('<div>' + item.name + ' - ' + item.age + '<div>');
  });
  $('#registrants-list').append('<h3>Total: $' + (window._registrants.length * 15) + '<h3>');

  if(window._registrants.length > 0) {
    console.log('Enabling Payment');
    $('#submitRegistration').prop('disabled', false);
  }
}

window._registrants = [];


$('#registerForm').on('submit', function (e) {
  e.preventDefault();

  var _this = this;

  var data = $(this).serializeArray().reduce(function (prev, curr) {
    prev[curr.name] = curr.value;
    return prev;
  }, {});

  ga('send', 'add registrant');

  window._registrants.push(data);
  $('#registerForm').trigger('reset');

  window.renderRegistrants();

});

$('#donate-button').on('click', function (e) {
  e.preventDefault();

  var amount = Number($('#donate-amount-input').val().trim()) * 100;

  handler.open({
    name: 'Donate',
    description: '2016 Monadnock Tip-Up Tourney Donation',
    amount: amount
  });
});

$('#submitRegistration').on('click', function (e) {
    e.preventDefault();
    ga('send', 'open registration');
    handler.open({
      name: 'Register',
      description: '2016 Monadnock Tip-Up Tourney',
      amount: window._registrants.length * 1500
    });

    $(window).on('popstate', function () { 
      handler.close(); 
    });
});