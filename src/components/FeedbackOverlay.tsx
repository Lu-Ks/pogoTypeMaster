import React from "react";
import "./FeedbackOverlay.css";

interface FeedbackOverlayProps {
  isCorrect: boolean;
  points: number;
  onContinue: () => void;
}

const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({
  isCorrect,
  points,
  onContinue,
}) => {
  return (
    <div className={`feedback-overlay ${isCorrect ? "correct" : "incorrect"}`}>
      <div className="feedback-content">
        <div className="feedback-icon">{isCorrect ? "🎉" : "❌"}</div>
        <h2 className="feedback-title">{isCorrect ? "Correct!" : "Wrong!"}</h2>
        {isCorrect && points > 0 && (
          <div className="feedback-points">+{points} points</div>
        )}
        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  );
};

export default FeedbackOverlay;
