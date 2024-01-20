import React from 'react';

export default function Result({ score, totalquestion, onRestartQuiz }) {
  const calculatePercentage = () => {
    return ((score / totalquestion) * 100);
  };

  return (
    <div className='result-container'>
      <p id='final'>Final Results</p>
      <p id='result'>{score} out of {totalquestion} correct - ({calculatePercentage()}%)</p>
      <button id='restart' onClick={onRestartQuiz}>Restart game</button>
    </div>
  );
}
