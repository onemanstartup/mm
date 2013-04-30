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
    $("#about_us").css({"display":"block"});
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $("#about_us").animate({opacity:1},800,'easeInQuart');
    if (lang === "/ru"){
      $("#page_switch").text("назад к галлерее работ").attr("href", "/ru/");
    } else {
      $("#page_switch").text("back to works").attr("href", "/");
    }

  });
  router.route('*lang/gallery/pixelart_:id.html', function(lang, id){
    if(id==1){
      $("#prev-image").addClass("disabled");
    } else {
      $("#prev-image.disabled").removeClass("disabled");
    }
    if(id==works.length){
      $("#next-image").addClass("disabled");
    } else {
      $("#next-image.disabled").removeClass("disabled");
    }
    console.log('galllery');
    reset();
    load_main();
    loading(parseInt(id,10));
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
    $("#about_us").css({"opacity":0});

  }

  function load_main(){
    if (lang === "/ru"){
      $("#page_switch").text("о нас").attr("href", "/ru/about.html");
    } else {
      $("#page_switch").text("about us").attr("href", "about.html");
    }


    if ($("#works .inner_content").html().trim() === "") {
      var cardTemplate = $("#cardTemplate").html();
      $(works).each(function(index){
        w = this.data;
        var template = cardTemplate.format(works.length - index, w.title, w.preview.image_name, w.preview.width, w.preview.height);
        $("#works .inner_content").append(template);
      });
    } 
    $("img.lazy").show().lazyload({ 
      effect : "fadeIn",
      threshold : 200
    });
    $("#works").show();
    // Trigger scroll to work lazyload
    $("body").trigger("scroll");
  }
  if(mobile()){
    if (window.location.pathname === "/"){
      router.navigate("/about.html");
    }
    router.checkRoutes(History.getState());
  } else {
    // loading page first route
    router.checkRoutes(History.getState());
  }

  function enableonpopstate(){
    window.onpopstate = function(event) {
      console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
      if (window.location.pathname === "/about.html"){
        router.navigate("/about.html");
      }else if(window.location.pathname === "/"){
        reset();
        load_main();
      } else {
        console.log(window.location.pathname);
        router.navigate(window.location.pathname);
      }
    };

  }
  enableonpopstate();

  $("body").delegate("#page_switch", "click", function(e){
    e.preventDefault();
    router.navigate($(this).attr("href"));
  });

  $("body").delegate("#overlay a.close", "click", function(){
    closeOverlay();
    $("#love").empty();
    $("html").css("overflow-y","scroll");
    router.navigate(lang);
  });

  $("#overlay a.close").mouseover(function() {
    $(this).animate({"opacity":"1"},100, "easeInQuad"); 
  }).mouseout(function(){
    $(this).animate({"opacity":"0.6"},100, "easeInQuad"); 
  });
  $("body").delegate(".cari a", "click", function(e){
    e.preventDefault();
    History.pushState(null, null, lang + "/gallery/pixelart_"+(parseInt($(this).data("index"),10))+".html");
  });
  $("body").delegate("#next-image:not(.disabled)", "click", function(e){
    e.preventDefault();
    var a = /gallery\/pixelart_(\d+)\.html/.exec(window.location.pathname);
      resetOverlay();
    
    History.pushState(null, null, lang + "/gallery/pixelart_"+(parseInt(a[1], 10)+1)+".html");
  }); 

  $("body").delegate("#prev-image:not(.disabled)", "click", function(e){
    e.preventDefault();
    var a = /gallery\/pixelart_(\d+)\.html/.exec(window.location.pathname);
    //$("#overlay a.close").trigger("click");
      resetOverlay();
    
    History.pushState(null, null, lang + "/gallery/pixelart_"+(parseInt(a[1], 10)-1)+".html");
  });

  function closeOverlay(){
    $("#overlay").animate({"top":"-100%"},400, "easeInQuad", function(){
      $("#overlay").attr('style', '');
      $('.module-piece-detail').attr('style', '');
      resetOverlay();
      $("#overlay #bottomsection").attr('style', '');
      $("#overlay .close").attr('style', '');
    }); 
  }
  function resetOverlay(){
    $('.letterbox').attr('style', '');
    $('#love').attr('style', '');
  }
  function loading(obj){
    $("#overlay").show();
    // Bottom section
    $("#overlay #bottomsection .number").text('– No. 00'+obj+' -');
    $("#overlay #bottomsection").animate({"bottom":"0px"},300, "easeInQuad");
    // Close button
    $("#overlay .close").animate({"opacity":"0.6"},300, "easeInQuad");

    $("html").css("overflow-y","hidden");
    $("#overlay").addClass('loaded');
  }

  function gal(obj){
    var real = works[(works.length + 1) - obj - 1];

    var img = real.data.images[0];
    console.log(img.width >= $(window).outerWidth());
    console.log('/// Img.WIDTH >= Window ');
    console.log(img.height >= $(window).outerHeight());
    console.log('/// Img.HEIGHT >= Window ');
    function middleScreen(){
      $('.letterbox').width(img.width);
      $('.letterbox').height(img.height);
      $('.letterbox').css("margin-top", ( $('.module-piece-detail').height() -  $('.letterbox').height() ) / 2 );
    }
    var heightOK, widthOK;
    function checkFit(cont, img){
      if (cont.width() >= img.width && cont.height() >= img.height){
        console.log('Fit true!!!! ПОМЕЩАЕТСЯ');
        imageFit = true;
      } else {
        console.log('Fit false НЕТ НЕТ НЕТ НЕ ПОМЕЩАЕТСЯ!!!!');
        imageFit = false;
        if (cont.width() >= img.width){
          widthOK = true;
          console.log('ПО ШИрине ОК');
        } 
        if (cont.height() >= img.height){
          heightOK = true;
          console.log('ПО Высоте ОКОК');
        } 

      }
      return imageFit;
    }
    var height;
    var disable;
    if (checkFit( $('#overlay') , img)) {
      disable = true;
    } else {
      disable = false;
      if(widthOK){
        $('.module-piece-detail').width($(window).outerWidth());
        $('.letterbox').css('width', img.width);

      } else {
        $('.module-piece-detail').width(img.width);
        $('.letterbox').css('width', $(window).outerWidth());
        $('.letterbox').css('margin-left', '-'+(img.width - $(window).outerWidth())+'px');

      }

    }

    insane(img);
    function loadAndSpin(elem, name){
      var spinnerOptions = {
        lines: 17, // The number of lines to draw
        length: 0, // The length of each line
        width: 2, // The line thickness
        radius: 60, // The radius of the inner circle
        zIndex: 100,
        color: '#fff', // #rbg or #rrggbb
        speed: 1.3, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        top: -($(window).outerHeight()/2+70)

      };
      var target = $("#overlay")[0];
      var spinner = new Spinner(spinnerOptions).spin(target);
      function loadImg(elem, name){
        elem.html('<img class="fullimage" src="/images/works/'+name+'"/>');
            spinner.stop();
            $('.fullimage').fadeIn();
            $("#overlay .spinner").remove();
      }
      $.imageloader({
        urls: ['/images/works/'+name],
        onComplete: function(images){
         loadImg(elem, name) 
        },
        onUpdate: function(){
         loadImg(elem, name)
        }
      });
    }
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
                              //$element.html('<img class="fullimage" src="/images/works/'+img.image_name+'"/>');
                              loadAndSpin($element, img.image_name);
                            }});
                            if(disable){
                              console.log("DISABLE ALARM ALARM");
                              $( "#love" ).draggable( "disable" );
                            } else {

                              $( "#love" ).draggable( "enable" );
                            }

                            if (checkFit( $('.module-piece-detail') , img)) {
                              middleScreen();
                            } else {

                            }
    }
  }


});

