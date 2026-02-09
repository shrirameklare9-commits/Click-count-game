document.addEventListener('DOMContentLoaded', function () {
const clickSound = document.getElementById("clickSound");

    const clickBtn = document.getElementById('actionBtn');
    const resetBtn = document.getElementById('resetBtn');
    const startBtn = document.getElementById('startBtn');

    const timeInput = document.getElementById('timeInput');
    const timeDisplay = document.getElementById('timeDisplay');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const cpsDisplay = document.getElementById('cpsDisplay');
    const highScoreDisplay = document.getElementById('highScore');
    const finalMessage = document.getElementById('finalMessage');
    const progressBar = document.getElementById('progressBar');

    let clickCount = 0;
    let timeLeft = 0;
    let timer;
    let gameTime = 0;

    let highScore = localStorage.getItem("highScore") || 0;
    highScoreDisplay.textContent = highScore;

    startBtn.addEventListener('click', function () {

        const userTime = parseInt(timeInput.value);

        if (!userTime || userTime <= 0) {
            alert("Enter valid time!");
            return;
        }

        clickCount = 0;
        gameTime = userTime;
        timeLeft = userTime;

        scoreDisplay.textContent = 0;
        cpsDisplay.textContent = 0;
        finalMessage.textContent = "";
        progressBar.style.width = "100%";

        clickBtn.disabled = false;

        timer = setInterval(() => {

            timeLeft--;
            timeDisplay.textContent = timeLeft;

            let percentage = (timeLeft / gameTime) * 100;
progressBar.style.width = percentage + "%";

// Change color based on time
if (percentage > 60) {
    progressBar.style.background = "linear-gradient(90deg, #00c853, #64dd17)"; // Green
} 
else if (percentage > 30) {
    progressBar.style.background = "linear-gradient(90deg, #ffd600, #ffab00)"; // Yellow
} 
else {
    progressBar.style.background = "linear-gradient(90deg, #d50000, #ff1744)"; // Red
}


            if (timeLeft <= 0) {
                clearInterval(timer);
                clickBtn.disabled = true;

                let cps = (clickCount / gameTime).toFixed(2);
                cpsDisplay.textContent = cps;

                finalMessage.textContent = `🎉 Game Over! Final Score: ${clickCount}`;

                if (clickCount > highScore) {
                    highScore = clickCount;
                    localStorage.setItem("highScore", highScore);
                    highScoreDisplay.textContent = highScore;
                }
            }

        }, 1000);

        timeDisplay.textContent = timeLeft;
    });

    clickBtn.addEventListener('click', function () {

    clickCount++;
    scoreDisplay.textContent = clickCount;

    // Play sound
    clickSound.currentTime = 0;
    clickSound.play();

    // Shake effect
    clickBtn.classList.add("shake");

    setTimeout(() => {
        clickBtn.classList.remove("shake");
    }, 200);
});


    resetBtn.addEventListener('click', function () {

        clearInterval(timer);

        clickCount = 0;
        timeLeft = 0;

        scoreDisplay.textContent = 0;
        timeDisplay.textContent = 0;
        cpsDisplay.textContent = 0;
        finalMessage.textContent = "";

        progressBar.style.width = "100%";

        clickBtn.disabled = true;
        timeInput.value = "";
    });

});
