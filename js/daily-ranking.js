/**
 * Daily Ranking functionality for KnowledgeAI Hub
 * Handles loading, filtering, and displaying daily ranking questions
 */

document.addEventListener('DOMContentLoaded', function() {
    initDailyRanking();
});

/**
 * Initialize daily ranking functionality
 */
function initDailyRanking() {
    // Load daily questions
    loadDailyQuestions();
    
    // Initialize filters
    initFilters();
    
    // Initialize view toggle
    initViewToggle();
    
    // Initialize load more button
    initLoadMore();
    
    // Initialize calendar
    initCalendar();
    
    // Initialize download button
    initDownloadButton();
}

/**
 * Initialize filters functionality
 */
function initFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const examFilter = document.getElementById('exam-filter');
    
    if (categoryFilter && difficultyFilter && examFilter) {
        // Add event listeners to filters
        categoryFilter.addEventListener('change', applyFilters);
        difficultyFilter.addEventListener('change', applyFilters);
        examFilter.addEventListener('change', applyFilters);
    }
}

/**
 * Apply filters to daily questions
 */
function applyFilters() {
    const categoryFilter = document.getElementById('category-filter').value;
    const difficultyFilter = document.getElementById('difficulty-filter').value;
    const examFilter = document.getElementById('exam-filter').value;
    
    // Get all question items
    const questionItems = document.querySelectorAll('.question-card');
    
    // Filter questions based on selected filters
    questionItems.forEach(item => {
        const category = item.getAttribute('data-category').toLowerCase();
        const difficulty = item.getAttribute('data-difficulty').toLowerCase();
        const exam = item.getAttribute('data-exam').toLowerCase();
        
        const categoryMatch = categoryFilter === 'all' || category === categoryFilter.toLowerCase();
        const difficultyMatch = difficultyFilter === 'all' || difficulty === difficultyFilter.toLowerCase();
        const examMatch = examFilter === 'all' || exam === examFilter.toLowerCase();
        
        // Show or hide based on filter match
        if (categoryMatch && difficultyMatch && examMatch) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Announce filter changes for screen readers
    if (window.announceToScreenReader) {
        const visibleCount = document.querySelectorAll('.question-card[style=""]').length;
        window.announceToScreenReader(`Filters applied. ${visibleCount} questions shown.`);
    }
}

/**
 * Initialize view toggle functionality
 */
function initViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const questionsContainer = document.getElementById('daily-questions');
    
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
 * Initialize load more button functionality
 */
function initLoadMore() {
    const loadMoreButton = document.getElementById('load-more');
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            // In a real application, this would load more questions from an API
            // For demo purposes, we'll add more sample questions
            loadMoreQuestions();
        });
    }
}

/**
 * Load daily questions
 */
function loadDailyQuestions() {
    const questionsContainer = document.getElementById('daily-questions');
    
    if (questionsContainer) {
        // In a real application, this would make an API call to fetch daily questions
        // For demo purposes, we'll use sample data
        
        // Show loading state
        questionsContainer.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Loading today's top questions...</span>
            </div>
        `;
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Generate sample questions
            const questions = generateSampleQuestions(10);
            
            // Display questions
            displayQuestions(questions);
            
            // Announce for screen readers
            if (window.announceToScreenReader) {
                window.announceToScreenReader(`${questions.length} daily ranking questions loaded.`);
            }
        }, 1500);
    }
}

/**
 * Load more questions
 */
function loadMoreQuestions() {
    const loadMoreButton = document.getElementById('load-more');
    
    if (loadMoreButton) {
        // Show loading state
        loadMoreButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Loading...`;
        loadMoreButton.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Generate more sample questions
            const questions = generateSampleQuestions(5);
            
            // Append questions
            appendQuestions(questions);
            
            // Reset button
            loadMoreButton.innerHTML = `<i class="fas fa-plus"></i> Load More Questions`;
            loadMoreButton.disabled = false;
            
            // Announce for screen readers
            if (window.announceToScreenReader) {
                window.announceToScreenReader(`${questions.length} more questions loaded.`);
            }
        }, 1000);
    }
}

