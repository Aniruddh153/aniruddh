/**
 * Main JavaScript file for KnowledgeAI Hub
 * Handles core functionality and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initAnswerModals();
    initSearchSuggestions();
    loadDailyRankingQuestions();
    initNewsletterForm();
    
    // Check for saved preferences
    checkSavedPreferences();
});

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navControls = document.querySelector('.nav-controls');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            navControls.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Add responsive styles for mobile menu when active
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .main-nav.active {
                display: flex;
                flex-direction: column;
                width: 100%;
                margin-top: 1rem;
            }
            
            .main-nav.active li {
                margin: 0.5rem 0;
                width: 100%;
                text-align: center;
            }
            
            .nav-controls.active {
                display: flex;
                justify-content: center;
                width: 100%;
                margin-top: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize answer modals for questions
 */
function initAnswerModals() {
    const modal = document.getElementById('answer-modal');
    const closeModal = document.querySelector('.close-modal');
    const viewAnswerButtons = document.querySelectorAll('.btn-view-answer');
    
    // Sample answers data (in a real application, this would come from an API)
    const sampleAnswers = {
        'What is the significance of Heisenberg\'s Uncertainty Principle in quantum mechanics?': {
            content: `
                <p>Heisenberg's Uncertainty Principle is one of the most fundamental concepts in quantum mechanics, formulated by German physicist Werner Heisenberg in 1927.</p>
                
                <h4>The Principle Explained</h4>
                <p>The principle states that it is impossible to simultaneously measure both the position and momentum of a particle with perfect precision. Mathematically, it is expressed as:</p>
                
                <p>ΔxΔp ≥ ħ/2</p>
                
                <p>Where:</p>
                <ul>
                    <li>Δx is the uncertainty in position</li>
                    <li>Δp is the uncertainty in momentum</li>
                    <li>ħ is the reduced Planck constant (h/2π)</li>
                </ul>
                
                <h4>Significance in Quantum Mechanics</h4>
                <p>The Uncertainty Principle has profound implications:</p>
                
                <ol>
                    <li><strong>Limits of Measurement:</strong> It establishes fundamental limits to what can be known about a quantum system, challenging classical determinism.</li>
                    <li><strong>Wave-Particle Duality:</strong> It supports the concept that particles exhibit both wave-like and particle-like properties.</li>
                    <li><strong>Quantum Fluctuations:</strong> It explains why quantum vacuum cannot be completely empty and contains fluctuating fields.</li>
                    <li><strong>Observer Effect:</strong> The act of measurement itself disturbs the system being measured.</li>
                </ol>
                
                <h4>Practical Applications</h4>
                <p>The Uncertainty Principle has practical implications in:</p>
                <ul>
                    <li>Quantum computing</li>
                    <li>Quantum cryptography</li>
                    <li>Scanning tunneling microscopy</li>
                    <li>Understanding atomic stability</li>
                </ul>
                
                <p>It represents a fundamental departure from classical physics and has been experimentally verified countless times, forming one of the cornerstones of modern quantum theory.</p>
            `,
            relatedQuestions: [
                'What is wave-particle duality in quantum physics?',
                'How does quantum entanglement work?',
                'What are the applications of Schrödinger\'s equation?'
            ]
        },
        'What were the main causes that led to the French Revolution of 1789?': {
            content: `
                <p>The French Revolution of 1789 was a complex historical event with multiple interconnected causes spanning political, economic, social, and intellectual domains.</p>
                
                <h4>Political Causes</h4>
                <ul>
                    <li><strong>Absolute Monarchy:</strong> King Louis XVI held absolute power with no checks and balances, leading to arbitrary governance and widespread resentment.</li>
                    <li><strong>Inefficient Administration:</strong> The government was plagued by corruption, inconsistent laws across regions, and an ineffective bureaucracy.</li>
                    <li><strong>Financial Crisis:</strong> France faced severe debt due to involvement in wars (including the American Revolution) and the lavish spending of the royal court.</li>
                </ul>
                
                <h4>Economic Causes</h4>
                <ul>
                    <li><strong>Regressive Taxation:</strong> The tax burden fell heavily on the Third Estate (commoners), while the clergy and nobility enjoyed tax exemptions.</li>
                    <li><strong>Agricultural Crisis:</strong> Poor harvests in 1788-1789 led to food shortages, inflation, and widespread hunger.</li>
                    <li><strong>Rising Bourgeoisie:</strong> The growing middle class had economic power but lacked corresponding political influence.</li>
                </ul>
                
                <h4>Social Causes</h4>
                <ul>
                    <li><strong>Rigid Class System:</strong> French society was divided into three estates with vast inequality in rights and privileges.</li>
                    <li><strong>First Estate:</strong> The clergy (about 1% of population) owned 10% of land and paid minimal taxes.</li>
                    <li><strong>Second Estate:</strong> The nobility (about 2% of population) held 25% of land and most high positions in government, church, and military.</li>
                    <li><strong>Third Estate:</strong> Comprising 97% of the population (including peasants, bourgeoisie, and urban workers), they carried the tax burden despite having the least wealth and privilege.</li>
                </ul>
                
                <h4>Intellectual Causes</h4>
                <ul>
                    <li><strong>Enlightenment Ideas:</strong> Philosophers like Rousseau, Voltaire, and Montesquieu promoted concepts of equality, freedom, and questioning traditional authority.</li>
                    <li><strong>American Revolution:</strong> The successful American Revolution inspired the French with its ideals of liberty and constitutional government.</li>
                    <li><strong>Spread of Liberal Ideas:</strong> Growing literacy and the circulation of pamphlets and newspapers spread revolutionary ideas.</li>
                </ul>
                
                <h4>Immediate Triggers</h4>
                <ul>
                    <li><strong>Calling of the Estates-General:</strong> In 1789, Louis XVI called the Estates-General (a representative assembly) for the first time since 1614 to address the financial crisis.</li>
                    <li><strong>Tennis Court Oath:</strong> When locked out of their meeting hall, representatives of the Third Estate took an oath not to disperse until they had given France a constitution.</li>
                    <li><strong>Storming of the Bastille:</strong> On July 14, 1789, Parisians stormed the Bastille prison, symbolically marking the beginning of the revolution.</li>
                </ul>
                
                <p>These interconnected factors created the perfect conditions for revolution, transforming France and eventually influencing political developments throughout Europe and the world.</p>
            `,
            relatedQuestions: [
                'What was the Reign of Terror during the French Revolution?',
                'How did Napoleon Bonaparte rise to power after the French Revolution?',
                'What was the significance of the Declaration of the Rights of Man and of the Citizen?'
            ]
        },
        'Explain the process of CRISPR-Cas9 gene editing and its potential applications': {
            content: `
                <p>CRISPR-Cas9 is a revolutionary gene-editing technology that allows scientists to make precise modifications to DNA within organisms.</p>
                
                <h4>The CRISPR-Cas9 System</h4>
                <p>CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) and Cas9 (CRISPR-associated protein 9) were originally discovered as part of the bacterial immune system that defends against viral attacks. Scientists have adapted this natural system into a powerful gene-editing tool.</p>
                
                <h4>How CRISPR-Cas9 Works</h4>
                <ol>
                    <li><strong>Guide RNA Design:</strong> Scientists design a guide RNA (gRNA) that matches the target DNA sequence they want to modify.</li>
                    <li><strong>Complex Formation:</strong> The gRNA forms a complex with the Cas9 enzyme.</li>
                    <li><strong>Target Recognition:</strong> The gRNA guides the Cas9 enzyme to the matching DNA sequence in the genome.</li>
                    <li><strong>DNA Cutting:</strong> Cas9 acts like molecular scissors, cutting both strands of DNA at the target location.</li>
                    <li><strong>DNA Repair:</strong> The cell repairs the cut using one of two mechanisms:
                        <ul>
                            <li><strong>Non-Homologous End Joining (NHEJ):</strong> The cell directly reconnects the cut ends, often introducing small insertions or deletions that can disrupt gene function.</li>
                            <li><strong>Homology Directed Repair (HDR):</strong> If a template DNA is provided, the cell can use it to repair the cut, allowing scientists to insert specific DNA sequences.</li>
                        </ul>
                    </li>
                </ol>
                
                <h4>Advantages of CRISPR-Cas9</h4>
                <ul>
                    <li><strong>Precision:</strong> Targets specific DNA sequences with high accuracy</li>
                    <li><strong>Efficiency:</strong> Edits multiple genes simultaneously</li>
                    <li><strong>Accessibility:</strong> Relatively easy and inexpensive compared to previous gene-editing methods</li>
                    <li><strong>Versatility:</strong> Can be used in virtually any organism</li>
                </ul>
                
                <h4>Potential Applications</h4>
                
                <p><strong>Medical Applications:</strong></p>
                <ul>
                    <li><strong>Treating Genetic Diseases:</strong> Potential treatments for conditions like cystic fibrosis, sickle cell anemia, Huntington's disease, and certain forms of blindness</li>
                    <li><strong>Cancer Therapy:</strong> Engineering immune cells to better target cancer cells</li>
                    <li><strong>Infectious Disease:</strong> Developing treatments for viral infections like HIV, hepatitis B, and herpes</li>
                    <li><strong>Organ Transplantation:</strong> Editing animal organs to make them compatible for human transplantation</li>
                </ul>
                
                <p><strong>Agricultural Applications:</strong></p>
                <ul>
                    <li><strong>Crop Improvement:</strong> Developing crops with enhanced nutritional value, drought resistance, and disease resistance</li>
                    <li><strong>Livestock Breeding:</strong> Creating animals with desirable traits or resistance to diseases</li>
                    <li><strong>Pest Control:</strong> Developing gene drives to reduce populations of disease-carrying insects</li>
                </ul>
                
                <p><strong>Industrial and Environmental Applications:</strong></p>
                <ul>
                    <li><strong>Biofuel Production:</strong> Engineering microorganisms to produce biofuels more efficiently</li>
                    <li><strong>Biomaterials:</strong> Creating new materials through engineered organisms</li>
                    <li><strong>Environmental Remediation:</strong> Developing organisms that can break down pollutants</li>
                </ul>
                
                <h4>Ethical Considerations</h4>
                <p>CRISPR technology raises important ethical questions, particularly regarding:</p>
                <ul>
                    <li>Human germline editing (changes that can be passed to future generations)</li>
                    <li>Potential off-target effects and unintended consequences</li>
                    <li>Equitable access to the technology</li>
                    <li>Consent and regulation</li>
                    <li>Ecological impacts of gene drives</li>
                </ul>
                
                <p>As CRISPR technology continues to advance, ongoing dialogue between scientists, ethicists, policymakers, and the public is essential to ensure responsible development and application.</p>
            `,
            relatedQuestions: [
                'What are the ethical concerns surrounding CRISPR gene editing?',
                'How does CRISPR compare to other gene editing technologies?',
                'What are the latest breakthroughs in CRISPR research?'
            ]
        }
    };
    
    // Open modal when view answer button is clicked
    viewAnswerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const questionCard = this.closest('.question-card');
            const questionTitle = questionCard.querySelector('h3').textContent;
            
            // Set modal content
            document.getElementById('modal-question-title').textContent = questionTitle;
            
            // Get answer content from sample data (in a real app, this would be fetched from an API)
            const answerData = sampleAnswers[questionTitle];
            if (answerData) {
                document.getElementById('modal-answer-content').innerHTML = answerData.content;
                
                // Populate related questions
                const relatedList = document.getElementById('related-questions-list');
                relatedList.innerHTML = '';
                answerData.relatedQuestions.forEach(question => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = '#';
                    a.textContent = question;
                    li.appendChild(a);
                    relatedList.appendChild(li);
                });
            } else {
                document.getElementById('modal-answer-content').innerHTML = '<p>Answer content not available.</p>';
                document.getElementById('related-questions-list').innerHTML = '';
            }
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });
    
    // Close modal when X is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    // Modal audio button functionality
    const modalPlayAudio = document.getElementById('modal-play-audio');
    if (modalPlayAudio) {
        modalPlayAudio.addEventListener('click', function() {
            const questionTitle = document.getElementById('modal-question-title').textContent;
            const answerContent = document.getElementById('modal-answer-content').textContent;
            
            // In a real application, this would call the text-to-speech API
            alert('Text-to-speech would play: "' + questionTitle + '" followed by the answer content.');
        });
    }
    
    // Modal download button functionality
    const modalDownload = document.getElementById('modal-download');
    if (modalDownload) {
        modalDownload.addEventListener('click', function() {
            const questionTitle = document.getElementById('modal-question-title').textContent;
            const answerContent = document.getElementById('modal-answer-content').textContent;
            
            // Create a simple text file for download
            const content = questionTitle + '\n\n' + answerContent;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = questionTitle.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }
}

/**
 * Initialize search suggestions functionality
 */
function initSearchSuggestions() {
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');
    
    if (searchInput && searchSuggestions) {
        // Sample suggestions (in a real application, these would be fetched from an API)
        const sampleSuggestions = [
            'What is quantum computing?',
            'How does photosynthesis work?',
            'What are black holes?',
            'Explain the theory of relativity',
            'What is the structure of DNA?',
            'How does the immune system work?',
            'What caused World War I?',
            'Explain artificial intelligence',
            'What is climate change?',
            'How do vaccines work?'
        ];
        
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            
            if (query.length < 2) {
                searchSuggestions.style.display = 'none';
                return;
            }
            
            // Filter suggestions based on input
            const filteredSuggestions = sampleSuggestions.filter(suggestion => 
                suggestion.toLowerCase().includes(query)
            );
            
            // Display suggestions
            if (filteredSuggestions.length > 0) {
                searchSuggestions.innerHTML = '';
                filteredSuggestions.forEach(suggestion => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.textContent = suggestion;
                    div.addEventListener('click', function() {
                        searchInput.value = suggestion;
                        searchSuggestions.style.display = 'none';
                        // In a real application, this would trigger a search
                    });
                    searchSuggestions.appendChild(div);
                });
                searchSuggestions.style.display = 'block';
            } else {
                searchSuggestions.style.display = 'none';
            }
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', function(event) {
            if (event.target !== searchInput && event.target !== searchSuggestions) {
                searchSuggestions.style.display = 'none';
            }
        });
        
        // Add styles for suggestions
        const style = document.createElement('style');
        style.textContent = `
            .suggestion-item {
                padding: 10px 15px;
                cursor: pointer;
                transition: background-color 0.2s ease;
            }
            
            .suggestion-item:hover {
                background-color: rgba(74, 108, 250, 0.1);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Handle search form submission
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const query = searchInput.value.trim();
            
            if (query) {
                // In a real application, this would redirect to search results page
                alert('Searching for: ' + query);
            }
        });
    }
}

/**
 * Load daily ranking questions
 * In a real application, this would fetch data from an API
 */
function loadDailyRankingQuestions() {
    // This is a placeholder function
    // In a real application, this would fetch questions from an API
    console.log('Daily ranking questions would be loaded from an API');
}

/**
 * Initialize newsletter form submission
 */
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('newsletter-email').value.trim();
            
            if (email) {
                // In a real application, this would submit to an API
                alert('Thank you for subscribing with: ' + email);
                newsletterForm.reset();
            }
        });
    }
}

/**
 * Check for saved user preferences (theme, font size, etc.)
 */
function checkSavedPreferences() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeToggleIcon();
    }
    
    // Check for saved font size preference
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.documentElement.style.fontSize = savedFontSize;
    }
}

/**
 * Update theme toggle icon based on current theme
 */
function updateThemeToggleIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}