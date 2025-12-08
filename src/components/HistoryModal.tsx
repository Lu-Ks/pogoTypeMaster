import React from "react";
import { HistoryEntry } from "../types";
import { TYPE_IMAGES } from "../gameData";
import "./HistoryModal.css";

interface HistoryModalProps {
  history: HistoryEntry[];
  onClose: () => void;
  onShowSummary: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  history,
  onClose,
  onShowSummary,
}) => {
  return (
    <div className="history-modal-overlay" onClick={onClose}>
      <div className="history-modal" onClick={(e) => e.stopPropagation()}>
        <div className="history-modal-header">
          <h2>History</h2>
          <div className="history-modal-actions">
            {history.length > 0 && (
              <button
                className="summary-btn-modal"
                onClick={() => {
                  onClose();
                  onShowSummary();
                }}
              >
                Summary
              </button>
            )}
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className="history-modal-content">
          {history.length === 0 ? (
            <p className="history-empty">No answers yet. Start playing!</p>
          ) : (
            <div className="history-list">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className={`history-item ${
                    entry.isCorrect ? "correct" : "incorrect"
                  }`}
                >
                  <div className="history-types">
                    <img
                      src={TYPE_IMAGES[entry.attackingType]}
                      alt={entry.attackingType}
                      className="history-type-img"
                    />
                    <span className="history-arrow">→</span>
                    <div className="history-defending">
                      <img
                        src={TYPE_IMAGES[entry.defendingType]}
                        alt={entry.defendingType}
                        className="history-type-img"
                      />
                      {entry.defendingType2 && (
                        <img
                          src={TYPE_IMAGES[entry.defendingType2]}
                          alt={entry.defendingType2}
                          className="history-type-img history-type-img-secondary"
                        />
                      )}
                    </div>
                  </div>
                  <div className="history-details">
                    <div className="history-answer">
                      {entry.isCorrect ? "✓" : "✗"}{" "}
                      {entry.userAnswer.replace("-", " ")}
                    </div>
                    {!entry.isCorrect && (
                      <div className="history-correct-answer">
                        (was: {entry.correctAnswer.replace("-", " ")})
                      </div>
                    )}
                    <div className="history-points">
                      {entry.isCorrect ? `+${entry.points}` : "0"} pts
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