/**
 * Generate sample questions
 * @param {number} count - Number of questions to generate
 * @returns {Array} - Array of question objects
 */
function generateSampleQuestions(count) {
    // Sample categories, difficulties, and exams for random assignment
    const categories = ['Science', 'History', 'Geography', 'Technology', 'Competitive'];
    const difficulties = ['Basic', 'Intermediate', 'Advanced', 'Expert'];
    const exams = ['UPSC', 'SSC', 'NEET', 'JEE', 'Banking'];
    
    // Sample question templates
    const questionTemplates = [
        {
            question: 'What is the {concept} in {field}?',
            type: 'mcq',
            field: 'Science'
        },
        {
            question: 'Explain the significance of {event} in {period}.',
            type: 'descriptive',
            field: 'History'
        },
        {
            question: 'Which {location} is known for {feature}?',
            type: 'mcq',
            field: 'Geography'
        },
        {
            question: 'How does {technology} impact {application}?',
            type: 'descriptive',
            field: 'Technology'
        },
        {
            question: 'Calculate the {parameter} when {condition}.',
            type: 'numerical',
            field: 'Mathematics'
        }
    ];
    
    // Sample concepts for questions
    const concepts = [
        'quantum entanglement', 'photosynthesis', 'plate tectonics', 'blockchain',
        'artificial intelligence', 'climate change', 'genetic engineering', 'nuclear fusion',
        'black holes', 'constitutional amendments', 'industrial revolution', 'cold war',
        'renaissance period', 'economic liberalization', 'periodic table', 'cell division'
    ];
    
    // Generate sample questions
    const questions = [];
    
    for (let i = 0; i < count; i++) {
        // Select a random template
        const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
        
        // Select random attributes
        const category = categories[Math.floor(Math.random() * categories.length)];
        const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
        const exam = exams[Math.floor(Math.random() * exams.length)];
        const concept = concepts[Math.floor(Math.random() * concepts.length)];
        
        // Generate a question based on the template
        let questionText = template.question
            .replace('{concept}', concept)
            .replace('{field}', template.field)
            .replace('{event}', concept)
            .replace('{period}', 'history')
            .replace('{location}', 'region')
            .replace('{feature}', concept)
            .replace('{technology}', concept)
            .replace('{application}', 'modern society')
            .replace('{parameter}', 'value')
            .replace('{condition}', 'given conditions');
        
        // Generate options for MCQ
        let options = [];
        if (template.type === 'mcq') {
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
            type: template.type,
            category: category,
            difficulty: difficulty,
            exam: exam,
            options: options,
            rank: i + 1,
            views: Math.floor(Math.random() * 1000) + 100,
            likes: Math.floor(Math.random() * 100) + 10
        });
    }
    
    return questions;
}

/**
 * Display questions
 * @param {Array} questions - Array of question objects
 */
function displayQuestions(questions) {
    const questionsContainer = document.getElementById('daily-questions');
    
    if (questionsContainer && questions.length > 0) {
        // Clear loading spinner
        questionsContainer.innerHTML = '';
        
        // Create question cards
        questions.forEach(question => {
            const questionCard = createQuestionCard(question);
            questionsContainer.appendChild(questionCard);
        });
    }
}

/**
 * Append questions to the existing list
 * @param {Array} questions - Array of question objects
 */
