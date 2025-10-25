$(document).ready(function() {
    // Initialize carousel
    $('#promoCarousel').carousel({
        interval: 5000, // Auto-advance every 5 seconds
        wrap: true
    });

    // Add smooth scrolling for navigation buttons
    $('.nav-button').click(function(e) {
        e.preventDefault();
        
        // Add click animation
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 200);
        
        // Simulate navigation (you can replace with actual navigation logic)
        console.log('Navigation clicked:', $(this).find('span').text());
        
        // Add ripple effect
        addRippleEffect($(this), e);
    });

    // Add ripple effect function
    function addRippleEffect(element, event) {
        const ripple = $('<span class="ripple"></span>');
        const rect = element[0].getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.css({
            width: size,
            height: size,
            left: x,
            top: y
        });
        
        element.append(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Side navigation functionality
    $('.side-nav .nav-item').click(function() {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        
        // Add click animation
        $(this).addClass('pulse');
        setTimeout(() => {
            $(this).removeClass('pulse');
        }, 300);
        
        // Handle different navigation items
        const icon = $(this).find('i');
        if (icon.hasClass('fa-cog')) {
            console.log('Settings clicked');
            // Add settings functionality here
        } else if (icon.hasClass('fa-share-alt')) {
            console.log('Share clicked');
            // Add share functionality here
        } else if (icon.hasClass('fa-lock')) {
            console.log('Security clicked');
            // Add security functionality here
        }
    });

    // Add floating animation to coins
    function animateCoins() {
        $('.coin, .gold-coin').each(function() {
            const $coin = $(this);
            const randomDelay = Math.random() * 2;
            const randomDuration = 2 + Math.random() * 2;
            
            $coin.css({
                'animation-delay': randomDelay + 's',
                'animation-duration': randomDuration + 's'
            });
        });
    }

    // Initialize coin animations
    animateCoins();

    // Add hover effects to promotional banners
    $('.promo-banner').hover(
        function() {
            $(this).addClass('banner-hover');
            $(this).find('.floating-coins, .floating-money, .falling-money').addClass('animate');
        },
        function() {
            $(this).removeClass('banner-hover');
            $(this).find('.floating-coins, .floating-money, .falling-money').removeClass('animate');
        }
    );

    // Add click effects to banners
    $('.promo-banner').click(function() {
        const bannerType = $(this).attr('class').split(' ')[1];
        console.log('Banner clicked:', bannerType);
        
        // Add click animation
        $(this).addClass('banner-click');
        setTimeout(() => {
            $(this).removeClass('banner-click');
        }, 300);
        
        // Simulate banner interaction
        showBannerModal(bannerType);
    });

    // Banner modal function
    function showBannerModal(bannerType) {
        // Create modal content based on banner type
        let modalContent = '';
        let modalTitle = '';
        
        switch(bannerType) {
            case 'casino-banner':
                modalTitle = 'កាស៊ីណូផ្សាយផ្ទាល់';
                modalContent = 'ចូលរួមការភ្នាល់កាស៊ីណូផ្សាយផ្ទាល់ជាមួយយើង!';
                break;
            case 'football-banner':
                modalTitle = 'សមាជិកថ្មីបាល់ទាត់';
                modalContent = 'ចូលរួមការភ្នាល់បាល់ទាត់ជាមួយយើង!';
                break;
            case 'sports-banner':
                modalTitle = 'សមាជិកថ្មីបក្សីកីឡា';
                modalContent = 'ចូលរួមការភ្នាល់កីឡាជាមួយយើង!';
                break;
            case 'slot-banner':
                modalTitle = 'សមាជិកថ្មីហ្គេមស្លុត';
                modalContent = 'ចូលរួមការលេងហ្គេមស្លុតជាមួយយើង!';
                break;
            case 'referral-banner':
                modalTitle = 'ប្រូម៉ូសិនណែនាំមិត្ត';
                modalContent = 'ណែនាំមិត្តភក្តិជាមួយយើង!';
                break;
        }
        
        // Show alert (you can replace with a proper modal)
        alert(modalTitle + '\n\n' + modalContent);
    }

    // Add scroll effects
    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        
        // Parallax effect for background
        $('body').css('background-position', 'center ' + (scrollTop * 0.5) + 'px');
        
        // Fade in elements as they come into view
        $('.promo-banner').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            
            if (elementBottom > scrollTop && elementTop < scrollTop + windowHeight) {
                $(this).addClass('fade-in');
            }
        });
    });

    // Add keyboard navigation
    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // Left arrow
                $('#promoCarousel').carousel('prev');
                break;
            case 39: // Right arrow
                $('#promoCarousel').carousel('next');
                break;
            case 32: // Space bar
                e.preventDefault();
                $('#promoCarousel').carousel('next');
                break;
        }
    });

    // Add touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    
    $('#promoCarousel').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
        startY = e.originalEvent.touches[0].clientY;
    });
    
    $('#promoCarousel').on('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.originalEvent.changedTouches[0].clientX;
        const endY = e.originalEvent.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50) {
                $('#promoCarousel').carousel('next');
            } else if (diffX < -50) {
                $('#promoCarousel').carousel('prev');
            }
        }
        
        startX = 0;
        startY = 0;
    });

    // Add loading animation
    $(window).on('load', function() {
        $('.header-section, .nav-buttons-section, .main-banner-section, .promo-banners-section').addClass('loaded');
    });

    // Add click sound effect (optional)
    function playClickSound() {
        // You can add actual sound files here
        console.log('Click sound played');
    }

    // Add click sound to all interactive elements
    $('.nav-button, .promo-banner, .side-nav .nav-item').click(function() {
        playClickSound();
    });

    // Add auto-refresh for promotional content (optional)
    setInterval(function() {
        // Refresh promotional banners every 30 seconds
        $('.promo-banner').each(function() {
            $(this).find('.floating-coins, .floating-money, .falling-money').removeClass('animate');
            setTimeout(() => {
                $(this).find('.floating-coins, .floating-money, .falling-money').addClass('animate');
            }, 100);
        });
    }, 30000);

    // Add responsive menu toggle for mobile
    if ($(window).width() <= 768) {
        $('.nav-button').click(function() {
            // Add mobile-specific functionality
            $(this).addClass('mobile-active');
            setTimeout(() => {
                $(this).removeClass('mobile-active');
            }, 1000);
        });
    }

    // Add accessibility features
    $('.nav-button, .promo-banner, .side-nav .nav-item').attr('tabindex', '0');
    
    $('.nav-button, .promo-banner, .side-nav .nav-item').keydown(function(e) {
        if (e.which === 13 || e.which === 32) { // Enter or Space
            e.preventDefault();
            $(this).click();
        }
    });

    // Add focus indicators
    $('.nav-button, .promo-banner, .side-nav .nav-item').focus(function() {
        $(this).addClass('focused');
    }).blur(function() {
        $(this).removeClass('focused');
    });

    console.log('Mega789 Landing Page initialized successfully!');
});
