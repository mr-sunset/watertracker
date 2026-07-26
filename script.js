document.addEventListener('DOMContentLoaded', () => {
    const intake = document.getElementById('intake');
    const amountSlider = document.getElementById('amount-slider');
    const amountSliderCurrent = document.getElementById('amount-slider-current');
    const quickChips = document.querySelectorAll('.quick-chip');
    const logButton = document.getElementById('log-button');
    const loggedCard = document.getElementById('logged-drinks');
    const drinks = document.getElementById('drinks');
    const settingsIcon = document.getElementById('settings-icon');
    let totalIntake = 0;

    // Confetti function
    function celebrate() {
        confetti({
            velocity: 400,
            count: 100
        });
    }

    // Current amount logic
    // Show amount on input
    amountSlider.addEventListener('input', () => {
        amountSliderCurrent.innerHTML = amountSlider.value;
    });

    // Button logic
    logButton.addEventListener('click', () => {
        celebrate();

        intake.classList.add('pop');

        // 1. Get amount FIRST 
        const amount = parseInt(amountSlider.value, 10);

        // 2. Pass amount to logDrink 
        logDrink(amount);

        // Adding logic
        totalIntake += amount;
        intake.childNodes[0].nodeValue = `${totalIntake} `;

        // Reset slider location
        amountSliderCurrent.innerHTML = '8';
        amountSlider.value = 8;
    });

    intake.addEventListener('animationend', () => {
        intake.classList.remove('pop');
    });

    // Quick chip logic
    quickChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // 1. Get amount FIRST 
            const amount = parseInt(chip.textContent, 10);

            // 2. Pass amount to logDrink 
            logDrink(amount);

            totalIntake += amount;
            intake.childNodes[0].nodeValue = `${totalIntake} `;
            celebrate();
            intake.classList.add('pop');
        });
    });

    // Logged drinks logic
    function getFormattedTime() {
        const now = new Date();
        // Use toLocaleTimeString so it outputs HH:MM AM/PM ⏰
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function logDrink(amount) {
        const emptyState = drinks.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }

        const li = document.createElement('li');
        li.className = 'drink-entry';

        const amountSpan = document.createElement('span');
        amountSpan.textContent = `${amount} oz`;

        const timeSpan = document.createElement('span');
        timeSpan.className = 'drink-time';
        timeSpan.textContent = getFormattedTime();

        li.appendChild(amountSpan);
        li.appendChild(timeSpan);
        drinks.prepend(li);
    }
});