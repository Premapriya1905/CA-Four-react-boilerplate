// App.js

// Import necessary dependencies and styles
import React, { useState, useContext } from 'react';
import './App.css';

// Import data and components
import questions from './questions';
import Result from './components/Result';
import QuestionBox from './components/QuestionBox';
import { MyContext } from './components/Context';

// Main App component
function App() {
  // State variables to manage quiz progress and user answers
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  // Accessing dark theme settings from context
  const contextValue = useContext(MyContext) || {};
  console.log('Context Value:', contextValue);

  // Destructuring dark theme variables from context
  const { darkTheme, setDarkTheme } = contextValue;

  // Function to handle option selection in the quiz
  const handleOptionSelect = (selectedOption) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedAnswers);

    // Check if there are more questions or show result
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  // Function to restart the quiz
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers(Array(questions.length).fill(null));
    setShowResult(false);
  };

  // Function to calculate the user's quiz score
  const calculateScore = () => {
    return userAnswers.reduce((score, userAnswer, index) => {
      return userAnswer === questions[index].options.findIndex(option => option.isCorrect) ? score + 1 : score;
    }, 0);
  };

  // Function to change text color to dark blue
  const colorchange = () => {
    var questionElement = document.getElementById("questions");
    questionElement.style.color = "darkblue";
  };

  // Function to change text color to white
  const nochange = () => {
    var questionElement = document.getElementById("questions");
    questionElement.style.color = "white";
  };

  // Function to toggle between dark and light themes
  const changeTheme = () => {
    setDarkTheme(!darkTheme);
    document.body.style.backgroundColor = darkTheme ? "grey" : "white";
    document.body.style.color = darkTheme ? "white" : "grey";
  };

  // Main component rendering
  return (
    <div>
      {/* Header section with app title and theme toggle button */}
      <div id="header">
        <p id='title'>Quest Mantra</p>
        <button id='theme' onClick={changeTheme}>
          {darkTheme ? 'Dark' : 'Light'}
        </button>
      </div>

      {/* Main container for quiz content */}
      <div className='container' >
        {showResult ? (
          // Display result component if quiz is completed
          <Result score={calculateScore()} totalquestion={questions.length} onRestartQuiz={handleRestartQuiz} />
        ) : (
          // Display question component if quiz is in progress
          <QuestionBox
            question={questions[currentQuestion]}
            onOptionSelect={handleOptionSelect}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
          />
        )}

        {/* Highlight buttons section */}
        {!showResult && <div className="highlight-buttons">
          <button onClick={colorchange} id="highlight">Highlight</button>
          <button onClick={nochange} id="remove-highlight">Remove Highlight</button>
        </div>}
      </div>
    </div>
  );
}

// Export the App component as the default export
export default App;
