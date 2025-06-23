(function($){
    $(document).ready(function(){
    
        // Fixed header
        $(window).scroll(function() {
            if ($(".header.fixed").length > 0) { 
                if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
                    $("body").addClass("fixed-header-on");
                } else {
                    $("body").removeClass("fixed-header-on");
                }
            }
        });

        $(window).load(function() {
            if ($(".header.fixed").length > 0) { 
                if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
                    $("body").addClass("fixed-header-on");
                } else {
                    $("body").removeClass("fixed-header-on");
                }
            }
            
            // Ajustement initial du carousel
            adjustCarouselHeight();
            
            // Initialiser les carousels
            initCarousels();
        });
        
        // Initialisation des carousels
        function initCarousels() {
            $('#quote-carousel, #bannerCarousel').carousel({
                pause: true,
                interval: 4000
            });
        }

        //Scroll Spy
        if($(".scrollspy").length>0) {
            $("body").addClass("scroll-spy");
            $('body').scrollspy({ 
                target: '.scrollspy',
                offset: 152
            });
        }

        //Smooth Scroll
        if ($(".smooth-scroll").length>0) {
            $('.smooth-scroll a[href*=#]:not([href=#]), a[href*=#]:not([href=#]).smooth-scroll').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top-151
                        }, 1000);
                        return false;
                    }
                }
            });
        }

        // Animations
        if (($("[data-animation-effect]").length>0) && !Modernizr.touch) {
            $("[data-animation-effect]").each(function() {
                var $this = $(this),
                animationEffect = $this.attr("data-animation-effect");
                if(Modernizr.mq('only all and (min-width: 768px)') && Modernizr.csstransitions) {
                    $this.appear(function() {
                        setTimeout(function() {
                            $this.addClass('animated object-visible ' + animationEffect);
                        }, 400);
                    }, {accX: 0, accY: -130});
                } else {
                    $this.addClass('object-visible');
                }
            });
        };

        // Isotope filters
        if ($('.isotope-container').length>0) {
            $('.isotope-container').fadeIn();
            var $container = $('.isotope-container').isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'masonry',
                transitionDuration: '0.6s',
                filter: "*"
            });
            // filter items on button click
            $('.filters').on( 'click', 'ul.nav li a', function() {
                var filterValue = $(this).attr('data-filter');
                $(".filters").find("li.active").removeClass("active");
                $(this).parent().addClass("active");
                $container.isotope({ filter: filterValue });
                return false;
            });
        };

        //Modal
        if($(".modal").length>0) {
            $(".modal").each(function() {
                $(".modal").prependTo( "body" );
            });
        }

        // Gestion du redimensionnement avec debounce
        var resizeTimer;
        $(window).resize(function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                adjustCarouselHeight();
                $('#bannerCarousel').carousel('pause').carousel('next');
            }, 250);
        });
    });
    
    // Fonction d'ajustement du carousel
    function adjustCarouselHeight() {
        // Désactiver temporairement les transitions
        $('#bannerCarousel').css('transition', 'none');
        
        // Déterminer la hauteur en fonction de la largeur
        var windowWidth = $(window).width();
        var newHeight;
        
        if (windowWidth >= 992) {
            newHeight = '80vh'; // Desktop
        } else if (windowWidth >= 768) {
            newHeight = '60vh'; // Tablette paysage
        } else if (windowWidth >= 480) {
            newHeight = '50vh'; // Tablette portrait/grands mobiles
        } else {
            newHeight = '40vh'; // Petits mobiles
        }
        
        // Appliquer la nouvelle hauteur
        $('#bannerCarousel, #bannerCarousel .item').css('height', newHeight);
        
        // Ajuster les images
        $('#bannerCarousel .item img').css({
            'width': '100%',
            'height': '100%',
            'object-fit': 'cover',
            'object-position': 'center'
        });
        
        // Réactiver les transitions après un court délai
        setTimeout(function() {
            $('#bannerCarousel').css('transition', '');
        }, 50);
    }
})(jQuery);