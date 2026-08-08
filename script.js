document.addEventListener('DOMContentLoaded', () => {
    const INTAKE_KEY = 'water_total_intake';
    const DRINKS_KEY = 'water_logged_drinks';

    const intake = document.getElementById('intake');
    const amountSlider = document.getElementById('amount-slider');
    const amountSliderCurrent = document.getElementById('amount-slider-current');
    const quickChips = document.querySelectorAll('.quick-chip');
    const logButton = document.getElementById('log-button');
    const loggedCard = document.getElementById('logged-drinks');
    const drinks = document.getElementById('drinks');
    const settingsIcon = document.getElementById('settings-icon-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const resetButton = document.getElementById('reset-btn');

    // localStorage helper functions
    function saveToLs(name, item) {
        try {
            const stringItem = JSON.stringify(item);
            localStorage.setItem(name, stringItem);
            console.log(`Saved ${name} to localStorage`);
        } catch (error) {
            console.error(`Failed to save ${name} to localStorage, error: `, error);
        }
    }

    function loadfromLs(name) {
        try {
            const item = localStorage.getItem(name);
            console.log(`Loaded ${name} from localStorage`);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Failed to load ${name} from localStorage, error: `, error);
            return null;
        }
    }

    // Load initial values or set defaults
    let totalIntake = loadfromLs(INTAKE_KEY) || 0;
    let loggedDrinksList = loadfromLs(DRINKS_KEY) || []; // Array of { amount, time }

    // Update UI on load with saved total intake
    if (intake && intake.childNodes[0]) {
        intake.childNodes[0].nodeValue = `${totalIntake} `;
    }

    // Helper to just draw the list item in DOM
    function renderDrinkUI(amount, time) {
        if (!drinks) return;
        const emptyState = drinks.querySelector('.empty-state');
        if (emptyState) emptyState.remove();

        const li = document.createElement('li');
        li.className = 'drink-entry';

        const amountSpan = document.createElement('span');
        amountSpan.textContent = `${amount} oz`;

        const timeSpan = document.createElement('span');
        timeSpan.className = 'drink-time';
        timeSpan.textContent = time;

        li.appendChild(amountSpan);
        li.appendChild(timeSpan);
        drinks.prepend(li); // Show newest first
    }

    // Re-render saved drink history list on load
    if (loggedDrinksList.length > 0) {
        [...loggedDrinksList].reverse().forEach(drink => {
            renderDrinkUI(drink.amount, drink.time);
        });
    }

    // Confetti function
    function celebrate() {
        if (typeof confetti === 'function') {
            confetti({
                velocity: 400,
                count: 100
            });
        }
    }

    function getFormattedTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Single source of truth for logging drinks
    function logDrink(amount) {
        const time = getFormattedTime();

        // 1. Render item visually
        renderDrinkUI(amount, time);

        // 2. Add to list array & save to localStorage
        loggedDrinksList.unshift({ amount, time });
        saveToLs(DRINKS_KEY, loggedDrinksList);

        // 3. Update total intake & save to localStorage
        totalIntake += amount;
        saveToLs(INTAKE_KEY, totalIntake);
        if (intake && intake.childNodes[0]) {
            intake.childNodes[0].nodeValue = `${totalIntake} `;
        }
    }

    // Current amount logic
    if (amountSlider && amountSliderCurrent) {
        amountSlider.addEventListener('input', () => {
            amountSliderCurrent.innerHTML = amountSlider.value;
        });
    }

    // Button logic
    if (logButton) {
        logButton.addEventListener('click', () => {
            celebrate();
            if (intake) intake.classList.add('pop');

            const amount = parseInt(amountSlider.value, 10);
            logDrink(amount);

            // Reset slider location
            if (amountSliderCurrent) amountSliderCurrent.innerHTML = '8';
            if (amountSlider) amountSlider.value = 8;
        });
    }

    if (intake) {
        intake.addEventListener('animationend', () => {
            intake.classList.remove('pop');
        });
    }

    // Quick chip logic
    quickChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const amount = parseInt(chip.textContent, 10);
            logDrink(amount);
            celebrate();
            if (intake) intake.classList.add('pop');
        });
    });

    // Settings panel logic
    if (settingsIcon && settingsPanel) {
        settingsIcon.addEventListener('click', () => {
            settingsPanel.classList.toggle('open');
        });
    }

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            const confirmReset = confirm('Are you sure you want to reset all data? This will clear the current amount and all logged drinks.');

            if (confirmReset) {
                // Clear localStorage keys
                localStorage.removeItem(INTAKE_KEY);
                localStorage.removeItem(DRINKS_KEY);

                // Reset state
                totalIntake = 0;
                loggedDrinksList = [];

                // Update UI
                if (intake && intake.childNodes[0]) {
                    intake.childNodes[0].nodeValue = `${totalIntake} `;
                }
                if (drinks) {
                    drinks.innerHTML = '<li class="empty-state">No drinks logged yet today!</li>';
                }

                if (settingsPanel) {
                    settingsPanel.classList.remove('open');
                }
            }
        });
    }
});