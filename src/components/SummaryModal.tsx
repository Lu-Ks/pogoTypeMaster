import React from "react";
import { HistoryEntry, PokemonType } from "../types";
import { TYPE_IMAGES } from "../gameData";
import "./SummaryModal.css";

interface SummaryModalProps {
  history: HistoryEntry[];
  onClose: () => void;
}

interface MistakeStats {
  attackingType: PokemonType;
  defendingType: PokemonType;
  defendingType2?: PokemonType;
  count: number;
  lastAnswer: string;
  correctAnswer: string;
}

const SummaryModal: React.FC<SummaryModalProps> = ({ history, onClose }) => {
  // Calculate statistics
  const totalQuestions = history.length;
  const correctAnswers = history.filter((h) => h.isCorrect).length;
  const accuracy =
    totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  // Find common mistakes
  const mistakes = history.filter((h) => !h.isCorrect);
  const mistakeMap = new Map<string, MistakeStats>();

  mistakes.forEach((mistake) => {
    const key = `${mistake.attackingType}-${mistake.defendingType}${
      mistake.defendingType2 ? `-${mistake.defendingType2}` : ""
    }`;

    if (mistakeMap.has(key)) {
      mistakeMap.get(key)!.count++;
    } else {
      mistakeMap.set(key, {
        attackingType: mistake.attackingType,
        defendingType: mistake.defendingType,
        defendingType2: mistake.defendingType2,
        count: 1,
        lastAnswer: mistake.userAnswer,
        correctAnswer: mistake.correctAnswer,
      });
    }
  });

  const topMistakes = Array.from(mistakeMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Type-specific accuracy
  const typeAccuracy = new Map<
    PokemonType,
    { correct: number; total: number }
  >();

  history.forEach((entry) => {
    if (!typeAccuracy.has(entry.attackingType)) {
      typeAccuracy.set(entry.attackingType, { correct: 0, total: 0 });
    }
    const stats = typeAccuracy.get(entry.attackingType)!;
    stats.total++;
    if (entry.isCorrect) stats.correct++;
  });

  const weakestTypes = Array.from(typeAccuracy.entries())
    .map(([type, stats]) => ({
      type,
      accuracy: (stats.correct / stats.total) * 100,
      total: stats.total,
    }))
    .filter((t) => t.total >= 3) // Only show types with at least 3 questions
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5);

  return (
    <div className="summary-overlay" onClick={onClose}>
      <div className="summary-modal" onClick={(e) => e.stopPropagation()}>
        <div className="summary-header">
          <h2>Performance Summary</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="summary-content">
          {totalQuestions === 0 ? (
            <p className="summary-empty">
              No history yet. Start playing to see your performance summary!
            </p>
          ) : (
            <>
              <div className="summary-stats">
                <div className="stat-card">
                  <div className="stat-value">{totalQuestions}</div>
                  <div className="stat-label">Total Questions</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{correctAnswers}</div>
                  <div className="stat-label">Correct Answers</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{accuracy.toFixed(1)}%</div>
                  <div className="stat-label">Accuracy</div>
                </div>
              </div>

              {topMistakes.length > 0 && (
                <div className="summary-section">
                  <h3>Most Common Mistakes</h3>
                  <p className="section-hint">
                    Practice these matchups to improve!
                  </p>
                  <div className="mistakes-list">
                    {topMistakes.map((mistake, index) => (
                      <div key={index} className="mistake-item">
                        <div className="mistake-count">{mistake.count}×</div>
                        <div className="mistake-matchup">
                          <img
                            src={TYPE_IMAGES[mistake.attackingType]}
                            alt={mistake.attackingType}
                            className="mistake-type-img"
                          />
                          <span className="mistake-arrow">→</span>
                          <div className="mistake-defending">
                            <img
                              src={TYPE_IMAGES[mistake.defendingType]}
                              alt={mistake.defendingType}
                              className="mistake-type-img"
                            />
                            {mistake.defendingType2 && (
                              <img
                                src={TYPE_IMAGES[mistake.defendingType2]}
                                alt={mistake.defendingType2}
                                className="mistake-type-img mistake-type-img-secondary"
                              />
                            )}
                          </div>
                        </div>
                        <div className="mistake-info">
                          <div className="mistake-wrong">
                            Your answer: {mistake.lastAnswer.replace("-", " ")}
                          </div>
                          <div className="mistake-correct">
                            Correct: {mistake.correctAnswer.replace("-", " ")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {weakestTypes.length > 0 && (
                <div className="summary-section">
                  <h3>Types to Practice</h3>
                  <p className="section-hint">
                    Your weakest attacking types (minimum 3 questions)
                  </p>
                  <div className="weak-types-list">
                    {weakestTypes.map((typeInfo, index) => (
                      <div key={index} className="weak-type-item">
                        <img
                          src={TYPE_IMAGES[typeInfo.type]}
                          alt={typeInfo.type}
                          className="weak-type-img"
                        />
                        <div className="weak-type-info">
                          <div className="weak-type-name">
                            {typeInfo.type.toUpperCase()}
                          </div>
                          <div className="weak-type-stats">
                            {typeInfo.accuracy.toFixed(0)}% accuracy (
                            {typeInfo.total} questions)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="summary-footer">
          <button className="summary-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
