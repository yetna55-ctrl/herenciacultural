/**
 * JavaScript Interactions
 * Handles scroll effects, animations and simple form interaction.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar transition on scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Fade-In Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after fading in if you don't want repeat animations
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));


    // 3. Simple Form Submission Handler
    const form = document.getElementById('subscribe-form');
    const feedback = document.getElementById('form-feedback');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]').value;
            
            if(emailInput) {
                // Simulate API call
                const btn = form.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = 'Enviando...';
                btn.disabled = true;

                setTimeout(() => {
                    form.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                    feedback.textContent = '¡Gracias por suscribirte! Revisa tu correo pronto.';
                    
                    // Clear message after 4 seconds
                    setTimeout(() => {
                        feedback.textContent = '';
                    }, 4000);
                }, 1500);
            }
        });
    }

    // 4. Hero Carousel functionality (eventos-cultura.html)
    const slides = document.querySelectorAll('.impact-slide');
    const dots = document.querySelectorAll('.impact-dots .dot');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const showSlide = (index) => {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            slides[index].classList.add('active');
            if(dots[index]) dots[index].classList.add('active');
            currentSlide = index;
        };

        const nextSlide = () => {
            let next = currentSlide + 1;
            if (next >= slides.length) next = 0;
            showSlide(next);
        };

        const prevSlide = () => {
            let prev = currentSlide - 1;
            if (prev < 0) prev = slides.length - 1;
            showSlide(prev);
        };

        const startCarousel = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const resetCarousel = () => {
            clearInterval(slideInterval);
            startCarousel();
        };

        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetCarousel();
            });
        }
        
        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetCarousel();
            });
        }

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                showSlide(idx);
                resetCarousel();
            });
        });

        // Initialize auto-sliding
        startCarousel();
    }
});
