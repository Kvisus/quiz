import { FormEvent, useState } from "react";
import "./App.css";

type Question = {
  prompt: string;
  correctAnswer: string;
  answers: string[];
};
const questions: Question[] = [
  {
    prompt: "Question 1",
    correctAnswer: "Correct",
    answers: ["Correct", "Option B", "Option C"],
  },
  {
    prompt: "Question 2",
    correctAnswer: "Correct",
    answers: ["Option A", "Option B", "Correct"],
  },
  {
    prompt: "Question 3",
    correctAnswer: "Correct",
    answers: ["Option A", "Correct", "Option C"],
  },
  // Add more questions as needed
];
function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);

  const isGameOver = currentQuestionIndex >= questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  function ScoreScreen() {
    const numberOfWrongAnswers = questions.length - score;
    return (
      <>
        <h2>
          Score: {score}, got {numberOfWrongAnswers} ansqers wrong
        </h2>
        <button
          onClick={() => {
            setCurrentQuestionIndex(0);
            setScore(0);
            setSelectedAnswer("");
          }}
        >
          Reset
        </button>
      </>
    );
  }

  function Quiz() {
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore(score + 1);
      }
      setSelectedAnswer("");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    return (
      <div>
        <h1>{currentQuestion.prompt}</h1>
        <form onSubmit={handleSubmit} className="quiz">
          {currentQuestion.answers.map((answer) => (
            <label key={answer}>
              <input
                type="radio"
                name="answer"
                onChange={() => setSelectedAnswer(answer)}
                checked={answer === selectedAnswer}
              />
              {answer}
            </label>
          ))}
          <button>Submit</button>
        </form>
      </div>
    );
  }
  return <div className="page">{isGameOver ? <ScoreScreen /> : <Quiz />}</div>;
}
export default App;
