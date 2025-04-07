       // Configuration
       const TEST_DURATION = 1 * 60; // 15 minutes in seconds
       let questions = []; // Will be populated from backend
       let currentQuestionIndex = 0;
       let userAnswers = [];
       let timeLeft = TEST_DURATION;
       let timerInterval;
       
       // DOM Elements
       const questionTextEl = document.getElementById('questionText');
       const optionsContainerEl = document.getElementById('optionsContainer');
       const progressBarEl = document.getElementById('progressBar');
       const timerEl = document.getElementById('timer');
       const prevButtonEl = document.getElementById('prevButton');
       const nextButtonEl = document.getElementById('nextButton');
       const questionContainerEl = document.getElementById('questionContainer');
       const resultsContainerEl = document.getElementById('resultsContainer');
       const levelDisplayEl = document.getElementById('levelDisplay');
       const scoreDisplayEl = document.getElementById('scoreDisplay');
       const restartButtonEl = document.getElementById('restartButton');
       const homeButtonEl = document.getElementById('homeButton');
       const navigationEl = document.getElementById('navigation');
       const warningMessageEl = document.getElementById('warningMessage');
       const overlayEl = document.getElementById('overlay');
       const confirmButtonEl = document.getElementById('confirmButton');
       
       // Initialize the test
       async function initTest() {
           // Using sample questions for demonstration
           questions = getSampleQuestions();
           
           // Initialize userAnswers array with null values
           userAnswers = new Array(questions.length).fill(null);
           
           startTimer();
           displayQuestion();
       }
       
       // Sample questions (replace with actual backend call)
       function getSampleQuestions() {
           return [
               {
                   id: 1,
                   question: "Which sentence is grammatically correct?",
                   options: [
                       "She don't like apples",
                       "She doesn't likes apples",
                       "She doesn't like apples",
                       "She didn't liked apples"
                   ],
                   correctAnswer: 2
               },
               {
                   id: 2,
                   question: "Choose the correct spelling:",
                   options: [
                       "Accomodate",
                       "Acommodate",
                       "Accommodate",
                       "Acomodate"
                   ],
                   correctAnswer: 2
               },
               {
                   id: 3,
                   question: "What is the synonym of 'benevolent'?",
                   options: [
                       "Cruel",
                       "Kind",
                       "Selfish",
                       "Stingy"
                   ],
                   correctAnswer: 1
               },
               {
                   id: 4,
                   question: "Identify the adverb in the sentence: 'She quickly finished her homework.'",
                   options: [
                       "She",
                       "quickly",
                       "finished",
                       "homework"
                   ],
                   correctAnswer: 1
               }
           ];
       }
       
       // Display the current question
       function displayQuestion() {
           const question = questions[currentQuestionIndex];
           questionTextEl.textContent = question.question;
           
           optionsContainerEl.innerHTML = '';
           question.options.forEach((option, index) => {
               const optionEl = document.createElement('div');
               optionEl.className = 'option';
               if (userAnswers[currentQuestionIndex] === index) {
                   optionEl.classList.add('selected');
               }
               optionEl.textContent = option;
               optionEl.addEventListener('click', () => selectOption(index));
               optionsContainerEl.appendChild(optionEl);
           });
           
           // Update progress bar
           progressBarEl.style.width = `${(currentQuestionIndex / (questions.length - 1)) * 100}%`;
           
           // Update navigation buttons
           prevButtonEl.disabled = currentQuestionIndex === 0;
           
           if (currentQuestionIndex === questions.length - 1) {
               nextButtonEl.textContent = 'پایان آزمون';
           } else {
               nextButtonEl.textContent = 'سوال بعدی';
           }
       }
       
       // Select an option
       function selectOption(optionIndex) {
           // Remove selected class from all options
           document.querySelectorAll('.option').forEach(option => {
               option.classList.remove('selected');
           });
           
           // Add selected class to clicked option
           document.querySelectorAll('.option')[optionIndex].classList.add('selected');
           
           // Store user's answer
           userAnswers[currentQuestionIndex] = optionIndex;
       }
       
       // Go to next question
       function nextQuestion() {
           // Check if an option is selected
           if (userAnswers[currentQuestionIndex] === null) {
               showWarning();
               return;
           }
           
           if (currentQuestionIndex < questions.length - 1) {
               currentQuestionIndex++;
               displayQuestion();
           } else {
               finishTest();
           }
       }
       
       // Show warning for unanswered question
       function showWarning() {
           warningMessageEl.style.display = 'block';
           overlayEl.style.display = 'block';
       }
       
       // Hide warning
       function hideWarning() {
           warningMessageEl.style.display = 'none';
           overlayEl.style.display = 'none';
       }
       
       // Go to previous question
       function prevQuestion() {
           if (currentQuestionIndex > 0) {
               currentQuestionIndex--;
               displayQuestion();
           }
       }
       
       // Start the timer
       function startTimer() {
           updateTimerDisplay();
           timerInterval = setInterval(() => {
               timeLeft--;
               updateTimerDisplay();
               
               if (timeLeft <= 0) {
                   clearInterval(timerInterval);
                   // Mark unanswered questions as wrong
                   userAnswers = userAnswers.map(answer => answer === null ? -1 : answer);
                   finishTest();
               }
           }, 1000);
       }
       
       // Update timer display
       function updateTimerDisplay() {
           const minutes = Math.floor(timeLeft / 60);
           const seconds = timeLeft % 60;
           // Convert to Persian numerals
           const persianMinutes = minutes.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
           const persianSeconds = seconds.toString().padStart(2, '0').replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
           timerEl.textContent = `${persianMinutes}:${persianSeconds}`;
           
           // Change color when time is running low
           if (timeLeft <= 60) {
               timerEl.style.color = '#ff6b6b';
               timerEl.style.animation = 'pulse 1s infinite';
           }
       }
       
       // Finish the test
       function finishTest() {
           clearInterval(timerInterval);
           
           // Fill the progress bar completely
           progressBarEl.style.width = '100%';
           
           // Hide navigation buttons
           navigationEl.style.display = 'none';
           
           // Calculate score
           const correctAnswers = userAnswers.reduce((count, answer, index) => {
               return count + (answer === questions[index].correctAnswer ? 1 : 0);
           }, 0);
           
           const score = Math.round((correctAnswers / questions.length) * 100);
           
           // Determine level
           const level = determineLevel(score);
           
           // Display results
           questionContainerEl.style.display = 'none';
           resultsContainerEl.style.display = 'block';
           levelDisplayEl.textContent = level;
           // Convert to Persian numerals
           scoreDisplayEl.textContent = score.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
       }
       
       // Determine English level based on score
       function determineLevel(score) {
           if (score >= 90) return 'C2';
           if (score >= 80) return 'C1';
           if (score >= 70) return 'B2';
           if (score >= 60) return 'B1';
           if (score >= 50) return 'A2';
           return 'A1';
       }
       
       // Restart the test
       function restartTest() {
           currentQuestionIndex = 0;
           userAnswers = new Array(questions.length).fill(null);
           timeLeft = TEST_DURATION;
           
           questionContainerEl.style.display = 'block';
           resultsContainerEl.style.display = 'none';
           navigationEl.style.display = 'flex';
           
           timerEl.style.color = '';
           timerEl.style.animation = '';
           
           progressBarEl.style.width = '0%';
           
           startTimer();
           displayQuestion();
       }
       
       // Event listeners
       nextButtonEl.addEventListener('click', nextQuestion);
       prevButtonEl.addEventListener('click', prevQuestion);
       restartButtonEl.addEventListener('click', restartTest);
       homeButtonEl.addEventListener('click', () => {
           window.location.href = '../index.html';
       });
       confirmButtonEl.addEventListener('click', hideWarning);
       overlayEl.addEventListener('click', hideWarning);
       
       // Start the test when page loads
       window.addEventListener('load', initTest);
