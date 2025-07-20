/**
 * Category Detail functionality for KnowledgeAI Hub
 * Handles loading, filtering, and displaying category-specific questions
 */

document.addEventListener('DOMContentLoaded', function() {
    initCategoryDetail();
});

/**
 * Initialize category detail functionality
 */
function initCategoryDetail() {
    // Get category name from URL or page title
    const categoryName = getCategoryFromPage();
    
    // Load questions for this category
    loadCategoryQuestions(categoryName);
    
    // Initialize filters
    initFilters();
    
    // Initialize view toggle
    initViewToggle();
    
    // Initialize pagination
    initPagination();
    
    // Initialize search within category
    initCategorySearch();
}

/**
 * Get category name from page
 * @returns {string} - Category name
 */
function getCategoryFromPage() {
    // Try to get from URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
        return decodeURIComponent(categoryParam);
    }
    
    // Otherwise get from page heading
    const categoryHeading = document.querySelector('.category-info h1');
    return categoryHeading ? categoryHeading.textContent : 'Science';
}

/**
 * Initialize filters functionality
 */
function initFilters() {
    const topicFilter = document.getElementById('topic-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const examFilter = document.getElementById('exam-filter');
    const typeFilter = document.getElementById('type-filter');
    const applyButton = document.getElementById('apply-filters');
    const resetButton = document.getElementById('reset-filters');
    
    if (applyButton && resetButton) {
        // Add event listener to apply button
        applyButton.addEventListener('click', applyFilters);
        
        // Add event listener to reset button
        resetButton.addEventListener('click', resetFilters);
    }
}

/**
 * Apply filters to questions
 */
function applyFilters() {
    const topicFilter = document.getElementById('topic-filter').value;
    const difficultyFilter = document.getElementById('difficulty-filter').value;
    const examFilter = document.getElementById('exam-filter').value;
    const typeFilter = document.getElementById('type-filter').value;
    
    // Show loading state
    const questionsContainer = document.getElementById('questions-container');
    if (questionsContainer) {
        questionsContainer.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Filtering questions...</span>
            </div>
        `;
    }
    
    // In a real application, this would make an API call with filter parameters
    // For demo purposes, we'll simulate filtering with a timeout
    setTimeout(() => {
        // Generate filtered questions
        const filteredQuestions = generateSampleQuestions(10, {
            topic: topicFilter !== 'all' ? topicFilter : null,
            difficulty: difficultyFilter !== 'all' ? difficultyFilter : null,
            exam: examFilter !== 'all' ? examFilter : null,
            type: typeFilter !== 'all' ? typeFilter : null
        });
        
        // Display filtered questions
        displayQuestions(filteredQuestions);
        
        // Update questions count
        updateQuestionsCount(filteredQuestions.length);
        
        // Announce filter changes for screen readers
        if (window.announceToScreenReader) {
            window.announceToScreenReader(`Filters applied. ${filteredQuestions.length} questions shown.`);
        }
    }, 1000);
}

/**
 * Reset filters to default values
 */
function resetFilters() {
    // Reset filter select elements
    document.getElementById('topic-filter').value = 'all';
    document.getElementById('difficulty-filter').value = 'all';
    document.getElementById('exam-filter').value = 'all';
    document.getElementById('type-filter').value = 'all';
    
    // Apply filters with reset values
    applyFilters();
    
    // Announce for screen readers
    if (window.announceToScreenReader) {
        window.announceToScreenReader('Filters have been reset.');
    }
}

/**
 * Initialize view toggle functionality
 */
function initViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const questionsContainer = document.getElementById('questions-container');
    
    if (viewButtons.length && questionsContainer) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                viewButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get view type
                const viewType = this.getAttribute('data-view');
                
                // Update container class
                questionsContainer.className = `questions-container ${viewType}-view`;
                
                // Announce view change for screen readers
                if (window.announceToScreenReader) {
                    window.announceToScreenReader(`View changed to ${viewType} view.`);
                }
            });
        });
    }
}

/**
 * Initialize pagination functionality
 */
function initPagination() {
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const prevButton = document.querySelector('.pagination-btn.prev');
    const nextButton = document.querySelector('.pagination-btn.next');
    
    if (paginationNumbers.length) {
        // Add event listeners to pagination numbers
        paginationNumbers.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all pagination numbers
                paginationNumbers.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked pagination number
                this.classList.add('active');
                
                // Get page number
                const pageNumber = parseInt(this.textContent);
                
                // Load questions for this page
                loadPageQuestions(pageNumber);
                
                // Update prev/next button states
                updatePaginationButtons(pageNumber);
            });
        });
    }
    
    if (prevButton && nextButton) {
        // Add event listener to prev button
        prevButton.addEventListener('click', function() {
            if (!this.disabled) {
                const activePage = document.querySelector('.pagination-number.active');
                const pageNumber = parseInt(activePage.textContent);
                
                if (pageNumber > 1) {
                    // Simulate click on previous page number
                    const prevPage = Array.from(paginationNumbers).find(btn => parseInt(btn.textContent) === pageNumber - 1);
                    if (prevPage) {
                        prevPage.click();
                    }
                }
            }
        });
        
        // Add event listener to next button
        nextButton.addEventListener('click', function() {
            if (!this.disabled) {
                const activePage = document.querySelector('.pagination-number.active');
                const pageNumber = parseInt(activePage.textContent);
                const maxPage = parseInt(paginationNumbers[paginationNumbers.length - 1].textContent);
                
                if (pageNumber < maxPage) {
                    // Simulate click on next page number
                    const nextPage = Array.from(paginationNumbers).find(btn => parseInt(btn.textContent) === pageNumber + 1);
                    if (nextPage) {
                        nextPage.click();
                    }
                }
            }
        });
    }
}

/**
 * Update pagination buttons based on current page
 * @param {number} pageNumber - Current page number
 */
function updatePaginationButtons(pageNumber) {
    const prevButton = document.querySelector('.pagination-btn.prev');
    const nextButton = document.querySelector('.pagination-btn.next');
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const maxPage = parseInt(paginationNumbers[paginationNumbers.length - 1].textContent);
    
    if (prevButton && nextButton) {
        // Update prev button state
        prevButton.disabled = pageNumber === 1;
        
        // Update next button state
        nextButton.disabled = pageNumber === maxPage;
    }
}

/**
 * Initialize category search functionality
 */
function initCategorySearch() {
    const searchInput = document.getElementById('category-search');
    const voiceSearchButton = document.getElementById('voice-search-btn');
    const searchSuggestions = document.getElementById('search-suggestions');
    
    if (searchInput && searchSuggestions) {
        // Add event listener to search input
        searchInput.addEventListener('input', debounce(function() {
            const query = this.value.trim();
            
            if (query.length >= 2) {
                // In a real application, this would make an API call to get suggestions
                // For demo purposes, we'll use sample data
                const suggestions = getSampleSearchSuggestions(query);
                displaySearchSuggestions(suggestions);
            } else {
                // Hide suggestions if query is too short
                searchSuggestions.innerHTML = '';
                searchSuggestions.style.display = 'none';
            }
        }, 300));
        
        // Add event listener to search input for Enter key
        searchInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const query = this.value.trim();
                
                if (query.length >= 2) {
                    performSearch(query);
                }
            }
        });
        
        // Add event listener to document to hide suggestions when clicking outside
        document.addEventListener('click', function(event) {
            if (!searchInput.contains(event.target) && !searchSuggestions.contains(event.target)) {
                searchSuggestions.style.display = 'none';
            }
        });
    }
    
    if (voiceSearchButton) {
        // Add event listener to voice search button
        voiceSearchButton.addEventListener('click', function() {
            // Use the voice assistant to start voice search
            if (window.initVoiceSearch) {
                window.initVoiceSearch(function(transcript) {
                    // Set the transcript as search input value
                    searchInput.value = transcript;
                    
                    // Perform search
                    performSearch(transcript);
                });
            }
        });
    }
}

/**
 * Perform search within category
 * @param {string} query - Search query
 */
function performSearch(query) {
    // Show loading state
    const questionsContainer = document.getElementById('questions-container');
    if (questionsContainer) {
        questionsContainer.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Searching for "${query}"...</span>
            </div>
        `;
    }
    
    // In a real application, this would make an API call to search for questions
    // For demo purposes, we'll simulate search with a timeout
    setTimeout(() => {
        // Generate search results
        const searchResults = generateSampleQuestions(5, { searchQuery: query });
        
        // Display search results
        displayQuestions(searchResults);
        
        // Update questions count
        updateQuestionsCount(searchResults.length, query);
        
        // Announce search results for screen readers
        if (window.announceToScreenReader) {
            window.announceToScreenReader(`Search complete. ${searchResults.length} results found for ${query}.`);
        }
    }, 1000);
}

/**
 * Get sample search suggestions based on query
 * @param {string} query - Search query
 * @returns {Array} - Array of suggestion objects
 */
function getSampleSearchSuggestions(query) {
    // Sample suggestions based on query
    const allSuggestions = [
        { text: 'What is quantum entanglement?', category: 'Physics' },
        { text: 'How does photosynthesis work?', category: 'Biology' },
        { text: 'Explain the periodic table', category: 'Chemistry' },
        { text: 'What are black holes?', category: 'Astronomy' },
        { text: 'How do vaccines work?', category: 'Biology' },
        { text: 'What is Newton\'s third law?', category: 'Physics' },
        { text: 'Explain DNA replication', category: 'Biology' },
        { text: 'What is the greenhouse effect?', category: 'Earth Science' },
        { text: 'How do chemical bonds form?', category: 'Chemistry' },
        { text: 'What is the theory of relativity?', category: 'Physics' }
    ];
    
    // Filter suggestions based on query
    return allSuggestions.filter(suggestion => 
        suggestion.text.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5); // Limit to 5 suggestions
}

/**
 * Display search suggestions
 * @param {Array} suggestions - Array of suggestion objects
 */
function displaySearchSuggestions(suggestions) {
    const searchSuggestions = document.getElementById('search-suggestions');
    
    if (searchSuggestions) {
        if (suggestions.length > 0) {
            // Create suggestions HTML
            let suggestionsHTML = '';
            
            suggestions.forEach(suggestion => {
                suggestionsHTML += `
                    <div class="search-suggestion-item">
                        <div class="suggestion-text">${suggestion.text}</div>
                        <div class="suggestion-category">${suggestion.category}</div>
                    </div>
                `;
            });
            
            // Update suggestions container
            searchSuggestions.innerHTML = suggestionsHTML;
            searchSuggestions.style.display = 'block';
            
            // Add event listeners to suggestion items
            const suggestionItems = searchSuggestions.querySelectorAll('.search-suggestion-item');
            suggestionItems.forEach(item => {
                item.addEventListener('click', function() {
                    const suggestionText = this.querySelector('.suggestion-text').textContent;
                    
                    // Set suggestion text as search input value
                    const searchInput = document.getElementById('category-search');
                    if (searchInput) {
                        searchInput.value = suggestionText;
                    }
                    
                    // Hide suggestions
                    searchSuggestions.style.display = 'none';
                    
                    // Perform search
                    performSearch(suggestionText);
                });
            });
        } else {
            // Hide suggestions if no results
            searchSuggestions.innerHTML = '';
            searchSuggestions.style.display = 'none';
        }
    }
}

/**
 * Load questions for the category
 * @param {string} categoryName - Category name
 */
function loadCategoryQuestions(categoryName) {
    const questionsContainer = document.getElementById('questions-container');
    
    if (questionsContainer) {
        // Show loading state
        questionsContainer.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Loading ${categoryName} questions...</span>
            </div>
        `;
        
        // In a real application, this would make an API call to fetch questions
        // For demo purposes, we'll use sample data with a timeout
        setTimeout(() => {
            // Generate sample questions
            const questions = generateSampleQuestions(10);
            
            // Display questions
            displayQuestions(questions);
            
            // Update questions count
            updateQuestionsCount(questions.length);
            
            // Announce for screen readers
            if (window.announceToScreenReader) {
                window.announceToScreenReader(`${questions.length} ${categoryName} questions loaded.`);
            }
        }, 1500);
    }
}

/**
 * Load questions for a specific page
 * @param {number} pageNumber - Page number
 */
function loadPageQuestions(pageNumber) {
    const questionsContainer = document.getElementById('questions-container');
    
    if (questionsContainer) {
        // Show loading state
        questionsContainer.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Loading page ${pageNumber}...</span>
            </div>
        `;
        
        // In a real application, this would make an API call to fetch questions for the page
        // For demo purposes, we'll use sample data with a timeout
        setTimeout(() => {
            // Generate sample questions
            const questions = generateSampleQuestions(10);
            
            // Display questions
            displayQuestions(questions);
            
            // Update questions count with page info
            const startItem = (pageNumber - 1) * 10 + 1;
            const endItem = startItem + questions.length - 1;
            updateQuestionsCount(5280, null, startItem, endItem);
            
            // Scroll to top of questions section
            const questionsSection = document.querySelector('.category-questions');
            if (questionsSection) {
                questionsSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Announce for screen readers
            if (window.announceToScreenReader) {
                window.announceToScreenReader(`Page ${pageNumber} loaded. Showing questions ${startItem} to ${endItem}.`);
            }
        }, 1000);
    }
}

/**
 * Generate sample questions
 * @param {number} count - Number of questions to generate
 * @param {Object} filters - Optional filters to apply
 * @returns {Array} - Array of question objects
 */
function generateSampleQuestions(count, filters = {}) {
    // Sample topics for science category
    const topics = ['Physics', 'Chemistry', 'Biology', 'Astronomy', 'Earth Science'];
    const difficulties = ['Basic', 'Intermediate', 'Advanced', 'Expert'];
    const exams = ['NEET', 'JEE', 'UPSC', 'SSC', 'GATE'];
    const types = ['mcq', 'descriptive', 'numerical'];
    
    // Sample question templates
    const questionTemplates = [
        {
            question: 'What is the {concept} in {field}?',
            type: 'mcq',
            field: 'Physics'
        },
        {
            question: 'Explain the significance of {concept} in {field}.',
            type: 'descriptive',
            field: 'Chemistry'
        },
        {
            question: 'Calculate the {parameter} when {condition}.',
            type: 'numerical',
            field: 'Physics'
        },
        {
            question: 'How does {process} work in {organism}?',
            type: 'descriptive',
            field: 'Biology'
        },
        {
            question: 'What are the properties of {object} in {field}?',
            type: 'mcq',
            field: 'Astronomy'
        }
    ];
    
    // Sample concepts for questions
    const concepts = [
        'quantum entanglement', 'photosynthesis', 'plate tectonics', 'black holes',
        'chemical bonding', 'cell division', 'nuclear fusion', 'electromagnetic spectrum',
        'periodic table', 'genetic engineering', 'relativity', 'thermodynamics',
        'evolution', 'atomic structure', 'climate change', 'solar system'
    ];
    
    // Generate sample questions
    const questions = [];
    
    for (let i = 0; i < count; i++) {
        // Select a random template
        const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
        
        // Select random attributes or use filter values if provided
        const topic = filters.topic || topics[Math.floor(Math.random() * topics.length)];
        const difficulty = filters.difficulty || difficulties[Math.floor(Math.random() * difficulties.length)];
        const exam = filters.exam || exams[Math.floor(Math.random() * exams.length)];
        const type = filters.type || template.type;
        const concept = concepts[Math.floor(Math.random() * concepts.length)];
        
        // Generate a question based on the template
        let questionText = template.question
            .replace('{concept}', concept)
            .replace('{field}', topic)
            .replace('{parameter}', 'value')
            .replace('{condition}', 'given conditions')
            .replace('{process}', concept)
            .replace('{organism}', 'living systems')
            .replace('{object}', concept);
        
        // If search query is provided, make sure it appears in the question
        if (filters.searchQuery) {
            if (!questionText.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
                questionText = questionText + ` (Related to ${filters.searchQuery})`;
            }
        }
        
        // Generate options for MCQ
        let options = [];
        if (type === 'mcq') {
            options = [
                'Option A: First possible answer',
                'Option B: Second possible answer',
                'Option C: Third possible answer',
                'Option D: Fourth possible answer'
            ];
        }
        
        questions.push({
            id: 'question-' + (i + 1),
            question: questionText,
            type: type,
            topic: topic,
            difficulty: difficulty,
            exam: exam,
            options: options,
            views: Math.floor(Math.random() * 1000) + 100,
            likes: Math.floor(Math.random() * 100) + 10,
            date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
    }
    
    return questions;
}

/**
 * Display questions
 * @param {Array} questions - Array of question objects
 */
function displayQuestions(questions) {
    const questionsContainer = document.getElementById('questions-container');
    
    if (questionsContainer && questions.length > 0) {
        // Clear loading spinner
        questionsContainer.innerHTML = '';
        
        // Create question cards
        questions.forEach(question => {
            const questionCard = createQuestionCard(question);
            questionsContainer.appendChild(questionCard);
        });
    } else if (questionsContainer) {
        // No questions found
        questionsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No questions found</h3>
                <p>Try adjusting your filters or search query.</p>
            </div>
        `;
    }
}

/**
 * Create a question card element
 * @param {Object} question - Question object
 * @returns {HTMLElement} - Question card element
 */
function createQuestionCard(question) {
    const questionCard = document.createElement('div');
    questionCard.className = 'question-card';
    questionCard.id = question.id;
    questionCard.setAttribute('data-topic', question.topic);
    questionCard.setAttribute('data-difficulty', question.difficulty);
    questionCard.setAttribute('data-exam', question.exam);
    questionCard.setAttribute('data-type', question.type);
    
    // Create card content based on question type
    let cardContent = '';
    
    // Common header for all question types
    cardContent += `
        <div class="question-header">
            <div class="question-meta">
                <span class="question-topic">${question.topic}</span>
                <span class="question-difficulty">${question.difficulty}</span>
                <span class="question-exam">${question.exam}</span>
                <span class="question-type">${question.type === 'mcq' ? 'Multiple Choice' : question.type === 'descriptive' ? 'Descriptive' : 'Numerical'}</span>
            </div>
            <div class="question-date">${question.date}</div>
        </div>
        <h3 class="question-title">${question.question}</h3>
    `;
    
    // Type-specific content
    if (question.type === 'mcq') {
        cardContent += `
            <div class="question-options">
                <ul>
                    ${question.options.map(option => `<li>${option}</li>`).join('')}
                </ul>
            </div>
        `;
    } else if (question.type === 'numerical') {
        cardContent += `
            <div class="question-numerical">
                <p>This is a numerical problem that requires calculation.</p>
            </div>
        `;
    } else {
        cardContent += `
            <div class="question-descriptive">
                <p>This is a descriptive question that requires a detailed answer.</p>
            </div>
        `;
    }
    
    // Common footer for all question types
    cardContent += `
        <div class="question-footer">
            <div class="question-stats">
                <span><i class="far fa-eye"></i> ${question.views}</span>
                <span><i class="far fa-thumbs-up"></i> ${question.likes}</span>
            </div>
            <button class="btn-view-answer">View Answer</button>
        </div>
    `;
    
    questionCard.innerHTML = cardContent;
    
    // Add event listener to view answer button
    const viewAnswerButton = questionCard.querySelector('.btn-view-answer');
    if (viewAnswerButton) {
        viewAnswerButton.addEventListener('click', function() {
            openAnswerModal(question);
        });
    }
    
    return questionCard;
}

/**
 * Update questions count display
 * @param {number} count - Total number of questions
 * @param {string} searchQuery - Optional search query
 * @param {number} startItem - Optional start item number
 * @param {number} endItem - Optional end item number
 */
function updateQuestionsCount(count, searchQuery = null, startItem = 1, endItem = null) {
    const questionsCountElement = document.getElementById('questions-count');
    
    if (questionsCountElement) {
        if (!endItem) {
            endItem = Math.min(startItem + count - 1, 5280);
        }
        
        let countText = '';
        
        if (searchQuery) {
            countText = `Showing ${count} results for "${searchQuery}"`;
        } else if (count === 5280) {
            countText = `Showing ${startItem}-${endItem} of 5,280 questions`;
        } else {
            countText = `Showing ${count} questions`;
        }
        
        questionsCountElement.textContent = countText;
    }
}

/**
 * Open answer modal with detailed information
 * @param {Object} question - Question object
 */
function openAnswerModal(question) {
    const modal = document.getElementById('answer-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (modal && modalTitle && modalContent) {
        // Set modal title
        modalTitle.textContent = question.question;
        
        // Generate detailed content for the modal
        const detailedContent = generateDetailedAnswer(question);
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
                    const textToSpeak = question.question + '. ' + stripHtml(detailedContent);
                    window.speakText(textToSpeak);
                }
            });
        }
        
        // Add event listener to download button
        const downloadButton = document.getElementById('download-answer');
        if (downloadButton) {
            downloadButton.addEventListener('click', function() {
                downloadAnswer(question.question, stripHtml(detailedContent));
            });
        }
        
        // Add event listener to share button
        const shareButton = document.getElementById('share-answer');
        if (shareButton) {
            shareButton.addEventListener('click', function() {
                shareAnswer(question.question, window.location.href + '#' + question.id);
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
    }
}

/**
 * Generate detailed answer for the modal
 * @param {Object} question - Question object
 * @returns {string} - HTML content for the modal
 */
function generateDetailedAnswer(question) {
    // In a real application, this would fetch detailed content from an API
    // For demo purposes, we'll generate some sample content
    
    let content = `
        <div class="answer-content">
            <div class="answer-meta">
                <span class="answer-topic"><i class="fas fa-folder"></i> ${question.topic}</span>
                <span class="answer-difficulty"><i class="fas fa-signal"></i> ${question.difficulty}</span>
                <span class="answer-exam"><i class="fas fa-graduation-cap"></i> ${question.exam}</span>
            </div>
    `;
    
    // Different content based on question type
    if (question.type === 'mcq') {
        content += `
            <div class="answer-text">
                <h3>Question:</h3>
                <p>${question.question}</p>
                
                <h3>Options:</h3>
                <ul class="answer-options">
                    ${question.options.map((option, index) => `
                        <li class="${index === 2 ? 'correct' : ''}">${option} ${index === 2 ? '<span class="correct-badge">Correct</span>' : ''}</li>
                    `).join('')}
                </ul>
                
                <h3>Explanation:</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
                
                <div class="answer-image">
                    <img src="https://via.placeholder.com/600x300?text=${encodeURIComponent(question.question)}" alt="Illustration for ${question.question}">
                    <p class="image-caption">Fig 1: Illustration related to the question</p>
                </div>
                
                <h3>Additional Information:</h3>
                <p>Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                
                <h3>Related Questions:</h3>
                <ul class="related-questions">
                    <li><a href="#">Related question 1</a></li>
                    <li><a href="#">Related question 2</a></li>
                    <li><a href="#">Related question 3</a></li>
                </ul>
            </div>
        `;
    } else if (question.type === 'numerical') {
        content += `
            <div class="answer-text">
                <h3>Question:</h3>
                <p>${question.question}</p>
                
                <h3>Solution:</h3>
                <div class="step-by-step">
                    <div class="step">
                        <h4>Step 1: Understand the problem</h4>
                        <p>First, we need to identify the variables and what we're solving for.</p>
                    </div>
                    <div class="step">
                        <h4>Step 2: Apply the formula</h4>
                        <p>We'll use the appropriate formula for this problem: E = mc²</p>
                        <div class="formula">
                            <img src="https://via.placeholder.com/400x100?text=Formula" alt="Formula">
                        </div>
                    </div>
                    <div class="step">
                        <h4>Step 3: Calculate the result</h4>
                        <p>Substituting the values, we get:</p>
                        <div class="calculation">
                            <p>Result = 42</p>
                        </div>
                    </div>
                </div>
                
                <h3>Final Answer:</h3>
                <div class="final-answer">42</div>
                
                <h3>Additional Notes:</h3>
                <p>This type of problem frequently appears in competitive exams. Make sure to remember the formula and practice similar problems.</p>
            </div>
        `;
    } else {
        content += `
            <div class="answer-text">
                <h3>Question:</h3>
                <p>${question.question}</p>
                
                <h3>Answer:</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
                
                <h3>Key Points:</h3>
                <ul>
                    <li>Point 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Point 2: Nullam auctor, nisl eget ultricies tincidunt.</li>
                    <li>Point 3: Nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</li>
                    <li>Point 4: Nullam auctor, nisl eget ultricies tincidunt.</li>
                </ul>
                
                <div class="answer-image">
                    <img src="https://via.placeholder.com/600x300?text=${encodeURIComponent(question.question)}" alt="Illustration for ${question.question}">
                    <p class="image-caption">Fig 1: Illustration related to the question</p>
                </div>
                
                <h3>Conclusion:</h3>
                <p>In conclusion, lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
                
                <h3>References:</h3>
                <ol class="references">
                    <li>Reference 1: Lorem ipsum dolor sit amet (2023)</li>
                    <li>Reference 2: Consectetur adipiscing elit (2022)</li>
                    <li>Reference 3: Nullam auctor, nisl eget ultricies tincidunt (2021)</li>
                </ol>
            </div>
        `;
    }
    
    content += `</div>`;
    
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
            text: 'Check out this question on AI Knowledge & GK Hub',
            url: url
        }).then(() => {
            // Announce for screen readers
            if (window.announceToScreenReader) {
                window.announceToScreenReader('Question shared successfully');
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

/**
 * Debounce function to limit the rate at which a function can fire
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