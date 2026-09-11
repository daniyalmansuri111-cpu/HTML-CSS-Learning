function Result({ score, total, bestScore, onRestart }) {
  const percentage = Math.round((score / total) * 100);

  return (
    <section className="quiz-card center">
      <span className="badge">Quiz Complete</span>
      <h1>🎉 Great Work!</h1>
      <div className="result-score">{score}/{total}</div>
      <p className="muted">You scored {percentage}% on the Smart Quiz.</p>
      <div className="stats">
        <div className="stat"><strong>{score}</strong><span className="muted">Correct</span></div>
        <div className="stat"><strong>{total - score}</strong><span className="muted">Incorrect</span></div>
        <div className="stat"><strong>{bestScore}</strong><span className="muted">Best Score</span></div>
      </div>
      <button className="button button-primary" onClick={onRestart}>Try Again ↻</button>
    </section>
  );
}

export default Result;
