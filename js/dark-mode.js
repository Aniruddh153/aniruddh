/**
 * Dark Mode functionality for KnowledgeAI Hub
 * Handles theme switching and preference saving
 */

document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
});

/**
 * Initialize dark mode functionality
 */
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            updateThemeToggleIcon(true);
        }
        
        // Toggle theme when button is clicked
        themeToggle.addEventListener('click', function() {
            toggleDarkMode();
        });
        
        // Add keyboard shortcut (Alt+T) for toggling theme
        document.addEventListener('keydown', function(event) {
            if (event.altKey && event.key === 't') {
                toggleDarkMode();
            }
        });
    }
}

/**
 * Toggle dark mode on/off
 */
function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    updateThemeToggleIcon(isDarkMode);
    
    // Save preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Toggle stylesheet
    const darkStylesheet = document.getElementById('theme-stylesheet');
    if (darkStylesheet) {
        darkStylesheet.disabled = !isDarkMode;
    }
    
    // Announce theme change for screen readers
    announceThemeChange(isDarkMode);
}

/**
 * Update theme toggle icon based on current theme
 * @param {boolean} isDarkMode - Whether dark mode is active
 */
function updateThemeToggleIcon(isDarkMode) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
}

/**
 * Announce theme change for screen readers
 * @param {boolean} isDarkMode - Whether dark mode is active
 */
function announceThemeChange(isDarkMode) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only'); // Screen reader only
    announcement.textContent = isDarkMode ? 'Dark mode enabled' : 'Light mode enabled';
    
    document.body.appendChild(announcement);
    
    // Remove after announcement is read
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 3000);
}

// Add screen reader only style
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;
document.head.appendChild(style);