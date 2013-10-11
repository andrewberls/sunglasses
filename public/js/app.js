// Handles to our jQuery objects
var $loading = $('.loading-container'),
    $result  = $('.result-container'),
    $error   = $('.error-container'),
    $form    = $('.city');

// Remove empty elements from an array
function clean(arr) {
  return arr.filter(function(e) { return e });
}

// Error handler
function fail() {
  $error.slideDown(150);
}


// Bunch of gross HTML string building here. Meh.
//
// Helper for forecast HTML construction
function build_forecast(forecast, temp) {
  return div(function() {
    return "Forecast is " + span(forecast) + ", with a temp of " + span(temp) + ".";
  });
}

// Build and return result HTML to be displayed
function build_result(need, forecast, temp) {
  var text = '';
  if (need === 'affirmative')
    text = 'Yep!';
  else if (need === 'negative')
    text = 'Nope!';
  else
    text = 'Maybe?';

  return div({ class: need }, function() {
    return text + build_forecast(forecast, temp);
  });
}

// Got response from the server - display appropriate result (or error message)
function done(data) {
  var need   = '',
      output = '',
      json   = JSON.parse(data);

  // No results from the server
  if(!json.need) return fail();

  // Get forecast from icon - ex: 'mostlycloudy' => 'mostly cloudy'
  var forecast = clean( json.icon.split(/(mostly|partly)?(cloudy|sunny|clear)/) ).join(' ');

  switch(json.need) {
    case 'true':
      need = 'affirmative';
      break;
    case 'false':
      need = 'negative';
      break;
    default:
      need = 'maybe';
      break;
  }

  $result.append( build_result(need, forecast, json.temp) );
  $result.slideDown(150);
}


function submit() {
  $result.empty();
  $error.hide();
  $loading.show();

  city = $('.city').val();

  $.post('/sunglasses', { city: city })
  .done(done)
  .always(function() {
    $loading.hide();
  });

  return false;
}

// Blind click handlers and enter key to submit form and show results
$('.submit').click(submit);

$form.keyup(function(e) {
  if (e.keyCode === 13) submit();
});
