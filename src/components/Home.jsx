  import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RulesPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={styles.page}>
      {/* Embedded CSS for perfect viewport fit & mobile polish */}
      <style>
        {`
          * {
            box-sizing: border-box;
          }
          html, body, #root {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
          }
          .rules-page-wrapper {
            height: 100dvh; /* dynamic viewport height – works on mobile */
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .responsive-header {
            display: flex;
            flex-direction: row;
            gap: 24px;
            align-items: center;
            margin-bottom: 24px;
            flex-shrink: 0;
          }
          .responsive-image {
            width: 280px;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            flex-shrink: 0;
          }
          .responsive-buttons {
            display: flex;
            flex-direction: row;
            gap: 16px;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            margin-top: 8px;
            width: 100%;
          }
          .action-btn {
            width: 220px;
            height: 48px !important;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            flex-shrink: 0;
          }
          .rules-scroll-box {
            flex: 1 1 auto;
            min-height: 0;
            overflow-y: auto;
            padding-right: 6px;
          }
          
          /* Mobile adjustments */
          @media (max-width: 768px) {
            .rules-card {
              padding: 16px 16px 12px !important;
              height: 100dvh !important; /* keep full viewport height */
              overflow: hidden !important;
            }
            .rules-scroll-box {
              overflow-y: auto !important;
              height: auto !important;
              flex: 1 1 auto !important;
            }
            .responsive-header {
              flex-direction: column-reverse;
              align-items: center;
              gap: 16px;
              margin-bottom: 12px;
            }
            .responsive-image {
              width: 100%;
              max-width: 180px;
            }
            .responsive-buttons {
              flex-direction: column;
              align-items: center;
              gap: 12px;
            }
            .action-btn {
              width: 100%;
              max-width: 250px;
              height: 44px !important;
            }
            .main-title {
              font-size: 20px !important;
            }
            .sub-title {
              font-size: 15px !important;
            }
            .highlight-text {
              font-size: 15px !important;
            }
            .date-badge {
              font-size: 14px !important;
              padding: 6px 14px !important;
            }
            .desc-text {
              font-size: 14px !important;
            }
            .rule-paragraph {
              font-size: 14px !important;
              padding: 4px 0 !important;
            }
            .rule-number-inline {
              width: 26px !important;
              height: 26px !important;
              font-size: 12px !important;
              line-height: 26px !important;
              margin-right: 8px !important;
            }
            .nstad-box {
              font-size: 16px !important;
              padding: 16px 18px !important;
              margin-top: 30px !important;
              margin-bottom: 6px !important;
            }
          }
        `}
      </style>

      <div className="rules-page-wrapper">
        <div style={styles.bgCircle1} />
        <div style={styles.bgCircle2} />

        <div style={styles.card} className="rules-card">
          
          {/* Introduction & Image Layout Container */}
          <div className="responsive-header">
            <div style={styles.introBox}>
              <h1 style={styles.mainTitle} className="main-title">
                National Science and Technology Digital Archive (NSTAD)
              </h1>
              
              <p style={styles.subTitle} className="sub-title">
                invites you to participate in an <strong style={styles.highlightText} className="highlight-text">Online Quiz</strong> based on available archival documents at{" "}
                <a href="https://nstad.in" target="_blank" rel="noopener noreferrer" style={styles.nstadLink}>
                  www.nstad.in
                </a>.
              </p>

              <div style={styles.dateBadge} className="date-badge">
                <strong>Quiz Date:</strong> 09.08.2026 &nbsp;|&nbsp; <strong>Time:</strong> 21:00 Hrs
              </div>

              <p style={styles.descText} className="desc-text">
                The National Science and Technology Digital Archive (NSTAD) invites science enthusiasts, students,
                researchers, and the general public to participate in an online quiz celebrating the life, work, and
                scientific legacy of <strong>Acharya Prafulla Chandra Ray</strong>, one of India's greatest chemists and
                pioneers of modern scientific research.
              </p>
            </div>
            
            <img src="/assets/RulesPic.png" alt="Rules Icon" className="responsive-image" />
          </div>

          {/* Rules Container – continuous text with highlighted numbers */}
          <div className="rules-scroll-box">
            <div style={styles.rulesTextBlock}>
              <p style={styles.ruleParagraph} className="rule-paragraph">
                <span style={{ ...styles.ruleNumberInline, background: "linear-gradient(135deg, #6c5ce7, #a29bfe)" }} className="rule-number-inline">
                  01
                </span>
                <strong>Eligibility:</strong> The quiz is open to students of Class XI, Class XII, and Undergraduates
                from any recognized school, college, or university. Participation is free of cost. Each participant is
                permitted to submit only one entry. Multiple submissions by the same participant may lead to disqualification.
              </p>

              <p style={styles.ruleParagraph} className="rule-paragraph">
                <span style={{ ...styles.ruleNumberInline, background: "linear-gradient(135deg, #e17055, #d63031)" }} className="rule-number-inline">
                  02
                </span>
                <strong>Quiz Format:</strong> The quiz consists of multiple-choice questions (MCQs). Participants are
                encouraged to explore the collections of scientists pages available on{" "}
                <a href="https://www.nstad.in" target="_blank" rel="noopener noreferrer" style={{ color: "#6c5ce7", fontWeight: 600 }}>
                  www.nstad.in
                </a>{" "}
                before attempting the quiz. Participants are encouraged to register themselves on the portal before
                participation and may enter into the quiz portal by using login credentials. A credential received
                immediately after registration can be used for participation.
              </p>

              <p style={styles.ruleParagraph} className="rule-paragraph">
                <span style={{ ...styles.ruleNumberInline, background: "linear-gradient(135deg, #00b894, #00cec9)" }} className="rule-number-inline">
                  03
                </span>
                <strong>Submission Guidelines:</strong> The quiz will be available only on <strong>9th August, 2026
                at 21:00 Hrs</strong>. Portal will not allow to participate and enter into the webpage except
                scheduled time. Duration of the quiz is <strong>10 Minutes</strong> and Questions will be displayed
                one by one. During the active session participants can change the response. At the end they must
                submit the responses to register the answer. If not submitted within schedule time, it can be
                treated as disqualified. Once submitted, responses cannot be edited or resubmitted.
              </p>

              <p style={styles.ruleParagraph} className="rule-paragraph">
                <span style={{ ...styles.ruleNumberInline, background: "linear-gradient(135deg, #fdcb6e, #e17055)" }} className="rule-number-inline">
                  04
                </span>
                <strong>Evaluation:</strong> Each correct answer carries <strong>One mark</strong>. There is negative
                marking. <strong>One mark will be deducted</strong> for 1 wrong answer. In the event of a tie,
                participants who submitted their entries fastest will be considered as winner. If required, the
                organizing committee may apply additional tie‑breaking criteria. Winners will be selected based on
                the highest scores in accordance with the quiz rules.
              </p>

              <p style={styles.ruleParagraph} className="rule-paragraph">
                <span style={{ ...styles.ruleNumberInline, background: "linear-gradient(135deg, #6c5ce7, #a29bfe)" }} className="rule-number-inline">
                  05
                </span>
                <strong>Disclaimer:</strong> By participating, entrants agree to abide by these Rules &amp; Regulations.
                The organizers reserve the right to modify, postpone, or cancel the quiz under unforeseen circumstances
                without prior notice.
              </p>
            </div>

            {/* NSTAD Box – now larger, more padded, lower, and striking */}
            <div style={styles.nstadBox} className="nstad-box">
              <span style={styles.pinEmoji}>📌</span>{" "}
              <span style={styles.nstadBoxText}>
                Explore the National Science and Technology Digital Archive:{" "}
                <a href="https://www.nstad.in" target="_blank" rel="noopener noreferrer" style={styles.nstadBoxLink}>
                  www.nstad.in
                </a>
              </span>
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
            <div className="responsive-buttons">
              <button
                className="action-btn"
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
                  if (agreed) {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 15px rgba(108, 92, 231, 0.25)";
                  }
                }}
              >
                📝 Register Now
              </button>
              <button
                className="action-btn"
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
                  if (agreed) {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
                  }
                }}
              >
                🔑 Login
              </button>
            </div>
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
    height: "100dvh",
    width: "100vw",
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
    height: "100dvh",
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
  introBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#f5f3ff",
    padding: "20px 24px",
    borderRadius: "12px",
    borderTop: "5px solid #6c5ce7",
    flex: 1,
  },
  mainTitle: {
    fontSize: "45px",
    fontWeight: "800",
    color: "#1d5290",
    margin: "0 0 12px 0",
    lineHeight: "1.3",
  },
  subTitle: {
    fontSize: "28px",
    color: "#2d2d44",
    margin: "0 0 16px 0",
    lineHeight: "1.5",
  },
  highlightText: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#6c5ce7",
  },
  dateBadge: {
    display: "inline-block",
    backgroundColor: "#eef2ff",
    padding: "10px 20px",
    borderRadius: "25px",
    border: "1px solid #dcdde1",
    color: "#2d3436",
    fontSize: "20px",
    margin: "0 0 18px 0",
  },
  descText: {
    fontSize: "20px",
    lineHeight: "1.6",
    color: "#4a4a6a",
    margin: 0,
  },
  rulesTextBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "left",
  },
  ruleParagraph: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#333",
    margin: 0,
    padding: "6px 0",
    borderBottom: "1px solid #f0edf9",
  },
  ruleNumberInline: {
    display: "inline-block",
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "800",
    fontSize: "14px",
    textAlign: "center",
    lineHeight: "32px",
    marginRight: "12px",
    verticalAlign: "middle",
    flexShrink: 0,
  },
  // --- NSTAD Box – larger, more padded, lower, striking ---
  nstadBox: {
    marginTop: "40px",          // lower on desktop
    marginBottom: "12px",
    padding: "20px 28px",       // more padding
    fontSize: "20px",           // larger text
    fontWeight: "600",
    background: "linear-gradient(135deg, #f5f3ff, #e8e4ff)", // soft gradient
    borderRadius: "16px",
    border: "2px solid #6c5ce7",
    boxShadow: "0 6px 20px rgba(108, 92, 231, 0.2)",
    color: "#1a237e",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  pinEmoji: {
    fontSize: "32px",           // bigger pin
    lineHeight: 1,
  },
  nstadBoxText: {
    flex: 1,
  },
  nstadBoxLink: {
    color: "#6c5ce7",
    fontWeight: 900,
    textDecoration: "underline",
    textUnderlineOffset: "4px",
    fontSize: "22px",           // even bigger link
    letterSpacing: "0.5px",
    transition: "all 0.2s",
    // add a subtle glow effect via hover in JS? but we can add a hover style in CSS
  },
  // Keep general link style for other mentions
  nstadLink: {
    color: "#6c5ce7",
    fontWeight: 900,
    textDecoration: "underline",
  },
  actionGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flexShrink: 0,
    marginTop: "auto",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "17px",
    color: "#333",
    fontWeight: "600",
    cursor: "pointer",
    justifyContent: "center",
  },
  checkbox: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
    accentColor: "#6c5ce7",
  },
  primaryBtn: {
    fontSize: "16px",
    fontWeight: "700",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #6c5ce7, #5a4bd1)",
    color: "#fff",
    boxShadow: "0 4px 15px rgba(108, 92, 231, 0.25)",
    transition: "all 0.25s ease",
  },
  secondaryBtn: {
    fontSize: "16px",
    fontWeight: "700",
    borderRadius: "10px",
    border: "2px solid #e0dcee",
    background: "#fff",
    color: "#4a4a6a",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    transition: "all 0.25s ease",
  },
};
