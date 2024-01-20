import React from 'react';

export default function QuestionBox({ question, onOptionSelect,currentQuestion, totalQuestions }) {
  return (
    <div>
      <div id="header2">
        <p id="number">Question : {currentQuestion + 1} out of 5</p>
        <p id="questions">{question.text}</p>
      </div>
      <div className="options">
        {question.options.map((option) => (
          <button id='options' key={option.id} onClick={() => onOptionSelect(option.id)}>
            {option.text}
          </button>
        ))}
      </div>
      
    </div>
  );
}
