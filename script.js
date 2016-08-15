$(document).ready(function() {
	// $("nav").fadeIn("slow");
	// $(".title").fadeIn("slow");
	$("#scroll").slideDown("slow");

	$( '.dropdown' ).hover(
        function(){
            $(this).children('.collect').slideDown(500);
        },
        function(){
            $(this).children('.collect').slideUp(500);
        }
    );
    //hover highlight
    $('.collection').hover(
        function() {
            var index = $(this).index();
            var width = $(".scrolly").get(0).scrollWidth;
            $(this).children('.overlay').css("width",width+"px");
            $(this).children('.overlay').fadeIn(500);
            $(this).children('.overlay2').fadeIn(500);
            var scroll = $(this).scrollLeft();
            if (scroll === 0) {
                $(this).children('.overlay2').children('div').fadeIn(500);
            }
        },
        function() {
            $(this).children('.overlay').fadeOut(500);
            $(this).children('.overlay2').fadeOut(500);
        }
    );

    var left = $('.collection').width();

    $('.collection').scroll(function() {
        var scroll = $(this).scrollLeft();
        var together = left+scroll;
        $(this).children('.overlay2').children('h2').css("left", scroll + "px");

        // console.log($(this).children('.overlay').width());
        // if (together < $(this).children('.overlay').width()) {
        // $(this).children('.overlay2').children('div').css("left", together + "px");}
        $(this).children('.overlay').fadeOut(500);
        if (scroll != 0) {$(this).children('.overlay2').children('div').fadeOut(500);}
    });
    // resize images to make width and height equal
    $(window).resize(function(){
        // If there are multiple elements with the same class, "main"
        $('.row img').each(function() {
            $(this).height($(this).width());
        });
        $('.row').height($('.row img').width());
        $('.pano img').each(function() {
            $(this).height($(this).width()/3.5);
        });
        $('.pano').height($('.pano img').width()/3.5);

    }).resize();

    //disappearing navbar
    var previousScroll = 0,
    headerOrgOffset = $('#header').height();
    $(window).scroll(function () {
        var currentScroll = $(this).scrollTop();
        if (currentScroll > headerOrgOffset) {
            if (currentScroll > previousScroll) {
                //$('#header').removeClass("sticky");
                $('#header').css("opacity", 0);
                $('#header').css("transform", "translateY(-10px)");
            } else {
                // $('#header').addClass("sticky");
                $('#header').css("opacity", 0.6);
                $('#header').css("transform", "translateY(0)");
            }
        } else {
                // $('#header').addClass("sticky");
                $('#header').css("opacity", 0.6);
                $('#header').css("transform", "translateY(0)");
        }
        previousScroll = currentScroll;
    });
    var slideNum,size,current;
    //lightbox effect
    $('.lightboxTrigger').click(function(e) {
        e.preventDefault();
        $('#header').css("opacity", 0);
        $('#header').css("transform", "translateY(-100%)");
        var image_href = $(this).attr("href");

        if ($('#lightbox').length > 0) { // #lightbox exists
            
            //insert img tag with clicked link's href as src value
            $('#content').html('<img src="' + image_href + '" />');

            // center lightbox image
            var maxheightvalue = $("#lightbox").height() - 80;
            $("#lightbox img").css("max-height", maxheightvalue + "px");
            var pano = $(this).parent().hasClass('pano');
            if (pano) {
                var imgheight = $(this).children().height();
                $("#lightbox img").css("margin-top", (maxheightvalue - imgheight)/2) + "px";
                var w = $(window).width();
                $("#lightbox img").css("max-width", w - 50 + "px");
                $(".prev,.next").css("top", "95%");
            } else {
                $("#lightbox img").css("margin-top", 55 + "px");
                $("#lightbox img").css("max-width", "");
                $(".prev,.next").css("top", "50%");
            }
            //show lightbox window - you can use a transition here if you want, i.e. .show('fast')
            $('#lightbox').fadeIn(400);
            $('body').addClass("stop-scroll");
        }
        else { //#lightbox does not exist 
            
            //create HTML markup for lightbox window
            var lightbox = 
            '<div id="lightbox" style="display: none">' +
                '<button class="x"></button>' +
                '<div id="content">' + //insert clicked link's href into img src
                    '<img src="' + image_href +'" />' +
                '</div>' +  
                '<div class="nav">' +
                    '<a href="#prev" class="prev slide-nav"></a>' +
                    '<a href="#next" class="next slide-nav"></a>' +
                '</div>' +
            '</div>';

            //insert lightbox HTML into page
            $('body').append(lightbox);

            $('#lightbox').fadeIn(400);
            $('body').addClass("stop-scroll");

            $('body').on('click', '#lightbox', function() {
                $('body').removeClass("stop-scroll");
                $('#lightbox').fadeOut(300);
            });
            $(document).keyup(function(e) {
                if (e.keyCode == 27) { 
                    $('body').removeClass("stop-scroll");
                    $('#lightbox').fadeOut(300);
                }
            });
            // center lightbox image
            var maxheightvalue = $("#lightbox").height() - 80;
            $("#lightbox img").css("max-height", maxheightvalue + "px");
            var pano = $(this).parent().hasClass('pano');
            if (pano) {
                var imgheight = $(this).children().height();
                $("#lightbox img").css("margin-top", (maxheightvalue - imgheight)/2) + "px";
                var w = $(window).width();
                $("#lightbox img").css("max-width", w - 50 + "px");
                $(".prev,.next").css("top", "95%");
            } else {
                $("#lightbox img").css("margin-top", 55 + "px");
                $("#lightbox img").css("max-width", "");
                $(".prev,.next").css("top", "50%");
            }
        }
        current = $('.lightboxTrigger').index(this);
    });
    // navigation prev/next
    size = $('.lightboxTrigger').length;

    $('body').on('click', '.slide-nav', function(e) {
      // prevent default click event, and prevent event bubbling to prevent lightbox from closing
      e.preventDefault();
      e.stopPropagation();
      var dest;

      // looking for .prev
      if ($(this).hasClass('prev')) {
        dest = current - 1;
        if (dest < 0) {
          dest = size - 1;
        }
      } else {
        // in absence of .prev, assume .next
        dest = current + 1;
        if (dest > size - 1) {
          dest = 0;
        }
      }
      var image_href = $('.lightboxTrigger').eq(dest).attr("href");
      // fadeOut curent slide, FadeIn next/prev slide
      $('#lightbox img').remove();
      var newImg = '<img src="' + image_href +'" />';
      $('#content').append(newImg);
        
      // center lightbox image for pano
      var maxheightvalue = $("#lightbox").height() - 80;
      $("#lightbox img").css("max-height", maxheightvalue + "px");
      var pano = $('.lightboxTrigger').eq(dest).parent().hasClass('pano');
      if (pano) {
          var imgheight = $('.cover').eq(dest).height();
          $("#lightbox img").css("margin-top", (maxheightvalue - imgheight)/2) + "px";
          var w = $(window).width();
          $("#lightbox img").css("max-width", w - 50 + "px");
          $(".prev,.next").css("top", "95%");
      } else {
                $("#lightbox img").css("margin-top", 55 + "px");
                $("#lightbox img").css("max-width", "");
                $(".prev,.next").css("top", "50%");
      }

      // update current slide
      current = dest;
    });


     /******************* Load More **********************/
    $(function () {
        if(document.title != "Iguazu") { 
            $("div.row").slice(0, 4).show();
        } else {
            $("div.pano").slice(0, 3).show();
        }
        $('.row img').each(function() {
            $(this).height($(this).width());
        });
        $('.row').height($('.row img').width());
        $('.pano img').each(function() {
            $(this).height($(this).width()/3.5);
        });
        $('.pano').height($('.pano img').width()/3.5);

        $("#loadMore").on('click', function (e) {
            e.preventDefault();
            $("div:hidden").slice(0, 4).slideDown();
            $('.row').height($('.pano img').width()/3.5);
            $('.row img').each(function() {
                $(this).height($(this).width());
                // $('div.row').height($(this).width());
            });
            if (document.title != "Iguazu") {
                $('div.row').height($('.row img').width());
            } else {
                $('div.row').height($('.pano img').width()/3.5 + 5);
            }
            $('.pano img').each(function() {
                $(this).height($(this).width()/3.5);
            });
            $('.pano').height($('.pano img').width()/3.5);
            if ($("div:hidden").length == 0) {
                $("#loadMore").fadeOut('slow');
            }
        });
    });


    // Load more - to be decided if need later
    /*var imgs = [
    "../img/buenos/DSC01334.JPG", "../img/buenos/DSC01334.JPG", "../img/buenos/DSC01334.JPG", "../img/buenos/DSC01318.JPG"
    ];

    $("#load-more").click(function(){
        var index = $('.lightboxTrigger').length;
        // if(index >= imgs.length ){
        //  $(this).remove();
        //  return;
        // }
        var href1 = imgs[index];
        var href2 = imgs[++index];
        var href3 = imgs[++index];
        var template = 
        '<div class="row">' +
            '<a href="' + href1 + '" style="display:none;">' +
                '<img src="' + href1 + '" class="cover">' +
            '</a>' +
            '<a href="' + href2 + '" style="display:none;">' +
                '<img src="' + href2 + '" class="cover">' +
            '</a>' +
            '<a href="' + href3 + '" style="display:none;">' +
                '<img src="' + href3 + '" class="cover">' +
            '</a>' +
        '</div>';

        var row = $('body').append(template);
        var a = row.children().children().addClass("lightboxTrigger");
        var x = (index + 3 <= imgs.length) ? x + 3 : imgs.length;
        $('.row a:lt('+x+')').show();
    });*/


    //preloading

    // number of loaded images for preloader progress
    var loadedCount = 0; //current number of images loaded
    var imagesToLoad = $('.il').length + $('img').length;
    var loadingProgress = 0; //timeline progress - starts at 0

    $('.full-page').imagesLoaded({
        background: '.il'
    }).progress( function( instance, image ) {
        loadProgress();
    });

    $('body').imagesLoaded().progress(function( instance, image ) {
        loadProgress();
    });

    function loadProgress(imgLoad, image) {
        //one more image has been loaded
        loadedCount++;
        loadingProgress = (loadedCount/imagesToLoad);
        // GSAP tween of our progress bar timeline
        TweenLite.to(progressTl, 0.7, {progress:loadingProgress, ease:Linear.easeNone}); 
    }

    //progress timeline
    var progressTl = new TimelineMax({
        paused: true,
        onUpdate: progressUpdate,
        onComplete: loadComplete
    });

    progressTl
        //tween the progress bar width
        .to($('.progress span'), 1, {width:120, ease:Linear.easeNone});
     
    //as the progress bar width updates and grows we put the percentage loaded in the screen
    function progressUpdate() {
        //the percentage loaded based on the tween's progress
        loadingProgress = Math.round(progressTl.progress() * 100);
        //we put the percentage in the screen
        $(".txt-perc").text(loadingProgress + '%');
    }

    function loadComplete() {
        // preloader out
        var preloaderOutTl = new TimelineMax();
     
        preloaderOutTl
            .to($('.progress'), 0.5, {y: 100, autoAlpha: 0, ease:Back.easeIn})
            .to($('.txt-perc'), 0.5, {y: 100, autoAlpha: 0, ease:Back.easeIn}, 0.1)
            .set($('body'), {className: '-=loading'})
            .to($('#preloader'), 0.7, {yPercent: 100, ease:Power3.easeInOut})
            .set($('#preloader'), {className: '+=is-hidden'})
            .fromTo($('#page-1'), 3.8, {scale:1.05}, {scale:1, ease:Power0.easeNone})
            .staggerFrom(['#titletext', '#subtitle'], 2.3, {y: 25, autoAlpha: 0, ease:Power1.easeNone}, 1.5, 2.2)
            .from($('#header'), 1.5, {y:-10, opacity:0, ease:Power1.easeIn}, 1.2);

        return preloaderOutTl;
    }

    // scroll animations and functions
	vpw = $(window).width();
    vph = $(window).height();

    $('.full-page').height(vph);
    $('.strip').height(vph*0.6);
    // var video = $("#video");
    // video.height(vph*0.5);
    // video.width(vpw*0.7);
    $('.parallax-page1').height(vph*1.1);
    $('.parallax-page').height(vph*1.15);
    $('.parallax-page2').width(vpw*1.1);
    $('#footer').height(vph*0.1);

    // disable horiz scroll
    var $body = $(document);
    $body.bind('scroll', function() {
        // "Disable" the horizontal scroll.
        if ($body.scrollLeft() !== 0) {
            $body.scrollLeft(0);
        }
    });

    // init scrollmagic
    var controller = new ScrollMagic.Controller();

    // change behaviour of controller to animate scroll instead of jump
    controller.scrollTo(function (newpos) {
        TweenMax.to(window, 1.5, {scrollTo: {y: newpos}, ease:Power1.easeInOut});
    });

    //  bind scroll to anchor links
    $(document).on("click", "a[href^='#']", function (e) {
        var id = $(this).attr("href");
        if (id.length > 0) {
            e.preventDefault();
     
            // trigger scroll
            controller.scrollTo(id);
     
            // if supported by the browser we can even update the URL.
            if (window.history && window.history.pushState) {
                history.pushState("", document.title, id);
            }
        }
    });
    /************************ video ***************************************/
    var vid = document.getElementById("bgvid"); 
    var stopPlayAt = 225, 
        textFade = 221,
      stopPlayTimer;
    var tag = document.createElement("script");
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player("bgvid", {
          "videoId": "nn4qVbWC-vk",
          "events": {
            "onReady": onPlayerReady,
            "onStateChange": onPlayerStateChange
          }
        });
    }
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    function onPlayerStateChange(event) {
        var time, rate, remainingTime;
        clearTimeout(stopPlayTimer);
        clearTimeout()
        // if (player.getCurrentTime >= stopPlayAt) {
        //     player.pauseVideo();
        // }
        // if (player.getCurrentTime >= textFade) {
        //     $("#travel").fadeIn(1000);
        //     $("#video-skip").fadeOut(1000);
        // }
        if (event.data == YT.PlayerState.PLAYING) {
          time = player.getCurrentTime();
          // Add .4 of a second to the time in case it's close to the current time
          // (The API kept returning ~9.7 when hitting play after stopping at 10s)
          if (time < stopPlayAt) {
            rate = player.getPlaybackRate();
            remainingTime = (stopPlayAt - time) / rate;
            stopPlayTimer = setTimeout(pauseVideo, remainingTime * 1000);
          }
          if (time < textFade) {
            rate = player.getPlaybackRate();
            remainingTime = (textFade - time) / rate;
            stopPlayTimer = setTimeout(textFadeIn, remainingTime * 1000);
          }        
        }
      }
    function pauseVideo() {
        player.pauseVideo();
    }
    function textFadeIn() {
        $("#travel").fadeIn(1000);
        $("#video-skip").fadeOut(1000);
    }

    // $("#travel").delay(221000).fadeIn(1000);
    // $("#video-skip").delay(221000).fadeOut(1000);

    /************************ page1 scene ***************************************/

    // parallax
    var parallaxScene = new ScrollMagic.Scene({
        triggerElement: '#page-1',
        offset: 5,
        triggerHook: 0,
        duration: "20%"
    })
    .setTween(TweenMax.from('#page-1', 1, {y: '-8%', ease:Power0.easeNone}))
    .addTo(controller);

    //pin
    var pin = new ScrollMagic.Scene({
        triggerElement: '#page-1',
        offset: 0.6*vph,
        triggerHook: 0,
    })
    .setPin('#page-1')
    .addTo(controller);

    // fade out text
    var fadeout = new ScrollMagic.Scene({
        triggerElement: '#page-2',
        triggerHook: 0.9,
    })
    .setTween(TweenMax.to('#titletext', 1, {y: '-90%', autoAlpha: 0, ease:Power1.easeIn}))
    .addTo(controller);

    /************************ welcome scene ***************************************/

    var page2 = new ScrollMagic.Scene({
        triggerElement: '#page-2',
        triggerHook: 0.6,
        duration: vph*0.6
    })
    .setClassToggle('#headtext', 'fade')
    .addTo(controller);
    var page2 = new ScrollMagic.Scene({
        triggerElement: '#page-2',
        triggerHook: 0.5,
        duration: vph*0.6
    })
    .setClassToggle('#video-link', 'fade')
    .addTo(controller);


    /************************ aboutme scene ***************************************/
    var aboutme = new ScrollMagic.Scene({
        triggerElement: '#info',
        triggerHook: 0.8,
        /*duration: vph*0.6*/
    })
    .setClassToggle('#info', 'fade')
    .addTo(controller);

    // parallax
    var parallaxScene2 = new ScrollMagic.Scene({
        triggerElement: '#about-me',
        offset: -vph*0.2,
        triggerHook: 0,
        duration: "40%"
    })
    .setTween(TweenMax.from('#about-me', 2, {y: '-15%', ease:Power0.easeNone}))
    .addTo(controller);

    //pin
    var pin2 = new ScrollMagic.Scene({
        triggerElement: '#about-me',
        offset: 0.8*vph,
        triggerHook: 0,
    })
    .setPin('#about-me')
    .addTo(controller);


    /************************ collections scene ***************************************/
    $('.collection-image').each(function(index) {
        var collect = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.5 + index*0.2,
        })
        .setClassToggle(this, 'fade')
        .addTo(controller);
    });

    var colTitle = new ScrollMagic.Scene({
        triggerElement: '#collections',
        triggerHook: 0.7
    })
    .setClassToggle('#coltitle', 'fade')
    .addTo(controller);

    var colView = new ScrollMagic.Scene({
        triggerElement: '#view',
        triggerHook: 1,
        offset: 15
    })
    .setClassToggle('#view', 'fade')
    .addTo(controller);

    var pinCol = new ScrollMagic.Scene({
        triggerElement: '#projects',
        offset: 300,
        duration: "10%"
    })
    .setPin("#collections", {pushFollowers: false})
    .addTo(controller);

    // on hover, show descriptions
    $('.collection-image').hover(
        function() {$(this).children().addClass('hover-box');},
        function() {$(this).children().removeClass('hover-box');}
    );

    /************************ projects scene ***************************************/
    var projects = new ScrollMagic.Scene({
        triggerElement: '#projects',
    })
    .setClassToggle('#projects .title, #projects p', 'fade')
    .addTo(controller);

    var tl = new TimelineMax();
    tl
        .from('#projects', 3, {x: '-5%', ease:Power1.easeInOut})
        .to('#projects .title', 2, {x: '-85%', ease:Power1.easeInOut}, 0)
        .to('#projects p:nth-child(2)', 2, {x: '-70%', ease:Power1.easeInOut}, 0)
        .to('#projects p:nth-child(3)', 2, {x: '-77%', ease:Power1.easeInOut}, 0);

    // parallax to scroll horizontally
    var parallaxScene = new ScrollMagic.Scene({
        triggerElement: '#projects',
        triggerHook: 0,
        duration: "20%"
    })
    .setPin("#projects", {pushFollowers: true})
    .setTween(tl)
    .addTo(controller);


});


