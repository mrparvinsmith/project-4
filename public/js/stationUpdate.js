console.log('js linked');

var thing = {};

var getRoutes = function(arr){
  arr.forEach(function(station){
    $.ajax({
      url: 'http://api.metro.net/agencies/lametro/stops/' + station.stop_id + '/routes/',
      type: 'GET',
    })
    .done(function(response) {
      response.items.forEach(function(item){
        thing = station;
        if(item.id){
          $.ajax({
            url: '/update',
            type: 'PUT',
            data: {
              id: thing.stop_id,
              route: item.id,
            },
          })
          .done(function(data) {
            console.log("success");
          })
          .fail(function() {
            console.log("error");
          });
        }
      });
    });
  });
};

$('button').on('click', function(event){
  $.ajax({
    url: '/api/stations',
    type: 'GET',
  })
  .done(function(response) {
    console.log("success");
    console.log(response);
    var arr = [];
    response.forEach(function(item){
      if(!item.routes[0] && arr.length < 4000){
        arr.push(item);
      }
    });
    console.log(arr);
    getRoutes(arr);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
});
