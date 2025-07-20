/**
 * Search Results functionality for KnowledgeAI Hub
 * Handles displaying and filtering search results
 */

document.addEventListener('DOMContentLoaded', function() {
    initSearchResults();
});

/**
 * Initialize search results page
 */
function initSearchResults() {
    // Get query parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (query) {
        // Display the query in the search input and header
        document.getElementById('search-input').value = query;
        const searchQueryElement = document.getElementById('search-query');
        if (searchQueryElement) {
            searchQueryElement.textContent = query;
        }
        
        // Fetch search results
        fetchSearchResults(query);
        
        // Fetch related searches
        fetchRelatedSearches(query);
    } else {
        // No query provided, show empty state
        displayEmptyState();
    }
    
    // Initialize filters
    initFilters();
}

/**
 * Initialize filter functionality
 */
function initFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    
    if (categoryFilter && difficultyFilter) {
        // Add event listeners to filters
        categoryFilter.addEventListener('change', applyFilters);
        difficultyFilter.addEventListener('change', applyFilters);
    }
}

/**
 * Apply filters to search results
 */
function applyFilters() {
    const categoryFilter = document.getElementById('category-filter').value;
    const difficultyFilter = document.getElementById('difficulty-filter').value;
    
    // Get all result items
    const resultItems = document.querySelectorAll('.result-item');
    
    // Filter results based on selected filters
    resultItems.forEach(item => {
        const category = item.getAttribute('data-category').toLowerCase();
        const difficulty = item.getAttribute('data-difficulty').toLowerCase();
        
        const categoryMatch = categoryFilter === 'all' || category === categoryFilter.toLowerCase();
        const difficultyMatch = difficultyFilter === 'all' || difficulty === difficultyFilter.toLowerCase();
        
        // Show or hide based on filter match
        if (categoryMatch && difficultyMatch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Update results count
    updateResultsCount();
}

/**
 * Update the count of visible results
 */
function updateResultsCount() {
    const visibleResults = document.querySelectorAll('.result-item[style="display: block"]').length;
    const resultsHeader = document.querySelector('.search-results-header h1');
    
    if (resultsHeader) {
        const queryText = document.getElementById('search-query').textContent;
        resultsHeader.innerHTML = `Search Results for: <span id="search-query">${queryText}</span> <span class="results-count">(${visibleResults} results)</span>`;
    }
}

/**
 * Fetch search results for the given query
 * @param {string} query - Search query
 */
function fetchSearchResults(query) {
    // In a real application, this would make an API call to fetch search results
    // For demo purposes, we'll use sample data
    
    // Show loading state
    const resultsContainer = document.getElementById('search-results');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Loading results...</span>
            </div>
        `;
    }
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Generate sample results based on the query
        const results = generateSampleResults(query);
        
        // Display results
        displaySearchResults(results);
        
        // Initialize pagination if there are results
        if (results.length > 0) {
            initPagination(results);
        }
        
        // Announce for screen readers
        if (window.announceToScreenReader) {
            window.announceToScreenReader(`${results.length} search results found for ${query}`);
        }
    }, 1500);
}

/**
 * Generate sample search results based on query
 * @param {string} query - Search query
 * @returns {Array} - Array of result objects
 */
function generateSampleResults(query) {
    // Sample categories and difficulties for random assignment
    const categories = ['Science', 'History', 'Geography', 'Technology', 'Competitive'];
    const difficulties = ['Basic', 'Intermediate', 'Advanced', 'Expert'];
    
    // Sample result templates
    const resultTemplates = [
        {
            title: 'What is {topic}?',
            snippet: '{topic} is a fundamental concept in {field} that deals with {description}...',
            field: 'General Knowledge'
        },
        {
            title: '{topic} Explained',
            snippet: 'An in-depth explanation of {topic} and its significance in {field}...',
            field: 'Science'
        },
        {
            title: 'The History of {topic}',
            snippet: 'Exploring the historical development and evolution of {topic} throughout the ages...',
            field: 'History'
        },
        {
            title: '{topic} in Modern Applications',
            snippet: 'How {topic} is applied in contemporary {field} and its practical implications...',
            field: 'Technology'
        },
        {
            title: 'Understanding {topic} for Competitive Exams',
            snippet: 'Key concepts and important facts about {topic} that frequently appear in competitive examinations...',
            field: 'Competitive Exams'
        }
    ];
    
    // Generate 10-15 sample results
    const count = Math.floor(Math.random() * 6) + 10;
    const results = [];
    
    for (let i = 0; i < count; i++) {
        // Select a random template
        const template = resultTemplates[Math.floor(Math.random() * resultTemplates.length)];
        
        // Generate a result based on the query and template
        const category = categories[Math.floor(Math.random() * categories.length)];
        const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
        
        // Create variations of the query for more diverse results
        const queryVariations = [
            query,
            query + ' principles',
            query + ' theory',
            query + ' applications',
            'advanced ' + query,
            query + ' fundamentals',
            query + ' in ' + category.toLowerCase(),
            query + ' for beginners',
            query + ' explained simply',
            query + ' advanced concepts'
        ];
        
        const topicVariation = queryVariations[Math.floor(Math.random() * queryVariations.length)];
        
        results.push({
            title: template.title.replace('{topic}', topicVariation),
            snippet: template.snippet
                .replace('{topic}', query)
                .replace('{field}', template.field)
                .replace('{description}', 'various principles and concepts'),
            category: category,
            difficulty: difficulty,
            url: '#' + i, // In a real app, this would be a real URL
            id: 'result-' + i
        });
    }
    
    return results;
}

/**
 * Display search results
 * @param {Array} results - Array of result objects
 */
function displaySearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    
    if (resultsContainer) {
        if (results.length > 0) {
            // Clear loading spinner
            resultsContainer.innerHTML = '';
            
            // Create result items
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.setAttribute('data-category', result.category);
                resultItem.setAttribute('data-difficulty', result.difficulty);
                resultItem.id = result.id;
                
                resultItem.innerHTML = `
                    <h2><a href="#" class="result-title">${result.title}</a></h2>
                    <p class="result-snippet">${result.snippet}</p>
                    <div class="result-meta">
                        <span class="result-category">${result.category}</span>
                        <span class="result-difficulty">${result.difficulty}</span>
                    </div>
                `;
                
                // Add click event to open modal with detailed answer
                const titleLink = resultItem.querySelector('.result-title');
                titleLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    openAnswerModal(result);
                });
                
                resultsContainer.appendChild(resultItem);
            });
            
            // Update results count
            updateResultsCount();
        } else {
            // No results found
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h2>No results found</h2>
                    <p>Try different keywords or browse our categories below</p>
                </div>
            `;
        }
    }
}

/**
 * Initialize pagination
 * @param {Array} results - Array of all result objects
 */
function initPagination(results) {
    const resultsPerPage = 5;
    const totalPages = Math.ceil(results.length / resultsPerPage);
    let currentPage = 1;
    
    // Update total pages display
    document.querySelector('.total-pages').textContent = totalPages;
    
    // Show only first page results
    showPage(currentPage, resultsPerPage);
    
    // Add event listeners to pagination buttons
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage, resultsPerPage);
                updatePaginationButtons(currentPage, totalPages);
            }
        });
        
        nextButton.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage, resultsPerPage);
                updatePaginationButtons(currentPage, totalPages);
            }
        });
        
        // Initialize button states
        updatePaginationButtons(currentPage, totalPages);
    }
}

