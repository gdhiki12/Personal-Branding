document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Project Filtering
    const tabBtns = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;

            projectCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.classList.add('show');
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                    card.classList.remove('show');
                }
            });
        });
    });

    // Expertise Counter Animation
    const expertiseItems = document.querySelectorAll('.expertise-item');

    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;

        const updateCounter = () => {
            current += increment;
            if (current >= target) {
                element.querySelector('.expertise-number').textContent = target;
                return;
            }
            element.querySelector('.expertise-number').textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        };

        updateCounter();
    };

    const observerOptions = { threshold: 0.5, rootMargin: '0px' };
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    expertiseItems.forEach(item => {
        counterObserver.observe(item);
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Project Card Hover Effect
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(image => {
        image.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = image.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            const img = image.querySelector('img');
            img.style.transform = `scale(1.05) translate(${(x - 0.5) * 10}px, ${(y - 0.5) * 10}px)`;
        });

        image.addEventListener('mouseleave', () => {
            const img = image.querySelector('img');
            img.style.transform = 'scale(1)';
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        navbar.classList.toggle('scroll-down', currentScroll > lastScroll && currentScroll > 0);
        navbar.classList.toggle('scroll-up', currentScroll < lastScroll);

        lastScroll = currentScroll;
    });

    // Form validation and submission handling
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (name && email && subject && message) {
            // Here you would typically send the form data to your backend
            alert('Terima kasih! Pesan Anda telah terkirim.');
            this.reset();
        } else {
            alert('Mohon isi semua field yang diperlukan');
        }
    });
});
