document.addEventListener('DOMContentLoaded', function() {
    // EmailJS initialisieren
    emailjs.init("yAFl8JK5gjPgoDVjb");

    // Floating Images Animation
    const floatingImages = document.querySelectorAll('.home-background .floating-image, .skills-background .floating-image');
    let animationFrameId = null;
    
    function initializeFloatingImage(img) {
        const container = img.closest('.floating-images-container');
        const containerRect = container.getBoundingClientRect();
        
        // Zufällige Startposition innerhalb des Containers
        const startX = Math.random() * (containerRect.width - 70);
        const startY = Math.random() * (containerRect.height - 70);
        
        // Zufällige Geschwindigkeit mit größerer Variation
        const speedX = (Math.random() - 0.5) * 2;
        const speedY = (Math.random() - 0.5) * 2;
        
        // Zufällige Größe
        const size = 40 + Math.random() * 30;
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
        
        // Position setzen mit transform statt left/top für bessere Performance
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
        
        // Position aktualisieren
        element.x += element.speedX;
        element.y += element.speedY;
        element.rotation += element.rotationSpeed;

        // Kollisionserkennung mit Container-Rändern
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

        // Transform statt left/top für bessere Performance
        const transform = `translate3d(${element.x}px, ${element.y}px, 0) rotate(${element.rotation}deg)`;
        element.img.style.transform = transform;
        element.img.style.webkitTransform = transform;
    }

    function animate() {
        floatingElements.forEach(updatePosition);
        animationFrameId = requestAnimationFrame(animate);
    }

    // Animation starten
    animate();

    // Cleanup bei Seitenwechsel
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

    // Animation beim Scrollen mit Debouncing
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop < window.innerHeight - 100) {
                    section.style.opacity = '1';
                }
            });
        });
    });
});