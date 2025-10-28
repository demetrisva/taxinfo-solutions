// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling for Netlify (retains all your animations)
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Netlify submissions post to the same page
    const formEndpoint = "/"; 
    
    const form = e.target;
    const formData = new FormData(form);
    
    const submitBtn = form.querySelector('.submit-btn');
    const loadingDiv = form.querySelector('.loading');
    const successMessage = form.querySelector('.success-message');

    // 1. Show loading state
    successMessage.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    loadingDiv.style.display = 'block';

    try {
        // 2. Submit data in the format Netlify expects
        const response = await fetch(formEndpoint, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded" 
            },
            // URL-encode the form data and include the form-name
            body: new URLSearchParams(formData).toString()
        });

        // 3. Handle response
        if (response.ok) {
            // Success
            successMessage.textContent = 'Thank you! Your message has been sent successfully.';
            successMessage.style.backgroundColor = '#10b981'; // Green
            successMessage.style.display = 'block';
            form.reset(); // Reset the form
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);

        } else {
            // Failure
            throw new Error('Form submission failed.');
        }

    } catch (error) {
        // Catch any error (network or server)
        console.error('Submission Error:', error);
        successMessage.textContent = 'Oops! There was an issue. Please try again.';
        successMessage.style.backgroundColor = '#ef4444'; // Red
        successMessage.style.display = 'block';
    } finally {
        // 4. Restore button state
        loadingDiv.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});


// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - scrolled / 600;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});