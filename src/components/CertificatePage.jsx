 import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function ResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { student, disqualified } = state || {};

  // Handle missing state
  if (!state) {
    return (
      <div className="page-card">
        <p>No result data found.</p>
        <button onClick={() => navigate("/login")}>Back to Login</button>
      </div>
    );
  }

  // ---- DISQUALIFIED: show unified two‑column layout ----
  if (disqualified) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          {/* Left: Message */}
          <div style={styles.left}>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "#333" }}>
              You did not submit the quiz in time. As per the rules, you have been
              disqualified from this quiz.
              <br /><br />
              Please ensure you submit your answers before the timer ends in future
              attempts.
            </p>
          </div>

          {/* Right: Disqualified badge */}
          <div style={styles.right}>
            <div style={styles.rankRevealed}>
              <h3 style={{ color: "#dc3545" }}>Disqualified</h3>
              <p style={{ color: "#666", marginTop: 10 }}>
                Your submission was not recorded.
              </p>
              <button
                onClick={() => navigate("/")}
                style={{
                  marginTop: 20,
                  padding: "10px 20px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- SUCCESSFUL SUBMISSION (unchanged) ----
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Left: Custom message */}
        <div style={styles.left}>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "#333" }}>
            The results will be announced after the evaluation process.
            Selected participants will be contacted with the contact details
            provided during registration.
            <br /><br />
            Thank you for your participation and look forward to welcoming you
            for more NSTAD initiatives.
            <br /><br />
            Continue exploring India's scientific heritage at:{" "}
            <a
              href="https://nstad.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              https://nstad.in
            </a>
          </p>
        </div>

        {/* Right: Confirmation Message */}
        <div style={styles.right}>
          <div style={styles.rankRevealed}>
            <h3 style={{ color: "#28a745" }}>Submission Successful!</h3>
            <p style={{ color: "#666", marginTop: 10 }}>
              Your answers have been recorded.
            </p>
            <button
              onClick={() => navigate("/")}
              style={{
                marginTop: 20,
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: 800,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  left: {
    flex: "1 1 300px",
    padding: 30,
    borderRight: "1px solid #eee",
  },
  right: {
    flex: "1 1 300px",
    padding: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 300,
  },
  rankRevealed: {
    textAlign: "center",
    width: "100%",
  },
};