/**
 * Show specific page of results
 * @param {number} page - Page number to show
 * @param {number} resultsPerPage - Number of results per page
 */
function showPage(page, resultsPerPage) {
    const resultItems = document.querySelectorAll('.result-item');
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    
    // Hide all results first
    resultItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Update current page display
    document.querySelector('.current-page').textContent = page;
    
    // Scroll to top of results
    document.querySelector('.search-results-section').scrollIntoView({ behavior: 'smooth' });
    
    // Announce page change for screen readers
    if (window.announceToScreenReader) {
        window.announceToScreenReader(`Showing page ${page} of search results`);
    }
}

/**
 * Update pagination button states
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 */
function updatePaginationButtons(currentPage, totalPages) {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    
    if (prevButton && nextButton) {
        // Enable/disable previous button
        if (currentPage <= 1) {
            prevButton.disabled = true;
            prevButton.setAttribute('aria-disabled', 'true');
        } else {
            prevButton.disabled = false;
            prevButton.setAttribute('aria-disabled', 'false');
        }
        
        // Enable/disable next button
        if (currentPage >= totalPages) {
            nextButton.disabled = true;
            nextButton.setAttribute('aria-disabled', 'true');
        } else {
            nextButton.disabled = false;
            nextButton.setAttribute('aria-disabled', 'false');
        }
    }
}

