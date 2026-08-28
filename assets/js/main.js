
(function ($) {
    "use strict";


    /*======================================
        Preloader activation
    ========================================*/

    $(".cp-primary-btn .btn-text").each(function () {
        const $el = $(this);
        const text = $el.data("text");

        $el.empty();

        text.split("").forEach((char) => {
            const $span = $("<span>");

            if (char === " ") {
                $span.addClass("space");
                $span.html("&nbsp;");
            } else {
                $span.text(char);
            }

            $el.append($span);
        });

        const $letters = $el.find("span");
        let index = 0;
        let interval;

        function animate() {
            clearInterval(interval);

            $letters.removeClass("active");
            index = 0;

            interval = setInterval(function () {
                if (index < $letters.length) {
                    $letters.eq(index).addClass("active");
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 30);
        }

        function reset() {
            clearInterval(interval);
            $letters.removeClass("active");
        }

        $el.closest(".cp-primary-btn")
            .on("mouseenter", animate)
            .on("mouseleave", reset);
    });


    var $grid = $(".masonry-layout");
    var iso;

    function initMasonry() {
        if ($grid.length) {
            $grid.imagesLoaded(function () {
                iso = $grid.isotope({
                    itemSelector: ".masonry-item",
                    percentPosition: true,
                    masonry: {
                        columnWidth: ".grid-sizer",
                        gutter: 0
                    }
                });
            });
        }
    }


    function destroyMasonry() {
        if (iso) {
            $grid.isotope("destroy");
            iso = null;
        }
    }


    function handleMasonry() {
        if (window.innerWidth >= 1200) {
            if (!iso) {
                initMasonry();
            }
        } else {
            destroyMasonry();
        }
    }

    if ($('#myTable').length) {
        $('#myTable').DataTable();
    }



    // Preloader 
    var innerBars = document.querySelectorAll(".inner-bar");

    function animateBars() {
        if (!innerBars.length) return;

        let increment = 0;

        function step() {
            for (let i = 0; i < 2 && innerBars[i + increment]; i++) {
                let randomWidth = Math.floor(Math.random() * 101);
                gsap.to(innerBars[i + increment], { width: randomWidth + "%", duration: 0.5, ease: "none" });
            }

            setTimeout(() => {
                for (let i = 0; i < 2 && innerBars[i + increment]; i++) {
                    gsap.to(innerBars[i + increment], { width: "100%", duration: 0.5, ease: "none" });
                }
                increment += 2;

                if (increment < innerBars.length) {
                    step();
                } else {
                    gsap.timeline()
                        .to(".preloader", { "--preloader-clip": "100%", duration: 0.8, ease: "none", delay: 0.8 })
                        .set(".preloader", { display: "none" });

                    // Only animate text if it exists
                    let textChars = gsap.utils.toArray(".text-animation-effect .char");
                    if (textChars.length) {
                        gsap.from(textChars, { duration: 1.5, x: 50, autoAlpha: 0, stagger: 0.1 });
                    }
                }
            }, 200);
        }

        step();
    }

    $(window).on("load", function () {
        handleMasonry();
        animateBars();

        setTimeout(function () {
            $(".preloader").remove();
        }, 3000);
    });

    // Zoom Effect
    document.addEventListener("DOMContentLoaded", () => {
        const container = document.querySelector(".zoom-container");
        const img = document.querySelector("#product-image");

        if (!container || !img) return; // exit if elements not found
        if (typeof Drift === "undefined") {
            console.error("Drift library is not loaded.");
            return;
        }

        // Initialize Drift and custom zoom
        new Drift(img, {
            paneContainer: container,
            inlinePane: true,
            inlineOffsetY: 0,
            containInline: true,
            hoverBoundingBox: true
        });

        const handleMouseMove = (e) => {
            const rect = img.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            img.style.transformOrigin = `${x}% ${y}%`;
        };

        const handleMouseEnter = () => img.style.transform = "scale(1.5)";
        const handleMouseLeave = () => img.style.transform = "scale(1)";

        img.addEventListener("mousemove", handleMouseMove);
        img.addEventListener("mouseenter", handleMouseEnter);
        img.addEventListener("mouseleave", handleMouseLeave);
    });


    $(document).on("click", ".review-star i", function () {
        let index = $(this).index();

        $(this).parent().children("i").each(function (i) {
            if (i <= index) {
                $(this).removeClass("fa-regular").addClass("fa-solid");
            } else {
                $(this).removeClass("fa-solid").addClass("fa-regular");
            }
        });
    });


    $(function () {

        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            $('body').addClass('firefox');
        }

        var header = $(".header"),
            stickyHeader = $(".primary-header");

        function menuSticky(w) {
            /**
             * A function to make the menu sticky when the window matches the media query.
             * @param {MediaQueryList} w - The media query list.
             * @example
             * menuSticky(window.matchMedia("(min-width: 768px)"));
             */
            if (w.matches) {

                $(window).off("scroll.menuSticky").on("scroll.menuSticky", function () {
                    var scroll = $(window).scrollTop();
                    if (scroll >= 110) {
                        stickyHeader.addClass("fixed");
                    } else {
                        stickyHeader.removeClass("fixed");
                    }
                });
                if ($(".header").length > 0) {
                    var headerHeight = document.querySelector(".header"),
                        setHeaderHeight = headerHeight.offsetHeight;
                    header.each(function () {
                        $(this).css({
                            'height': setHeaderHeight + 'px'
                        });
                    });
                }
            }
        }

        var minWidth = window.matchMedia("(min-width: 992px)");
        if (header.hasClass("sticky-active")) {
            menuSticky(minWidth);
        }

        //Mobile Menu Js
        $(".mobile-menu-items").meanmenu({
            meanMenuContainer: ".side-menu-wrap",
            meanScreenWidth: "9999",
            meanMenuCloseSize: "30px",
            meanRemoveAttrs: true,
            meanExpand: ['<i class="fa-solid fa-caret-down"></i>'],
        });

        // Mobile Sidemenu
        $(".mobile-side-menu-toggle").on("click", function () {
            $(".mobile-side-menu, .mobile-side-menu-overlay").toggleClass("is-open");
        });

        $(".mobile-side-menu-close, .mobile-side-menu-overlay").on("click", function () {
            $(".mobile-side-menu, .mobile-side-menu-overlay").removeClass("is-open");
        });


        // Popup Search Box
        $(function () {
            $("#popup-search-box").removeClass("toggled");

            $(".dl-search-icon").on("click", function (e) {
                e.stopPropagation();
                $("#popup-search-box").toggleClass("toggled");
                $("#popup-search").focus();
            });

            $("#popup-search-box input").on("click", function (e) {
                e.stopPropagation();
            });

            $("#popup-search-box, body").on("click", function () {
                $("#popup-search-box").removeClass("toggled");
            });
        });

        // Popup Sidebox
        function sideBox() {
            $("body").removeClass("open-sidebar");
            $(document).on("click", ".sidebar-trigger", function (e) {
                e.preventDefault();
                $("body").toggleClass("open-sidebar");
            });
            $(document).on("click", ".sidebar-trigger.close, #sidebar-overlay", function (e) {
                e.preventDefault();
                $("body.open-sidebar").removeClass("open-sidebar");
            });
        }

        sideBox();

        // Popular Causes Progress Bar
        if ($(".count-bar").length) {
            $(".count-bar").appear(
                function () {
                    var el = $(this);
                    var percent = el.data("percent");
                    $(el).css("width", percent).addClass("counted");
                }, {
                accY: -50
            }
            );
        }


        //Fact Counter + Text Count
        if ($(".count-box").length) {
            $(".count-box").appear(
                function () {
                    var $t = $(this),
                        n = $t.find(".count-text").attr("data-stop"),
                        r = parseInt($t.find(".count-text").attr("data-speed"), 10);

                    if (!$t.hasClass("counted")) {
                        $t.addClass("counted");
                        $({
                            countNum: $t.find(".count-text").text()
                        }).animate({
                            countNum: n
                        }, {
                            duration: r,
                            easing: "linear",
                            step: function () {
                                $t.find(".count-text").text(Math.floor(this.countNum));
                            },
                            complete: function () {
                                $t.find(".count-text").text(this.countNum);
                            }
                        });
                    }
                }, {
                accY: 0
            }
            );
        }


        // Venobox Video
        new VenoBox({
            selector: ".video-popup, .img-popup",
            bgcolor: "transparent",
            numeration: true,
            infinigall: true,
            spinner: "plane",
        });

        // Data Background
        $("[data-background]").each(function () {
            $(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
        });

        // Custom Cursor
        $("body").append('<div class="mt-cursor"></div>');
        var cursor = $(".mt-cursor"),
            linksCursor = $("a, .swiper-nav, button, .cursor-effect"),
            crossCursor = $(".cross-cursor");

        $(window).on("mousemove", function (e) {
            cursor.css({
                transform: "translate(" + (e.clientX - 15) + "px," + (e.clientY - 15) + "px)",
                visibility: "inherit",
            });
        });

        /* Odometer */
        $(".odometer").waypoint(
            function () {
                var odo = $(".odometer");
                odo.each(function () {
                    var countNumber = $(this).attr("data-count");
                    $(this).html(countNumber);
                });
            },
            {
                offset: "80%",
                triggerOnce: true,
            }
        );

        // Nice Select Js
        $("select").niceSelect();


        $('.quantity-box').each(function () {
            var $box = $(this);
            var $input = $box.find('input');
            var $add = $box.find('.add');
            var $sub = $box.find('.sub');

            // Increment
            $add.on('click', function () {
                var currentVal = parseInt($input.val()) || 0;
                $input.val(currentVal + 1);
            });

            // Decrement
            $sub.on('click', function () {
                var currentVal = parseInt($input.val()) || 0;
                if (currentVal > 1) { // minimum value = 1
                    $input.val(currentVal - 1);
                }
            });

            // Allow only numbers
            $input.on('input', function () {
                var val = $input.val().replace(/[^0-9]/g, '');
                $input.val(val === '' ? 1 : val);
            });
        });

        // portfolio Carousel
        var swiperPortfolio = new Swiper(".portfolio-carousel", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: true,
            speed: 1000,
            centeredSlides: true,
            pagination: {
                el: ".athlex-dot-swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                467: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 2,
                },
                1199: {
                    slidesPerView: 2.9,
                },
                1299: {
                    slidesPerView: 3.03,

                },
                1399: {
                    slidesPerView: 3.03,
                },
                1599: {
                    slidesPerView: 3.03,
                },
                1699: {
                    slidesPerView: 3.03,
                    spaceBetween: 40,
                },
            },
        });

        // portfolio Carousel
        var swiperPortfolio = new Swiper(".portfolio-carousel-2", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: true,
            speed: 1000,
            centeredSlides: true,
            navigation: {
                nextEl: '.swiper-arrow .swiper-next',
                prevEl: '.swiper-arrow .swiper-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                467: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 1.4,
                },
                1024: {
                    slidesPerView: 1.5,
                },
                1199: {
                    slidesPerView: 1.6,
                },
                1299: {
                    slidesPerView: 2,
                },
                1399: {
                    slidesPerView: 2.31,
                    spaceBetween: 40,
                },
            },
        });

        // portfolio Carousel
        var swiperPortfolio = new Swiper(".portfolio-carousel-3", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: true,
            grabcursor: true,
            speed: 600,
            navigation: {
                nextEl: '.swiper-arrow .swiper-prev',
                prevEl: '.swiper-arrow .swiper-next',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                467: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 1,
                },
                1024: {
                    slidesPerView: 2,
                },
                1199: {
                    slidesPerView: 2,
                },
                1299: {
                    slidesPerView: 3,
                },
            },
        });

        // testi Carousel
        var swiperTesti = new Swiper(".testi-carousel", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: true,
            speed: 1000,
            pagination: {
                el: ".athlex-dot-swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                467: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 2,
                },
                1199: {
                    slidesPerView: 3,
                },
                1299: {
                    slidesPerView: 3.2,
                },
                1399: {
                    slidesPerView: 3.2,
                },
                1599: {
                    slidesPerView: 3.3,
                },
                1699: {
                    slidesPerView: 4.42,
                },
            },
        });

        // testi Carousel
        var swiperTesti = new Swiper(".testi-carousel-2", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: true,
            speed: 1000,
            pagination: {
                el: ".athlex-dot-swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                467: {
                    slidesPerView: 1,
                },
            },
        });

        // testi Carousel
        var swiperTesti = new Swiper(".testi-carousel-3", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: true,
            speed: 1000,
            navigation: {
                nextEl: '.swiper-arrow .swiper-next',
                prevEl: '.swiper-arrow .swiper-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                467: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 1.5,
                },
                1024: {
                    slidesPerView: 2,
                },
                1199: {
                    slidesPerView: 2.12,
                },
            },
        });

        // testi Carousel
        var swiperTesti = new Swiper(".inner-testi-carousel", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: true,
            speed: 1000,
            pagination: {
                el: ".athlex-dot-swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                467: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 2,
                },
                1199: {
                    slidesPerView: 3,
                },
                1299: {
                    slidesPerView: 3,
                },
                1399: {
                    slidesPerView: 3,
                },
                1599: {
                    slidesPerView: 3,
                },
                1699: {
                    slidesPerView: 4,
                },
            },
        });

        // Project Carousel
        var swiperTeam = new Swiper(".team-carousel", {
            slidesPerView: 1,
            spaceBetween: 24,
            slidesPerGroup: 1,
            loop: true,
            centeredSlides: true,
            autoplay: true,
            grabcursor: true,
            speed: 1200,
            navigation: {
                nextEl: '.swiper-arrow .swiper-next',
                prevEl: '.swiper-arrow .swiper-prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                },
                767: {
                    slidesPerView: 1.5,
                    slidesPerGroup: 1,
                },
                1024: {
                    slidesPerView: 3.5,
                    slidesPerGroup: 1,
                },
                1324: {
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                },
                1424: {
                    slidesPerView: 5,
                    slidesPerGroup: 1,
                },
            },
        });

        //>> Brand Slider Start <<//
        var brandSlider = new Swiper(".brand-carousel", {
            spaceBetween: 16,
            loop: true,
            autoplay: true,
            speed: 4000,
            autoplay: {
                delay: 0,
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                },
                475: {
                    slidesPerView: 3,
                },
                767: {
                    slidesPerView: 4,
                },
                992: {
                    slidesPerView: 5,
                },
                1199: {
                    slidesPerView: 6,
                },
            },
        });

        //>> Brand Slider Start <<//
        var brandSlider = new Swiper(".brand-carousel-2", {
            spaceBetween: 1,
            loop: true,
            autoplay: true,
            speed: 4000,
            autoplay: {
                delay: 0,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.5,
                },
                475: {
                    slidesPerView: 2.5,
                },
                767: {
                    slidesPerView: 3.3,
                },
                992: {
                    slidesPerView: 4.5,
                },
                1199: {
                    slidesPerView: 6,
                },
            },
        });

        // Shop Carousel
        var swiperProject4 = new Swiper(".shop-carousel", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: true,
            speed: 600,
            navigation: {
                nextEl: '.swiper-arrow .swiper-next',
                prevEl: '.swiper-arrow .swiper-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 4,
                }
            },
        });

        //>> Footer Slider Start <<//
        var footerSlider = new Swiper(".footer-gallary-carousel", {
            spaceBetween: 16,
            slidesPerView: "auto",
            loop: true,
            autoplay: true,
            speed: 4000,
            autoplay: {
                delay: 0,
            },
        });

        // carouselTicker initail 
        $('.carouselTicker-nav').carouselTicker({
        });
        $(".carouselTicker-start").carouselTicker({
            direction: "prev",
        });

        //Running Animated Text
        const scrollers = document.querySelectorAll(".scroller");

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            addAnimation();
        }

        function addAnimation() {
            scrollers.forEach((scroller) => {
                scroller.setAttribute("data-animated", true);

                const scrollerInner = scroller.querySelector(".scroller__inner");
                const scrollerContent = Array.from(scrollerInner.children);

                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        }


        // Page Scroll Percentage
        function scrollTopPercentage() {
            const scrollPercentage = () => {
                const scrollTopPos = document.documentElement.scrollTop;
                const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
                const scrollElementWrap = $("#scroll-percentage");

                scrollElementWrap.css("background", `conic-gradient( var(--cp-color-theme-primary) ${scrollValue}%, var(--cp-color-bg-2) ${scrollValue}%)`);

                // ScrollProgress
                if (scrollTopPos > 100) {
                    scrollElementWrap.addClass("active");
                } else {
                    scrollElementWrap.removeClass("active");
                }

                if (scrollValue < 96) {
                    $("#scroll-percentage-value").text(`${scrollValue}%`);
                } else {
                    $("#scroll-percentage-value").html('<i class="fa-sharp fa-regular fa-arrow-up-long"></i>');
                }
            }
            $(window).on("scroll", scrollPercentage)

            // Back to Top
            function scrollToTop() {
                document.documentElement.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }

            $("#scroll-percentage").on("click", scrollToTop);
        }

        scrollTopPercentage();
    });

    $(document).on("click", ".scroll-btn", function () {
        var sectionTarget = $(this).data("target");
        gsap.to(window, { duration: 1, scrollTo: { y: sectionTarget, offsetY: 70 } });
    });

})(jQuery);
