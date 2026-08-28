(function ($) {
    "use strict";

    // Get Device width
    var device_width = window.innerWidth;

    gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin);

    if ($(".text-animation-effect").length) {
        let splitText = new SplitType(".text-animation-effect", { types: 'chars' });

        if ($(".text-animation-effect .char").length) {
            gsap.from(".text-animation-effect .char", {
                duration: 1,
                x: 50,
                autoAlpha: 0,
                stagger: 0.1
            });
        }
    }

    if (typeof gsap !== "undefined" && typeof SplitText !== "undefined") {

        gsap.registerPlugin(ScrollTrigger, SplitText);

        // ===== tz-sub-tilte =====
        $(".tz-sub-tilte").each(function (index, el) {
            if (!el || !$(el).length) return;

            let split = new SplitText(el, {
                type: "lines,words,chars",
                linesClass: "split-line"
            });

            if (split && split.chars && split.chars.length) {
                gsap.set(split.chars, { x: 20, opacity: 0 }); // prevent null animation

                gsap.to(split.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: 1
                    },
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.2
                });
            }
        });

        // ===== tz-itm-title =====
        $('.tz-itm-title').each(function (index, el) {

            if (!el || !$(el).length) return;

            let split = new SplitText(el, {
                type: "lines,words,chars",
                linesClass: "split-line"
            });

            if (split && split.chars && split.chars.length) {

                gsap.set(split.chars, {
                    opacity: 0.3,
                    x: -7
                });

                gsap.to(split.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 92%",
                        end: "top 60%",
                        scrub: 1
                    },
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.2
                });
            }
        });

        ScrollTrigger.refresh();
    }

    // Prallax Img
    if ($('.tp-full-img-wrap').length > 0) {
        ScrollTrigger.create({
            trigger: ".tp-full-img-wrap",
            start: "top 65",
            end: "bottom 0%",
            pin: ".tp-full-img",
            pinSpacing: false,
        });
    }

    const mm = gsap.matchMedia();

    function createPin({
        trigger,
        pin,
        start = "top top",
        end = "bottom bottom",
        pinSpacing = true,
        minWidth = 992
    }) {

        // Check elements exist
        const triggerEl = document.querySelector(trigger);
        const pinEl = document.querySelector(pin);

        if (!triggerEl || !pinEl) return;

        // Create only for specified screen width
        mm.add(`(min-width: ${minWidth}px)`, () => {

            const pinTrigger = ScrollTrigger.create({
                trigger: trigger,
                pin: pin,
                start: start,
                end: end,
                pinSpacing: pinSpacing,
                invalidateOnRefresh: true
            });

            // Cleanup when breakpoint no longer matches
            return () => {
                pinTrigger.kill();
            };
        });
    }

    // ======================================================
    // Pin Section 1 (Desktop)
    // ======================================================
    createPin({
        trigger: ".pin-area",
        pin: ".pin-element",
        start: "top 140",
        end: "bottom 86.5%",
        pinSpacing: true,
        minWidth: 992
    });

    // ======================================================
    // Pin Section 2 (Tablet & Desktop)
    // ======================================================
    createPin({
        trigger: ".pin-area-2",
        pin: ".pin-element-2",
        start: "top 120",
        end: "bottom 49.5%",
        pinSpacing: true,
        minWidth: 1200
    });

    // ======================================================
    // Pin Section 3 (Large Desktop)
    // ======================================================
    createPin({
        trigger: ".pin-area-3",
        pin: ".pin-element-3",
        start: "top 140",
        end: "bottom 51.5%",
        pinSpacing: true,
        minWidth: 1200
    });

    // ======================================================
    // Pin Section 4 (Large Desktop)
    // ======================================================
    createPin({
        trigger: ".pin-area-4",
        pin: ".pin-element-4",
        start: "top 120",
        end: "bottom 32%",
        pinSpacing: true,
        minWidth: 1200
    });

    // ======================================================
    // Pin Section 5 (Large Desktop)
    // ======================================================
    createPin({
        trigger: ".pin-area-5",
        pin: ".pin-element-5",
        start: "top 0",
        end: "bottom 55%",
        pinSpacing: true,
        minWidth: 1200
    });
    // ======================================================
    // Pin Section 6 (Large Desktop)
    // ======================================================
    createPin({
        trigger: ".pin-area-6",
        pin: ".pin-element-6",
        start: "top 120",
        end: "bottom 81.3%",
        pinSpacing: true,
        minWidth: 992
    });



    // Image Reveal
    let revealContainers = gsap.utils.toArray(".reveal");

    revealContainers.forEach(container => {

        if (!container) return;

        let image = container.querySelector("img");
        if (!image) return;

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                toggleActions: "restart none none reset"
            }
        });

        tl.set(container, { autoAlpha: 1 })
            .from(container, {
                xPercent: -100,
                duration: 1.5,
                ease: "power2.out"
            })
            .from(image, {
                xPercent: 100,
                scale: 1.3,
                duration: 1.5,
                delay: -1.5,
                ease: "power2.out"
            });
    });


    // ================= SIMPLE IMAGE SCALE REVEAL =================

    const images = document.querySelectorAll(".img-reveal");

    images.forEach(image => {

        if (!image) return;

        const img = image.querySelector("img");
        if (!img) return;

        gsap.set(image, { visibility: "visible" });

        const tl = gsap.timeline({ paused: true });

        // ✅ ONLY SCALE ANIMATION
        tl.from(img, {
            duration: 1.4,
            scale: 1.4,
            ease: "power2.inOut"
        });

        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tl.play();
                } else {
                    tl.progress(0).pause();
                }
            });
        }, { threshold: 0 });

        io.observe(image);
    });

    // Scroll Animation

    let typeSplit = new SplitType("[data-text-animation]", {
        types: "lines,words, chars",
        className: "line",
    });
    var text_animations = document.querySelectorAll(
        "[data-text-animation]"
    );

    function createScrollTrigger(triggerElement, timeline) {
        // Play tl when scrolled into view (60% from top of screen)
        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top 80%",
            onEnter: () => timeline.play(),
            toggleClass: { targets: triggerElement, className: "active" }
        });
    }

    text_animations.forEach((animation) => {
        let type = "slide-up",
            duration = 0.75,
            offset = 80,
            stagger = 0.6,
            delay = 0,
            scroll = 1,
            split = "line",
            ease = "power2.out";
        // Set attribute
        if (animation.getAttribute("data-stagger")) {
            stagger = animation.getAttribute("data-stagger");
        }
        if (animation.getAttribute("data-duration")) {
            duration = animation.getAttribute("data-duration");
        }
        if (animation.getAttribute("data-text-animation")) {
            type = animation.getAttribute("data-text-animation");
        }
        if (animation.getAttribute("data-delay")) {
            delay = animation.getAttribute("data-delay");
        }
        if (animation.getAttribute("data-ease")) {
            ease = animation.getAttribute("data-ease");
        }
        if (animation.getAttribute("data-scroll")) {
            scroll = animation.getAttribute("data-scroll");
        }
        if (animation.getAttribute("data-offset")) {
            offset = animation.getAttribute("data-offset");
        }
        if (animation.getAttribute("data-split")) {
            split = animation.getAttribute("data-split");
        }
        if (scroll == 1) {
            if (type == "slide-up") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    yPercent: offset,
                    duration,
                    ease,
                    opacity: 0,
                    stagger: { amount: stagger },
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "slide-down") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    yPercent: -offset,
                    duration,
                    ease,
                    opacity: 0,
                    stagger: { amount: stagger },
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "rotate-in") {
                let tl = gsap.timeline({ paused: true });
                tl.set(animation.querySelectorAll(`.${split}`), {
                    transformPerspective: 400,
                });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    rotationX: -offset,
                    duration,
                    ease,
                    force3D: true,
                    opacity: 0,
                    transformOrigin: "top center -50",
                    stagger: { amount: stagger },
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "slide-from-left") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0,
                    xPercent: -offset,
                    duration,
                    opacity: 0,
                    ease,
                    stagger: { amount: stagger },
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "slide-from-right") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0,
                    xPercent: offset,
                    duration,
                    opacity: 0,
                    ease,
                    stagger: { amount: stagger },
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "fade-in") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0,
                    duration,
                    ease,
                    opacity: 0,
                    stagger: { amount: stagger },
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "fade-in-right") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    x: 100,
                    autoAlpha: 0,
                    duration,
                    stagger: stagger,
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "fade-in-bottom-line") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    autoAlpha: 0,
                    rotationX: -80,
                    force3D: true,
                    transformOrigin: "top center -50",
                    delay: 0.3,
                    duration,
                    stagger: stagger,
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "fade-in-random") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0,
                    duration,
                    ease,
                    opacity: 0,
                    stagger: { amount: stagger, from: "random" },
                });
                createScrollTrigger(animation, tl);
            }
            if (type == "scrub") {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: animation,
                        start: "top 90%",
                        end: "top center",
                        scrub: true,
                    },
                });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0.2,
                    duration,
                    ease,
                    stagger: { amount: stagger },
                });
            }

            // Avoid flash of unstyled content
            gsap.set("[data-text-animation]", { opacity: 1 });
        } else {
            if (type == "slide-up") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    yPercent: offset,
                    duration,
                    ease,
                    opacity: 0,
                });
            }
            if (type == "slide-down") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    yPercent: -offset,
                    duration,
                    ease,
                    opacity: 0,
                });
            }
            if (type == "rotate-in") {
                let tl = gsap.timeline({ paused: true });
                tl.set(animation.querySelectorAll(`.${split}`), {
                    transformPerspective: 400,
                });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    rotationX: -offset,
                    duration,
                    ease,
                    force3D: true,
                    opacity: 0,
                    transformOrigin: "top center -50",
                });
            }
            if (type == "slide-from-right") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0,
                    xPercent: offset,
                    duration,
                    opacity: 0,
                    ease,
                });
            }
            if (type == "fade-in") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0,
                    duration,
                    ease,
                    opacity: 0,
                });
            }
            if (type == "fade-in-random") {
                let tl = gsap.timeline({ paused: true });
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0,
                    duration,
                    ease,
                    opacity: 0,
                    stagger: { amount: stagger, from: "random" },
                });
            }
            if (type == "scrub") {
                tl.from(animation.querySelectorAll(`.${split}`), {
                    opacity: 0.2,
                    duration,
                    ease,
                });
            }
        }
    });


    if ($(".fade-wrapper").length > 0) {
        $(".fade-wrapper").each(function () {
            var section = $(this);
            var fadeItems = section.find(".fade-top");

            fadeItems.each(function (index, element) {
                var delay = index * 0.10;

                gsap.set(element, {
                    opacity: 0,
                    y: 100,
                });

                ScrollTrigger.create({
                    trigger: element,
                    start: "top 100%",
                    end: "bottom 20%",
                    scrub: 0.5,
                    onEnter: function () {
                        gsap.to(element, {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            delay: delay,
                        });
                    },
                    once: true,
                });
            });
        });
    }

    let fadeArray_items = document.querySelectorAll(".slide-anim");
    if (fadeArray_items.length > 0) {
        const fadeArray = gsap.utils.toArray(".slide-anim")
        fadeArray.forEach((item, i) => {
            var fade_direction = "bottom"
            var onscroll_value = 1
            var duration_value = 1.15
            var fade_offset = 50
            var delay_value = 0.15
            var ease_value = "power2.out"
            if (item.getAttribute("data-offset")) {
                fade_offset = item.getAttribute("data-offset");
            }
            if (item.getAttribute("data-duration")) {
                duration_value = item.getAttribute("data-duration");
            }
            if (item.getAttribute("data-direction")) {
                fade_direction = item.getAttribute("data-direction");
            }
            if (item.getAttribute("data-on-scroll")) {
                onscroll_value = item.getAttribute("data-on-scroll");
            }
            if (item.getAttribute("data-delay")) {
                delay_value = item.getAttribute("data-delay");
            }
            if (item.getAttribute("data-ease")) {
                ease_value = item.getAttribute("data-ease");
            }
            let animation_settings = {
                opacity: 0,
                ease: ease_value,
                duration: duration_value,
                delay: delay_value,
            }
            if (fade_direction == "top") {
                animation_settings['y'] = -fade_offset
            }
            if (fade_direction == "left") {
                animation_settings['x'] = -fade_offset;
            }
            if (fade_direction == "bottom") {
                animation_settings['y'] = fade_offset;
            }
            if (fade_direction == "right") {
                animation_settings['x'] = fade_offset;
            }
            if (onscroll_value == 1) {
                animation_settings['scrollTrigger'] = {
                    trigger: item,
                    start: 'top 85%',
                }
            }
            gsap.from(item, animation_settings);
        })
    }


    // scale animation 
    var scale = document.querySelectorAll(".scale");
    var image = document.querySelectorAll(".scale img");
    scale.forEach((item) => {
        gsap.to(item, {
            scale: 1,
            duration: 1,
            ease: "power1.out",
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: "bottom top",
                toggleActions: 'play reverse play reverse'
            }
        });
    });
    image.forEach((image) => {
        gsap.set(image, {
            scale: 1.3,
        });
        gsap.to(image, {
            scale: 1,
            duration: 1,
            scrollTrigger: {
                trigger: image,
                start: 'top bottom',
                end: "bottom top",
                toggleActions: 'play reverse play reverse'
            }
        });
    })


    const videoArea = document.querySelector(".video-img-area");

    if (videoArea) {
        ScrollTrigger.create({
            trigger: ".video-img-area",
            start: "top 80",
            end: "+=100%",
            pin: true,
            pinSpacing: false,
            scrub: true,
            anticipatePin: 1
        });
    }

    // Run only on the Court page
    if (document.querySelector(".court-section")) {

        const slides = [
            {
                num: "01 — 05",
                title: "Outdoor Court",
                desc: "We deliver excellence across every stage of Garden creation—from inspired ",
                img: "assets/img/court/court-img-1.jpg"
            },
            {
                num: "02 — 05",
                title: "Panoramic Court",
                desc: "We deliver excellence across every stage of Garden creation—from inspired ",
                img: "assets/img/court/court-img-2.jpg"
            },
            {
                num: "03 — 05",
                title: "Indoor Court",
                desc: "We deliver excellence across every stage of Garden creation—from inspired ",
                img: "assets/img/court/court-img-3.jpg"
            },
            {
                num: "04 — 05",
                title: "Panoramic Court",
                desc: "We deliver excellence across every stage of Garden creation—from inspired ",
                img: "assets/img/court/court-img-4.jpg"
            },
            {
                num: "05 — 05",
                title: "Portable Court",
                desc: "We deliver excellence across every stage of Garden creation—from inspired ",
                img: "assets/img/court/court-img-5.jpg"
            }
        ];

        const bgWrapper = document.getElementById("bg-wrapper");
        const imgViewport = document.getElementById("img-viewport");

        const courtNum = document.getElementById("court-num");
        const courtTitle = document.getElementById("court-title");
        const courtDesc = document.getElementById("court-desc");

        if (
            !bgWrapper ||
            !imgViewport ||
            !courtNum ||
            !courtTitle ||
            !courtDesc
        ) {
            console.warn("Court section elements not found.");
        } else {

            function updateContent(index) {
                courtNum.textContent = slides[index].num;
                courtTitle.textContent = slides[index].title;
                courtDesc.textContent = slides[index].desc;
            }

            // First slide
            updateContent(0);

            // Build slide layers
            slides.forEach((slide) => {

                const bgDiv = document.createElement("div");
                bgDiv.className = "bg-image";
                bgDiv.style.backgroundImage = `url(${slide.img})`;
                bgWrapper.appendChild(bgDiv);

                const imgDiv = document.createElement("div");
                imgDiv.className = "court-img";
                imgDiv.style.backgroundImage = `url(${slide.img})`;
                imgViewport.appendChild(imgDiv);

            });

            const bgElements = gsap.utils.toArray(".bg-image");
            const imgElements = gsap.utils.toArray(".court-img");

            gsap.set(bgElements, {
                y: "0%",
                zIndex: 1
            });

            gsap.set(imgElements, {
                y: "0%",
                zIndex: 1
            });

            gsap.set(bgElements.slice(1), {
                y: "100%"
            });

            gsap.set(imgElements.slice(1), {
                y: "100%"
            });

            let currentIndex = 0;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".scroll-wrapper",
                    start: "top top",
                    end: `+=${(slides.length - 1) * 120}%`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    refreshPriority: 1,

                    onUpdate(self) {

                        let index = Math.round(
                            self.progress * (slides.length - 1)
                        );

                        index = gsap.utils.clamp(0, slides.length - 1, index);

                        if (index !== currentIndex) {
                            currentIndex = index;
                            updateContent(index);
                        }
                    }
                }
            });

            // Image animation only
            for (let i = 0; i < slides.length - 1; i++) {

                const nextBg = bgElements[i + 1];
                const nextImg = imgElements[i + 1];

                tl.set([nextBg, nextImg], {
                    zIndex: i + 10
                });

                tl.to([nextBg, nextImg], {
                    y: "0%",
                    duration: 1,
                    ease: "power2.inOut"
                });
            }

            window.addEventListener("load", () => {
                ScrollTrigger.refresh();
            });
        }
    }



})(jQuery);