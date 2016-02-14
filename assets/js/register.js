$('#registerForm').on('submit', function (e) {
  e.preventDefault();

  var _this = this;

  var data = $(this).serializeArray().reduce(function (prev, curr) {
    prev[curr.name] = curr.value;
    return prev;
  }, {});

  var handler = StripeCheckout.configure({
    key: 'pk_test_f77KTv04uQVE6PiHNURCZXuq',
    locale: 'auto',
    token: function(token, args) {

      $.ajax({
        url: 'https://55kuk29vd4.execute-api.us-east-1.amazonaws.com/Prod',
        method: 'POST',
        data: JSON.stringify(data),
        dataType: 'json'
      }).done(function (res) { 
        $('#registerModal').find('.close').trigger('click'); 
      });

    }
  });

  handler.open({
    name: 'Register',
    description: '2016 Monadnock Tip-Up Tourney',
    amount: 1500,
    email: data.email
  });

  $(window).on('popstate', function () { 
    handler.close(); 
  });

});

$('#registerForm').on('submit', function (e) {
  e.preventDefault();

  var _this = this;

  var data = $(this).serializeArray().reduce(function (prev, curr) {
    prev[curr.name] = curr.value;
    return prev;
  }, {});

  var handler = StripeCheckout.configure({
    key: 'pk_test_f77KTv04uQVE6PiHNURCZXuq',
    locale: 'auto',
    token: function(token, args) {

      $.ajax({
        url: 'https://55kuk29vd4.execute-api.us-east-1.amazonaws.com/Prod',
        method: 'POST',
        data: JSON.stringify(data),
        dataType: 'json'
      }).done(function (res) { 
        $('#registerModal').find('.close').trigger('click'); 
      });

    }
  });

  handler.open({
    name: 'Register',
    description: '2016 Monadnock Tip-Up Tourney',
    amount: 1500,
    email: data.email
  });

  $(window).on('popstate', function () { 
    handler.close(); 
  });

});