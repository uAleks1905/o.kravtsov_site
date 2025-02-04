document.addEventListener('DOMContentLoaded', function() {
    // Überprüfe ob es ein mobiles Gerät ist
    const isMobile = window.innerWidth <= 768;

    // Fade-In Effekt nur für Desktop
    if (!isMobile) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.section-container').forEach((section) => {
            observer.observe(section);
        });
    } else {
        // Auf Mobile: Zeige alle Sektionen sofort
        document.querySelectorAll('.section-container').forEach((section) => {
            section.classList.add('visible');
            section.style.opacity = '1';
            section.style.transform = 'none';
        });
    }

    // Typewriter Effekt
    const profileName = document.querySelector('.profile-name');
    const jobTitle = document.querySelector('.profile-section h2');
    
    function typeWriter(element, text, callback) {
        let i = 0;
        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        element.textContent = '';
        element.appendChild(cursor);
        element.style.opacity = '1';
        
        function type() {
            if (i < text.length) {
                cursor.insertAdjacentText('beforebegin', text[i]);
                i++;
                setTimeout(type, 100);
            } else if (callback) {
                setTimeout(() => {
                    cursor.remove();
                    callback();
                }, 500);
            } else {
                cursor.remove();
            }
        }
        
        type();
    }

    if (profileName && jobTitle) {
        const nameText = profileName.textContent;
        const titleText = jobTitle.textContent;
        
        // Hide elements initially
        profileName.style.opacity = '0';
        jobTitle.style.opacity = '0';
        
        // Start typing name after a short delay
        setTimeout(() => {
            typeWriter(profileName, nameText, () => {
                // Start typing job title after name is complete
                typeWriter(jobTitle, titleText);
            });
        }, 500);
    }

    // Burger Menu
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Schließe das Menü wenn ein Link geklickt wird
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Schließe Menü wenn außerhalb geklickt wird
        document.addEventListener('click', (e) => {
            if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Skills immer ausgeklappt auf Mobile
    if (isMobile) {
        document.querySelectorAll('.skill-details').forEach(detail => {
            detail.style.display = 'block';
        });
    }

    // EmailJS initialisieren
    emailjs.init("yAFl8JK5gjPgoDVjb");

    // Floating Images Animation
    const floatingImages = document.querySelectorAll('.home-background .floating-image, .skills-background .floating-image');
    let animationFrameId = null;
    
    function initializeFloatingImage(img) {
        const container = img.closest('.floating-images-container');
        const containerRect = container.getBoundingClientRect();
        
        const startX = Math.random() * (containerRect.width - 70);
        const startY = Math.random() * (containerRect.height - 70);
        
        const speedX = (Math.random() - 0.5) * 2;
        const speedY = (Math.random() - 0.5) * 2;
        
        const size = 40 + Math.random() * 30;
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
        
        const transform = `translate3d(${startX}px, ${startY}px, 0) rotate(${Math.random() * 360}deg)`;
        img.style.transform = transform;
        img.style.webkitTransform = transform;
        
        return { 
            img, 
            x: startX, 
            y: startY, 
            speedX, 
            speedY,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2,
            container,
            size
        };
    }

    const floatingElements = Array.from(floatingImages).map(initializeFloatingImage);

    function updatePosition(element) {
        const containerRect = element.container.getBoundingClientRect();
        
        element.x += element.speedX;
        element.y += element.speedY;
        element.rotation += element.rotationSpeed;

        if (element.x <= 0 || element.x >= containerRect.width - element.size) {
            element.speedX *= -1;
            element.x = Math.max(0, Math.min(element.x, containerRect.width - element.size));
            element.rotationSpeed = (Math.random() - 0.5) * 2;
        }
        if (element.y <= 0 || element.y >= containerRect.height - element.size) {
            element.speedY *= -1;
            element.y = Math.max(0, Math.min(element.y, containerRect.height - element.size));
            element.rotationSpeed = (Math.random() - 0.5) * 2;
        }

        const transform = `translate3d(${element.x}px, ${element.y}px, 0) rotate(${element.rotation}deg)`;
        element.img.style.transform = transform;
        element.img.style.webkitTransform = transform;
    }

    function animate() {
        floatingElements.forEach(updatePosition);
        animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('unload', function() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });

    // Smooth scrolling für Navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            if (section) {
                section.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll Spy für die Seitennavigation
    const sections = document.querySelectorAll('section[id]');
    const navDots = document.querySelectorAll('.nav-dot');

    function updateActiveSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navDots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.getAttribute('data-section') === sectionId) {
                        dot.classList.add('active');
                    }
                });
            }
        });
    }

    // Event Listener für Scroll
    window.addEventListener('scroll', updateActiveSection);
    
    // Initial Update
    updateActiveSection();

    // Smooth Scroll für die Navigationspunkte
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Kontaktformular Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const templateParams = {
                    from_name: document.getElementById('name').value,
                    from_email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                };

                await emailjs.send(
                    'service_5llkoer',
                    'template_k04fx45',
                    templateParams
                );

                alert('Vielen Dank für Ihre Nachricht! Ich werde mich bald bei Ihnen melden.');
                contactForm.reset();
            } catch (error) {
                console.error('Fehler beim Senden:', error);
                alert('Es gab einen Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.');
            }
        });
    }

    // Scroll-Animation Handler mit Debouncing
    let scrollTimeout;
    function checkScroll() {
        const sections = document.querySelectorAll('.fade-in');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 100;
            
            if (sectionTop < triggerPoint) {
                section.classList.add('visible');
            }
        });
    }

    // Initial Check für sichtbare Sektionen
    checkScroll();

    // Scroll Event Handler
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(checkScroll);
    });
});