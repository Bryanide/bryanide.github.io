/*----------------------------------------------
                PROGRESS BARS
------------------------------------------------*/
var $countbar = $(".count-bar");

$countbar.waypoint(function() {
  console.log('waypoint!');
  $countbar.each(function(indx) {
    $(this).css("width", $(this).attr("aria-valuenow") + "%");
  });


}, {
  triggerOnce: true,
  offset: '60%'
}

);
/*
  $(".skillst9").each(function() {
      $(this).waypoint(function() {
      var progressBar = $(".count-bar");
      progressBar.each(function(indx){
          $(this).css("width", $(this).attr("aria-valuenow") );
      });
  }, {
      triggerOnce: true,
      offset: 'bottom-in-view'
    });
   });
*/
