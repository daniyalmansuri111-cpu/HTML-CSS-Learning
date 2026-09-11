import { useEffect, useMemo, useState } from 'react';

const TIME_LIMIT = 30;

function Quiz({ questions, onFinish }) {
  const shuffledQuestions = useMemo(() => [...questions].sort(() => Math.random() - 0.5), [questions]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);

  const question = shuffledQuestions[current];
  const answered = selected !== null;

  useEffect(() => {
    setSelected(null);
    setTimeLeft(TIME_LIMIT);
  }, [current]);

  useEffect(() => {
    if (answered) return;
    if (timeLeft <= 0) {
      goNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, answered]);

  const chooseAnswer = (option) => {
    if (answered) return;
    setSelected(option);
    if (option === question.answer) setScore((value) => value + 1);
  };

  const goNext = () => {
    if (current === shuffledQuestions.length - 1) {
      const finalScore = score + (selected === question.answer ? 0 : 0);
      onFinish(finalScore);
      return;
    }
    setCurrent((value) => value + 1);
  };

  const progress = ((current + 1) / shuffledQuestions.length) * 100;

  return (
    <section className="quiz-card">
      <div className="topbar">
        <strong>Question {current + 1} / {shuffledQuestions.length}</strong>
        <span className="timer">⏱ {timeLeft}s</span>
      </div>
      <div className="progress"><span style={{ width: `${progress}%` }} /></div>

      <h2 className="question">{question.question}</h2>

      <div className="options">
        {question.options.map((option) => {
          const isCorrect = option === question.answer;
          const className = answered
            ? `option ${isCorrect ? 'correct' : selected === option ? 'wrong' : ''}`
            : 'option';

          return (
            <button key={option} className={className} onClick={() => chooseAnswer(option)}>
              {option}
            </button>
          );
        })}
      </div>

      {answered && <div className="feedback">💡 {question.explanation}</div>}

      <div className="controls">
        <span className="muted">Score: {score}</span>
        <button className="button button-primary" onClick={goNext} disabled={!answered}>
          {current === shuffledQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'} →
        </button>
      </div>
    </section>
  );
}

export default Quiz;
