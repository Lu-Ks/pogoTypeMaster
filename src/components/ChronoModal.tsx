import { useState } from "react";
import { HistoryEntry } from "../types";
import { TYPE_IMAGES } from "../gameData";

export type ChronoTypeMode = "single" | "dual" | "both";

interface ChronoModalProps {
  chronoMode: boolean;
  chronoReady: boolean;
  chronoActive: boolean;
  chronoTimeLeft: number;
  chronoScore: number;
  chronoCorrect: number;
  chronoBestStreak: number;
  chronoHistory: HistoryEntry[];
  onStart: (typeMode: ChronoTypeMode) => void;
  onClose: () => void;
}

function ChronoModal({
  chronoMode,
  chronoReady,
  chronoActive,
  chronoTimeLeft,
  chronoScore,
  chronoCorrect,
  chronoBestStreak,
  chronoHistory,
  onStart,
  onClose,
}: ChronoModalProps) {
  const [selectedTypeMode, setSelectedTypeMode] =
    useState<ChronoTypeMode>("single");
  const accuracy =
    chronoScore > 0 ? Math.round((chronoCorrect / chronoScore) * 100) : 0;

  // Show ready screen
  if (chronoMode && !chronoReady && !chronoActive) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content chrono-ready"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Chrono Mode</h2>
          <p>Answer as many questions as you can in 60 seconds!</p>

          <div className="chrono-type-mode-selector">
            <label className="type-mode-label">Type Mode:</label>
            <div className="type-mode-options">
              <button
                className={`type-mode-btn ${
                  selectedTypeMode === "single" ? "active" : ""
                }`}
                onClick={() => setSelectedTypeMode("single")}
              >
                Single
              </button>
              <button
                className={`type-mode-btn ${
                  selectedTypeMode === "dual" ? "active" : ""
                }`}
                onClick={() => setSelectedTypeMode("dual")}
              >
                Dual
              </button>
              <button
                className={`type-mode-btn ${
                  selectedTypeMode === "both" ? "active" : ""
                }`}
                onClick={() => setSelectedTypeMode("both")}
              >
                Both
              </button>
            </div>
          </div>

          <div className="chrono-rules">
            <div className="rule-item">Quick answers, no feedback delay</div>
            <div className="rule-item">Build your streak for glory</div>
            <div className="rule-item">Track your accuracy</div>
          </div>
          <button
            className="ready-btn"
            onClick={() => onStart(selectedTypeMode)}
          >
            Start!
          </button>
          <button className="close-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Show results screen
  if (chronoMode && chronoReady && !chronoActive && chronoTimeLeft === 0) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content chrono-results"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Time's Up!</h2>
          <div className="chrono-final-score">
            <span className="final-score-label">Questions Answered</span>
            <span className="final-score-value">{chronoScore}</span>
          </div>
          <div className="chrono-stats">
            <div className="stat-item">
              <span className="stat-label">Correct Answers</span>
              <span className="stat-value correct">{chronoCorrect}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Wrong Answers</span>
              <span className="stat-value wrong">
                {chronoScore - chronoCorrect}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Accuracy</span>
              <span
                className={`stat-value ${
                  accuracy >= 80 ? "excellent" : accuracy >= 60 ? "good" : ""
                }`}
              >
                {accuracy}%
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Best Streak</span>
              <span className="stat-value streak">{chronoBestStreak}</span>
            </div>
          </div>

          {chronoHistory.length > 0 && (
            <div className="chrono-history">
              <h3>History</h3>
              <div className="chrono-history-list">
                {chronoHistory.map((entry, index) => (
                  <div
                    key={index}
                    className={`chrono-history-item ${
                      entry.isCorrect ? "correct" : "incorrect"
                    }`}
                  >
                    <div className="chrono-history-types">
                      <img
                        src={TYPE_IMAGES[entry.attackingType]}
                        alt={entry.attackingType}
                        className="chrono-history-type-img"
                      />
                      <span className="chrono-history-arrow">→</span>
                      <img
                        src={TYPE_IMAGES[entry.defendingType]}
                        alt={entry.defendingType}
                        className="chrono-history-type-img"
                      />
                      {entry.defendingType2 && (
                        <img
                          src={TYPE_IMAGES[entry.defendingType2]}
                          alt={entry.defendingType2}
                          className="chrono-history-type-img"
                        />
                      )}
                    </div>
                    <div className="chrono-history-answer">
                      <span
                        className={`chrono-history-user-answer ${
                          entry.isCorrect ? "correct" : "incorrect"
                        }`}
                      >
                        {entry.userAnswer.replace(/-/g, " ")}
                      </span>
                      {!entry.isCorrect && (
                        <span className="chrono-history-correct-answer">
                          {entry.correctAnswer.replace(/-/g, " ")}
                        </span>
                      )}
                    </div>
                    <span
                      className={`chrono-history-result ${
                        entry.isCorrect ? "correct" : "incorrect"
                      }`}
                    >
                      {entry.isCorrect ? "✓" : "✗"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="chrono-result-actions">
            <button
              className="ready-btn"
              onClick={() => onStart(selectedTypeMode)}
            >
              Play Again
            </button>
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default ChronoModal;
