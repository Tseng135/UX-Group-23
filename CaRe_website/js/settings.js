const feedbackButton = document.getElementById('submit-feedback');
const feedbackText = document.getElementById('feedback-text');
const feedbackPhoto = document.getElementById('feedback-photo');

//Feedback
feedbackButton.addEventListener('click', function () {
    const feedbackContent = feedbackText.value;
    const feedbackFile = feedbackPhoto.files[0];

    
    if (!feedbackContent) {
        alert('Please write your feedback before submitting.');
        return;
    }

    console.log('Feedback:', feedbackContent);
    if (feedbackFile) {
        console.log('Attached file:', feedbackFile.name);
    }

    alert('Feedback submitted successfully!');

    
    feedbackText.value = '';
    feedbackPhoto.value = '';
});

//Topic switching
const themeInputs = document.querySelectorAll('input[name="theme"]');
themeInputs.forEach(input => {
    input.addEventListener('change', function () {
        document.body.classList.toggle('dark-mode', this.value === 'dark');
    });
});

//Clear cache
const clearCacheButton = document.querySelector('button:contains("Clear Cache")');
clearCacheButton?.addEventListener('click', function () {
    if (confirm('Are you sure you want to clear the cache?')) {
        localStorage.clear();
        sessionStorage.clear();
        alert('Cache cleared successfully.');
    }
});

//Reset
const resetSettingsButton = document.querySelector('button:contains("Reset Settings")');
resetSettingsButton?.addEventListener('click', function () {
    if (confirm('Are you sure you want to reset all settings to default?')) {
        alert('Settings reset to default.');
    }
});

//Language preference
const languageSelect = document.getElementById('language');
languageSelect.addEventListener('change', function () {
    alert(`Language changed to: ${this.options[this.selectedIndex].text}`);
});

