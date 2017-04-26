var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:3000/events",
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
  var nextEvent = response.items[0];
  $('#cal-next-event').append('<div class="row"><div class="col-md-4" id="nextEventDate"><p id="nextEventMonth">'+ nextEvent.start.dateMonth +'</p><p id="nextEventDayNumber">'+ nextEvent.start.dateDayNumber +'</p></div><div class="col-md-8"><h1>' + nextEvent.summary + '</h1></div></div><h4>' + nextEvent.description + '</h4><div id="nextEventWhere"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span><span>' + nextEvent.location + '</span></div><div id="nextEventWhen"><span class="glyphicon glyphicon-time" aria-hidden="true"></span><span>' + nextEvent.start.time + ' - ' + nextEvent.end.time + '</span></div>');

  for(i = 1; i < response.items.length; i++){
    $('tbody').append('<tr><td class="event-date">'+ response.items[i].start.dateFormatShort + ' @ ' + response.items[i].start.time +'</td><td class="event-summary">'+ response.items[i].summary +'</td></tr>');
  }
  
});