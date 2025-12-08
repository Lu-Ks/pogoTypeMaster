import React, { useState } from "react";
import "./SettingsModal.css";

interface KeyboardShortcuts {
  superEffective: string;
  normal: string;
  notVeryEffective: string;
  doubleResist: string;
  doubleWeakness: string;
  reset: string;
  continue: string;
}

interface SettingsModalProps {
  shortcuts: KeyboardShortcuts;
  onSave: (shortcuts: KeyboardShortcuts) => void;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  shortcuts,
  onSave,
  onClose,
}) => {
  const [editingShortcuts, setEditingShortcuts] =
    useState<KeyboardShortcuts>(shortcuts);
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const handleKeyCapture = (
    e: React.KeyboardEvent,
    field: keyof KeyboardShortcuts
  ) => {
    e.preventDefault();
    const key = e.key.toUpperCase();

    // Don't allow Escape key to be bound
    if (key === "ESCAPE") {
      setEditingKey(null);
      return;
    }

    setEditingShortcuts((prev) => ({
      ...prev,
      [field]: key,
    }));
    setEditingKey(null);
  };

  const handleSave = () => {
    onSave(editingShortcuts);
    onClose();
  };

  const handleReset = () => {
    const defaultShortcuts: KeyboardShortcuts = {
      superEffective: "F",
      normal: "G",
      notVeryEffective: "H",
      doubleResist: "J",
      doubleWeakness: "D",
      reset: "R",
      continue: "ENTER",
    };
    setEditingShortcuts(defaultShortcuts);
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="settings-content">
          <h3>Keyboard Shortcuts</h3>
          <p className="settings-hint">
            Click on a shortcut button and press a key to change it
          </p>

          <div className="shortcut-list">
            <div className="shortcut-item">
              <label>Super Effective:</label>
              <button
                className={`shortcut-btn ${
                  editingKey === "superEffective" ? "editing" : ""
                }`}
                onClick={() => setEditingKey("superEffective")}
                onKeyDown={(e) => handleKeyCapture(e, "superEffective")}
              >
                {editingKey === "superEffective"
                  ? "Press a key..."
                  : editingShortcuts.superEffective}
              </button>
            </div>

            <div className="shortcut-item">
              <label>Normal:</label>
              <button
                className={`shortcut-btn ${
                  editingKey === "normal" ? "editing" : ""
                }`}
                onClick={() => setEditingKey("normal")}
                onKeyDown={(e) => handleKeyCapture(e, "normal")}
              >
                {editingKey === "normal"
                  ? "Press a key..."
                  : editingShortcuts.normal}
              </button>
            </div>

            <div className="shortcut-item">
              <label>Not Very Effective:</label>
              <button
                className={`shortcut-btn ${
                  editingKey === "notVeryEffective" ? "editing" : ""
                }`}
                onClick={() => setEditingKey("notVeryEffective")}
                onKeyDown={(e) => handleKeyCapture(e, "notVeryEffective")}
              >
                {editingKey === "notVeryEffective"
                  ? "Press a key..."
                  : editingShortcuts.notVeryEffective}
              </button>
            </div>

            <div className="shortcut-item">
              <label>Double Weakness:</label>
              <button
                className={`shortcut-btn ${
                  editingKey === "doubleWeakness" ? "editing" : ""
                }`}
                onClick={() => setEditingKey("doubleWeakness")}
                onKeyDown={(e) => handleKeyCapture(e, "doubleWeakness")}
              >
                {editingKey === "doubleWeakness"
                  ? "Press a key..."
                  : editingShortcuts.doubleWeakness}
              </button>
            </div>

            <div className="shortcut-item">
              <label>Double Resist:</label>
              <button
                className={`shortcut-btn ${
                  editingKey === "doubleResist" ? "editing" : ""
                }`}
                onClick={() => setEditingKey("doubleResist")}
                onKeyDown={(e) => handleKeyCapture(e, "doubleResist")}
              >
                {editingKey === "doubleResist"
                  ? "Press a key..."
                  : editingShortcuts.doubleResist}
              </button>
            </div>

            <div className="shortcut-item">
              <label>Reset Progress:</label>
              <button
                className={`shortcut-btn ${
                  editingKey === "reset" ? "editing" : ""
                }`}
                onClick={() => setEditingKey("reset")}
                onKeyDown={(e) => handleKeyCapture(e, "reset")}
              >
                {editingKey === "reset"
                  ? "Press a key..."
                  : editingShortcuts.reset}
              </button>
            </div>

            <div className="shortcut-item">
              <label>Continue:</label>
              <button
                className={`shortcut-btn ${
                  editingKey === "continue" ? "editing" : ""
                }`}
                onClick={() => setEditingKey("continue")}
                onKeyDown={(e) => handleKeyCapture(e, "continue")}
              >
                {editingKey === "continue"
                  ? "Press a key..."
                  : editingShortcuts.continue}
              </button>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button className="settings-reset-btn" onClick={handleReset}>
            Reset to Defaults
          </button>
          <button className="settings-save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
