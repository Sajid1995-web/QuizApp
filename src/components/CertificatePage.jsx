import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function ResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { 
    student, 
    disqualified, 
    totalMarksObtained, 
    totalMarks, 
    totalTimeMinutes 
  } = state || {};

  // Handle missing state (e.g., user navigated here directly)
  if (!state) {
    return (
      <div style={styles.page}>
        <div style={{ ...styles.container, maxWidth: 500, padding: 40, textAlign: "center", flexDirection: "column" }}>
          <h2 style={{ color: "#dc3545", marginBottom: 10 }}>No Data Found</h2>
          <p style={{ color: "#666", marginBottom: 20 }}>We couldn't find your result data.</p>
          <button onClick={() => navigate("/login")} style={styles.actionBtn}>
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Handle Disqualified State (Explicit flag OR -1 marks from backend)
  if (disqualified || totalMarksObtained === -1) {
    return (
      <div style={styles.page}>
        <div style={{ ...styles.container, maxWidth: 500, padding: 40, textAlign: "center", flexDirection: "column" }}>
          <div style={{ fontSize: 60, marginBottom: 10 }}>⏳</div>
          <h2 style={{ color: "#dc3545", marginBottom: 10 }}>Disqualified</h2>
          <p style={{ color: "#666", fontSize: "1.1rem", marginBottom: 20 }}>
            You did not submit the quiz within the allowed time limit, or a violation was detected. Your attempt has been disqualified.
          </p>
          <button onClick={() => navigate("/login")} style={styles.actionBtn}>
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Handle Successful Submission State
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Left: Summary Stats */}
        <div style={styles.left}>
          <h2 style={{ marginBottom: 20 }}>Quiz Completed</h2>
          <div style={styles.statItem}>
            <strong>Reg No:</strong> {student?.regNo || "N/A"}
          </div>
          <div style={styles.statItem}>
            <strong>Marks Obtained:</strong>{" "}
            {totalMarksObtained !== undefined
              ? `${totalMarksObtained} / ${totalMarks}`
              : "N/A"}
          </div>
          <div style={styles.statItem}>
            <strong>Time Taken:</strong>{" "}
            {totalTimeMinutes !== undefined
              ? `${totalTimeMinutes} min`
              : "N/A"}
          </div>
        </div>

        {/* Right: Confirmation Message */}
        <div style={styles.right}>
          <div style={styles.rankRevealed}>
            <div style={{ fontSize: 50, marginBottom: 10 }}>🎉</div>
            <h3 style={{ color: "#28a745" }}>Submission Successful!</h3>
            <p style={{ color: "#666", marginTop: 10 }}>
              Your answers have been recorded safely.
            </p>
            <button
              onClick={() => navigate("/")}
              style={{ ...styles.actionBtn, marginTop: 20 }}
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
  statItem: {
    fontSize: 16,
    marginBottom: 12,
    color: "#333",
  },
  rankRevealed: {
    textAlign: "center",
    width: "100%",
  },
  actionBtn: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "background 0.2s",
  },
};