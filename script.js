/**
 * GROW YOUR GREATNESS - CLEAN JAVASCRIPT
 * Organized and optimized code for website functionality
 */

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Validates email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone format
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Shows a message box with specified type and content
 * @param {string} type - 'success' or 'error'
 * @param {string} message - Message to display
 */
function showMessage(type, message) {
    const messageBox = document.getElementById(`${type}Message`);
    if (messageBox) {
        messageBox.querySelector('p').textContent = message;
        messageBox.style.display = 'block';
        messageBox.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Hides all message boxes
 */
function hideMessages() {
    const messages = document.querySelectorAll('.message-box');
    messages.forEach(msg => msg.style.display = 'none');
}

// ============================================================================
// DROPDOWN MENU FUNCTIONALITY
// ============================================================================

/**
 * Toggles the dropdown menu visibility
 */
function toggleDropdown() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu) {
        dropdownMenu.classList.toggle("show");
    }
}

/**
 * Closes dropdown when clicking outside
 */
function initDropdownHandlers() {
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropbtn')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    });
}

// ============================================================================
// PROGRAM SELECTION FUNCTIONALITY
// ============================================================================

/**
 * Handles program selection for student registration
 * @param {Element} element - The clicked program option element
 * @param {string} program - The program identifier
 */
function selectProgram(element, program) {
    if (!element || !program) return;
    
    // Remove selection from all programs
    const options = document.querySelectorAll('.program-option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Select clicked program
    element.classList.add('selected');
    
    // Update hidden input
    const hiddenInput = document.getElementById('selectedProgram');
    if (hiddenInput) {
        hiddenInput.value = program;
    }
}

/**
 * Handles program selection for mentor registration
 * @param {Element} element - The clicked program option element
 * @param {string} program - The program identifier
 */
function selectMentorProgram(element, program) {
    if (!element || !program) return;
    
    // Remove selection from all programs
    const options = document.querySelectorAll('.program-option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Select clicked program
    element.classList.add('selected');
    
    // Update hidden input
    const hiddenInput = document.getElementById('selectedMentorProgram');
    if (hiddenInput) {
        hiddenInput.value = program;
    }
    
    // Handle new program fields
    handleNewProgramFields(program);
}

/**
 * Shows/hides new program fields for mentor registration
 * @param {string} program - The selected program
 */
function handleNewProgramFields(program) {
    const newProgramSection = document.getElementById('newProgramSection');
    const newProgramDescription = document.getElementById('newProgramDescription');
    const newProgramName = document.getElementById('newProgramName');
    const newProgramDesc = document.getElementById('newProgramDesc');
    
    if (!newProgramSection) return;
    
    if (program === 'new-program') {
        newProgramSection.style.display = 'block';
        if (newProgramDescription) newProgramDescription.style.display = 'block';
        if (newProgramName) newProgramName.required = true;
        if (newProgramDesc) newProgramDesc.required = true;
    } else {
        newProgramSection.style.display = 'none';
        if (newProgramDescription) newProgramDescription.style.display = 'none';
        if (newProgramName) newProgramName.required = false;
        if (newProgramDesc) newProgramDesc.required = false;
    }
}

// ============================================================================
// FORM VALIDATION
// ============================================================================

/**
 * Validates the student registration form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - True if form is valid
 */
function validateStudentForm(form) {
    const selectedProgram = document.getElementById('selectedProgram');
    if (!selectedProgram || !selectedProgram.value) {
        alert('Please select a mentorship program');
        return false;
    }
    
    const email = form.querySelector('#email');
    if (email && !isValidEmail(email.value)) {
        alert('Please enter a valid email address');
        email.focus();
        return false;
    }
    
    return true;
}

/**
 * Validates the mentor registration form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - True if form is valid
 */
function validateMentorForm(form) {
    const selectedProgram = document.getElementById('selectedMentorProgram');
    if (!selectedProgram || !selectedProgram.value) {
        alert('Please select a mentorship program');
        return false;
    }
    
    // Check required files
    const applicationLetter = document.getElementById('applicationLetter');
    const cv = document.getElementById('cv');
    
    if (applicationLetter && !applicationLetter.files[0]) {
        alert('Please upload your application letter');
        return false;
    }
    
    if (cv && !cv.files[0]) {
        alert('Please upload your CV/resume');
        return false;
    }
    
    // Check file sizes (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (applicationLetter && applicationLetter.files[0] && applicationLetter.files[0].size > maxSize) {
        alert('Application letter file size must be less than 5MB');
        return false;
    }
    
    if (cv && cv.files[0] && cv.files[0].size > maxSize) {
        alert('CV file size must be less than 5MB');
        return false;
    }
    
    return true;
}

/**
 * Validates file uploads
 * @param {HTMLInputElement} input - File input element
 * @param {string} type - Type of file for error messages
 */
function validateFileUpload(input, type) {
    const file = input.files[0];
    if (!file) return;
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (file.size > maxSize) {
        alert(`${type} file size must be less than 5MB`);
        input.value = '';
        return false;
    }
    
    if (!allowedTypes.includes(fileExtension)) {
        alert(`${type} must be in PDF, DOC, or DOCX format`);
        input.value = '';
        return false;
    }
    
    // Visual feedback for valid file
    input.style.borderColor = '#2ed573';
    return true;
}

/**
 * Initializes real-time form validation
 */
function initFormValidation() {
    // Required field validation
    const requiredInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#ff4757';
            } else {
                this.style.borderColor = '#2ed573';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
        });
    });
    
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#ff4757';
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.style.borderColor = this.value ? '#2ed573' : '#ddd';
                this.setCustomValidity('');
            }
        });
    });
    
    // File upload validation
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const type = this.id === 'applicationLetter' ? 'Application letter' : 'CV';
            validateFileUpload(this, type);
        });
    });
}

