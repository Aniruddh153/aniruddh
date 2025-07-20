/**
 * Voice Assistant functionality for KnowledgeAI Hub
 * Handles speech recognition and text-to-speech features
 */

document.addEventListener('DOMContentLoaded', function() {
    initVoiceSearch();
    initTextToSpeech();
});

/**
 * Initialize voice search functionality
 */
function initVoiceSearch() {
    const voiceSearchButton = document.getElementById('voice-search');
    const searchInput = document.getElementById('search-input');
    
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition && voiceSearchButton && searchInput) {
        const recognition = new SpeechRecognition();
        
        // Configure speech recognition
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US'; // Default language
        
        // Update language based on user selection
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.addEventListener('change', function() {
                switch(this.value) {
                    case 'en':
                        recognition.lang = 'en-US';
                        break;
                    case 'hi':
                        recognition.lang = 'hi-IN';
                        break;
                    case 'es':
                        recognition.lang = 'es-ES';
                        break;
                    default:
                        recognition.lang = 'en-US';
                }
            });
        }
        
        // Start listening when voice search button is clicked
        voiceSearchButton.addEventListener('click', function() {
            // Visual feedback that voice search is active
            voiceSearchButton.classList.add('listening');
            searchInput.placeholder = 'Listening...';
            
            // Start recognition
            recognition.start();
            
            // Announce for screen readers
            window.announceToScreenReader('Voice search activated. Please speak now.');
        });
        
        // Process speech results
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            
            // Trigger search if confidence is high enough
            if (event.results[0][0].confidence > 0.7) {
                const searchForm = document.getElementById('search-form');
                if (searchForm) {
                    // Simulate form submission
                    const submitEvent = new Event('submit', {
                        'bubbles': true,
                        'cancelable': true
                    });
                    searchForm.dispatchEvent(submitEvent);
                }
            }
        };
        
        // Handle end of speech recognition
        recognition.onend = function() {
            voiceSearchButton.classList.remove('listening');
            searchInput.placeholder = 'Search any topic, question, or subject...';
            
            // Announce for screen readers
            if (searchInput.value) {
                window.announceToScreenReader('Voice search completed. Search query: ' + searchInput.value);
            } else {
                window.announceToScreenReader('Voice search ended without detecting speech.');
            }
        };
        
        // Handle errors
        recognition.onerror = function(event) {
            console.error('Speech recognition error', event.error);
            voiceSearchButton.classList.remove('listening');
            searchInput.placeholder = 'Search any topic, question, or subject...';
            
            // Announce error for screen readers
            window.announceToScreenReader('Voice search error: ' + event.error);
        };
        
        // Add visual styles for voice search button
        const style = document.createElement('style');
        style.textContent = `
            #voice-search.listening {
                animation: pulse 1.5s infinite;
                color: #ff6b6b;
            }
            
            @keyframes pulse {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.2);
                }
                100% {
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    } else if (voiceSearchButton) {
        // Hide voice search button if not supported
        voiceSearchButton.style.display = 'none';
    }
}

/**
 * Initialize text-to-speech functionality
 */
function initTextToSpeech() {
    // Initialize audio buttons on question cards
    const audioButtons = document.querySelectorAll('.btn-play-audio');
    
    audioButtons.forEach(button => {
        button.addEventListener('click', function() {
            const questionCard = this.closest('.question-card');
            const questionText = questionCard.querySelector('h3').textContent;
            
            // In a real application, this would fetch the full answer text
            // For demo purposes, we'll just read the question
            speakText(questionText);
        });
    });
}

/**
 * Global state to track current speech
 */
const speechState = {
    speaking: false,
    currentUtterance: null
};

/**
 * Speak text using the Web Speech API
 * @param {string} text - Text to be spoken
 */
function speakText(text) {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        if (speechState.speaking) {
            window.speechSynthesis.cancel();
            speechState.speaking = false;
        }
        
        // Create a new utterance
        const utterance = new SpeechSynthesisUtterance(text);
        speechState.currentUtterance = utterance;
        
        // Set language based on user selection
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            switch(languageSelect.value) {
                case 'en':
                    utterance.lang = 'en-US';
                    break;
                case 'hi':
                    utterance.lang = 'hi-IN';
                    break;
                case 'es':
                    utterance.lang = 'es-ES';
                    break;
                default:
                    utterance.lang = 'en-US';
            }
        }
        
        // Set voice (if available)
        window.speechSynthesis.onvoiceschanged = function() {
            const voices = window.speechSynthesis.getVoices();
            
            // Try to find a natural-sounding voice for the selected language
            let selectedVoice = null;
            
            for (let voice of voices) {
                if (voice.lang === utterance.lang) {
                    selectedVoice = voice;
                    // Prefer voices with "natural" in the name
                    if (voice.name.toLowerCase().includes('natural') || 
                        voice.name.toLowerCase().includes('premium')) {
                        break;
                    }
                }
            }
            
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
        };
        
        // Set speech properties
        utterance.rate = 1.0; // Normal speed
        utterance.pitch = 1.0; // Normal pitch
        utterance.volume = 1.0; // Full volume
        
        // Handle speech events
        utterance.onstart = function() {
            speechState.speaking = true;
            // Visual feedback that speech is active
            document.querySelectorAll('.btn-play-audio').forEach(btn => {
                btn.innerHTML = '<i class="fas fa-pause"></i>';
            });
            
            // Announce for screen readers
            window.announceToScreenReader('Text-to-speech started');
        };
        
        utterance.onend = function() {
            speechState.speaking = false;
            // Reset buttons
            document.querySelectorAll('.btn-play-audio').forEach(btn => {
                btn.innerHTML = '<i class="fas fa-volume-up"></i>';
            });
            
            // Announce for screen readers
            window.announceToScreenReader('Text-to-speech ended');
        };
        
        utterance.onerror = function(event) {
            console.error('Speech synthesis error', event);
            speechState.speaking = false;
            // Reset buttons
            document.querySelectorAll('.btn-play-audio').forEach(btn => {
                btn.innerHTML = '<i class="fas fa-volume-up"></i>';
            });
            
            // Announce error for screen readers
            window.announceToScreenReader('Text-to-speech error');
        };
        
        // Start speaking
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech is not supported in your browser.');
    }
}

/**
 * Stop current speech
 */
function stopSpeaking() {
    if (speechState.speaking && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        speechState.speaking = false;
        
        // Reset buttons
        document.querySelectorAll('.btn-play-audio').forEach(btn => {
            btn.innerHTML = '<i class="fas fa-volume-up"></i>';
        });
    }
}

// Make speech functions available globally
window.speakText = speakText;
window.stopSpeaking = stopSpeaking;