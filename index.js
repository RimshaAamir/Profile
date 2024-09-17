document.addEventListener("DOMContentLoaded", function () {
    const languageSelect = document.getElementById("languageSelect");

    // Load default language
    let currentLang = languageSelect.value || 'en';

    // Function to fetch translations
    async function fetchTranslations(lang) {
        try {
            // Replace this URL with your translation API endpoint
            const response = await fetch(`https://api.example.com/translate?lang=${lang}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            applyTranslations(data);
        } catch (error) {
            console.error('Error fetching translations:', error);
        }
    }

    // Function to apply translations to the page
    function applyTranslations(translations) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }

    // Event listener for language change
    languageSelect.addEventListener('change', function () {
        currentLang = this.value;
        fetchTranslations(currentLang);
    });

    // Initial load of translations
    fetchTranslations(currentLang);
});
