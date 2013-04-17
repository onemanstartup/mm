/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};
var router, lang;
lang = "/";
$(document).ready(function() {

   router = new Router();
  router.route('*lang/about.html', function(lang){
    console.log("loading about.html" + " " + lang);
    $("body").addClass("about");
    $("#works").hide();
    $("#about_us").css("display","block");
    $("#about_us").animate({opacity:1},800);
    if (lang === "/ru"){
      $("#page_switch").text("назад к галлерее работ").attr("href", "/ru/");
    } else {
      $("#page_switch").text("back to works").attr("href", "/");
    }
    
  });
  router.route('*lang/gallery/pixelart_:id.html', function(lang, id){
    console.log('galllery');
    reset();
    load_main();
    
    gal(parseInt(id,10));
  });
  router.route('', function(){
    $('body').addClass('eng');
    reset();
    load_main();
  });

  router.route('/ru/', function(){
    lang = "/ru";
    $('body').addClass('ru');
    reset();
    load_main();
  });

  function mobile() {
    return jQuery.browser.mobile;
  }

  function reset(){
    $("body").removeClass("about");
    $("body").removeClass("ru_about");
    
    $("#works").hide();
    $("#about_us").hide();
  }

  function load_main(){
    if (lang === "/ru"){
      $("#page_switch").text("о нас").attr("href", "/ru/about.html");
    } else {
      $("#page_switch").text("about us").attr("href", "about.html");
    }


    if ($("#works").html().trim() === "") {
    var cardTemplate = $("#cardTemplate").html();
    $(works).each(function(index){
      w = this.data;
      var template = cardTemplate.format(works.length - index, w.title, w.preview.image_name, w.preview.width);
      $("#works").append(template);
    });
    } 

    $("#works").show();
  }
  // loading page first route
  router.checkRoutes(History.getState());


  function enableonpopstate(){
    window.onpopstate = function(event) {
      console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
      if(mobile()){
        router.navigate("/about.html");
      } else {
        if (window.location.pathname === "/about.html"){
          router.navigate("/about.html");
        }else if(window.location.pathname === "/"){
          reset();
          load_main();
        } else {
          console.log(window.location.pathname);
          router.navigate(window.location.pathname);
        }
      }
    };
    
  }
  enableonpopstate();

  $("body").delegate("#page_switch", "click", function(e){
    e.preventDefault();
    router.navigate($(this).attr("href"));
  });

  $("body").delegate("#overlay a.close", "click", function(){
    $("#overlay").hide();
    $("#love").empty();
    $("html").css("overflow-y","scroll");
    router.navigate(lang);
  });

  $("body").delegate(".cari a", "click", function(e){
    e.preventDefault();
    History.pushState(null, null, lang + "/gallery/pixelart_"+(parseInt($(this).data("index"),10))+".html");
  });
  $("body").delegate("#next-image", "click", function(e){
    e.preventDefault();
     var a = /gallery\/pixelart_(\d+)\.html/.exec(window.location.pathname);
     $("#overlay a.close").trigger("click");
     History.pushState(null, null, lang + "/gallery/pixelart_"+(parseInt(a[1], 10)+1)+".html");
   });

  $("body").delegate("#prev-image", "click", function(e){
    e.preventDefault();
     var a = /gallery\/pixelart_(\d+)\.html/.exec(window.location.pathname);
     $("#overlay a.close").trigger("click");
     History.pushState(null, null, lang + "/gallery/pixelart_"+(parseInt(a[1], 10)-1)+".html");
   });


  function gal(obj){
    console.log(obj);
    $("#overlay").show();
    $("#overlay").addClass('loaded');
    $("html").css("overflow-y","hidden");
    $("#overlay .media").width($(window).outerWidth());
    $("#bottomsection .number").text('– No. 00'+obj+' -');

    var real = works[(works.length + 1) - obj - 1];

    var img = real.data.images[0];

    function middleScreen(){
          $('.letterbox').width(img.width);
          $('.letterbox').height(img.height);
        $('.letterbox').css("margin-top", ( $('.module-piece-detail').height() -  $('.letterbox').height() ) / 2 );
    }
    function checkFit(cont, img){
       console.log(cont.width() + " " + img.width );
       console.log(cont.height() + " " + img.height);
      if (cont.width() >= img.width && cont.height() >= img.height){
         imageFit = true;
      } else {
         imageFit = false;
      }
      return imageFit;
    }
    var height;

    if (img.height > $(window).outerHeight()) {
      heights = $(window).outerHeight() / 2;
      //obj.parent().css("height", heights);
      //obj.parent().parent().css("height", heights);
      height = img.height;
    } else {
      height = img.height;
    }

    //if (obj.data("width") > $(window).outerWidth()){
      insane(img);
     //}

    function insane(img){
      jQuery.infinitedrag('#love',
                          {axis: img.axis}, {
                            width: img.width,
                            height: img.height,
                            start_col: 0,
                            start_row: 0,
                            range_row: [parseInt(img.range_row.split(',')[0],10), parseInt(img.range_row.split(',')[1], 10)],
                            range_col: [parseInt(img.range_col.split(',')[0],10), parseInt(img.range_col.split(',')[1], 10)],
                            oncreate: function($element, col, row) {
                              $element.html('<img src="/images/works/'+img.image_name+'"/>');
                            }});
     if (checkFit( $('.module-piece-detail') , img)) {
        console.log("ImageFit - disabling dragging");
        $( "#love" ).draggable( "disable" );
        middleScreen();
     } else {
        console.log($('.module-piece-detail').width());
     }
    }
  }


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
    console.log($(this).data("axis"));
    var seamless = jQuery.infinitedrag(".wall"+index,
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






  //$(".wall").each(function(index) {
  //$(this).addClass('wall'+index);

  //var height;
  //if ($(this).data("height") > $(window).outerHeight()) {
  //heights = $(window).outerHeight() / 2;
  //$(this).parent().css("height", heights);
  //$(this).parent().parent().css("height", heights);
  //}
  //height = $(this).data("height");

  //if ($($(this).data("data-letter-box-type") == 'single')){
  //if($(this).data("width") > $(window).outerWidth()){
  //$(this).parent().css("width",  $(window).outerWidth());

  //} else {
  //$(this).parent().css("width",  $(this).data("width"));
  //}
  //}
  //}
  //);

});
// var image = $('<img id="fuck" src="/images/works/'+$('.wall'+index).data("image-name")+'"/>');
// $('body').append(image);
// var image = $("#fuck");

//var horizontal_seamless = jQuery.infinitedrag(".wall"+index,
//{axis: $(this).data("axis")}, {
//width: $(this).data("width"),
//height: height,
//start_col: 0,
//start_row: 0,
//range_row: [parseInt($(this).data("range-row").split(',')[0],10), parseInt($(this).data("range-row").split(',')[1], 10)],
//range_col: [parseInt($(this).data("range-col").split(',')[0],10), parseInt($(this).data("range-col").split(',')[1], 10)],
//oncreate: function($element, col, row) {
//$element.html('<img src="/images/works/'+$('.wall'+index).data("image-name")+'"/>');
//}});});

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
//var jCarouselNav = function () {
//$('.jcarousel-nav a').on('click', function (e) {
//e.preventDefault();

//var target = $(this).attr('data-to');

//$('.jcarousel').jcarousel('scroll', target);
//});
//};
//var toggleItems = function () {
//$('#hide-items').on('click', function (e) {
//e.preventDefault();
//$( ".jcarousel" ).jcarousel( "target" ).addClass("active");
//$('.toggle').hide();
//});

//$('#show-items').on('click', function (e) {
//e.preventDefault();

//$('.toggle').show();
//});
//$('.jcarousel').jcarousel('reload');

//};

//function toggleActive() {
//$( ".jcarousel" ).jcarousel( "target" ).addClass("active");
//$( ".jcarousel" ).jcarousel( "target" ).find('.bot').fadeToggle("slow", "linear");
//}

//$("#carousel li").css('width',($(window).outerWidth()*0.3 + $(window).outerWidth()/10 ) + 'px');
//$("#carousel li").css('margin-left',($(window).outerWidth()/320 * 20 ) + 'px');
//$("#carousel li").css('margin-right',($(window).outerWidth()/320 * 20) + 'px');
//$('.jcarousel').jcarousel({
//'items': function() {
//return this.list().children().not(':hidden');
//},
//'wrap': 'circular',
//'scroll':1,
//'center': true
//});
//jCarouselNav();
//toggleItems();
//toggleActive();
//$('#content').delegate( '.jcarousel li:not(.active)', 'click', function (e) {
//e.preventDefault();
//$( ".jcarousel .active" ).find('.bot').fadeToggle("slow", "linear");
//$( ".jcarousel .active" ).removeClass("active");

//$('.jcarousel').jcarousel('scroll', $(this), true, function(scrolled) {
//if (scrolled) {
//toggleActive();
//} else {
//}
//});

//});


//});


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
