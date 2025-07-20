/**
 * Search functionality for KnowledgeAI Hub
 * Handles search queries, suggestions, and results
 */

document.addEventListener('DOMContentLoaded', function() {
    initSearchFunctionality();
});

/**
 * Initialize search functionality
 */
function initSearchFunctionality() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const voiceSearchButton = document.getElementById('voice-search');
    
    if (searchForm && searchInput && searchButton) {
        // Handle form submission
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const query = searchInput.value.trim();
            
            if (query) {
                performSearch(query);
            }
        });
        
        // Add debounced input handler for search suggestions
        searchInput.addEventListener('input', debounce(function() {
            const query = searchInput.value.trim();
            
            if (query && query.length >= 2) {
                fetchSearchSuggestions(query);
            } else {
                hideSearchSuggestions();
            }
        }, 300));
        
        // Clear search on ESC key
        searchInput.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                searchInput.value = '';
                hideSearchSuggestions();
            }
        });
    }
}

/**
 * Perform search with the given query
 * @param {string} query - Search query
 */
function performSearch(query) {
    // In a real application, this would make an API call to fetch search results
    // For demo purposes, we'll simulate a search result
    
    // Show loading state
    const searchButton = document.getElementById('search-button');
    const originalButtonText = searchButton.innerHTML;
    searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    
    // Announce for screen readers
    if (window.announceToScreenReader) {
        window.announceToScreenReader('Searching for ' + query);
    }
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Reset button
        searchButton.innerHTML = originalButtonText;
        
        // For demo purposes, redirect to a search results page
        // In a real application, this would display actual search results
        window.location.href = 'search-results.html?q=' + encodeURIComponent(query);
        
        // Alternative: display results on the same page
        // displaySearchResults(query, sampleSearchResults);
    }, 1000);
}

/**
 * Fetch search suggestions for the given query
 * @param {string} query - Search query
 */
function fetchSearchSuggestions(query) {
    // In a real application, this would make an API call to fetch suggestions
    // For demo purposes, we'll use a sample list of suggestions
    
    // Sample suggestions (in a real application, these would come from an API)
    const allSuggestions = [
        'What is quantum computing?',
        'How does photosynthesis work?',
        'What are black holes?',
        'Explain the theory of relativity',
        'What is the structure of DNA?',
        'How does the immune system work?',
        'What caused World War I?',
        'Explain artificial intelligence',
        'What is climate change?',
        'How do vaccines work?',
        'What is the Big Bang theory?',
        'How does blockchain technology work?',
        'What is the Pythagorean theorem?',
        'Explain the water cycle',
        'What is the periodic table?',
        'How does the human brain work?',
        'What is the theory of evolution?',
        'Explain the greenhouse effect',
        'What is the Higgs boson?',
        'How does a computer processor work?'
    ];
    
    // Filter suggestions based on query
    const filteredSuggestions = allSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5); // Limit to 5 suggestions
    
    // Display suggestions
    displaySearchSuggestions(filteredSuggestions);
}

/**
 * Display search suggestions
 * @param {Array} suggestions - Array of suggestion strings
 */
function displaySearchSuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    if (suggestionsContainer) {
        // Clear previous suggestions
        suggestionsContainer.innerHTML = '';
        
        if (suggestions.length > 0) {
            // Create suggestion elements
            suggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = suggestion;
                
                // Handle suggestion click
                div.addEventListener('click', function() {
                    document.getElementById('search-input').value = suggestion;
                    hideSearchSuggestions();
                    performSearch(suggestion);
                });
                
                suggestionsContainer.appendChild(div);
            });
            
            // Show suggestions container
            suggestionsContainer.style.display = 'block';
        } else {
            hideSearchSuggestions();
        }
    }
}

/**
 * Hide search suggestions
 */
function hideSearchSuggestions() {
    const suggestionsContainer = document.getElementById('search-suggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

/**
 * Display search results
 * @param {string} query - Search query
 * @param {Array} results - Array of result objects
 */
function displaySearchResults(query, results) {
    // This function would be used if displaying results on the same page
    // For demo purposes, we're redirecting to a search results page instead
    console.log('Search results for:', query, results);
}

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Sample search results for demo purposes
const sampleSearchResults = [
    {
        title: 'What is Quantum Computing?',
        snippet: 'Quantum computing is a type of computation that harnesses the collective properties of quantum states, such as superposition, interference, and entanglement, to perform calculations...',
        category: 'Science',
        difficulty: 'Advanced'
    },
    {
        title: 'Quantum Mechanics Explained',
        snippet: 'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles...',
        category: 'Physics',
        difficulty: 'Advanced'
    },
    {
        title: 'Quantum Entanglement and Quantum Computing',
        snippet: 'Quantum entanglement is a physical phenomenon that occurs when a pair or group of particles is generated, interact, or share spatial proximity in a way such that the quantum state of each particle...',
        category: 'Physics',
        difficulty: 'Expert'
    }
];