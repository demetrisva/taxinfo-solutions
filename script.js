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

// Form submission handling for FormSubmit.co
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // The FormSubmit endpoint (using your new secure ID)
    const formEndpoint = "https://formsubmit.co/7339b1415ac00608f8768e3b7acd1d02"; 
    
    const form = e.target;
    const formData = new FormData(form);
    
    const submitBtn = form.querySelector('.submit-btn');
    const loadingDiv = form.querySelector('.loading');
    const successMessage = form.querySelector('.success-message');

    // 1. Get form data and convert to a plain object
    const data = Object.fromEntries(formData.entries());

    // 2. Show loading state
    successMessage.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    loadingDiv.style.display = 'block';

    try {
        // 3. Submit data as JSON
        const response = await fetch(formEndpoint, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // 4. Handle response
        if (response.ok) {
            // Success
            successMessage.textContent = 'Thank you! Your message has been sent successfully.';
            successMessage.style.backgroundColor = 'var(--accent-light-green)';
            successMessage.style.display = 'block';
            form.reset();
            
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
        // 5. Restore button state
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


// ===== UPDATED Intersection Observer for Scroll-Triggered Animations =====
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Stop observing once it's visible
        }
    });
}, observerOptions);

// Observe all elements with the .fade-in-on-scroll class
document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
    observer.observe(element);
});
// ===================================================================


// Cookie Banner Script
document.addEventListener("DOMContentLoaded", () => {
    const consentBanner = document.getElementById("cookie-consent-banner");
    const acceptBtn = document.getElementById("cookie-accept");
    const declineBtn = document.getElementById("cookie-decline");

    // Helper functions for cookies
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i=0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    // Check if consent was already given
    if (!getCookie("cookie_consent")) {
        // Show the banner
        consentBanner.style.display = "flex";
        setTimeout(() => {
            consentBanner.classList.add("show");
        }, 100);
    }

    // Accept cookies
    acceptBtn.addEventListener("click", () => {
        setCookie("cookie_consent", "accepted", 365);
        consentBanner.classList.remove("show");
        setTimeout(() => {
            consentBanner.style.display = "none";
        }, 500);
    });

    // Decline cookies
    declineBtn.addEventListener("click", () => {
        setCookie("cookie_consent", "declined", 365);
        consentBanner.classList.remove("show");
        setTimeout(() => {
            consentBanner.style.display = "none";
        }, 500);
    });
});