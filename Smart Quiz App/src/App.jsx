import { useEffect, useState } from 'react';
import StartScreen from './components/StartScreen.jsx';
import Quiz from './components/Quiz.jsx';
import Result from './components/Result.jsx';
import questions from './data/questions.js';

function App() {
  const [screen, setScreen] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => Number(localStorage.getItem('smartQuizBestScore') || 0));

  useEffect(() => {
    if (screen === 'result' && score > bestScore) {
      localStorage.setItem('smartQuizBestScore', String(score));
      setBestScore(score);
    }
  }, [screen, score, bestScore]);

  const startQuiz = () => {
    setScore(0);
    setScreen('quiz');
  };

  const finishQuiz = (finalScore) => {
    setScore(finalScore);
    setScreen('result');
  };

  return (
    <main className="app-shell">
      {screen === 'start' && <StartScreen onStart={startQuiz} bestScore={bestScore} />}
      {screen === 'quiz' && <Quiz questions={questions} onFinish={finishQuiz} />}
      {screen === 'result' && (
        <Result
          score={score}
          total={questions.length}
          bestScore={bestScore}
          onRestart={startQuiz}
        />
      )}
    </main>
  );
}

export default App;