/**
 * Fetch related searches for the given query
 * @param {string} query - Search query
 */
function fetchRelatedSearches(query) {
    // In a real application, this would make an API call to fetch related searches
    // For demo purposes, we'll generate some related searches based on the query
    
    // Generate related searches
    const relatedSearches = generateRelatedSearches(query);
    
    // Display related searches
    displayRelatedSearches(relatedSearches);
}

/**
 * Generate related searches based on query
 * @param {string} query - Search query
 * @returns {Array} - Array of related search strings
 */
function generateRelatedSearches(query) {
    // Sample related search templates
    const templates = [
        '{query} definition',
        '{query} examples',
        '{query} vs',
        'how does {query} work',
        '{query} applications',
        '{query} history',
        '{query} for beginners',
        'advanced {query}',
        '{query} in science',
        '{query} in technology',
        '{query} importance',
        '{query} advantages',
        '{query} disadvantages',
        '{query} future',
        '{query} types'
    ];
    
    // Select 5-8 random templates
    const count = Math.floor(Math.random() * 4) + 5;
    const selectedTemplates = [];
    
    // Ensure we don't have duplicates
    while (selectedTemplates.length < count) {
        const template = templates[Math.floor(Math.random() * templates.length)];
        if (!selectedTemplates.includes(template)) {
            selectedTemplates.push(template);
        }
    }
    
    // Generate related searches by replacing {query} with the actual query
    return selectedTemplates.map(template => template.replace('{query}', query));
}

/**
 * Display related searches
 * @param {Array} relatedSearches - Array of related search strings
 */
function displayRelatedSearches(relatedSearches) {
    const relatedSearchesContainer = document.getElementById('related-searches');
    
    if (relatedSearchesContainer && relatedSearches.length > 0) {
        // Clear previous related searches
        relatedSearchesContainer.innerHTML = '';
        
        // Create related search items
        relatedSearches.forEach(search => {
            const searchItem = document.createElement('a');
            searchItem.href = `search-results.html?q=${encodeURIComponent(search)}`;
            searchItem.className = 'related-search-item';
            searchItem.textContent = search;
            
            relatedSearchesContainer.appendChild(searchItem);
        });
    }
}

/**
 * Display empty state when no query is provided
 */
