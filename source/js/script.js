$(document).ready(function() {

  //var infinitedrag = jQuery.infinitedrag("#wall", {axis: "xy"}, {
		//width: $("#wall").data("width"),
		//height: $("#wall").data("height"),
		//start_col: 0,
		//start_row: 0,
    //range_col: [0, 1],
    //range_row: [0, 1],

    //oncreate: function($element, col, row) {
      //$element.html('<img src="/images/38.png"/>');
    //}
	//});
  //var pixorama = jQuery.infinitedrag("#wall1", {axis: "xy"}, {
		//width: $("#wall1").data("width"),
		//height: $("#wall1").data("height"),
		//start_col: 0,
		//start_row: 0,
    //range_col: [0, 1],
    //range_row: [0, 1],

    //oncreate: function($element, col, row) {
      //$element.html('<img src="/images/38.png"/>');
    //}
	//});
  
  $(".wall").each(function(index) {
  $(this).addClass('wall'+index);

  var height;
  if ($(this).data("height") > $(window).outerHeight()) {
    heights = $(window).outerHeight() / 2;
     $(this).parent().css("height", heights);
     $(this).parent().parent().css("height", heights);
     height = $(this).data("height");
  } else {
    height = $(this).data("height");
  }

  var horizontal_seamless = jQuery.infinitedrag(".wall"+index, 
             {axis: $(this).data("axis")}, {
		width: $(this).data("width"),
		height: height,
		start_col: 0,
		start_row: 0,
    range_row: [parseInt($(this).data("range-row").split(',')[0],10), parseInt($(this).data("range-row").split(',')[1], 10)],
    range_col: [parseInt($(this).data("range-col").split(',')[0],10), parseInt($(this).data("range-col").split(',')[1], 10)],
    oncreate: function($element, col, row) {
      $element.html('<img src="/images/works/'+$('.wall'+index).data("image-name")+'"/>');
    }
	});
    

});

});
