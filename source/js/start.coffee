lang = "/"
jQuery ->
  mobile = ->
    jQuery.browser.mobile
  reset = ->
    $("body").removeClass "about"
    $("body").removeClass "ru_about"
    $("#works").hide()
    $("#about_us").hide()
    $("#about_us").css opacity: 0

  loading = (obj) ->
    $("#overlay").show()
    
    # Bottom section
    $("#overlay #bottomsection .number").text "– No. 00" + obj + " -"
    $("#overlay #bottomsection").animate
      bottom: "0px"
    , 300, "easeInQuad"
    # Close button
    $("#overlay .close").animate
      opacity: "0.6"
    , 300, "easeInQuad"

    $("html").css "overflow-y","hidden"
    $("#overlay").addClass 'loaded'


  gal = (obj) ->
    real = works[(works.length + 1) - obj - 1]
    img = real.data.images[0]

    middleScreen = ->
      $(".letterbox").width img.width
      $(".letterbox").height img.height
      $(".letterbox").css "margin-top",
        ($(".module-piece-detail").height() - $(".letterbox").height()) / 2
    heightOK = undefined
    widthOK = undefined
    height = undefined
    disable = undefined
    
    checkFit = (cont, img) ->
      if cont.width() >= img.width and cont.height() >= img.height
        imageFit = true
      else
        imageFit = false
        widthOK = true  if cont.width() >= img.width
        heightOK = true  if cont.height() >= img.height
      imageFit
    if checkFit($("#overlay"), img)
      disable = true
    else
      disable = false
      if widthOK
        $(".module-piece-detail").width $(window).outerWidth()
        $(".letterbox").css "width", img.width
      else
        $(".module-piece-detail").width img.width
        $(".letterbox").css "width", $(window).outerWidth()
        $(".letterbox").css "margin-left", "-" + (img.width - $(window).outerWidth()) + "px"

    loadAndSpin = (elem, name) ->
      console.log('loadandspin')
      
      # The number of lines to draw
      # The length of each line
      # The line thickness
      # The radius of the inner circle
      # #rbg or #rrggbb
      # Rounds per second
      # Afterglow percentage
      # Whether to render a shadow
      loadImg = (elem, name) ->
        console.log('loadIMg')
        elem.html "<img class='fullimage' src='/images/works/#{name}'/>"
        spinner.stop()
        $(".fullimage").fadeIn()
        $("#overlay .spinner").remove()
        true
      spinnerOptions =
        lines: 17
        length: 0
        width: 2
        radius: 60
        zIndex: 100
        color: "#fff"
        speed: 1.3
        trail: 60
        shadow: false
        top: -($(window).outerHeight() / 2 + 70)
      target = $("#overlay")[0]
      spinner = new Spinner(spinnerOptions).spin(target)
      $.imageloader
        urls: ["/images/works/" + name]
        onComplete: (images) ->
          loadImg elem, name

        onUpdate: ->
          loadImg elem, name

    insane = (img) ->
      console.log 'insane'

      jQuery.infinitedrag "#love",
        axis: img.axis
      ,
        width: img.width
        height: img.height
        start_col: 0
        start_row: 0
        range_row: [parseInt(img.range_row.split(",")[0], 10), parseInt(img.range_row.split(",")[1], 10)]
        range_col: [parseInt(img.range_col.split(",")[0], 10), parseInt(img.range_col.split(",")[1], 10)]
        oncreate: ($element, col, row) ->
          loadAndSpin $element, img.image_name
          
      if disable
        $("#love").draggable "disable"
      else
        $("#love").draggable "enable"
      if checkFit($(".module-piece-detail"), img)
        middleScreen()
      #else
    #real = works[(works.length + 1) - obj - 1]
    #img = real.data.images[0]
    #heightOK = undefined
    #widthOK = undefined
    #height = undefined
    #disable = undefined
    #if checkFit($("#overlay"), img)
      #disable = true
    #else
      #disable = false
    #if widthOK
      #$(".module-piece-detail").width $(window).outerWidth()
      #$(".letterbox").css "width", img.width
    #else
      #$(".module-piece-detail").width img.width
      #$(".letterbox").css "width", $(window).outerWidth()
      #$(".letterbox").css "margin-left",
      # "-" + (img.width - $(window).outerWidth()) + "px"
    #insane img

    insane img
  load_main = ->
    if lang is "/ru"
      $("#page_switch").text("о нас").attr "href", "/ru/about.html"
    else
      $("#page_switch").text("about us").attr "href", "about.html"

    if $("#works #works_content").html().trim() is ""
      cardTemplate = $("#cardTemplate").html()
      $(works).each (index) ->
        w = @data
        template = cardTemplate.format(works.length - index, w.title,
          w.preview.image_name, w.preview.width, w.preview.height)
        $("#works #works_content").append template

    $("img.lazy").show().lazyload
      effect: "fadeIn"
      threshold: 200

    $("#works").show()
    
    # Trigger scroll to work lazyload
    $("body").trigger "scroll"

  # loading page first route
  enableonpopstate = ->
    window.onpopstate = (event) ->
      router.navigate window.location.pathname
  router = new Router()
  router.route "*lang/about.html", (lang) ->
    $("body").addClass "about"
    $("#works").hide()
    $("#about_us").css display: "block"
    document.body.scrollTop = document.documentElement.scrollTop = 0
    $("#about_us").animate
      opacity: 1
    , 800, "easeInQuart"
    if lang is "/ru"
      $("#page_switch").text("назад к галлерее работ").attr "href", "/ru/"
    else
      $("#page_switch").text("back to works").attr "href", "/"
  router.route "*lang/gallery/pixelart_:id.html", (lang, id) ->
    if +id is 1
      $("#prev-image").addClass "disabled"
    else
      $("#prev-image.disabled").removeClass "disabled"
    if +id is works.length
      $("#next-image").addClass "disabled"
    else
      $("#next-image.disabled").removeClass "disabled"
    reset()
    load_main()
    loading parseInt(id, 10)
    gal parseInt(id, 10)
  switch_lang = (lang) ->
    if lang is "/ru"
      $("#top_nav .lang_icon").removeClass("ru")
        .addClass('en').attr "href", "/"
    else
      $("#top_nav .lang_icon").removeClass("en")
        .addClass('ru').attr "href", "/ru/"
  
  router.route "/", ->
    $("body").addClass "eng"
    switch_lang("/en")
    reset()
    console.log 'main'
    load_main()
  router.route "/ru/", ->
    lang = "/ru"
    switch_lang(lang)
    $("body").addClass "ru"
    reset()
    load_main()

  if mobile()
    router.navigate "/about.html"  if window.location.pathname is "/"
    router.checkRoutes History.getState()
  else
    router.checkRoutes History.getState()
  enableonpopstate()
  router.navigate window.location.pathname 
  # Hightlight close button
  # 1/5
  #($ '#overlay a.close').mouseover ->
    #($ @).animate({'opacity':1}, 100, 'easeInQuad')
      #.mouseout ->
        #($ @).animate({'opacity':0.6}, 100, 'easeInQuad')

  resetOverlay = ->
    $(".letterbox").attr "style", ""
    $("#love").attr "style", ""

  closeOverlay = ->
    $("#overlay").animate
      top: "-100%", 400, "easeInQuad", ->
        $("#overlay").attr "style", ""
        $(".module-piece-detail").attr "style", ""
        resetOverlay()
        $("#overlay #bottomsection").attr "style", ""
        $("#overlay .close").attr "style", ""

    
  $("body").delegate "#page_switch", "click", (e) ->
    e.preventDefault()
    router.navigate ($ @).attr("href")

  $("body").delegate "#overlay a.close", "click", ->
    closeOverlay()
    $("#love").empty()
    $("html").css("overflow-y", "scroll")
    router.navigate lang

  $("body").delegate ".cari a", "click", (e) ->
    e.preventDefault()
    History.pushState null, null, lang + "/gallery/pixelart_" + (parseInt(($ @).data("index"), 10)) + ".html"

  $("body").delegate "#next-image:not(.disabled)", "click", (e) ->
    e.preventDefault()
    a = /gallery\/pixelart_(\d+)\.html/.exec(window.location.pathname)
    resetOverlay()
    History.pushState null, null, lang + "/gallery/pixelart_" + (parseInt(a[1], 10) + 1) + ".html"

  $("body").delegate "#prev-image:not(.disabled)", "click", (e) ->
    e.preventDefault()
    a = /gallery\/pixelart_(\d+)\.html/.exec(window.location.pathname)
    
    #$("#overlay a.close").trigger("click");
    resetOverlay()
    History.pushState null, null, lang + "/gallery/pixelart_" + (parseInt(a[1], 10) - 1) + ".html"
  