// ============================================================================
// FORM SUBMISSION HANDLERS
// ============================================================================

/**
 * Handles student registration form submission with Formspree
 * @param {Event} e - Form submit event
 */
function handleStudentFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('submitBtn');
    
    if (!validateStudentForm(form)) {
        return;
    }
    
    hideMessages();
    
    // Update button state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Create FormData and ensure program selection is included
    const formData = new FormData(form);
    const selectedProgram = document.getElementById('selectedProgram').value;
    
    if (selectedProgram) {
        formData.set('program', selectedProgram);
    }
    
    // Submit to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            form.style.display = 'none';
            showMessage('success', 'Thank you for your application! We have received it and will review within 3-5 business days. You will hear from us soon via email or phone.');
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Form submission failed');
            });
        }
    }).catch(error => {
        console.error('Error submitting form:', error);
        showMessage('error', 'There was an error submitting your application. Please try again or contact us directly at applications@growyourgreatness.org');
    }).finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

/**
 * Handles mentor registration form submission with Formspree
 * @param {Event} e - Form submit event
 */
function handleMentorFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    if (!validateMentorForm(form)) {
        return;
    }
    
    hideMessages();
    
    // Update button state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Create FormData for Formspree submission
    const formData = new FormData(form);
    const selectedProgram = document.getElementById('selectedMentorProgram').value;
    
    if (selectedProgram) {
        formData.set('mentorProgram', selectedProgram);
    }
    
    // Handle additional programs checkboxes
    const additionalPrograms = [];
    const checkboxes = form.querySelectorAll('input[name="additionalPrograms"]:checked');
    checkboxes.forEach(checkbox => {
        additionalPrograms.push(checkbox.value);
    });
    if (additionalPrograms.length > 0) {
        formData.set('additionalPrograms', additionalPrograms.join(', '));
    }
    
    // Submit to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            const fullName = formData.get('fullName');
            showMessage('success', `Thank you for your mentor application, ${fullName}! We have received your application and will review it within 5-7 business days. Our team will contact you to discuss the next steps.`);
            
            // Reset form
            form.reset();
            document.querySelectorAll('.program-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Reset new program fields
            const newProgramSection = document.getElementById('newProgramSection');
            const newProgramDescription = document.getElementById('newProgramDescription');
            if (newProgramSection) newProgramSection.style.display = 'none';
            if (newProgramDescription) newProgramDescription.style.display = 'none';
            
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Form submission failed');
            });
        }
    }).catch(error => {
        console.error('Error submitting form:', error);
        showMessage('error', 'There was an error submitting your application. Please try again or contact our team directly at vimextra12@gmail.com');
    }).finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

/**
 * Handles contact form submission with Formspree
 * @param {Event} e - Form submit event
 */
function handleContactFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    hideMessages();
    
    // Update button state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Create FormData for submission
    const formData = new FormData(form);
    
    // Submit to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            showMessage('success', 'Thank you for your message! We will get back to you within 24 hours.');
            form.reset();
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Form submission failed');
            });
        }
    }).catch(error => {
        console.error('Error submitting form:', error);
        showMessage('error', 'There was an error sending your message. Please try again or contact us directly.');
    }).finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// ============================================================================
