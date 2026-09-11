function StartScreen({ onStart, bestScore }) {
  return (
    <section className="quiz-card hero">
      <span className="badge">Interactive Brain Challenge</span>
      <h1>🧠 Smart Quiz</h1>
      <p>Test your logic, reasoning, and pattern-recognition skills with 10 mind-bending questions.</p>

      <div className="stats">
        <div className="stat"><strong>10</strong><span className="muted">Questions</span></div>
        <div className="stat"><strong>30s</strong><span className="muted">Per Question</span></div>
        <div className="stat"><strong>{bestScore}/10</strong><span className="muted">Best Score</span></div>
      </div>

      <button className="button button-primary" onClick={onStart}>Start Quiz →</button>
    </section>
  );
}

export default StartScreen;
