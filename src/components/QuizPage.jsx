import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE = "https://quizappbackend-k09m.onrender.com";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function QuizPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const student = state?.student;
  const examStartTime = state?.examStartTime ? new Date(state.examStartTime) : null;

  const [questions, setQuestions] = useState([]);
  const [quizReady, setQuizReady] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [waitTime, setWaitTime] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [questionsError, setQuestionsError] = useState(null);
  const [disqualified, setDisqualified] = useState(false);
  const [disqualifiedMessage, setDisqualifiedMessage] = useState("");
  const [isLandscape, setIsLandscape] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false); 

  const timerRef = useRef(null);
  const autoSubmitted = useRef(false);
  const submitQuizRef = useRef(null);

  // ---------- Fullscreen Enforcer ----------
  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => console.error(err));
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  // Redirect if no student
  useEffect(() => {
    if (!student) navigate("/login");
  }, [student, navigate]);

  // Check disqualification on load
  useEffect(() => {
    if (!student) return;
    const checkDisqualification = async () => {
      try {
        const res = await fetch(`${API_BASE}/my-rank?regNo=${student.regNo}`);
        const data = await res.json();
        if (data.success && data.disqualified) {
          setDisqualified(true);
          setDisqualifiedMessage("You have been disqualified.");
          setQuizActive(false);
        }
      } catch (err) {
        console.debug("Disqualification check skipped:", err.message);
      }
    };
    checkDisqualification();
  }, [student]);

  // ---------- Orientation enforcement ----------
  useEffect(() => {
    const checkOrientation = () => {
      const isLandscapeNow =
        window.matchMedia("(orientation: landscape)").matches ||
        (window.screen?.orientation?.type?.startsWith("landscape") ?? false) ||
        window.innerWidth > window.innerHeight;

      setIsLandscape(isLandscapeNow);
    };

    checkOrientation();
    const handleChange = () => checkOrientation();

    window.addEventListener("orientationchange", handleChange);
    window.addEventListener("resize", handleChange);
    if (window.screen?.orientation) window.screen.orientation.addEventListener("change", handleChange);

    return () => {
      window.removeEventListener("orientationchange", handleChange);
      window.removeEventListener("resize", handleChange);
      if (window.screen?.orientation) window.screen.orientation.removeEventListener("change", handleChange);
    };
  }, []);

  // ---------- Global Server Quiz Status & Timer Polling ----------
  useEffect(() => {
    if (!student) return;

    const checkStatus = async () => {
      try {
        const [statusRes, timeRes] = await Promise.all([
          fetch(`${API_BASE}/quiz-status`),
          fetch(`${API_BASE}/servertime`)
        ]);
        
        const data = await statusRes.json();
        const timeData = await timeRes.json();
        const serverNow = new Date(timeData.serverTimeUTC);

        if (data.isQuizOpen) {
          setQuizActive(true);
          // STRICT GLOBAL END TIME SYNC:
          const serverEnd = new Date(data.endTime);
          const remainingSecs = Math.max(0, Math.floor((serverEnd - serverNow) / 1000));
          setTimeLeft(remainingSecs);

          // If global end time is reached, trigger expiration
          if (remainingSecs === 0 && !submitted) {
            handleTimeExpired();
          }
        } else if (data.hasEnded) {
          alert("The quiz has ended. You cannot take it now.");
          navigate("/login");
        } else {
          if (data.startTime) {
            const diff = Math.ceil((new Date(data.startTime) - serverNow) / 1000);
            setWaitTime(diff > 0 ? diff : 0);
          }
        }
      } catch (err) {
        console.error("Status check error:", err);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 1000);
    return () => clearInterval(interval);
  }, [student, navigate, submitted]);

  // ---------- Fetch questions on active quiz ----------
  useEffect(() => {
    if (!quizActive) return;

    const fetchQuestions = async () => {
      setLoadingQuestions(true);
      setQuizReady(false);
      setQuestionsError(null);

      try {
        const startRes = await fetch(`${API_BASE}/start-quiz`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ regNo: student.regNo }),
        });
        const startData = await startRes.json();

        if (startRes.status === 403 && startData.message.includes("submitted")) {
            alert(startData.message);
            navigate("/login");
            return;
        }

        if (!startData.success) throw new Error(startData.message);

        const res = await fetch(`${API_BASE}/get-questions`);
        const data = await res.json();
        if (!data.success) throw new Error(data.message);

        const withIndex = data.questions.map((q, idx) => ({ ...q, originalIndex: idx }));
        const shuffled = shuffleArray(withIndex);

        setQuestions(shuffled);
        setAnswers(new Array(shuffled.length).fill(null));
        setQuizReady(true);
      } catch (err) {
        setQuestionsError(err.message);
      } finally {
        setLoadingQuestions(false);
      }
    };

    fetchQuestions();
  }, [quizActive, student.regNo, navigate]);

  // ---------- Navigation ----------
  const goTo = (idx) => {
    if (idx >= 0 && idx < questions.length) setCurrent(idx);
  };

  const selectAnswer = (key) => {
    const updated = [...answers];
    updated[current] = key;
    setAnswers(updated);
  };

  const clearAnswer = () => {
    const updated = [...answers];
    updated[current] = null;
    setAnswers(updated);
  };

  // ---------- Submit quiz ----------
  const submitQuiz = useCallback(
    async (auto = false) => {
      if (submitted) return;
      if (!auto && !window.confirm("Are you sure you want to submit the quiz?")) return;
      setSubmitted(true);
      setSubmitting(true);
      clearInterval(timerRef.current);

      try {
        const originalAnswers = new Array(questions.length).fill(null);
        questions.forEach((q, shuffledIndex) => {
          originalAnswers[q.originalIndex] = answers[shuffledIndex];
        });

        const res = await fetch(`${API_BASE}/submit-quiz`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            regNo: student.regNo,
            answers: originalAnswers,
            auto: auto,
          }),
        });
        const data = await res.json();
        
        if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch(err => console.log(err));
        }
        
        if (data.disqualified) {
          setDisqualified(true);
          setDisqualifiedMessage(data.message || "Time's up! You have been disqualified.");
          setSubmitting(false);
        } else {
          navigate("/result", { state: { ...data, student, totalQuestions: questions.length } });
        }
      } catch (err) {
        alert("Submission failed: " + err.message);
        setSubmitted(false);
        setSubmitting(false);
      } finally {
        setSubmitting(false);
      }
    },
    [questions, answers, student, navigate, submitted]
  );

  useEffect(() => {
    submitQuizRef.current = submitQuiz;
  }, [submitQuiz]);

  const handleTimeExpired = useCallback(() => {
    if (autoSubmitted.current) return;
    autoSubmitted.current = true;
    if (submitQuizRef.current) {
      submitQuizRef.current(true); 
    }
  }, []);


  // ---------- View Renders ----------

  const isMobile = window.innerWidth < 768 || ('ontouchstart' in window);

  if (isMobile && !isLandscape) {
    return (
      <div style={styles.fullscreenOverlay}>
        <div style={styles.overlayCard}>
          <div style={styles.rotateIcon}>📱↻</div>
          <h2 style={{ color: "#000" }}>Please rotate your device</h2>
          <p style={{ color: "#000" }}>This quiz must be taken in <strong>landscape</strong> mode.</p>
        </div>
      </div>
    );
  }

  // 🚨 FULLSCREEN BLOCKER 🚨
  if (quizActive && quizReady && !isFullscreen && !disqualified && !submitted) {
    return (
      <div style={styles.fullscreenOverlay}>
        <div style={styles.overlayCard}>
          <h2 style={{ color: "#dc2626" }}>⚠️ Fullscreen Required</h2>
          <p style={{ color: "#000", margin: "1rem 0" }}>
            You must be in fullscreen mode to take this exam. Leaving fullscreen may result in disqualification.
          </p>
          <button onClick={enterFullscreen} style={styles.primaryBtn}>
            Enter Fullscreen
          </button>
        </div>
      </div>
    );
  }

  if (disqualified) {
    return (
      <div style={styles.waitContainer}>
        <div style={styles.overlay}>
          <div style={{ ...styles.overlayCard, border: "3px solid #dc2626" }}>
            <h2 style={{ color: "#dc2626" }}>⛔ {disqualifiedMessage || "You have been disqualified"}</h2>
            <p style={{ color: "#000", margin: "1rem 0" }}>You cannot continue with this quiz.</p>
            <button onClick={() => navigate("/login")} style={styles.primaryBtn}>
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!quizActive) {
    const mins = Math.floor((waitTime || 0) / 60);
    const secs = (waitTime || 0) % 60;
    const startTimeStr = examStartTime ? examStartTime.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }) : "soon";

    return (
      <div style={styles.waitContainer}>
        <div style={styles.overlay}>
          <div style={styles.overlayCard}>
            <h2 style={{ color: "#000" }}>🔒 Exam not started yet</h2>
            <p style={{ color: "#000", margin: "1rem 0" }}>Scheduled start at <strong>{startTimeStr}</strong> IST</p>
            <div style={{ ...styles.countdown, color: "#0066b3" }}>
              {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loadingQuestions || !quizReady) {
    return (
      <div style={styles.loadingOverlay}>
        <div className="spinner" style={styles.spinnerStyle} />
        <h2 style={{ color: "#000" }}>Loading Questions...</h2>
      </div>
    );
  }

  if (submitting) {
    return (
      <div style={styles.loadingOverlay}>
        <div className="spinner" style={styles.spinnerStyle} />
        <h2 style={{ color: "#000" }}>{disqualified ? "Disqualified" : "Calculating your rank..."}</h2>
      </div>
    );
  }

  const q = questions[current];
  const attemptedCount = answers.filter((a) => a !== null).length;
  const totalQuestions = questions.length;
  const progress = ((current + 1) / totalQuestions) * 100;
  const custom = student?.customData || {};
  const displayName = custom.name || custom.email || student?.regNo || "Student";

  // PREVENT COPY PASTE (Security)
  return (
    <div style={styles.page} onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={styles.profileSection}>
          <span style={styles.profileEmoji}>👤</span>
          <div style={styles.profileDetails}>
            <strong style={{ color: "#000" }}>{displayName}</strong>
            <span style={{ fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)", color: "#000" }}>{student?.regNo}</span>
          </div>
        </div>
        <div style={styles.timerSection}>
          <span style={styles.timerEmoji}> <p style={styles.timerLabel}>Remaining Time</p></span>
          <span style={{ ...styles.timerText, color: timeLeft <= 60 ? "#dc2626" : "#000" }}>
            {Math.floor(timeLeft / 60).toString().padStart(2, "0")}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </span>
        </div>
        <button onClick={() => submitQuiz(false)} disabled={submitted || timeLeft === 0} style={styles.primaryBtn}>
          Submit Quiz
        </button>
      </div>

      <div style={styles.progressBarContainer}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }} />
      </div>

      <div style={styles.bodyRow}>
        <div style={styles.mainContent}>
          <h3 style={{ marginTop: 0, color: "#000", fontSize: "clamp(1.1rem, 2vw, 1.3rem)" }}>Question {current + 1} of {totalQuestions}</h3>
          <p style={styles.questionText}>{q.question}</p>
          {q.imageUrl && <img src={`${API_BASE}${q.imageUrl}`} alt="Question illustration" style={styles.questionImage} />}

          <div style={styles.optionsContainer}>
            {Object.entries(q.options).map(([key, val]) => {
              const isSelected = answers[current] === key;
              return (
                <label
                  key={key}
                  style={{
                    ...styles.optionLabel,
                    backgroundColor: isSelected ? "#e6f0fa" : "#ffffff",
                    borderColor: isSelected ? "#0066b3" : "#d1d5db",
                  }}
                >
                  <input type="radio" name={`question-${current}`} value={key} checked={isSelected} onChange={() => selectAnswer(key)} style={styles.radioInput} />
                  <span style={styles.radioControl}>
                    <span style={isSelected ? styles.radioDotActive : styles.radioDot} />
                  </span>
                  <span style={styles.optionText}>
                    <b style={{ color: "#000" }}>{key}.</b> <span style={{ color: "#000" }}>{val}</span>
                  </span>
                </label>
              );
            })}
          </div>

          <div style={styles.navRow}>
            <button style={styles.navBtn} onClick={() => goTo(current - 1)} disabled={current === 0}>← Previous</button>
            <button style={styles.clearBtn} onClick={clearAnswer}>Clear Answer</button>
            <button style={styles.navBtn} onClick={() => goTo(current + 1)} disabled={current === questions.length - 1}>Next →</button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h4 style={{ marginTop: 0, marginBottom: "0.5rem", color: "#000", fontSize: "clamp(1rem, 2vw, 1.1rem)" }}>Question Palette</h4>
          <div style={styles.paletteGrid}>
            {questions.map((_, idx) => (
              <div
                key={idx}
                onClick={() => goTo(idx)}
                style={{
                  ...styles.paletteItem,
                  backgroundColor: answers[idx] !== null ? "#22c55e" : "#f3f4f6",
                  color: answers[idx] !== null ? "#fff" : "#000",
                  border: idx === current ? "3px solid #0066b3" : "2px solid transparent",
                  cursor: "pointer",
                }}
              >
                {idx + 1}
              </div>
            ))}
          </div>
          <div style={styles.sidebarFooter}>
            <div style={{ color: "#000" }}><span style={{ ...styles.dot, background: "#22c55e" }} /> Attempted: {attemptedCount}</div>
            <div style={{ color: "#000" }}><span style={{ ...styles.dot, background: "#f3f4f6", border: "1px solid #d1d5db" }} /> Unattempted: {totalQuestions - attemptedCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 📱 FULLY FLUID & RESPONSIVE CSS IN JS
const styles = {
  fullscreenOverlay: {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 99999, backdropFilter: "blur(5px)"
  },
  overlayCard: {
    backgroundColor: "#ffffff", padding: "clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 5vw, 3rem)", borderRadius: "16px",
    textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", maxWidth: 450, width: "90%",
    display: "flex", flexDirection: "column", alignItems: "center"
  },
  rotateIcon: { fontSize: "4rem", marginBottom: "1rem", display: "inline-block", animation: "spin 2s linear infinite" },
  waitContainer: { position: "relative", width: "100%", height: "100vh", backgroundColor: "#f8fafc" },
  overlay: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 10, display: "flex", justifyContent: "center", alignItems: "center" },
  countdown: { fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: "bold", margin: "15px 0", letterSpacing: 2 },
  
  page: { 
    fontFamily: "'Segoe UI', Roboto, system-ui, sans-serif", 
    display: "flex", 
    flexDirection: "column", 
    height: "100vh", 
    backgroundColor: "#f8fafc", 
    userSelect: "none" 
  },
  
  // DYNAMIC GRID TOP BAR
  topBar: { 
    display: "grid", 
    gridTemplateColumns: "1fr auto 1fr", 
    alignItems: "center", 
    padding: "clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 4vw, 2rem)", 
    backgroundColor: "#ffffff", 
    borderBottom: "1px solid #e5e7eb", 
    gap: "1rem" 
  },
  profileSection: { display: "flex", alignItems: "center", gap: "0.75rem", justifySelf: "flex-start" },
  profileEmoji: { fontSize: "clamp(1.2rem, 3vw, 1.4rem)" },
  profileDetails: { display: "flex", flexDirection: "column", lineHeight: 1.3, fontSize: "clamp(0.85rem, 2vw, 0.95rem)" },
  
  // RESPONSIVE TIMER
  timerSection: { 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    gap: "0.75rem", 
    backgroundColor: "#f1f5f9", 
    padding: "clamp(0.3rem, 1.5vw, 0.5rem) clamp(1rem, 3vw, 1.5rem)", 
    borderRadius: "60px", 
    border: "1px solid #e5e7eb",
    justifySelf: "center",
  },
  timerLabel: { fontSize: "clamp(0.9rem, 2vw, 1.2rem)", color: "black", margin: 0 },
  timerText: { fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 700, fontVariantNumeric: "tabular-nums" },
  
  // FIXED SUBMIT BUTTON 
  primaryBtn: { 
    padding: "clamp(0.5rem, 2vw, 0.6rem) clamp(1rem, 3vw, 1.5rem)", 
    fontSize: "clamp(0.9rem, 2vw, 1rem)", 
    fontWeight: 600, 
    backgroundColor: "#0066b3", 
    color: "#fff", 
    border: "none", 
    borderRadius: "8px", 
    cursor: "pointer", 
    boxShadow: "0 2px 8px rgba(0, 102, 179, 0.25)",
    width: "fit-content",
    justifySelf: "flex-end" 
  },
  
  progressBarContainer: { height: 4, backgroundColor: "#e5e7eb", width: "100%" },
  progressBar: { height: "100%", backgroundColor: "#0066b3", transition: "width 0.3s ease" },
  
  bodyRow: { 
    display: "flex", 
    flex: 1, 
    flexWrap: "wrap", 
    overflowY: "auto", 
    padding: "clamp(0.5rem, 2vw, 1rem)", 
    gap: "1rem" 
  },
  
  mainContent: { 
    flex: "1 1 300px", 
    padding: "clamp(1rem, 3vw, 2rem)", 
    overflowY: "auto", 
    backgroundColor: "#ffffff", 
    borderRadius: "12px", 
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    display: "flex", 
    flexDirection: "column"
  },
  
  questionText: { fontSize: "clamp(1rem, 2.5vw, 1.15rem)", lineHeight: 1.6, margin: "1rem 0 0.5rem", color: "#000", fontWeight: 500 },
  questionImage: { maxWidth: "100%", maxHeight: "30vh", margin: "0.75rem 0", objectFit: "contain", borderRadius: "8px", border: "1px solid #e5e7eb" },
  optionsContainer: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem", margin: "1rem 0 1.5rem" },
  optionLabel: { display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "clamp(0.3rem, 1.5vw, 0.4rem) clamp(0.5rem, 2vw, 0.8rem)", borderRadius: "8px", border: "2px solid #d1d5db", cursor: "pointer", fontSize: "clamp(0.85rem, 2vw, 0.95rem)", width: "auto", maxWidth: "100%" },
  radioInput: { position: "absolute", opacity: 0, width: 0, height: 0, pointerEvents: "none" },
  radioControl: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: "50%", border: "2px solid #9ca3af", flexShrink: 0 },
  radioDot: { width: 10, height: 10, borderRadius: "50%", backgroundColor: "transparent", transition: "all 0.2s" },
  radioDotActive: { width: 10, height: 10, borderRadius: "50%", backgroundColor: "#0066b3" },
  optionText: { flex: "0 1 auto", lineHeight: 1.4, color: "#000", whiteSpace: "nowrap" },
  
  navRow: { 
    display: "flex", 
    flexWrap: "wrap",
    justifyContent: "center", 
    alignItems: "center", 
    gap: "clamp(0.5rem, 2vw, 2.5rem)",
    marginTop: "auto", 
    paddingTop: "1.5rem", 
    borderTop: "1px solid #e5e7eb" 
  },
  navBtn: { 
    padding: "0.7rem clamp(1rem, 3vw, 2rem)", 
    fontSize: "clamp(0.85rem, 2vw, 1rem)", 
    fontWeight: 600, 
    backgroundColor: "#f1f5f9", 
    color: "#000", 
    border: "1px solid #d1d5db", 
    borderRadius: "8px", 
    cursor: "pointer", 
    flex: "1 1 auto", 
    maxWidth: "200px",
    minWidth: "100px",
    textAlign: "center"
  },
  clearBtn: { 
    padding: "0.7rem clamp(1rem, 3vw, 2rem)", 
    fontSize: "clamp(0.85rem, 2vw, 1rem)", 
    fontWeight: 600, 
    backgroundColor: "#fef3c7", 
    color: "#000", 
    border: "1px solid #fcd34d", 
    borderRadius: "8px", 
    cursor: "pointer", 
    flex: "1 1 auto", 
    maxWidth: "200px",
    minWidth: "100px",
    textAlign: "center"
  },
  
  sidebar: { 
    flex: "1 1 200px", 
    maxWidth: "100%", 
    backgroundColor: "#ffffff", 
    borderRadius: "12px", 
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)", 
    padding: "clamp(0.8rem, 2vw, 1.2rem) clamp(0.5rem, 2vw, 1rem)", 
    overflowY: "auto", 
    display: "flex", 
    flexDirection: "column" 
  },
  paletteGrid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))", 
    gap: "0.5rem", 
    margin: "0.5rem 0 1rem" 
  },
  paletteItem: { 
    width: "100%", 
    aspectRatio: "1/1",
    minHeight: "40px",
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    borderRadius: "8px", 
    fontWeight: 600, 
    fontSize: "0.85rem", 
    margin: "0 auto", 
    color: "#000" 
  },
  sidebarFooter: { borderTop: "1px solid #e5e7eb", paddingTop: "0.75rem", fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)", display: "flex", flexDirection: "column", gap: "0.4rem" },
  dot: { display: "inline-block", width: 12, height: 12, borderRadius: "50%", marginRight: 6 },
  loadingOverlay: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f8fafc" },
  spinnerStyle: { margin: "1rem auto", width: 50, height: 50, border: "4px solid #e5e7eb", borderTop: "4px solid #0066b3", borderRadius: "50%", animation: "spin 1s linear infinite" }
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
document.head.appendChild(styleSheet);

export default QuizPage;
