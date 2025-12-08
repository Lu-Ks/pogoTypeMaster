import React from "react";
import { GameStats } from "../types";
import "./ScoreDisplay.css";

interface ScoreDisplayProps {
  stats: GameStats;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ stats }) => {
  const accuracy =
    stats.totalQuestions > 0
      ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
      : 0;

  return (
    <div className="score-display">
      <div className="score-item score-main">
        <div className="score-label">Score</div>
        <div className="score-value pulse">{stats.score}</div>
      </div>

      <div className="score-item">
        <div className="score-label">Streak</div>
        <div className="score-value streak-value">{stats.streak}</div>
      </div>

      <div className="score-item">
        <div className="score-label">Best Streak</div>
        <div className="score-value">{stats.bestStreak}</div>
      </div>

      <div className="score-item">
        <div className="score-label">Accuracy</div>
        <div className="score-value">{accuracy}%</div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
