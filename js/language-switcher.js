/**
 * Language Switcher functionality for KnowledgeAI Hub
 * Handles multi-language support and content translation
 */

document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitcher();
});

/**
 * Initialize language switcher functionality
 */
function initLanguageSwitcher() {
    const languageSelect = document.getElementById('language-select');
    
    if (languageSelect) {
        // Check for saved language preference
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            languageSelect.value = savedLanguage;
            changeLanguage(savedLanguage);
        }
        
        // Change language when selection changes
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            changeLanguage(selectedLanguage);
            
            // Save preference to localStorage
            localStorage.setItem('language', selectedLanguage);
            
            // Announce language change for screen readers
            announceLanguageChange(selectedLanguage);
        });
    }
}

/**
 * Change the website language
 * @param {string} language - Language code (e.g., 'en', 'hi', 'es')
 */
function changeLanguage(language) {
    // In a real application, this would load translations from a server
    // For demo purposes, we'll use a simple object with translations
    const translations = {
        'en': {
            'hero_title': 'Your Ultimate AI Knowledge Assistant',
            'hero_subtitle': 'Access world-class knowledge, competitive exam questions, and in-depth explanations instantly',
            'search_placeholder': 'Search any topic, question, or subject...',
            'search_button': 'Search',
            'categories_title': 'Explore Knowledge Categories',
            'world_gk': 'World General Knowledge',
            'world_gk_desc': 'Explore facts about countries, cultures, history, and global affairs',
            'science': 'Science',
            'science_desc': 'Discover physics, chemistry, biology, astronomy, and more',
            'competitive_exams': 'Competitive Exams',
            'competitive_exams_desc': 'Practice with UPSC, SSC, NEET, JEE, IAS questions and more',
            'current_affairs': 'Current Affairs',
            'current_affairs_desc': 'Stay updated with the latest events and developments worldwide',
            'daily_ranking_title': 'Today\'s Top Ranking Questions',
            'view_all': 'View All',
            'view_answer': 'View Answer',
            'features_title': 'Powerful Features',
            'ai_search': 'AI-Powered Search',
            'ai_search_desc': 'Get instant, accurate answers to any question with our advanced AI technology',
            'voice_assistant': 'Voice Assistant',
            'voice_assistant_desc': 'Listen to answers with our text-to-speech technology for hands-free learning',
            'downloadable': 'Downloadable Content',
            'downloadable_desc': 'Save questions, notes, and topic PDFs for offline study sessions',
            'accessibility': 'Accessibility Features',
            'accessibility_desc': 'Dark mode, font resizing, and text-to-speech for comfortable learning',
            'newsletter_title': 'Stay Updated with Daily Knowledge',
            'newsletter_subtitle': 'Subscribe to receive daily top-ranking questions and knowledge updates',
            'newsletter_placeholder': 'Enter your email address',
            'subscribe': 'Subscribe',
            'footer_tagline': 'Your ultimate AI-powered knowledge assistant',
            'quick_links': 'Quick Links',
            'categories': 'Categories',
            'resources': 'Resources',
            'connect': 'Connect',
            'copyright': '© 2023 KnowledgeAI Hub. All rights reserved.'
        },
        'hi': {
            'hero_title': 'आपका अल्टीमेट AI ज्ञान सहायक',
            'hero_subtitle': 'विश्व स्तरीय ज्ञान, प्रतिस्पर्धी परीक्षा प्रश्न और विस्तृत स्पष्टीकरण तुरंत प्राप्त करें',
            'search_placeholder': 'कोई भी विषय, प्रश्न या विषय खोजें...',
            'search_button': 'खोजें',
            'categories_title': 'ज्ञान श्रेणियां एक्सप्लोर करें',
            'world_gk': 'विश्व सामान्य ज्ञान',
            'world_gk_desc': 'देशों, संस्कृतियों, इतिहास और वैश्विक मामलों के बारे में तथ्यों का पता लगाएं',
            'science': 'विज्ञान',
            'science_desc': 'भौतिकी, रसायन विज्ञान, जीव विज्ञान, खगोल विज्ञान और अधिक की खोज करें',
            'competitive_exams': 'प्रतियोगी परीक्षाएं',
            'competitive_exams_desc': 'UPSC, SSC, NEET, JEE, IAS प्रश्नों और अधिक के साथ अभ्यास करें',
            'current_affairs': 'समसामयिकी',
            'current_affairs_desc': 'दुनिया भर में नवीनतम घटनाओं और विकास से अपडेट रहें',
            'daily_ranking_title': 'आज के शीर्ष रैंकिंग प्रश्न',
            'view_all': 'सभी देखें',
            'view_answer': 'उत्तर देखें',
            'features_title': 'शक्तिशाली विशेषताएं',
            'ai_search': 'AI-संचालित खोज',
            'ai_search_desc': 'हमारी उन्नत AI तकनीक के साथ किसी भी प्रश्न का तुरंत, सटीक उत्तर प्राप्त करें',
            'voice_assistant': 'वॉयस असिस्टेंट',
            'voice_assistant_desc': 'हमारी टेक्स्ट-टू-स्पीच तकनीक के साथ हैंड्स-फ्री लर्निंग के लिए उत्तर सुनें',
            'downloadable': 'डाउनलोड करने योग्य सामग्री',
            'downloadable_desc': 'ऑफलाइन अध्ययन सत्रों के लिए प्रश्न, नोट्स और विषय PDF सहेजें',
            'accessibility': 'पहुंच सुविधाएं',
            'accessibility_desc': 'आरामदायक अध्ययन के लिए डार्क मोड, फॉन्ट रीसाइजिंग और टेक्स्ट-टू-स्पीच',
            'newsletter_title': 'दैनिक ज्ञान के साथ अपडेट रहें',
            'newsletter_subtitle': 'दैनिक शीर्ष रैंकिंग प्रश्न और ज्ञान अपडेट प्राप्त करने के लिए सदस्यता लें',
            'newsletter_placeholder': 'अपना ईमेल पता दर्ज करें',
            'subscribe': 'सदस्यता लें',
            'footer_tagline': 'आपका अल्टीमेट AI-संचालित ज्ञान सहायक',
            'quick_links': 'त्वरित लिंक',
            'categories': 'श्रेणियां',
            'resources': 'संसाधन',
            'connect': 'जुड़ें',
            'copyright': '© 2023 KnowledgeAI Hub. सर्वाधिकार सुरक्षित।'
        },
        'es': {
            'hero_title': 'Tu Asistente de Conocimiento AI Definitivo',
            'hero_subtitle': 'Accede instantáneamente a conocimiento de clase mundial, preguntas de exámenes competitivos y explicaciones detalladas',
            'search_placeholder': 'Busca cualquier tema, pregunta o asignatura...',
            'search_button': 'Buscar',
            'categories_title': 'Explora Categorías de Conocimiento',
            'world_gk': 'Conocimiento General Mundial',
            'world_gk_desc': 'Explora datos sobre países, culturas, historia y asuntos globales',
            'science': 'Ciencia',
            'science_desc': 'Descubre física, química, biología, astronomía y más',
            'competitive_exams': 'Exámenes Competitivos',
            'competitive_exams_desc': 'Practica con preguntas de UPSC, SSC, NEET, JEE, IAS y más',
            'current_affairs': 'Actualidad',
            'current_affairs_desc': 'Mantente actualizado con los últimos eventos y desarrollos en todo el mundo',
            'daily_ranking_title': 'Preguntas Mejor Clasificadas de Hoy',
            'view_all': 'Ver Todo',
            'view_answer': 'Ver Respuesta',
            'features_title': 'Características Potentes',
            'ai_search': 'Búsqueda Impulsada por IA',
            'ai_search_desc': 'Obtén respuestas instantáneas y precisas a cualquier pregunta con nuestra avanzada tecnología de IA',
            'voice_assistant': 'Asistente de Voz',
            'voice_assistant_desc': 'Escucha respuestas con nuestra tecnología de texto a voz para aprendizaje manos libres',
            'downloadable': 'Contenido Descargable',
            'downloadable_desc': 'Guarda preguntas, notas y PDFs de temas para sesiones de estudio sin conexión',
            'accessibility': 'Características de Accesibilidad',
            'accessibility_desc': 'Modo oscuro, cambio de tamaño de fuente y texto a voz para un aprendizaje cómodo',
            'newsletter_title': 'Mantente Actualizado con Conocimiento Diario',
            'newsletter_subtitle': 'Suscríbete para recibir preguntas diarias mejor clasificadas y actualizaciones de conocimiento',
            'newsletter_placeholder': 'Introduce tu dirección de correo electrónico',
            'subscribe': 'Suscribirse',
            'footer_tagline': 'Tu asistente de conocimiento definitivo impulsado por IA',
            'quick_links': 'Enlaces Rápidos',
            'categories': 'Categorías',
            'resources': 'Recursos',
            'connect': 'Conectar',
            'copyright': '© 2023 KnowledgeAI Hub. Todos los derechos reservados.'
        }
    };
    
    // Get translations for selected language
    const currentTranslations = translations[language] || translations['en'];
    
    // Update page content with translations
    updatePageContent(currentTranslations);
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
}

