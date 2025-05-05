(function($){
    // Fonction d'ajustement du carousel (unique)
    function adjustCarouselHeight() {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var newHeight;

        if (windowWidth >= 992) {
            newHeight = '80vh';
        } else if (windowWidth >= 768) {
            newHeight = '60vh';
        } else if (windowWidth >= 480) {
            newHeight = '50vh';
        } else {
            newHeight = windowHeight * 0.6 + 'px'; // Petits écrans
        }

        $('#bannerCarousel, #bannerCarousel .item').css('height', newHeight);
        $('#bannerCarousel .item img').css({
            'width': '100%',
            'height': '100%',
            'object-fit': 'cover',
            'object-position': 'center'
        });
    }

    // Fonction d'initialisation des carousels
    function initCarousels() {
        $('#quote-carousel, #bannerCarousel, .carousel').carousel({
            pause: true,
            interval: 4000
        });
    }

    // DOM Ready
    $(document).ready(function() {
        // Fixed header
        $(window).on('scroll', function() {
            if ($(".header.fixed").length && $(window).width() > 767) {
                $("body").toggleClass("fixed-header-on", $(this).scrollTop() > 0);
            }
        });

        // Scrollspy
        if ($(".scrollspy").length > 0) {
            $("body").addClass("scroll-spy").scrollspy({ 
                target: '.scrollspy',
                offset: 152
            });
        }

        // Smooth Scroll (générique)
        $('a[href*="#"]:not([href="#"])').on('click', function(e) {
            const target = $(this.hash);
            if (target.length) {
                e.preventDefault();
                $('html,body').animate({
                    scrollTop: target.offset().top - 70
                }, 600);
            }
        });

        // Animation au scroll (non tactile)
        if ($("[data-animation-effect]").length > 0 && !Modernizr.touch) {
            $("[data-animation-effect]").each(function() {
                const $this = $(this);
                const effect = $this.attr("data-animation-effect");
                if (Modernizr.mq('only all and (min-width: 768px)') && Modernizr.csstransitions) {
                    $this.appear(function() {
                        setTimeout(() => {
                            $this.addClass('animated object-visible ' + effect);
                        }, 400);
                    }, {accX: 0, accY: -130});
                } else {
                    $this.addClass('object-visible');
                }
            });
        }

        // Isotope
        if ($('.isotope-container').length > 0) {
            const $container = $('.isotope-container').fadeIn().isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'masonry',
                transitionDuration: '0.6s'
            });
            $('.filters').on('click', 'ul.nav li a', function(e) {
                e.preventDefault();
                $(".filters li").removeClass("active");
                $(this).parent().addClass("active");
                $container.isotope({ filter: $(this).data('filter') });
            });
        }

        // Modal dans <body>
        $(".modal").prependTo("body");

        // Menu mobile : fermeture après clic
        $('.navbar-nav a').click(function() {
            if ($(window).width() < 992) {
                $('.navbar-collapse').collapse('hide');
            }
        });

        // Navigation AJAX (si contenu partiel)
        $('.navbar-nav a').on('click', function(e) {
            const url = $(this).attr('href');
            if (url.startsWith('#') || url.includes('mailto:') || url.includes('tel:')) return;

            e.preventDefault();
            $('#content-container').load(url + ' #main-content', function() {
                history.pushState(null, null, url);
                $('.navbar-nav li').removeClass('active');
                $(`.navbar-nav a[href="${url}"]`).parent().addClass('active');
                initCarousels(); // Réinitialise les composants
            });
        });

        // Gestion retour/avant
        $(window).on('popstate', function() {
            $('#content-container').load(location.pathname + ' #main-content', initCarousels);
        });

        // Premier ajustement et initialisation
        adjustCarouselHeight();
        initCarousels();
    });

    // Resize avec debounce
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            adjustCarouselHeight();
            $('#bannerCarousel').carousel('pause').carousel('next');
        }, 250);
    });

    // Load (ex: après image ou police)
    $(window).on('load', function() {
        adjustCarouselHeight();
        initCarousels();
    });

})(jQuery);
