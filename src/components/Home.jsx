import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RulesPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <style>{`
        /* Responsive styles for RulesPage */
        .rules-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0c29, #1a1a40, #24243e);
          font-family: 'Segoe UI', 'Inter', system-ui, sans-serif;
          padding: 0;
          margin: 0;
          position: relative;
          overflow: hidden;
        }
        .rules-card {
          max-width: 960px;
          width: 100%;
          height: 100vh;
          background-color: rgba(255,255,255,0.96);
          border-radius: 0;
          padding: 40px 50px 25px;
          box-shadow: none;
          text-align: center;
          position: relative;
          z-index: 1;
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .rules-top-image {
          position: absolute;
          top: 24px;
          right: 30px;
          width: 70px;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }
        .rules-intro-box {
          text-align: left;
          background-color: #f5f3ff;
          padding: 16px 20px;
          border-radius: 14px;
          margin-bottom: 20px;
          border-left: 6px solid #6c5ce7;
          flex-shrink: 0;
        }
        .rules-intro-text {
          font-size: 17px;
          line-height: 1.6;
          color: #1a1a2e;
          margin: 4px 0;
        }
        .rules-container {
          flex: 1 1 auto;
          overflow-y: auto;
          margin-bottom: 14px;
          padding-right: 6px;
        }
        .rules-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
        }
        .rule-card {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background-color: #faf9ff;
          border-radius: 14px;
          padding: 14px 18px;
          border: 1px solid #edeaf6;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .rule-number {
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6c5ce7, #a29bfe);
          color: #fff;
          font-weight: 800;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rule-content {
          flex: 1;
          font-size: 15px;
          line-height: 1.5;
          color: #2d2d44;
        }
        .rules-nstad-box {
          margin-top: 16px;
          background-color: #eef2ff;
          border-radius: 12px;
          padding: 12px 18px;
          font-size: 15px;
          color: #1a237e;
          border-left: 6px solid #6c5ce7;
          text-align: left;
        }
        .rules-nstad-link {
          color: #6c5ce7;
          font-weight: 700;
          text-decoration: underline;
        }
        .rules-action-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-shrink: 0;
          margin-top: 8px;
        }
        .rules-checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          color: #1a1a2e;
          cursor: pointer;
          justify-content: center;
        }
        .rules-checkbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #6c5ce7;
        }
        .rules-button-group {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .rules-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #6c5ce7, #5a4bd1);
          color: #fff;
          box-shadow: 0 6px 20px rgba(108, 92, 231, 0.35);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .rules-primary-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(108, 92, 231, 0.45);
        }
        .rules-primary-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .rules-secondary-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 14px;
          border: 2px solid #d5d0e8;
          background: #ffffff;
          color: #3d3d5c;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .rules-secondary-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(46, 213, 115, 0.25);
          border-color: #6c5ce7;
        }
        .rules-secondary-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* ---- Mobile Responsiveness ---- */
        @media screen and (max-width: 768px) {
          .rules-card {
            padding: 28px 24px 20px;
          }
          .rules-top-image {
            width: 56px;
            top: 16px;
            right: 18px;
          }
          .rules-intro-text {
            font-size: 15px;
          }
          .rules-intro-box {
            padding: 12px 16px;
            margin-bottom: 16px;
          }
          .rule-number {
            width: 34px;
            height: 34px;
            font-size: 14px;
          }
          .rule-content {
            font-size: 14px;
          }
          .rule-card {
            padding: 12px 14px;
            gap: 12px;
          }
          .rules-nstad-box {
            font-size: 14px;
            padding: 10px 14px;
          }
          .rules-checkbox-label {
            font-size: 14px;
          }
          .rules-primary-btn,
          .rules-secondary-btn {
            padding: 12px 22px;
            font-size: 14px;
          }
        }

        @media screen and (max-width: 480px) {
          .rules-card {
            padding: 20px 16px 14px;
          }
          .rules-top-image {
            width: 44px;
            top: 12px;
            right: 12px;
          }
          .rules-intro-text {
            font-size: 13px;
            line-height: 1.5;
          }
          .rules-intro-box {
            padding: 10px 12px;
            margin-bottom: 12px;
            border-left-width: 4px;
          }
          .rules-grid {
            gap: 8px;
          }
          .rule-number {
            width: 28px;
            height: 28px;
            font-size: 12px;
            border-radius: 8px;
          }
          .rule-content {
            font-size: 12px;
            line-height: 1.4;
          }
          .rule-card {
            padding: 8px 10px;
            gap: 8px;
            border-radius: 10px;
          }
          .rules-nstad-box {
            font-size: 12px;
            padding: 8px 12px;
            border-left-width: 4px;
            margin-top: 10px;
          }
          .rules-checkbox-label {
            font-size: 12px;
            gap: 6px;
          }
          .rules-checkbox {
            width: 16px;
            height: 16px;
          }
          .rules-primary-btn,
          .rules-secondary-btn {
            padding: 10px 16px;
            font-size: 12px;
            border-radius: 10px;
            gap: 6px;
          }
          .rules-button-group {
            gap: 8px;
          }
          .rules-action-group {
            gap: 6px;
          }
        }
      `}</style>

      <div className="rules-page">
        <div className="bg-circle-1" style={styles.bgCircle1} />
        <div className="bg-circle-2" style={styles.bgCircle2} />

        <div className="rules-card">
          <img src="/assets/RulesPic.png" alt="Rules Icon" className="rules-top-image" />

          <div className="rules-intro-box">
            <p className="rules-intro-text">
              <strong>National Science and Technology Digital Archive (NSTAD)</strong> invites you to participate in
              an <strong>Online Quiz</strong> based on available archival documents at{" "}
              <a href="https://nstad.in" target="_blank" rel="noopener noreferrer" className="rules-nstad-link">
                nstad.in
              </a>
              . <br />
              <strong>Quiz Date:</strong> 09.08.2026 &nbsp;|&nbsp; <strong>Time:</strong> 21:00 Hrs
            </p>
            <p className="rules-intro-text">
              The National Science and Technology Digital Archive (NSTAD) invites science enthusiasts, students,
              researchers, and the general public to participate in an online quiz celebrating the life, work, and
              scientific legacy of <strong>Acharya Prafulla Chandra Ray</strong>, one of India's greatest chemists and
              pioneers of modern scientific research.
            </p>
          </div>

          <div className="rules-container">
            <div className="rules-grid">
              <div className="rule-card">
                <div className="rule-number">01</div>
                <div className="rule-content">
                  <strong>Eligibility:</strong> The quiz is open to students of Class XI, Class XII, and Undergraduates
                  from any recognized school, college, or university. Participation is free of cost. Each participant is
                  permitted to submit only one entry. Multiple submissions by the same participant may lead to disqualification.
                </div>
              </div>
              <div className="rule-card">
                <div className="rule-number" style={{ background: "linear-gradient(135deg, #e17055, #d63031)" }}>02</div>
                <div className="rule-content">
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
              <div className="rule-card">
                <div className="rule-number" style={{ background: "linear-gradient(135deg, #00b894, #00cec9)" }}>03</div>
                <div className="rule-content">
                  <strong>Submission Guidelines:</strong> The quiz will be available only on <strong>9th August, 2026
                  at 21:00 Hrs</strong>. Portal will not allow to participate and enter into the webpage except
                  scheduled time. Duration of the quiz is <strong>10 Minutes</strong> and Questions will be displayed
                  one by one. During the active session participants can change the response. At the end they must
                  submit the responses to register the answer. If not submitted within schedule time, it can be
                  treated as disqualified. Once submitted, responses cannot be edited or resubmitted.
                </div>
              </div>
              <div className="rule-card">
                <div className="rule-number" style={{ background: "linear-gradient(135deg, #fdcb6e, #e17055)" }}>04</div>
                <div className="rule-content">
                  <strong>Evaluation:</strong> Each correct answer carries <strong>One mark</strong>. There is negative
                  marking. <strong>One mark will be deducted</strong> for 1 wrong answer. In the event of a tie,
                  participants who submitted their entries fastest will be considered as winner. If required, the
                  organizing committee may apply additional tie‑breaking criteria. Winners will be selected based on
                  the highest scores in accordance with the quiz rules.
                </div>
              </div>
              <div className="rule-card">
                <div className="rule-number" style={{ background: "linear-gradient(135deg, #6c5ce7, #a29bfe)" }}>05</div>
                <div className="rule-content">
                  <strong>Disclaimer:</strong> By participating, entrants agree to abide by these Rules &amp; Regulations.
                  The organizers reserve the right to modify, postpone, or cancel the quiz under unforeseen circumstances
                  without prior notice.
                </div>
              </div>
            </div>

            <div className="rules-nstad-box">
              📌 Explore the National Science and Technology Digital Archive:{" "}
              <a href="https://www.nstad.in" target="_blank" rel="noopener noreferrer" className="rules-nstad-link">
                www.nstad.in
              </a>
            </div>
          </div>

          <div className="rules-action-group">
            <label className="rules-checkbox-label">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="rules-checkbox"
              />
              I have read and agree to all the rules and regulations.
            </label>
            <div className="rules-button-group">
              <button
                className="rules-primary-btn"
                onClick={() => agreed && navigate("/register")}
                disabled={!agreed}
              >
                📝 Register Now
              </button>
              <button
                className="rules-secondary-btn"
                onClick={() => agreed && navigate("/login")}
                disabled={!agreed}
              >
                🔑 Student Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RulesPage;

// Keep background circles as inline styles (they are decorative)
const styles = {
  bgCircle1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(108,92,231,0.2) 0%, transparent 70%)",
    top: "-150px",
    right: "-100px",
    pointerEvents: "none",
  },
  bgCircle2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(46,213,115,0.15) 0%, transparent 70%)",
    bottom: "-100px",
    left: "-80px",
    pointerEvents: "none",
  },
};
