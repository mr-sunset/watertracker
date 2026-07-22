document.addEventListener('DOMContentLoaded', () => {
    const intake = document.getElementById('intake');
    const amountSlider = document.getElementById('amount-slider');
    const amountSliderCurrent = document.getElementById('amount-slider-current');
    const logButton = document.getElementById('log-button');
    const loggedCard = document.getElementById('logged-card');
    const settingsIcon = document.getElementById('settings-icon');
    let totalIntake = 0;

    // Confetti function
    function celebrate() {
        confetti({
            velocity: 300,
            count: 100
        });
    }

    // Current amount logic
    // Show amount on input
    amountSlider.addEventListener('input', () => {
        amountSliderCurrent.innerHTML = amountSlider.value;
    });

    // Total adding logic
    logButton.addEventListener('click', () => {
        totalIntake += parseInt(amountSlider.value, 10);
        intake.childNodes[0].nodeValue = `${totalIntake} `;
    });

    // Clear when log button pressed (and move slider back)
    logButton.addEventListener('click', () => {
        amountSliderCurrent.innerHTML = '2';
        amountSlider.value = 2
    });
})