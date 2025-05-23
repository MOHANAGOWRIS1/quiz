document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.querySelector("#loginBtn");
    const submitBtn = document.querySelector("#submitQuiz");
    const quizResult = document.querySelector("#quizResult");
    const loginMessage = document.querySelector("#loginMessage");
    const loginSection = document.querySelector("#login-section");
    const quizSection = document.querySelector("#quiz-section");
    const userName = document.querySelector("#username");
    const passWord = document.querySelector("#password");

    // Function to validate password
    function validatePassword(passWord) {
        return passWord.length >= 8 && // Minimum length of 8 characters
               /[A-Za-z0-9!@#$%^&*(),.?":{}|<>]/.test(passWord) 
    }

    // Login button event listener
    loginBtn.addEventListener("click", function() {
        const usernameValue = userName.value.trim(); // Get username input
        const passwordValue = passWord.value.trim(); // Get password input

        // Basic validation check for empty fields
        if (!usernameValue || !passwordValue) {
            loginMessage.innerText = "Username and password cannot be empty.";
            return; // Stop execution if fields are empty
        }

        // Password validation check
        if (!validatePassword(passwordValue)) {
            loginMessage.innerText = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
            return; // Stop execution if password validation fails
        }

        // Allow access if both fields are filled and password is valid
        loginSection.style.display = "none"; // Hide login section
        quizSection.style.display = "block"; // Show quiz section
        loginMessage.innerText = ""; // Clear any previous messages
    });

    // Submit button event listener
    submitBtn.addEventListener("click", function() {
        let score = 0;

        // Check Question 1
        const answer1 = document.querySelector('input[name="q1"]:checked');
        if (!answer1) {
            alert("Please answer Question 1."); // Alert for unanswered question
            return; // Stop execution if the question is unanswered
        }
        if (answer1.value === "Chennai") {
            score++;
        }

        // Check Question 2
        const correctAnswers = ["Python", "JavaScript"]; // Correct answers for question 2
        const checkedBoxes = Array.from(document.querySelectorAll('input[name="q2"]:checked')).map(input => input.value);

        if (checkedBoxes.length === 0) {
            alert("Please answer Question 2."); // Alert for unanswered question
            return; // Stop execution if no answers are selected
        }

        const isCorrectAnswer = correctAnswers.every(ans => checkedBoxes.includes(ans)) && checkedBoxes.length === correctAnswers.length;
        
        if (isCorrectAnswer) {
            score++;
        };

        // Display score and correct answers
        const correctAnswerText = `Correct Answers: \n Question 1: Chennai \n Question 2: ${correctAnswers.join(', ')}`;
        quizResult.innerText = `You scored: ${score} out of 2\n${correctAnswerText}`;
    });
});