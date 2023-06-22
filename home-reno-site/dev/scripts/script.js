(function ($) {

    // Slick - Sliders
    $('.banner-slides').slick({
        autoplay: false,
        autoplaySpeed: 5000,
        dots: true,
        fade: true,
        speed: 2000,
        prevArrow: `<button class="slick-prev slick-arrow" aria-label="Previous slide" type="button"><i class="fas fa-chevron-left"></i><span class="sr-only">Previous Slide</button>`,
        nextArrow: `<button class="slick-next slick-arrow" aria-label="Next slide" type="button"><i class="fas fa-chevron-right"></i><span class="sr-only">Next Slide</button>`
    });

    // Shop Room Device and In The News Sliders
    const windowWidth = $(window).width();

    // Shop Room Device
    const $shopRoomDeviceSlides = $('.shop-room-device-slides');
    const shopRoomDevicesSlideShowDestroyWidth = 450;
    const shopRoomDevicesSlideShowMQ = window.matchMedia(`(min-width: ${shopRoomDevicesSlideShowDestroyWidth}px)`);
    const shopRoomDeviceSlidesSettings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: `<button class="slick-prev slick-arrow" aria-label="Previous slide" type="button"><i class="fas fa-chevron-left"></i><span class="sr-only">Previous Slide</button>`,
        prevArrow: `<button class="slick-next slick-arrow" aria-label="Next slide" type="button"><i class="fas fa-chevron-right"></i><span class="sr-only">Next Slide</button>`,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 450,
                settings: 'unslick'
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }
    initSlick(true, false, shopRoomDevicesSlideShowDestroyWidth, $shopRoomDeviceSlides, shopRoomDeviceSlidesSettings);
    shopRoomDevicesSlideShowMQ.addListener(function (e) { initSlick(false, e.matches, shopRoomDevicesSlideShowDestroyWidth, $shopRoomDeviceSlides, shopRoomDeviceSlidesSettings) });

    // In The News
    const $inTheNewsSlides = $('.in-the-news-slides');
    const inTheNewsSlideShowDestroyWidth = 500;
    const inTheNewsSlideShowMQ = window.matchMedia(`(min-width: ${inTheNewsSlideShowDestroyWidth}px)`);
    const inTheNewsSlidesSettings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: `<button class="slick-prev slick-arrow" aria-label="Previous slide" type="button"><i class="fas fa-chevron-left"></i><span class="sr-only">Previous Slide</button>`,
        prevArrow: `<button class="slick-next slick-arrow" aria-label="Next slide" type="button"><i class="fas fa-chevron-right"></i><span class="sr-only">Next Slide</button>`,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 500,
                settings: 'unslick'
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }
    initSlick(true, false, inTheNewsSlideShowDestroyWidth, $inTheNewsSlides, inTheNewsSlidesSettings);
    inTheNewsSlideShowMQ.addListener(function (e) { initSlick(false, e.matches, inTheNewsSlideShowDestroyWidth, $inTheNewsSlides, inTheNewsSlidesSettings) });

    function initSlick(onPageLoad = true, match = false, width, slideElement, slideSettings) {
        if (onPageLoad && windowWidth > width) {
            slideElement.slick(slideSettings);
        } else if (match) {
            slideElement.slick(slideSettings);
        }
    }

    // End Slick Slide Show

    // Video Pop-Up
    const $body = $('body');
    $('#btn-cta-play').click(function () {
        $body.addClass('show-pop-up');
    });

    $('#btn-close').click(function () {
        $body.removeClass('show-pop-up');
    });

    // Mobile Nav
    const $hamburgerBtn = $('#hamburger');
    const $mainNav = $('#main-menu');

    // Add Remove Show / Hide and Animation
    // classes on the body and main navigation
    // elements
    $hamburgerBtn.click(function () {
        $body.toggleClass('show');
        $mainNav.toggleClass('activated');
    });

    // Create a media query list for screens
    // 1025px and wider
    const mqlTablet = window.matchMedia('(min-width: 1025px)');

    // Create a media query listener for the the above
    // media query list
    // - This will run the removeTransition function
    //   when the screen is 1025px or wider
    mqlTablet.addListener(removeTransition);

    // removeTransition Function:
    // A function to remove the transition
    // from the navigation when the user
    // resizes the browser to desktop
    // sizes. In this case when the
    // screen width becomes wider then
    // 1025px
    function removeTransition(e) {
        // e -> is the event object
        // e.matches -> stores a true false
        // value depending if the media query
        // list set above matches or not
        if (e.matches) {
            $body.removeClass('show');
            $mainNav.removeClass('activated');
        }
    }

    // Mousedown event on the hamburger button
    // - This is to prevent the focus styles
    //   from appearing if the button was 
    //   clicked.
    // - The focus styles are retained if the
    //   user keyboard "tabs" into the button
    $hamburgerBtn.mousedown(function (e) {
        e.preventDefault();
    });


})(jQuery);

/* 

// Responsive Menu - Dropdown
const body = document.body;
const menu = document.getElementById('menu');
const nav = document.getElementById('main-navigation');

// Below code for preventing nav from animating on 
// browser re-size modified from code found at
// this stackoverflow question and answer:
//
// https://goo.gl/6s3pAZ
menu.addEventListener('click', openMenu);

function openMenu(){
    body.classList.toggle('show');
    nav.classList.add('activated');
}

// Media Query Event Listener
// - This is used to remove the "activated"
// class from the navigation when the user
// resizes the browser

// Create a media query list using
// matchMedia
const mql = window.matchMedia('(min-width: 560px)');

// Add a Media Query Listener to the 
// above media query list
mql.addListener(removeTransition);

// Function to remove the transition
// from the navigation when the user
// resizes the browser to desktop
// sizes. In this case when the
// screen width becomes wider then
// 560px
function removeTransition(e){
    // e -> is the event object
    // e.matches -> stores a true false
    // value depending if the media query
    // list set above matches or not
    if(e.matches){
        body.classList.remove('show');
        nav.classList.remove('activated');
    }
}

// Prevents the focus state from activating
menu.addEventListener('mousedown', function(e){
    e.preventDefault();
});


*/