function appendQuestions(questions) {
    const questionsContainer = document.getElementById('daily-questions');
    
    if (questionsContainer && questions.length > 0) {
        // Create and append question cards
        questions.forEach(question => {
            const questionCard = createQuestionCard(question);
            questionsContainer.appendChild(questionCard);
        });
        
        // Apply current filters to new questions
        applyFilters();
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
    questionCard.setAttribute('data-category', question.category);
    questionCard.setAttribute('data-difficulty', question.difficulty);
    questionCard.setAttribute('data-exam', question.exam);
    
    // Create card content based on question type
    let cardContent = '';
    
    // Common header for all question types
    cardContent += `
        <div class="question-header">
            <div class="question-rank">#${question.rank}</div>
            <div class="question-meta">
                <span class="question-category">${question.category}</span>
                <span class="question-difficulty">${question.difficulty}</span>
                <span class="question-exam">${question.exam}</span>
            </div>
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
 * Initialize calendar functionality
 */
function initCalendar() {
    const calendarContainer = document.getElementById('calendar');
    const currentMonthYearElement = document.getElementById('current-month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    
    if (calendarContainer && currentMonthYearElement && prevMonthButton && nextMonthButton) {
        // Set current date
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
        
        // Generate initial calendar
        generateCalendar(currentMonth, currentYear);
        
        // Add event listeners to navigation buttons
        prevMonthButton.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
        });
        
        nextMonthButton.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
}

/**
 * Generate calendar for the given month and year
 * @param {number} month - Month (0-11)
 * @param {number} year - Year
 */
function generateCalendar(month, year) {
    const calendarContainer = document.getElementById('calendar');
    const currentMonthYearElement = document.getElementById('current-month-year');
    
    if (calendarContainer && currentMonthYearElement) {
        // Update month and year display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthYearElement.textContent = `${monthNames[month]} ${year}`;
        
        // Get first day of month and number of days in month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Create calendar HTML
        let calendarHTML = `
            <div class="calendar-header">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            <div class="calendar-days">
        `;
        
        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += `<div class="calendar-day empty"></div>`;
        }
        
        // Add days of month
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        for (let i = 1; i <= daysInMonth; i++) {
            // Check if this day is today
            const isToday = i === currentDay && month === currentMonth && year === currentYear;
            
            // Check if this day is in the past (has questions)
            const isPast = new Date(year, month, i) < new Date(currentYear, currentMonth, currentDay);
            
            // Create day cell
            if (isToday) {
                calendarHTML += `<div class="calendar-day today">${i}</div>`;
            } else if (isPast) {
                calendarHTML += `<div class="calendar-day past"><a href="daily-ranking.html?date=${year}-${month + 1}-${i}">${i}</a></div>`;
            } else {
                calendarHTML += `<div class="calendar-day">${i}</div>`;
            }
        }
        
        // Add empty cells for days after last day of month
        const totalCells = firstDay + daysInMonth;
        const emptyCellsAfter = 7 - (totalCells % 7);
        if (emptyCellsAfter < 7) {
            for (let i = 0; i < emptyCellsAfter; i++) {
                calendarHTML += `<div class="calendar-day empty"></div>`;
            }
        }
        
        calendarHTML += `</div>`;
        
        // Update calendar container
        calendarContainer.innerHTML = calendarHTML;
        
        // Announce calendar update for screen readers
        if (window.announceToScreenReader) {
            window.announceToScreenReader(`Calendar updated to ${monthNames[month]} ${year}.`);
        }
    }
}

/**
 * Initialize download button functionality
 */
function initDownloadButton() {
    const downloadButton = document.getElementById('download-pdf');
    
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            // In a real application, this would generate and download a PDF
            // For demo purposes, we'll simulate a download
            
            // Show loading state
            const originalButtonText = downloadButton.innerHTML;
            downloadButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Generating PDF...`;
            downloadButton.disabled = true;
            
            // Simulate PDF generation with timeout
            setTimeout(() => {
                // Reset button
                downloadButton.innerHTML = originalButtonText;
                downloadButton.disabled = false;
                
                // Create a dummy download link
                const link = document.createElement('a');
                link.href = '#';
                link.download = `daily-ranking-questions-${new Date().toISOString().split('T')[0]}.pdf`;
                link.click();
                
                // Show success message
                alert('Download started! In a real application, this would download a PDF of today\'s questions.');
                
                // Announce for screen readers
                if (window.announceToScreenReader) {
                    window.announceToScreenReader('PDF download started.');
                }
            }, 2000);
        });
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
                <span class="answer-category"><i class="fas fa-folder"></i> ${question.category}</span>
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