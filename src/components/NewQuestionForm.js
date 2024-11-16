import React, { useState } from 'react';

function NewQuestionForm({ onAddQuestion }) {
  const [questionData, setQuestionData] = useState({
    prompt: '',
    answers: ['', '', '', ''],
    correctIndex: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAnswerChange = (event, index) => {
    const newAnswers = [...questionData.answers];
    newAnswers[index] = event.target.value;
    setQuestionData((prevData) => ({
      ...prevData,
      answers: newAnswers,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionData),
    })
      .then((response) => response.json())
      .then((newQuestion) => {
        onAddQuestion(newQuestion);
        setQuestionData({
          prompt: '',
          answers: ['', '', '', ''],
          correctIndex: 0,
        }); 
      })
      .catch((error) => console.error('Error adding question:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question Prompt:
        <input
          type="text"
          name="prompt"
          value={questionData.prompt}
          onChange={handleInputChange}
        />
      </label>
      <div>
        <h3>Answers:</h3>
        {questionData.answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            value={answer}
            onChange={(e) => handleAnswerChange(e, index)}
            placeholder={`Answer ${index + 1}`}
          />
        ))}
      </div>
      <label>
        Correct Answer Index:
        <input
          type="number"
          name="correctIndex"
          value={questionData.correctIndex}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default NewQuestionForm;