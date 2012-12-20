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
    }   
    height = $(this).data("height");
  
      if ($($(this).data("data-letter-box-type") == 'single')){
        if($(this).data("width") > $(window).outerWidth()){
          $(this).parent().css("width",  $(window).outerWidth());

        } else {
         $(this).parent().css("width",  $(this).data("width"));
        }
      }

    // var image = $('<img id="fuck" src="/images/works/'+$('.wall'+index).data("image-name")+'"/>');
    // $('body').append(image);
   // var image = $("#fuck");

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
            }});});


/*	CarouFredSel: a circular, responsive jQuery carousel.
	Configuration created by the "Configuration Robot"
	at caroufredsel.dev7studios.com
*/
//$("#gallery").carouFredSel({
	//width: "90%",
	//height: 200,
  //circular: false,
  //infinite: false,
	//items: {
		//visible: 3,
		//minimum: 2,
		//width: "variable",
		//height: "variable"
	//},
	//scroll: {
		//items: 1,
		//duration: 500
	//},
	//auto: false,
	//swipe: true,
	//prev: {
		//button: "#prev_btn",
		//key: "left"
	//},
	//next: {
		//button: "#next_btn",
		//key: "right"
	//}
//});
var jCarouselNav = function () {
    $('.jcarousel-nav a').on('click', function (e) {
        e.preventDefault();
        
        var target = $(this).attr('data-to');
    
        $('.jcarousel').jcarousel('scroll', target);
    });
};
var toggleItems = function () {
    $('#hide-items').on('click', function (e) {
        e.preventDefault();
        $( ".jcarousel" ).jcarousel( "target" ).addClass("active");
        $('.toggle').hide();
    });
    
    $('#show-items').on('click', function (e) {
        e.preventDefault();
        
        $('.toggle').show();
    });
    $('.jcarousel').jcarousel('reload');

};

function toggleActive() {
        $( ".jcarousel" ).jcarousel( "target" ).addClass("active");
        $( ".jcarousel" ).jcarousel( "target" ).find('.bot').fadeToggle("slow", "linear"); 
}

$("#carousel li").css('width',($(window).outerWidth()*0.3 + $(window).outerWidth()/10 ) + 'px');
$("#carousel li").css('margin-left',($(window).outerWidth()/320 * 20 ) + 'px');
$("#carousel li").css('margin-right',($(window).outerWidth()/320 * 20) + 'px');
$('.jcarousel').jcarousel({
        'items': function() {
            return this.list().children().not(':hidden');
        },
        'wrap': 'circular',
        'scroll':1,
        'center': true
    });
    jCarouselNav();
    toggleItems();
    toggleActive();
    $('#content').delegate( '.jcarousel li:not(.active)', 'click', function (e) {
        e.preventDefault();
        $( ".jcarousel .active" ).find('.bot').fadeToggle("slow", "linear");
        $( ".jcarousel .active" ).removeClass("active");

        $('.jcarousel').jcarousel('scroll', $(this), true, function(scrolled) {
    if (scrolled) {
        toggleActive();
    } else {
    }
});
        
});

    
});


// ZOOM
//window.onload = function(){

    //var img1 = document.getElementById('fuck');
    //var offtx = document.createElement('canvas').getContext('2d');
    //offtx.drawImage(img1,0,0);
    //console.log(img1.width);
    //var imgData = offtx.getImageData(0,0,img1.width,img1.height).data;
    //var c1   = $('.c1')[0];
    //var ctx1 = c1.getContext('2d');
    //var zoom = 1;
    //c1.width  = img1.width  * zoom;
    //c1.height = img1.height *     zoom;
    //ctx1.clearRect(0,0,c1.width,c1.height);
    //// Draw the zoomed-up pixels to a different canvas context
    //for (var x=0;x<img1.width;++x){
      //for (var y=0;y<img1.height;++y){
        //// Find the starting index in the one-dimensional image data
        //var i = (y*img1.width + x)*4;
        //var r = imgData[i  ];
        //var g = imgData[i+1];
        //var b = imgData[i+2];
        //var a = imgData[i+3];
        //ctx1.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
        //ctx1.fillRect(x*zoom,y*zoom,zoom,zoom);
      //}
    //}

//};