// INTERACTIVE EFFECTS
// ============================================================================

/**
 * Adds hover effects to cards
 */
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .blog-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
}

/**
 * Adds ripple effect to buttons
 */
function initButtonRippleEffect() {
    const buttons = document.querySelectorAll('.cta-button, .submit-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/**
 * Initializes scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.feature-card, .blog-card, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Initializes smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
}

// ============================================================================
// MOBILE MENU FUNCTIONALITY
// ============================================================================

/**
 * Initializes mobile menu functionality
 */
function initMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    const nav = document.querySelector('nav');
    const body = document.body;
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    nav.appendChild(mobileMenuBtn);
    
    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-open');
        body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) {
            navLinks.classList.remove('mobile-open');
            body.classList.remove('menu-open');
        }
    });
}

/**
 * Handles newsletter form submission
 * @param {Event} e - Form submit event
 */
function handleNewsletterFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const email = form.querySelector('input[type="email"]').value;
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    hideMessages();
    
    // Update button state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        try {
            showMessage('success', 'Thank you for subscribing! You\'ll receive our latest stories and updates directly to your inbox.');
            form.reset();
        } catch (error) {
            console.error('Error subscribing:', error);
            showMessage('error', 'There was an error with your subscription. Please try again or contact us directly.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }, 1000);
}

// ============================================================================
// INITIALIZATION - UPDATED
// ============================================================================

/**
 * Initializes all website functionality when DOM is loaded
 */
function initWebsite() {
    // Core functionality
    initDropdownHandlers();
    initFormValidation();
    initScrollAnimations();
    initSmoothScrolling();
    initCardHoverEffects();
    initButtonRippleEffect();
    initMobileMenu();
    
    // Form handlers
    const studentForm = document.getElementById('registrationForm');
    if (studentForm) {
        studentForm.addEventListener('submit', handleStudentFormSubmission);
    }
    
    const mentorForm = document.getElementById('mentorRegistrationForm');
    if (mentorForm) {
        mentorForm.addEventListener('submit', handleMentorFormSubmission);
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmission);
    }
    
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterFormSubmission);
    }
    
    // Add CSS for animations and mobile menu
    addDynamicCSS();
    
    console.log('Grow Your Greatness website initialized successfully!');
}

/**
 * Adds dynamic CSS for animations and responsive design
 */
function addDynamicCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            .nav-links {
                position: fixed;
                top: 80px;
                right: -100%;
                background: rgba(102, 126, 234, 0.95);
                width: 250px;
                height: calc(100vh - 80px);
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                padding-top: 2rem;
                transition: right 0.3s ease;
                backdrop-filter: blur(10px);
            }
            
            .nav-links.mobile-open {
                right: 0;
            }
            
            .nav-links li {
                margin: 1rem 0;
            }
            
            .nav-links a {
                font-size: 1.1rem;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                transition: background-color 0.3s;
            }
            
            .nav-links a:hover {
                background-color: rgba(255,255,255,0.1);
            }
            
            .dropdown {
                width: 100%;
                text-align: center;
            }
            
            .dropdown-content {
                position: static;
                display: none;
                width: 100%;
                box-shadow: none;
                background-color: rgba(255,255,255,0.1);
                margin-top: 0.5rem;
            }
            
            .dropdown-content.show {
                display: block;
            }
            
            .dropdown-content a {
                color: white;
                background-color: transparent;
            }
            
            .dropdown-content a:hover {
                background-color: rgba(255,255,255,0.2);
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initWebsite);

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden - pause any animations or timers if needed
    } else {
        // Page is visible again - resume functionality if needed
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.remove('mobile-open');
        document.body.classList.remove('menu-open');
    }
    
    // Close dropdown menu on resize
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove('show');
    }
});

// ============================================================================
// EXPORTS (for use in other files if needed)
// ============================================================================

// Export functions for external use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        selectProgram,
        selectMentorProgram,
        toggleDropdown,
        validateStudentForm,
        validateMentorForm,
        isValidEmail,
        isValidPhone
    };
}

// Make functions available globally for HTML onclick handlers
window.selectProgram = selectProgram;
window.selectMentorProgram = selectMentorProgram;
window.toggleDropdown = toggleDropdown;