function displayEmptyState() {
    const resultsContainer = document.getElementById('search-results');
    const searchQueryElement = document.getElementById('search-query');
    
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h2>No search query provided</h2>
                <p>Please enter a search term in the search box above</p>
            </div>
        `;
    }
    
    if (searchQueryElement) {
        searchQueryElement.textContent = 'No query';
    }
}

/**
 * Open answer modal with detailed information
 * @param {Object} result - Result object
 */
function openAnswerModal(result) {
    const modal = document.getElementById('answer-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (modal && modalTitle && modalContent) {
        // Set modal title
        modalTitle.textContent = result.title;
        
        // Generate detailed content for the modal
        const detailedContent = generateDetailedContent(result);
        modalContent.innerHTML = detailedContent;
        
        // Show modal
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
        
        // Add event listener to close button
        const closeButton = modal.querySelector('.close-modal');
        if (closeButton) {
            closeButton.addEventListener('click', closeAnswerModal);
        }
        
        // Add event listener to speak button
        const speakButton = document.getElementById('speak-answer');
        if (speakButton) {
            speakButton.addEventListener('click', function() {
                // Use the voice assistant to speak the answer
                if (window.speakText) {
                    const textToSpeak = result.title + '. ' + stripHtml(detailedContent);
                    window.speakText(textToSpeak);
                }
            });
        }
        
        // Add event listener to download button
        const downloadButton = document.getElementById('download-answer');
        if (downloadButton) {
            downloadButton.addEventListener('click', function() {
                downloadAnswer(result.title, stripHtml(detailedContent));
            });
        }
        
        // Add event listener to share button
        const shareButton = document.getElementById('share-answer');
        if (shareButton) {
            shareButton.addEventListener('click', function() {
                shareAnswer(result.title, window.location.href);
            });
        }
        
        // Add event listener to close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeAnswerModal();
            }
        });
        
        // Add event listener to close modal with ESC key
        window.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeAnswerModal();
            }
        });
        
        // Focus on the modal for accessibility
        modalTitle.focus();
    }
}

/**
 * Close answer modal
 */
function closeAnswerModal() {
    const modal = document.getElementById('answer-modal');
    
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        
        // Stop speaking if active
        if (window.stopSpeaking) {
            window.stopSpeaking();
        }
        
        // Return focus to the last clicked result for accessibility
        const lastClickedResult = document.activeElement;
        if (lastClickedResult && lastClickedResult.classList.contains('result-title')) {
            lastClickedResult.focus();
        }
    }
}

/**
 * Generate detailed content for the modal
 * @param {Object} result - Result object
 * @returns {string} - HTML content for the modal
 */
function generateDetailedContent(result) {
    // In a real application, this would fetch detailed content from an API
    // For demo purposes, we'll generate some sample content
    
    const content = `
        <div class="answer-content">
            <div class="answer-meta">
                <span class="answer-category"><i class="fas fa-folder"></i> ${result.category}</span>
                <span class="answer-difficulty"><i class="fas fa-signal"></i> ${result.difficulty}</span>
            </div>
            
            <div class="answer-text">
                <p><strong>Definition:</strong> ${result.snippet}</p>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
                
                <h3>Key Points</h3>
                <ul>
                    <li>Point 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Point 2: Nullam auctor, nisl eget ultricies tincidunt.</li>
                    <li>Point 3: Nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</li>
                    <li>Point 4: Nullam auctor, nisl eget ultricies tincidunt.</li>
                </ul>
                
                <h3>Examples</h3>
                <p>Example 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Example 2: Nullam auctor, nisl eget ultricies tincidunt.</p>
                
                <div class="answer-image">
                    <img src="https://via.placeholder.com/600x300?text=${encodeURIComponent(result.title)}" alt="Illustration for ${result.title}">
                    <p class="image-caption">Fig 1: Illustration of ${result.title}</p>
                </div>
                
                <h3>Applications</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
                
                <h3>References</h3>
                <ol class="references">
                    <li>Reference 1: Lorem ipsum dolor sit amet (2023)</li>
                    <li>Reference 2: Consectetur adipiscing elit (2022)</li>
                    <li>Reference 3: Nullam auctor, nisl eget ultricies tincidunt (2021)</li>
                </ol>
            </div>
        </div>
    `;
    
    return content;
}

/**
 * Strip HTML tags from a string
 * @param {string} html - HTML string
 * @returns {string} - Plain text string
 */
function stripHtml(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
}

/**
 * Download answer as a text file
 * @param {string} title - Answer title
 * @param {string} content - Answer content
 */
function downloadAnswer(title, content) {
    const filename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.txt';
    const text = title + '\n\n' + content;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    
    element.style.display = 'none';
    document.body.appendChild(element);
    
    element.click();
    
    document.body.removeChild(element);
    
    // Announce for screen readers
    if (window.announceToScreenReader) {
        window.announceToScreenReader('Answer downloaded as ' + filename);
    }
}

/**
 * Share answer using Web Share API or fallback to copy link
 * @param {string} title - Answer title
 * @param {string} url - URL to share
 */
function shareAnswer(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: 'Check out this answer on AI Knowledge & GK Hub',
            url: url
        }).then(() => {
            // Announce for screen readers
            if (window.announceToScreenReader) {
                window.announceToScreenReader('Answer shared successfully');
            }
        }).catch(error => {
            console.error('Error sharing:', error);
        });
    } else {
        // Fallback to copying the URL to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
            
            // Announce for screen readers
            if (window.announceToScreenReader) {
                window.announceToScreenReader('Link copied to clipboard');
            }
        }).catch(error => {
            console.error('Error copying link:', error);
        });
    }
}