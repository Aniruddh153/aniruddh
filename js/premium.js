/**
 * Premium Page JavaScript
 * Handles functionality for the premium page including pricing toggle,
 * testimonial slider, and FAQ accordion
 */

document.addEventListener('DOMContentLoaded', function() {
    initPricingToggle();
    initTestimonialSlider();
    initFaqAccordion();
});

/**
 * Initialize the pricing toggle between monthly and annual billing
 */
function initPricingToggle() {
    const billingToggle = document.getElementById('billing-toggle');
    const toggleTexts = document.querySelectorAll('.pricing-toggle-text');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    if (!billingToggle) return;
    
    billingToggle.addEventListener('change', function() {
        // Toggle active class on text labels
        toggleTexts.forEach(text => text.classList.toggle('active'));
        
        // Update pricing on all cards
        pricingCards.forEach(card => {
            const priceElement = card.querySelector('.pricing-price');
            if (!priceElement) return;
            
            const price = priceElement.querySelector('.price');
            const period = priceElement.querySelector('.period');
            
            if (this.checked) {
                // Annual pricing
                price.textContent = priceElement.dataset.annual.split('.')[0];
                period.textContent = '/ year';
                
                // Announce for screen readers
                announceMessage('Switched to annual billing');
            } else {
                // Monthly pricing
                price.textContent = priceElement.dataset.monthly;
                period.textContent = '/ month';
                
                // Announce for screen readers
                announceMessage('Switched to monthly billing');
            }
        });
    });
}

/**
 * Initialize the testimonial slider
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    if (!slider || !prevButton || !nextButton) return;
    
    let currentSlide = 0;
    const slides = slider.querySelectorAll('.testimonial-card');
    const totalSlides = slides.length;
    
    // Hide all slides except the first one
    for (let i = 1; i < totalSlides; i++) {
        slides[i].style.display = 'none';
    }
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.style.display = 'none');
        
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show the current slide and activate its dot
        slides[index].style.display = 'block';
        dots[index].classList.add('active');
        
        // Announce for screen readers
        const author = slides[index].querySelector('.testimonial-info h4').textContent;
        announceMessage(`Showing testimonial from ${author}`);
    }
    
    // Event listeners for prev/next buttons
    prevButton.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    });
    
    nextButton.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 5000);
    
    // Pause auto-advance when user interacts with slider
    slider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    // Resume auto-advance when user leaves slider
    slider.addEventListener('mouseleave', function() {
        slideInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }, 5000);
    });
    
    // Keyboard navigation
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        } else if (e.key === 'ArrowRight') {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
    });
}

/**
 * Initialize the FAQ accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        // Initially hide all answers
        answer.style.display = 'none';
        
        question.addEventListener('click', function() {
            // Toggle this answer
            const isOpen = answer.style.display === 'block';
            
            // Close all other answers
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                    otherItem.querySelector('.faq-toggle i').className = 'fas fa-chevron-down';
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle this item
            if (isOpen) {
                answer.style.display = 'none';
                toggle.querySelector('i').className = 'fas fa-chevron-down';
                item.classList.remove('active');
                announceMessage('FAQ collapsed');
            } else {
                answer.style.display = 'block';
                toggle.querySelector('i').className = 'fas fa-chevron-up';
                item.classList.add('active');
                announceMessage('FAQ expanded');
            }
        });
        
        // Make it keyboard accessible
        question.setAttribute('tabindex', '0');
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

/**
 * Smooth scroll to pricing section when "View Plans" button is clicked
 */
document.addEventListener('DOMContentLoaded', function() {
    const viewPlansButtons = document.querySelectorAll('a[href="#pricing"]');
    
    viewPlansButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pricingSection = document.getElementById('pricing');
            if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: 'smooth' });
                announceMessage('Scrolled to pricing section');
            }
        });
    });
});

/**
 * Announce messages for screen readers
 * @param {string} message - The message to announce
 */
function announceMessage(message) {
    const announcer = document.getElementById('accessibility-announcer');
    if (announcer) {
        announcer.textContent = message;
    }
}