/**
 * Update page content with translations
 * @param {Object} translations - Object containing translated strings
 */
function updatePageContent(translations) {
    // Update hero section
    updateElementText('.hero h2', translations.hero_title);
    updateElementText('.hero p', translations.hero_subtitle);
    updateElementAttribute('#search-input', 'placeholder', translations.search_placeholder);
    updateElementText('#search-button', translations.search_button);
    
    // Update categories section
    updateElementText('.categories .section-title', translations.categories_title);
    updateElementText('.category-card:nth-child(1) h3', translations.world_gk);
    updateElementText('.category-card:nth-child(1) p', translations.world_gk_desc);
    updateElementText('.category-card:nth-child(2) h3', translations.science);
    updateElementText('.category-card:nth-child(2) p', translations.science_desc);
    updateElementText('.category-card:nth-child(3) h3', translations.competitive_exams);
    updateElementText('.category-card:nth-child(3) p', translations.competitive_exams_desc);
    updateElementText('.category-card:nth-child(4) h3', translations.current_affairs);
    updateElementText('.category-card:nth-child(4) p', translations.current_affairs_desc);
    
    // Update daily ranking section
    updateElementText('.daily-ranking .section-title', translations.daily_ranking_title);
    updateElementText('.view-all', translations.view_all);
    updateElementText('.btn-view-answer', translations.view_answer);
    
    // Update features section
    updateElementText('.features .section-title', translations.features_title);
    updateElementText('.feature-card:nth-child(1) h3', translations.ai_search);
    updateElementText('.feature-card:nth-child(1) p', translations.ai_search_desc);
    updateElementText('.feature-card:nth-child(2) h3', translations.voice_assistant);
    updateElementText('.feature-card:nth-child(2) p', translations.voice_assistant_desc);
    updateElementText('.feature-card:nth-child(3) h3', translations.downloadable);
    updateElementText('.feature-card:nth-child(3) p', translations.downloadable_desc);
    updateElementText('.feature-card:nth-child(4) h3', translations.accessibility);
    updateElementText('.feature-card:nth-child(4) p', translations.accessibility_desc);
    
    // Update newsletter section
    updateElementText('.newsletter h2', translations.newsletter_title);
    updateElementText('.newsletter p', translations.newsletter_subtitle);
    updateElementAttribute('#newsletter-email', 'placeholder', translations.newsletter_placeholder);
    updateElementText('.btn-subscribe', translations.subscribe);
    
    // Update footer
    updateElementText('.footer-logo p', translations.footer_tagline);
    updateElementText('.footer-links-column:nth-child(1) h3', translations.quick_links);
    updateElementText('.footer-links-column:nth-child(2) h3', translations.categories);
    updateElementText('.footer-links-column:nth-child(3) h3', translations.resources);
    updateElementText('.footer-links-column:nth-child(4) h3', translations.connect);
    updateElementText('.footer-bottom p', translations.copyright);
}

/**
 * Update text content of an element
 * @param {string} selector - CSS selector for the element
 * @param {string} text - New text content
 */
function updateElementText(selector, text) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        if (element && text) {
            element.textContent = text;
        }
    });
}

/**
 * Update attribute of an element
 * @param {string} selector - CSS selector for the element
 * @param {string} attribute - Attribute name
 * @param {string} value - New attribute value
 */
function updateElementAttribute(selector, attribute, value) {
    const element = document.querySelector(selector);
    if (element && value) {
        element.setAttribute(attribute, value);
    }
}

/**
 * Announce language change for screen readers
 * @param {string} language - Language code
 */
function announceLanguageChange(language) {
    let languageName = '';
    
    switch(language) {
        case 'en':
            languageName = 'English';
            break;
        case 'hi':
            languageName = 'Hindi';
            break;
        case 'es':
            languageName = 'Spanish';
            break;
        default:
            languageName = language;
    }
    
    if (window.announceToScreenReader) {
        window.announceToScreenReader('Language changed to ' + languageName);
    }
}