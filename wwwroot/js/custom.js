$(document).ready(function () {
    $('#otp').modal();

    /* countdown */
    var target = $("#countdown").attr('data-target');

    var current_time = Date.parse(new Date());
    var deadline = new Date(current_time + parseInt(target));

    $('.clock').countdown(deadline, function (event) {
        $(this).text(
            event.strftime('%M:%S')
        );
    });


    var $carousel = $('#rewardSlider');

    var settings = {
        dots: false,
        arrows: false,
        slide: 'a',
        slidesToShow: 2,
        centerMode: true,
        centerPadding: '40px',
        autoplay: 1,
        responsive: [
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '4%',
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '40%',
                }
            },
            {
                breakpoint: 380,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '33%',
                }
            }
        ]
    };

    function setSlideVisibility() {
        //Find the visible slides i.e. where aria-hidden="false"
        var visibleSlides = $carousel.find('.slick-slideshow__slide[aria-hidden="false"]');
        //Make sure all of the visible slides have an opacity of 1
        $(visibleSlides).each(function () {
            $(this).css('opacity', 1);
        });

        //Set the opacity of the first and last partial slides.
        $(visibleSlides).first().prev().css('opacity', 0);
    }

    $carousel.slick(settings);
    $carousel.slick('slickGoTo', 1);
    setSlideVisibility();

    $carousel.on('afterChange', function () {
        setSlideVisibility();
    });



    $(".scroll-down").on('click', function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: $(document).height() - $(window).height() });
    })

});