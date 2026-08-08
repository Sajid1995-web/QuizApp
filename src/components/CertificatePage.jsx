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

  // Disqualified
  if (disqualified) {
    return (
      <div className="page-card" style={{ maxWidth: 600 }}>
        <h2 style={{ color: "#dc3545" }}>Disqualified</h2>
        <p>You did not submit the quiz in time.</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

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
            <div style={{ fontSize: 50, marginBottom: 10 }}>🎉</div>
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
