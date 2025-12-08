import { useState, useEffect } from "react";
import TypeCard from "./components/TypeCard";
import ScoreDisplay from "./components/ScoreDisplay";
import AnswerButtons from "./components/AnswerButtons";
import FeedbackOverlay from "./components/FeedbackOverlay";
import SettingsModal from "./components/SettingsModal";
import SummaryModal from "./components/SummaryModal";
import HistoryModal from "./components/HistoryModal";
import ChronoModal, { ChronoTypeMode } from "./components/ChronoModal";
import { Question, GameStats, HistoryEntry } from "./types";
import { generateQuestion, calculateScore } from "./gameUtils";
import { TYPE_IMAGES } from "./gameData";
import "./App.css";
import "./components/ChronoModal.css";

const settingsIcon = new URL("./assets/settings.svg", import.meta.url).href;

interface KeyboardShortcuts {
  superEffective: string;
  normal: string;
  notVeryEffective: string;
  doubleResist: string;
  doubleWeakness: string;
  reset: string;
  continue: string;
}

function App() {
  const [dualTypeMode, setDualTypeMode] = useState(false);
  const [showFeedbackOverlay, setShowFeedbackOverlay] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chronoMode, setChronoMode] = useState(false);
  const [chronoReady, setChronoReady] = useState(false);
  const [chronoActive, setChronoActive] = useState(false);
  const [chronoTimeLeft, setChronoTimeLeft] = useState(60);
  const [chronoScore, setChronoScore] = useState(0);
  const [chronoCorrect, setChronoCorrect] = useState(0);
  const [chronoBestStreak, setChronoBestStreak] = useState(0);
  const [chronoCurrentStreak, setChronoCurrentStreak] = useState(0);
  const [chronoHistory, setChronoHistory] = useState<HistoryEntry[]>([]);
  const [chronoTypeMode, setChronoTypeMode] =
    useState<ChronoTypeMode>("single");
  const [shortcuts, setShortcuts] = useState<KeyboardShortcuts>({
    superEffective: "F",
    normal: "G",
    notVeryEffective: "H",
    doubleResist: "J",
    doubleWeakness: "D",
    reset: "R",
    continue: "ENTER",
  });
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    generateQuestion(false)
  );
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    streak: 0,
    bestStreak: 0,
    totalQuestions: 0,
    correctAnswers: 0,
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [lastPoints, setLastPoints] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    // Load saved stats from localStorage
    const savedStats = localStorage.getItem("pokemonGameStats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    // Load feedback overlay preference
    const savedFeedbackPref = localStorage.getItem("showFeedbackOverlay");
    if (savedFeedbackPref !== null) {
      setShowFeedbackOverlay(JSON.parse(savedFeedbackPref));
    }

    // Load keyboard shortcuts
    const savedShortcuts = localStorage.getItem("keyboardShortcuts");
    if (savedShortcuts) {
      setShortcuts(JSON.parse(savedShortcuts));
    }
  }, []);

  useEffect(() => {
    // Save stats to localStorage
    localStorage.setItem("pokemonGameStats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    // Save feedback overlay preference to localStorage
    localStorage.setItem(
      "showFeedbackOverlay",
      JSON.stringify(showFeedbackOverlay)
    );
  }, [showFeedbackOverlay]);

  useEffect(() => {
    // Save keyboard shortcuts to localStorage
    localStorage.setItem("keyboardShortcuts", JSON.stringify(shortcuts));
  }, [shortcuts]);

  // Chrono mode timer
  useEffect(() => {
    if (!chronoActive) return;

    if (chronoTimeLeft <= 0) {
      // Timer finished
      setChronoActive(false);
      return;
    }

    const timer = setInterval(() => {
      setChronoTimeLeft((prev) => {
        if (prev <= 1) {
          setChronoActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [chronoActive, chronoTimeLeft]);

  const getChronoDualTypeMode = (): boolean => {
    if (chronoTypeMode === "single") return false;
    if (chronoTypeMode === "dual") return true;
    // "both" - randomly choose
    return Math.random() < 0.5;
  };

  const handleChronoStart = (typeMode: ChronoTypeMode) => {
    setChronoTypeMode(typeMode);
    setChronoReady(true);
    setChronoActive(true);
    setChronoTimeLeft(60);
    setChronoScore(0);
    setChronoCorrect(0);
    setChronoBestStreak(0);
    setChronoCurrentStreak(0);
    setChronoHistory([]);

    // Generate first question based on selected mode
    const useDualType =
      typeMode === "dual"
        ? true
        : typeMode === "single"
        ? false
        : Math.random() < 0.5;
    setCurrentQuestion(generateQuestion(useDualType));
  };

  const handleChronoCancel = () => {
    // Stop the timer and show results (same as time running out)
    setChronoActive(false);
    setChronoTimeLeft(0);
  };

  const handleChronoClose = () => {
    setChronoMode(false);
    setChronoReady(false);
    setChronoActive(false);
    setChronoTimeLeft(60);
    setChronoScore(0);
    setChronoCorrect(0);
    setChronoBestStreak(0);
    setChronoCurrentStreak(0);
    setChronoHistory([]);
  };

  const handleAnswer = (answer: Question["correctAnswer"]) => {
    if (isAnswering) return;
    if (chronoActive && chronoTimeLeft === 0) return; // Block answers when timer is up

    setIsAnswering(true);
    const isCorrect = answer === currentQuestion.correctAnswer;
    const newStreak = isCorrect ? stats.streak + 1 : 0;
    const points = calculateScore(isCorrect, stats.streak);

    setLastAnswerCorrect(isCorrect);
    setLastPoints(points);

    // Increment chrono stats in chrono mode
    if (chronoActive) {
      setChronoScore((prev) => prev + 1);
      if (isCorrect) {
        setChronoCorrect((prev) => prev + 1);
        setChronoCurrentStreak((prev) => {
          const newStreak = prev + 1;
          setChronoBestStreak((best) => Math.max(best, newStreak));
          return newStreak;
        });
      } else {
        setChronoCurrentStreak(0);
      }
    }

    // Add to history
    const historyEntry: HistoryEntry = {
      id: Date.now(),
      attackingType: currentQuestion.attackingType,
      defendingType: currentQuestion.defendingType,
      defendingType2: currentQuestion.defendingType2,
      userAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      points,
      timestamp: Date.now(),
    };

    setHistory((prev) => [historyEntry, ...prev]); // Keep all history

    // Add to chrono history if in chrono mode
    if (chronoActive) {
      setChronoHistory((prev) => [historyEntry, ...prev]);
    }

    setStats((prev) => ({
      score: prev.score + points,
      streak: newStreak,
      bestStreak: Math.max(prev.bestStreak, newStreak),
      totalQuestions: prev.totalQuestions + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
    }));

    if (showFeedbackOverlay && !chronoActive) {
      setShowFeedback(true);
    } else {
      // Auto-continue to next question
      setTimeout(
        () => {
          setIsAnswering(false);
          // Use chrono type mode when in chrono mode, otherwise use dualTypeMode
          const useDualType = chronoActive
            ? getChronoDualTypeMode()
            : dualTypeMode;
          setCurrentQuestion(generateQuestion(useDualType));
        },
        chronoActive ? 50 : 150
      ); // Faster transition in chrono mode
    }
  };

  const handleContinue = () => {
    setShowFeedback(false);
    setIsAnswering(false);
    setCurrentQuestion(generateQuestion(dualTypeMode));
  };

  const toggleDualTypeMode = () => {
    setDualTypeMode(!dualTypeMode);
    setCurrentQuestion(generateQuestion(!dualTypeMode));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your progress?")) {
      setStats({
        score: 0,
        streak: 0,
        bestStreak: 0,
        totalQuestions: 0,
        correctAnswers: 0,
      });
      setHistory([]);
      setCurrentQuestion(generateQuestion());
    }
  };

  const handleSaveShortcuts = (newShortcuts: KeyboardShortcuts) => {
    setShortcuts(newShortcuts);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't handle shortcuts when settings modal is open
      if (showSettings) return;

      const key = e.key.toUpperCase();

      if (showFeedback) {
        if (key === shortcuts.continue || key === " ") {
          handleContinue();
        }
        return;
      }

      if (isAnswering) return;

      if (key === shortcuts.superEffective) {
        handleAnswer("super-effective");
      } else if (key === shortcuts.normal) {
        handleAnswer("normal");
      } else if (key === shortcuts.notVeryEffective) {
        handleAnswer("not-very-effective");
      } else if (key === shortcuts.doubleWeakness && dualTypeMode) {
        handleAnswer("double-weakness");
      } else if (key === shortcuts.doubleResist && dualTypeMode) {
        handleAnswer("double-resist");
      } else if (key === shortcuts.reset) {
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showFeedback, isAnswering, showSettings, shortcuts, dualTypeMode]);

  return (
    <div className="app">
      <header className="app-header fade-in">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">⚔️</span>
            Pokémon GO Type Master
            <span className="title-icon">🛡️</span>
          </h1>
          <button
            className="settings-btn"
            onClick={() => setShowSettings(true)}
            title="Settings"
          >
            <img src={settingsIcon} alt="Settings" />
          </button>
        </div>
        <p className="app-subtitle">Master type effectiveness in Pokémon GO!</p>
      </header>

      <main className="app-main">
        <div className="game-layout">
          <div className="game-section">
            <ScoreDisplay stats={stats} />

            <div className="game-board">
              <div className="question-display">
                <h2 className="question-text">
                  What happens when{" "}
                  <span className="highlight-attacking">
                    {currentQuestion.attackingType.toUpperCase()}
                  </span>{" "}
                  attacks{" "}
                  <span className="highlight-defending">
                    {currentQuestion.defendingType.toUpperCase()}
                    {currentQuestion.defendingType2 &&
                      ` / ${currentQuestion.defendingType2.toUpperCase()}`}
                  </span>
                  ?
                </h2>
              </div>

              <div className="type-cards-container">
                <TypeCard
                  type={currentQuestion.attackingType}
                  label="Attacking"
                  isAttacking={true}
                />
                <div className="arrow-divider">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 40 L60 40 L50 30 M60 40 L50 50"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke="white"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                  </svg>
                </div>
                <div className="defending-types">
                  <TypeCard
                    type={currentQuestion.defendingType}
                    label={
                      currentQuestion.defendingType2 ? "Type 1" : "Defending"
                    }
                    isAttacking={false}
                  />
                  {currentQuestion.defendingType2 && (
                    <TypeCard
                      type={currentQuestion.defendingType2}
                      label="Type 2"
                      isAttacking={false}
                    />
                  )}
                </div>
              </div>

              <AnswerButtons
                onAnswer={handleAnswer}
                disabled={isAnswering}
                dualTypeMode={dualTypeMode}
                shortcuts={{
                  superEffective: shortcuts.superEffective,
                  normal: shortcuts.normal,
                  notVeryEffective: shortcuts.notVeryEffective,
                  doubleResist: shortcuts.doubleResist,
                  doubleWeakness: shortcuts.doubleWeakness,
                }}
              />

              <div className="keyboard-hints">
                <span>
                  Shortcuts: <kbd>{shortcuts.superEffective}</kbd>{" "}
                  <kbd>{shortcuts.normal}</kbd>{" "}
                  <kbd>{shortcuts.notVeryEffective}</kbd>{" "}
                  {dualTypeMode && (
                    <>
                      <kbd>{shortcuts.doubleWeakness}</kbd>{" "}
                      <kbd>{shortcuts.doubleResist}</kbd>{" "}
                    </>
                  )}
                  for answers • <kbd>{shortcuts.reset}</kbd> to reset
                </span>
              </div>
            </div>

            <div className="game-controls">
              <button
                className={`dual-type-toggle ${dualTypeMode ? "active" : ""}`}
                onClick={toggleDualTypeMode}
                disabled={chronoActive}
              >
                {dualTypeMode ? "✓" : ""} Dual Type Mode
              </button>
              <button
                className={`dual-type-toggle ${
                  showFeedbackOverlay ? "active" : ""
                }`}
                onClick={() => setShowFeedbackOverlay(!showFeedbackOverlay)}
                disabled={chronoActive}
              >
                {showFeedbackOverlay ? "✓" : ""} Show Feedback
              </button>
              <button
                className={`dual-type-toggle ${chronoMode ? "active" : ""}`}
                onClick={() => setChronoMode(true)}
                disabled={chronoActive}
              >
                Chrono Mode
              </button>
              <button
                className="history-btn"
                onClick={() => setShowHistory(true)}
                title="View History"
              >
                History {history.length > 0 && `(${history.length})`}
              </button>
              <button className="reset-btn" onClick={handleReset}>
                Reset Progress
              </button>
            </div>
          </div>

          <div className="history-section">
            <div className="history-panel">
              <div className="history-header">
                <h3 className="history-title">History</h3>
                <button
                  className="summary-btn"
                  onClick={() => setShowSummary(true)}
                  disabled={history.length === 0}
                >
                  Show Summary
                </button>
              </div>
              {history.length === 0 ? (
                <div className="history-empty">
                  No answers yet. Start playing!
                </div>
              ) : (
                <div className="history-list">
                  {history.map((entry, index) => (
                    <div
                      key={index}
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
                          {entry.userAnswer.replace("-", " ")}
                        </div>
                        {!entry.isCorrect && (
                          <div className="history-correct-answer">
                            Correct: {entry.correctAnswer.replace("-", " ")}
                          </div>
                        )}
                      </div>
                      <div className="history-points">
                        {entry.isCorrect ? `+${entry.points}` : "0"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {showFeedback && showFeedbackOverlay && (
        <FeedbackOverlay
          isCorrect={lastAnswerCorrect}
          points={lastPoints}
          onContinue={handleContinue}
        />
      )}

      {showSettings && (
        <SettingsModal
          shortcuts={shortcuts}
          onSave={handleSaveShortcuts}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showSummary && (
        <SummaryModal history={history} onClose={() => setShowSummary(false)} />
      )}

      {showHistory && (
        <HistoryModal
          history={history}
          onClose={() => setShowHistory(false)}
          onShowSummary={() => setShowSummary(true)}
        />
      )}

      {chronoActive && (
        <div className="chrono-hud">
          <div
            className={`chrono-timer ${chronoTimeLeft <= 10 ? "warning" : ""}`}
          >
            ⏱️ {chronoTimeLeft}s
          </div>
          <div className="chrono-hud-stats">
            <div className="chrono-hud-stat">
              <span className="hud-label">Answered</span>
              <span className="hud-value">{chronoScore}</span>
            </div>
            <div className="chrono-hud-stat">
              <span className="hud-label">Correct</span>
              <span className="hud-value correct">{chronoCorrect}</span>
            </div>
            <div className="chrono-hud-stat">
              <span className="hud-label">Streak</span>
              <span className="hud-value streak">{chronoCurrentStreak}</span>
            </div>
          </div>
          <button className="chrono-cancel-btn" onClick={handleChronoCancel}>
            ✕
          </button>
        </div>
      )}

      <ChronoModal
        chronoMode={chronoMode}
        chronoReady={chronoReady}
        chronoActive={chronoActive}
        chronoTimeLeft={chronoTimeLeft}
        chronoScore={chronoScore}
        chronoCorrect={chronoCorrect}
        chronoBestStreak={chronoBestStreak}
        chronoHistory={chronoHistory}
        onStart={handleChronoStart}
        onClose={handleChronoClose}
      />
    </div>
  );
}

export default App;
