document.addEventListener('DOMContentLoaded', function() {
    // EmailJS initialisieren
    emailjs.init("yAFl8JK5gjPgoDVjb");

    // Floating Images Animation
    const floatingImages = document.querySelectorAll('.home-background .floating-image, .skills-background .floating-image');
    
    function initializeFloatingImage(img) {
        // Container-Dimensionen ermitteln
        const container = img.closest('.floating-images-container');
        const containerRect = container.getBoundingClientRect();
        
        // Zufällige Startposition innerhalb des Containers
        const startX = Math.random() * (containerRect.width - 70);
        const startY = Math.random() * (containerRect.height - 70);
        
        // Zufällige Geschwindigkeit mit größerer Variation
        const speedX = (Math.random() - 0.5) * 3;
        const speedY = (Math.random() - 0.5) * 3;
        
        // Zufällige Größe
        const size = 40 + Math.random() * 30; // Zwischen 40px und 70px
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
        
        // Zufällige Startposition
        img.style.left = `${startX}px`;
        img.style.top = `${startY}px`;
        
        // Zufällige Rotation
        const rotation = Math.random() * 360;
        img.style.transform = `rotate(${rotation}deg)`;
        
        return { 
            img, 
            x: startX, 
            y: startY, 
            speedX, 
            speedY,
            rotation,
            rotationSpeed: (Math.random() - 0.5) * 2,
            container
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
        if (element.x <= 0 || element.x >= containerRect.width - element.img.offsetWidth) {
            element.speedX *= -1;
            element.x = Math.max(0, Math.min(element.x, containerRect.width - element.img.offsetWidth));
            element.rotationSpeed = (Math.random() - 0.5) * 2; // Neue Rotationsgeschwindigkeit bei Kollision
        }
        if (element.y <= 0 || element.y >= containerRect.height - element.img.offsetHeight) {
            element.speedY *= -1;
            element.y = Math.max(0, Math.min(element.y, containerRect.height - element.img.offsetHeight));
            element.rotationSpeed = (Math.random() - 0.5) * 2; // Neue Rotationsgeschwindigkeit bei Kollision
        }

        // Position und Rotation aktualisieren
        element.img.style.left = `${element.x}px`;
        element.img.style.top = `${element.y}px`;
        element.img.style.transform = `rotate(${element.rotation}deg)`;
    }

    function animate() {
        floatingElements.forEach(updatePosition);
        requestAnimationFrame(animate);
    }

    animate();

    // Smooth scrolling für Navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
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

    // Animation beim Scrollen
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.style.opacity = '1';
            }
        });
    });
});