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

  var height;
  if ($("#wall").data("height") > $(window).outerHeight()) {
    heights = $(window).outerHeight() / 2;
     $("#wall").parent().css("height", heights);
     $("#wall").parent().parent().css("height", heights);
     height = $("#wall").data("height");
  } else {
    height = $("#wall").data("height");
  }

  var horizontal_seamless = jQuery.infinitedrag("#wall", 
             {axis: $("#wall").data("axis")}, {
		width: $("#wall").data("width"),
		height: height,
		start_col: 0,
		start_row: 0,
    range_row: [parseInt($("#wall").data("range-row").split(',')[0],10), parseInt($("#wall").data("range-row").split(',')[1], 10)],
    range_col: [parseInt($("#wall").data("range-col").split(',')[0],10), parseInt($("#wall").data("range-col").split(',')[1], 10)],
    oncreate: function($element, col, row) {
      $element.html('<img src="/images/works/'+$("#wall").data("image-name")+'"/>');
    }
	});

});
