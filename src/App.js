
import React, { useState } from "react";
import "./App.css";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [celebrated, setCelebrated] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [password, setPassword] = useState("");
  const [showPhoto, setShowPhoto] = useState(false);
  const [error, setError] = useState("");

  const correctPassword = "Eli-Pussy-Belongs-To-Aayush";

  const moveButton = () => {
    const buttonWidth = 220;
    const buttonHeight = 60;

    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;

    const randomX = Math.random() * Math.max(0, maxX);
    const randomY = Math.random() * Math.max(0, maxY);

    setPosition({
      x: randomX,
      y: randomY,
    });

    setIsMoving(true);
  };

  const unlockReward = () => {
    if (password === correctPassword) {
      setShowPassword(false);
      setShowPhoto(true);
      setError("");
    } else {
      setError("Oops! Wrong password. Try again! 😅");
    }
  };

  // Celebration screen
  if (celebrated) {
    return (
      <div className="celebration-screen">

        {Array.from({ length: 50 }).map((_, i) => (
          <span
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            {["🎉", "🎊", "✨", "🥳", "🎈", "💖"][i % 6]}
          </span>
        ))}

        <div className="celebration-message">

          <div className="party-emoji">🥳🎉</div>

          <h1>Wooohooo! 😍</h1>

          <h2>Thank you my love! 😘</h2>

          <br />

          <p>
            You deserve an award. Click the below button to claim reward
          </p>

          <button
            className="reward-button"
            onClick={() => {
              setShowPassword(true);
              setPassword("");
              setError("");
              setShowPasswordText(false);
            }}
          >
            Claim Your Reward 🎁
          </button>

          <div className="party-poppers">
            🎊 🎉 🎊
          </div>

          {/* Password Popup */}
          {showPassword && (
            <div className="photo-overlay">
              <div className="password-popup">

                <button
                  className="close-photo"
                  onClick={() => setShowPassword(false)}
                >
                  ✕
                </button>

                <h2>One little secret! 🤫</h2>

                <div className="password-input-container">
                  <input
                    type={showPasswordText ? "text" : "password"}
                    placeholder="Ask me for password 😉"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        unlockReward();
                      }
                    }}
                  />

                  <button
                    type="button"
                    className="eye-button"
                    onClick={() =>
                      setShowPasswordText(!showPasswordText)
                    }
                  >
                    👁
                  </button>
                </div>

                {error && (
                  <p className="error-message">{error}</p>
                )}

                <button
                  className="unlock-button"
                  onClick={unlockReward}
                >
                  Unlock Your Reward 🔓
                </button>

              </div>
            </div>
          )}

          {/* Photo Popup */}
          {showPhoto && (
            <div
              className="photo-overlay"
              onClick={() => setShowPhoto(false)}
            >
              <div
                className="photo-popup"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close-photo"
                  onClick={() => setShowPhoto(false)}
                >
                  ✕
                </button>

                <img
  src={`${process.env.PUBLIC_URL}/my.jpeg`}
  alt="Your reward"
  className="reward-photo"
/>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // Original apology screen
  return (
    <div className="app">
      <div className="content">

        <h1>I am sorry my love 🥺</h1>

        <div className="button-container">

          <button
            className="fixed-button"
            onClick={() => setCelebrated(true)}
          >
            Ok I forgive you 🥰
          </button>

          <button
            className={`moving-button ${isMoving ? "moving" : ""}`}
            style={
              isMoving
                ? {
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                  }
                : {}
            }
            onMouseEnter={moveButton}
            onTouchStart={(e) => {
              e.preventDefault();
              moveButton();
            }}
          >
            No I am still angry 😡
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;
