import React, { useState, useEffect } from "react";
import { quizData } from "../data";
import NavC from "./NavC";
import LevelsC from "./LevelsC";
import QuitC from "./QuitC";

const BoardC = (props) => {
  const { userName } = props;
  const [showGame, setShowGame] = useState(true);
  const [quitGame, setQuitGame] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showBoard, setShowBoard] = useState(false);
  const [showStart, setShowStart] = useState(true);
  const [startBoard, setStartBoard] = useState(false);
  const [timer, setTimer] = useState(20);
  const [showTimer, setShowTimer] = useState(false);
  const [scoreBoard, setScoreBoard] = useState(false);
  const [finalScore, setFinalScore] = useState("");

  useEffect(() => {
    let countDown;
    if (timer > 0 && showTimer) {
      countDown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countDown);
    }
  }, [timer, showTimer]);

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  let countDownColor;
  if (timer >= 15) {
    countDownColor = "#358600";
  } else if (timer >= 10) {
    countDownColor = "orange";
  } else if (timer >= 1) {
    countDownColor = "red";
  } else {
    countDownColor = "white";
  }

  const handleGame = () => {
    setShowGame(false);
    setQuitGame(true);
  };

  const handleQuit = () => {
    setShowGame(true);
    setQuitGame(false);
  };

  const handleAnswer = (correct, index) => {
    setIsCorrect(correct);
    setShowTimer(false);
    if (correct) {
      setScore(score + 1000);
      const answerButton = document.querySelectorAll(".options")[index];
      if (answerButton) {
        answerButton.style.background = "#00A6A6";
        answerButton.style.color = "white";
      }
    } else {
      const answerButton = document.querySelectorAll(".options")[index];
      if (answerButton) {
        answerButton.style.background = "#EF959C";
        answerButton.style.color = "white";
      }
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData[currentLevel].questions.length) {
      setShowBoard(false);
      setStartLoading(true);
      setTimeout(() => {
        setStartLoading(false);
        setCurrentQuestion(nextQuestion);
        setIsCorrect(null);
        setShowBoard(true);
        setTimer(20);
        setShowTimer(true);
      }, 500);
    } else {
      showNextLevelButton();
    }
  };

  const handleNextLevel = () => {
    const nextLevel = currentLevel + 1;
    if (nextLevel < quizData.length) {
      setCurrentLevel(nextLevel);
      setCurrentQuestion(0);
      setTimer(20);
      setShowTimer(true);
      setIsCorrect(null);
      const answerButtons = document.querySelectorAll(".options");
      answerButtons.forEach((button) => (button.style.background = "white"));
    } else {
      setShowTimer(false);
      setScoreBoard(true);
      alert(
        `Quiz complete! Your final score is ${score}/${quizData.reduce(
          (total, level) => total + level.questions.length,
          0
        )}`
      );
    }
  };

  const showNextLevelButton = () => {
    return (
      <div>
        <p className="level-complete">
          Level completed! Click the button below to go to the next level.
        </p>
        <button className="next-btn" onClick={handleNextLevel}>
          Next Level
        </button>
      </div>
    );
  };

  const handleStart = () => {
    setShowStart(false);
    setStartLoading(true);
    setTimeout(() => {
      setStartLoading(false);
      setShowBoard(true);

      setTimeout(() => {
        setShowTimer(true);
      }, 3000);
    }, 2000);
  };

  const { question, answers } =
    quizData[currentLevel]?.questions[currentQuestion] ?? {};

  return (
    <div>
      {showGame && (
        <div className="game-section">
          <div className="nav-section">
            <NavC
              currentLevel={currentLevel + 1}
              score={score}
              handleGame={() => handleGame}
            />
          </div>
          <div className="ground-sec">
            <div className="right-media">
              <div className="right-cont">
                <h1 style={{ color: countDownColor }}>
                  <span>Time:</span>
                  {showTimer && showTimer
                    ? formatTime(timer > 9 ? timer : `0${timer}`)
                    : "00"}
                </h1>
                <h2 className="right-score">
                  Your Score <br />
                  <span>{score}</span>{" "}
                </h2>
              </div>
            </div>
            <div className="sidebar-sec">
              <LevelsC currentLevel={currentLevel} />
            </div>

            <div className="board-sec">
              <h2 className="welcome">Welcome {userName}</h2>
              <div className="loading-sec">
                {startLoading ? "Loading..." : ""}
              </div>
              {showStart && (
                <div className="show-start">
                  <p>Are you Ready to Start?</p>
                  <div className="start-btn">
                    <button className="hand-start" onClick={handleStart}>
                      Start
                    </button>
                    <button
                      className="hand-deny"
                      onClick={() => alert("Have a Great Day")}
                    >
                      Deny
                    </button>
                  </div>
                </div>
              )}

              {showBoard && (
                <div className="question-board">
                  <p className="board-question">{question}</p>
                  <ul className="answers-grid">
                    {answers.map(({ text, correct }, index) => (
                      <li key={index}>
                        <button
                          disabled={isCorrect !== null}
                          onClick={() => handleAnswer(correct, index)}
                          className={`options ${
                            Math.random() < 0.5 ? "flash-random" : ""
                          }`}
                        >
                          {text}
                        </button>
                      </li>
                    ))}
                  </ul>
                  {isCorrect !== null && (
                    <p
                      className={`result-show ${
                        isCorrect ? "correct" : "wrong"
                      }`}
                    >
                      {isCorrect
                        ? "Congratulations, Correct Answer!"
                        : "Sorry, Wrong Answer!"}
                    </p>
                  )}

                  {currentQuestion + 1 !==
                    quizData[currentLevel].questions.length && (
                    <button onClick={handleNextQuestion} className="next-btn">
                      Next Question
                    </button>
                  )}
                  {currentQuestion + 1 ===
                    quizData[currentLevel].questions.length &&
                    showNextLevelButton()}
                </div>
              )}
            </div>
            <div className="right-sec">
              <h1 style={{ color: countDownColor }}>
                <span>Time:</span>
                {showTimer && showTimer
                  ? formatTime(timer > 9 ? timer : `0${timer}`)
                  : "00"}
              </h1>
              <h2 className="right-score">
                Your Score <br />
                <span>{score}</span>{" "}
              </h2>
            </div>
          </div>
        </div>
      )}
      {quitGame ? <QuitC handleQuit={() => handleQuit} /> : ""}
    </div>
  );
};

export default BoardC;
