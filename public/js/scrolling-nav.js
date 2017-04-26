//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50 && $( window ).width() > 767) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $(".logo").addClass("logo-min");
        $(".navbar-brand").addClass("navbar-brand-min");
        $(".navbar-brand").text("Minneapolis Mayhem Rugby");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
        $(".logo").removeClass("logo-min");
        $(".navbar-brand").removeClass("navbar-brand-min");
        $(".navbar-brand").text("Minneapolis\nMayhem Rugby");
    }
});

$('#emailus').on('click', function(event){
    event.preventDefault;
    var email = 'board@mayhemrfc.com';
    var subject = 'Inquiry via website';
    window.location = 'mailto:' + email + '?subject=' + subject;
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
