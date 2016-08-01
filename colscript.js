$(document).ready(function() {

	$( '.dropdown' ).hover(
        function(){
            $(this).children('.collect').slideDown(500);
        },
        function(){
            $(this).children('.collect').slideUp(500);
        }
    );

    //disappearing navbar
    var previousScroll = 0,
    headerOrgOffset = 10;
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

});