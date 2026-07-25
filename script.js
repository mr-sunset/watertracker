document.addEventListener('DOMContentLoaded', () => {
    const intake = document.getElementById('intake');
    const amountSlider = document.getElementById('amount-slider');
    const amountSliderCurrent = document.getElementById('amount-slider-current');
    const quickChips = document.querySelectorAll('.quick-chip');
    const logButton = document.getElementById('log-button');
    const loggedCard = document.getElementById('logged-card');
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

        // Adding logic
        totalIntake += parseInt(amountSlider.value, 10);
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
            const amount = parseInt(chip.textContent, 10);
            totalIntake += amount;
            intake.childNodes[0].nodeValue = `${totalIntake} `;
            celebrate();
            intake.classList.add('pop');
        });
    });
})