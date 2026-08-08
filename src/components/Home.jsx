import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RulesPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={styles.page}>
      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <div style={styles.card}>
        {/* Image on top right – exact path */}
        <img src="/assets/RulesPic.png" alt="Rules Icon" style={styles.topImage} />

        {/* Introduction */}
        <div style={styles.introBox}>
          <p style={styles.introText}>
            <strong>National Science and Technology Digital Archive (NSTAD)</strong> invites you to participate in
            an <strong>Online Quiz</strong> based on available archival documents at{" "}
            <a href="https://nstad.in" target="_blank" rel="noopener noreferrer" style={styles.nstadLink}>
              nstad.in
            </a>
            . <br />
            <strong>Quiz Date:</strong> 09.08.2026 &nbsp;|&nbsp; <strong>Time:</strong> 21:00 Hrs
          </p>
          <p style={styles.introText}>
            The National Science and Technology Digital Archive (NSTAD) invites science enthusiasts, students,
            researchers, and the general public to participate in an online quiz celebrating the life, work, and
            scientific legacy of <strong>Acharya Prafulla Chandra Ray</strong>, one of India's greatest chemists and
            pioneers of modern scientific research.
          </p>
        </div>

        {/* Rules – exactly 5 sections */}
        <div style={styles.rulesContainer}>
          <div style={styles.rulesGrid}>
            <div style={styles.ruleCard}>
              <div style={styles.ruleNumber}>01</div>
              <div style={styles.ruleContent}>
                <strong>Eligibility:</strong> The quiz is open to students of Class XI, Class XII, and Undergraduates
                from any recognized school, college, or university. Participation is free of cost. Each participant is
                permitted to submit only one entry. Multiple submissions by the same participant may lead to disqualification.
              </div>
            </div>
            <div style={styles.ruleCard}>
              <div style={{ ...styles.ruleNumber, background: "linear-gradient(135deg, #e17055, #d63031)" }}>02</div>
              <div style={styles.ruleContent}>
                <strong>Quiz Format:</strong> The quiz consists of multiple-choice questions (MCQs). Participants are
                encouraged to explore the collections of scientists pages available on{" "}
                <a href="https://www.nstad.in" target="_blank" rel="noopener noreferrer" style={{ color: "#6c5ce7", fontWeight: 600 }}>
                  www.nstad.in
                </a>{" "}
                before attempting the quiz. Participants are encouraged to register themselves on the portal before
                participation and may enter into the quiz portal by using login credentials. A credential received
                immediately after registration can be used for participation.
              </div>
            </div>
            <div style={styles.ruleCard}>
              <div style={{ ...styles.ruleNumber, background: "linear-gradient(135deg, #00b894, #00cec9)" }}>03</div>
              <div style={styles.ruleContent}>
                <strong>Submission Guidelines:</strong> The quiz will be available only on <strong>9th August, 2026
                at 21:00 Hrs</strong>. Portal will not allow to participate and enter into the webpage except
                scheduled time. Duration of the quiz is <strong>10 Minutes</strong> and Questions will be displayed
                one by one. During the active session participants can change the response. At the end they must
                submit the responses to register the answer. If not submitted within schedule time, it can be
                treated as disqualified. Once submitted, responses cannot be edited or resubmitted.
              </div>
            </div>
            <div style={styles.ruleCard}>
              <div style={{ ...styles.ruleNumber, background: "linear-gradient(135deg, #fdcb6e, #e17055)" }}>04</div>
              <div style={styles.ruleContent}>
                <strong>Evaluation:</strong> Each correct answer carries <strong>One mark</strong>. There is negative
                marking. <strong>One mark will be deducted</strong> for 1 wrong answer. In the event of a tie,
                participants who submitted their entries fastest will be considered as winner. If required, the
                organizing committee may apply additional tie‑breaking criteria. Winners will be selected based on
                the highest scores in accordance with the quiz rules.
              </div>
            </div>
            <div style={styles.ruleCard}>
              <div style={{ ...styles.ruleNumber, background: "linear-gradient(135deg, #6c5ce7, #a29bfe)" }}>05</div>
              <div style={styles.ruleContent}>
                <strong>Disclaimer:</strong> By participating, entrants agree to abide by these Rules &amp; Regulations.
                The organizers reserve the right to modify, postpone, or cancel the quiz under unforeseen circumstances
                without prior notice.
              </div>
            </div>
          </div>

          <div style={styles.nstadBox}>
            📌 Explore the National Science and Technology Digital Archive:{" "}
            <a href="https://www.nstad.in" target="_blank" rel="noopener noreferrer" style={styles.nstadLink}>
              www.nstad.in
            </a>
          </div>
        </div>

        {/* Checkbox & Action Buttons */}
        <div style={styles.actionGroup}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={styles.checkbox}
            />
            I have read and agree to all the rules and regulations.
          </label>
          <div style={styles.buttonGroup}>
            <button
              style={{
                ...styles.primaryBtn,
                opacity: agreed ? 1 : 0.5,
                cursor: agreed ? "pointer" : "not-allowed",
              }}
              onClick={() => agreed && navigate("/register")}
              disabled={!agreed}
              onMouseEnter={(e) => {
                if (agreed) {
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(108, 92, 231, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(108, 92, 231, 0.25)";
              }}
            >
              📝 Register Now
            </button>
            <button
              style={{
                ...styles.secondaryBtn,
                opacity: agreed ? 1 : 0.5,
                cursor: agreed ? "pointer" : "not-allowed",
              }}
              onClick={() => agreed && navigate("/login")}
              disabled={!agreed}
              onMouseEnter={(e) => {
                if (agreed) {
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(46, 213, 115, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(46, 213, 115, 0.25)";
              }}
            >
              🔑 Student Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RulesPage;

const styles = {
  page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29, #1a1a40, #24243e)",
    fontFamily: "'Segoe UI', 'Inter', system-ui, sans-serif",
    padding: 0,
    margin: 0,
    position: "relative",
    overflow: "hidden",
  },
  bgCircle1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(108,92,231,0.25) 0%, transparent 70%)",
    top: "-80px",
    right: "-60px",
    pointerEvents: "none",
  },
  bgCircle2: {
    position: "absolute",
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(46,213,115,0.2) 0%, transparent 70%)",
    bottom: "-70px",
    left: "-50px",
    pointerEvents: "none",
  },
  card: {
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(255,255,255,0.97)",
    borderRadius: 0,
    padding: "30px 36px 20px",
    boxShadow: "none",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  topImage: {
    position: "absolute",
    top: "20px",
    right: "20px",
    width: "350px",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  introBox: {
    textAlign: "left",
    backgroundColor: "#f5f3ff",
    padding: "10px 16px",
    borderRadius: "10px",
    marginBottom: "14px",
    borderLeft: "4px solid #6c5ce7",
    flexShrink: 0,
  },
  introText: {
    fontSize: "20px",
    lineHeight: "1.6",
    color: "#2d2d44",
    margin: "4px 0",
  },
  rulesContainer: {
    flex: "1 1 auto",
    minHeight: 0,
    overflowY: "auto",
    marginBottom: "8px",
    paddingRight: "4px",
  },
  rulesGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    textAlign: "left",
  },
  ruleCard: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    backgroundColor: "#faf9ff",
    borderRadius: "10px",
    padding: "10px 14px",
    border: "1px solid #eeeafc",
  },
  ruleNumber: {
    flexShrink: 0,
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
    color: "#fff",
    fontWeight: "800",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ruleContent: {
    flex: 1,
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#333",
  },
  nstadBox: {
    marginTop: "10px",
    backgroundColor: "#eef2ff",
    borderRadius: "8px",
    padding: "8px 14px",
    fontSize: "13px",
    color: "#1a237e",
    borderLeft: "4px solid #6c5ce7",
    textAlign: "left",
  },
  nstadLink: {
    color: "#6c5ce7",
    fontWeight: 700,
    textDecoration: "underline",
  },
  actionGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flexShrink: 0,
    marginTop: "4px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#333",
    cursor: "pointer",
    justifyContent: "center",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    accentColor: "#6c5ce7",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: "700",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #6c5ce7, #5a4bd1)",
    color: "#fff",
    boxShadow: "0 4px 15px rgba(108, 92, 231, 0.25)",
    transition: "all 0.25s ease",
    flexShrink: 0, // prevents stretching
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: "700",
    borderRadius: "10px",
    border: "2px solid #e0dcee",
    background: "#fff",
    color: "#4a4a6a",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    transition: "all 0.25s ease",
    flexShrink: 0, // prevents stretching
  },
};
