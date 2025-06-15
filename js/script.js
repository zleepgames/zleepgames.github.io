document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
    });
    
    // Links and buttons hover effect
    const links = document.querySelectorAll('a, button, .game-card, .team-member, .gallery-item');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(117, 89, 255, 0.2)';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        });
    });
    
    // Loading animation
    const loader = document.querySelector('.loader');
    
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
            
            // Start reveal animations after loading
            revealElements();
        }, 3000);
    } else {
        // If no loader (inner pages), start reveal animations immediately
        revealElements();
    }
    
    // Scroll animation for header
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Text reveal on scroll
        revealElements();
    });
    
    // Text reveal animation
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal-text');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Simple parallax effect on scroll
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const distance = window.scrollY;
            const position = element.getBoundingClientRect().top;
            const speed = 0.15;
            
            if (position < window.innerHeight && position > -element.offsetHeight) {
                element.style.transform = `translateY(${distance * speed}px)`;
            }
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Gallery interaction
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const mainImage = this.closest('.game-detail-media').querySelector('.game-main-image img');
            const tempSrc = mainImage.src;
            mainImage.src = this.src;
            this.src = tempSrc;
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            if (name && email && message) {
                // In a real scenario, you would send this data to a server
                alert('Thank you for your message. We will get back to you soon!');
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});