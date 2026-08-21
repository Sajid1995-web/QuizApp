 import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";

function ResultPage() {
  const { state } = useLocation();

  // Auto‑redirect to nstad.in after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://www.nstad.in";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const { student, disqualified } = state || {};

  // Handle missing state – show a message, but redirect will happen
  if (!state) {
    return (
      <div className="page-card">
        <p>No result data found. You will be redirected to nstad.in shortly...</p>
      </div>
    );
  }

  // ---- DISQUALIFIED: two‑column layout (no button) ----
  if (disqualified) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.left}>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "#333" }}>
              You did not submit the quiz in time. As per the rules, you have been
              disqualified from this quiz.
              <br /><br />
              Please ensure you submit your answers before the timer ends in future
              attempts.
            </p>
          </div>
          <div style={styles.right}>
            <div style={styles.rankRevealed}>
              <h3 style={{ color: "#dc3545" }}>Disqualified</h3>
              <p style={{ color: "#666", marginTop: 10 }}>
                Your submission was not recorded.
              </p>
              <p style={{ color: "#6b7280", fontSize: 14, marginTop: 20 }}>
                Redirecting to nstad.in shortly...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- SUCCESSFUL SUBMISSION: Background image + certificate overlay (no button) ----
  return (
    <div style={styles.pageWithBg}>
      <div style={styles.certificate}>
        <div style={styles.certHeader}>
          <h1 style={styles.certTitle}>Certificate of Completion</h1>
        </div>

        <div style={styles.certBody}>
          <p style={styles.certMessage}>
            The results will be announced after the evaluation process.
            Selected participants will be contacted with the contact details
            provided during registration.
          </p>
          <p style={styles.certMessage}>
            Thank you for your participation and look forward to welcoming you
            for more NSTAD initiatives.
          </p>
          <p style={styles.certMessage}>
            Continue exploring India's scientific heritage at:{" "}
            <a
              href="https://nstad.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0066b3", textDecoration: "none", fontWeight: 500 }}
            >
              nstad.in
            </a>
          </p>
        </div>

        <div style={styles.certFooter}>
          <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>
            Redirecting to nstad.in shortly...
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;

const styles = {
  // Disqualified page styles (unchanged)
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "'Segoe UI', Roboto, system-ui, sans-serif",
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

  // Successful submission: background image + certificate
  pageWithBg: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Roboto, system-ui, sans-serif",
    padding: "20px",
    backgroundImage: `url("/ReferanceCard.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  certificate: {
    maxWidth: 700,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(6px)",
    borderRadius: 20,
    boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
    border: "4px solid rgba(255, 215, 0, 0.6)",
    padding: "2rem 2.5rem",
    textAlign: "center",
    transition: "transform 0.2s",
    position: "relative",
  },
  certHeader: {
    borderBottom: "2px dashed #e5e7eb",
    paddingBottom: "1.5rem",
    marginBottom: "1.5rem",
  },
  certTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: "#1e293b",
    letterSpacing: "1px",
    margin: 0,
    textTransform: "uppercase",
  },
  certBody: {
    padding: "0.5rem 0",
  },
  certMessage: {
    fontSize: 17,
    lineHeight: 1.7,
    color: "#334155",
    margin: "12px 0",
  },
  certFooter: {
    marginTop: "2rem",
    borderTop: "2px dashed #e5e7eb",
    paddingTop: "1.5rem",
  },
};
