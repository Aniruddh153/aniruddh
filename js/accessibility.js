/**
 * Accessibility features for KnowledgeAI Hub
 * Handles font resizing and other accessibility enhancements
 */

document.addEventListener('DOMContentLoaded', function() {
    initFontResizing();
    initAccessibilityAnnouncements();
});

/**
 * Initialize font resizing functionality
 */
function initFontResizing() {
    const increaseBtn = document.getElementById('font-increase');
    const decreaseBtn = document.getElementById('font-decrease');
    
    // Base font size in pixels (default is 16px)
    let currentFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    
    // Check for saved font size preference
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.documentElement.style.fontSize = savedFontSize;
        currentFontSize = parseFloat(savedFontSize);
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', function() {
            // Increase font size by 1px, up to a maximum of 24px
            if (currentFontSize < 24) {
                currentFontSize += 1;
                updateFontSize(currentFontSize);
            }
        });
    }
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', function() {
            // Decrease font size by 1px, down to a minimum of 14px
            if (currentFontSize > 14) {
                currentFontSize -= 1;
                updateFontSize(currentFontSize);
            }
        });
    }
    
    // Add keyboard shortcuts for font resizing
    document.addEventListener('keydown', function(event) {
        // Alt + Plus to increase font size
        if (event.altKey && (event.key === '+' || event.key === '=')) {
            event.preventDefault();
            if (currentFontSize < 24) {
                currentFontSize += 1;
                updateFontSize(currentFontSize);
            }
        }
        
        // Alt + Minus to decrease font size
        if (event.altKey && event.key === '-') {
            event.preventDefault();
            if (currentFontSize > 14) {
                currentFontSize -= 1;
                updateFontSize(currentFontSize);
            }
        }
        
        // Alt + 0 to reset font size
        if (event.altKey && event.key === '0') {
            event.preventDefault();
            currentFontSize = 16; // Reset to default
            updateFontSize(currentFontSize);
        }
    });
}

/**
 * Update font size and save preference
 * @param {number} size - Font size in pixels
 */
function updateFontSize(size) {
    document.documentElement.style.fontSize = size + 'px';
    localStorage.setItem('fontSize', size + 'px');
    
    // Announce font size change for screen readers
    announceFontSizeChange(size);
}

/**
 * Announce font size change for screen readers
 * @param {number} size - Font size in pixels
 */
function announceFontSizeChange(size) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only'); // Screen reader only
    announcement.textContent = `Font size changed to ${size} pixels`;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement is read
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 3000);
}

/**
 * Initialize accessibility announcements for dynamic content
 */
function initAccessibilityAnnouncements() {
    // Create a live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.classList.add('sr-only');
    liveRegion.id = 'accessibility-announcer';
    document.body.appendChild(liveRegion);
    
    // Make announcement function available globally
    window.announceToScreenReader = function(message) {
        const announcer = document.getElementById('accessibility-announcer');
        if (announcer) {
            announcer.textContent = message;
        }
    };
    
    // Add focus indicators for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
        :focus {
            outline: 3px solid #4a6cfa !important;
            outline-offset: 2px !important;
        }
        
        /* Skip to content link */
        .skip-to-content {
            position: absolute;
            top: -40px;
            left: 0;
            background: #4a6cfa;
            color: white;
            padding: 8px;
            z-index: 100;
            transition: top 0.3s ease;
        }
        
        .skip-to-content:focus {
            top: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add id to main content area if it doesn't exist
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
    
    // Enhance form accessibility
    enhanceFormAccessibility();
}

/**
 * Enhance form accessibility
 */
function enhanceFormAccessibility() {
    // Ensure all form elements have proper labels and ARIA attributes
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Skip if input already has a label or aria-label
            if (input.id && document.querySelector(`label[for="${input.id}"]`)) {
                return;
            }
            
            if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
                // Use placeholder as fallback for aria-label if no label exists
                if (input.placeholder) {
                    input.setAttribute('aria-label', input.placeholder);
                }
            }
        });
    });
}