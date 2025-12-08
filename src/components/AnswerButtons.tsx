import React from "react";
import { Question } from "../types";
import { getEffectivenessMultiplier } from "../gameUtils";
import "./AnswerButtons.css";

interface AnswerButtonsProps {
  onAnswer: (answer: Question["correctAnswer"]) => void;
  disabled?: boolean;
  dualTypeMode?: boolean;
  shortcuts?: {
    superEffective: string;
    normal: string;
    notVeryEffective: string;
    doubleResist: string;
    doubleWeakness: string;
  };
}

const AnswerButtons: React.FC<AnswerButtonsProps> = ({
  onAnswer,
  disabled = false,
  dualTypeMode = false,
  shortcuts = {
    superEffective: "F",
    normal: "G",
    notVeryEffective: "H",
    doubleResist: "J",
    doubleWeakness: "D",
  },
}) => {
  const answers: Array<{
    value: Question["correctAnswer"];
    label: string;
    shortcut: string;
  }> = [
    {
      value: "super-effective",
      label: "Super Effective!",
      shortcut: shortcuts.superEffective,
    },
    {
      value: "normal",
      label: "Normal Damage",
      shortcut: shortcuts.normal,
    },
    {
      value: "not-very-effective",
      label: "Not Very Effective",
      shortcut: shortcuts.notVeryEffective,
    },
    ...(dualTypeMode
      ? [
          {
            value: "double-weakness" as const,
            label: "Double Weakness",
            shortcut: shortcuts.doubleWeakness,
          },
          {
            value: "double-resist" as const,
            label: "Double Resist",
            shortcut: shortcuts.doubleResist,
          },
        ]
      : []),
  ];

  return (
    <div className={`answer-buttons ${dualTypeMode ? "has-five" : ""}`}>
      {answers.map((answer) => (
        <button
          key={answer.value}
          className={`answer-btn ${answer.value}`}
          onClick={() => onAnswer(answer.value)}
          disabled={disabled}
        >
          <span className="answer-label">{answer.label}</span>
          <span className="answer-multiplier">
            {getEffectivenessMultiplier(answer.value)}
          </span>
          <kbd className="answer-shortcut">{answer.shortcut}</kbd>
        </button>
      ))}
    </div>
  );
};

export default AnswerButtons;
