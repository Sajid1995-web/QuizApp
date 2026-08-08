import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RulesPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      {/* FOOLPROOF PURE CSS - Works without Tailwind */}
      <style>{`
        .rules-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0c29, #1a1a40, #24243e);
          font-family: 'Segoe UI', 'Inter', system-ui, sans-serif;
          padding: 20px;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }
        
        .bg-circle-1 {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(108,92,231,0.2) 0%, transparent 70%);
          top: -100px;
          right: -100px;
          pointer-events: none;
        }

        .bg-circle-2 {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(46,213,115,0.15) 0%, transparent 70%);
          bottom: -50px;
          left: -50px;
          pointer-events: none;
        }

        .rules-card {
          width: 100%;
          max-width: 1000px;
          max-height: 95vh;
          background-color: rgba(255, 255, 255, 0.98);
          border-radius: 20px;
          padding: 30px 40px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .rules-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f5f3ff;
          padding: 20px 30px;
          border-radius: 15px;
          border-left: 8px solid #6c5ce7;
          margin-bottom: 20px;
          gap: 30px;
          flex-shrink: 0;
        }

        .rules-header-text {
          flex: 1;
        }

        .rules-header-text p {
          font-size: 17px;
          line-height: 1.6;
          color: #1a1a2e;
          margin: 0 0 10px 0;
        }

        .rules-image {
          width: 180px;
          height: auto;
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          border: 4px solid white;
          flex-shrink: 0;
        }

        .rules-scroll-area {
          flex: 1;
          overflow-y: auto;
          padding-right: 15px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        /* Custom Scrollbar */
        .rules-scroll-area::-webkit-scrollbar {
          width: 8px;
        }
        .rules-scroll-area::-webkit-scrollbar-track {
          background: #f1f1f1; 
          border-radius: 10px;
        }
        .rules-scroll-area::-webkit-scrollbar-thumb {
          background: #c8c2f2; 
          border-radius: 10px;
        }

        .rule-item {
          display: flex;
          gap: 20px;
          background: #faf9ff;
          padding: 20px;
          border-radius: 15px;
          border: 1px solid #edeaf6;
        }

        .rule-number {
          flex-shrink: 0;
          width: 45px;
          height: 45px;
          border-radius: 12px;
          color: white;
          font-weight: bold;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .rule-text {
          flex: 1;
          font-size: 16px;
          line-height: 1.6;
          color: #2d2d44;
          margin: 0;
        }

        .info-box {
          background: #eef2ff;
          padding: 15px 20px;
          border-radius: 12px;
          border-left: 5px solid #6c5ce7;
          color: #1a237e;
          font-size: 16px;
          margin-top: 5px;
        }

        .rules-footer {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 2px solid #f0f0f0;
          flex-shrink: 0;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 18px;
          color: #1a1a2e;
          cursor: pointer;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .checkbox-container input {
          width: 22px;
          height: 22px;
          cursor: pointer;
          accent-color: #6c5ce7;
        }

        .button-group {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .btn {
          padding: 16px 35px;
          font-size: 18px;
          font-weight: bold;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: none;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6c5ce7, #5a4bd1);
          color: white;
          box-shadow: 0 6px 20px rgba(108, 92, 231, 0.4);
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(108, 92, 231, 0.6);
        }

        .btn-secondary {
          background: white;
          color: #3d3d5c;
          border: 2px solid #d5d0e8;
        }

        .btn-secondary:hover:not(:disabled) {
          transform: translateY(-3px);
          border-color: #6c5ce7;
          background: #fcfbfe;
        }

        /* ========================================= */
        /* MOBILE RESPONSIVE MEDIA QUERIES           */
        /* ========================================= */
        @media (max-width: 768px) {
          .rules-wrapper {
            padding: 15px;
          }
          .rules-card {
            padding: 20px;
            max-height: 98vh;
          }
          .rules-header {
            flex-direction: column-reverse; /* Puts image on top on mobile */
            text-align: center;
            padding: 20px 15px;
            gap: 15px;
          }
          .rules-image {
            width: 140px;
          }
          .rule-item {
            flex-direction: column;
            gap: 12px;
            padding: 15px;
          }
          .button-group {
            flex-direction: column;
            gap: 15px;
          }
          .btn {
            width: 100%;
          }
          .checkbox-container {
            font-size: 16px;
            text-align: center;
          }
        }
      `}</style>

      <div className="rules-wrapper">
        <div className="bg-circle-1" />
        <div className="bg-circle-2" />

        <div className="rules-card">
          
          {/* Header section - Image moves automatically based on screen size */}
          <div className="rules-header">
            <div className="rules-header-text">
              <p>
                <strong>National Science and Technology Digital Archive (NSTAD)</strong> invites you to participate in
                an <strong>Online Quiz</strong> based on available archival documents at{" "}
                <a href="https://nstad.in" target="_blank" rel="noopener noreferrer" style={{ color: "#6c5ce7", fontWeight: "bold" }}>
                  nstad.in
                </a>.
              </p>
              <p style={{ background: "white", display: "inline-block", padding: "8px 15px", borderRadius: "8px", border: "1px solid #ddd", margin: "10px 0" }}>
                <strong style={{ color: "#6c5ce7" }}>Quiz Date:</strong> 09.08.2026 &nbsp;|&nbsp; <strong style={{ color: "#6c5ce7" }}>Time:</strong> 21:00 Hrs
              </p>
              <p>
                The National Science and Technology Digital Archive (NSTAD) invites science enthusiasts, students,
                researchers, and the general public to participate in an online quiz celebrating the life, work, and
                scientific legacy of <strong>Acharya Prafulla Chandra Ray</strong>.
              </p>
            </div>
            
            {/* The Image - Now big on PC, centered on Mobile */}
            <img src="/assets/RulesPic.png" alt="Rules Icon" className="rules-image" />
          </div>

          {/* Independent Scrolling Rules Area */}
          <div className="rules-scroll-area">
            
            <div className="rule-item">
              <div className="rule-number" style={{ background: "linear-gradient(135deg, #6c5ce7, #a29bfe)" }}>01</div>
              <p className="rule-text">
                <strong>Eligibility:</strong> The quiz is open to students of Class XI, Class XII, and Undergraduates
                from any recognized school, college, or university. Participation is free of cost. Each participant is
                permitted to submit only one entry. Multiple submissions by the same participant may lead to disqualification.
              </p>
            </div>

            <div className="rule-item">
              <div className="rule-number" style={{ background: "linear-gradient(135deg, #e17055, #d63031)" }}>02</div>
              <p className="rule-text">
                <strong>Quiz Format:</strong> The quiz consists of multiple-choice questions (MCQs). Participants are
                encouraged to explore the collections of scientists pages available on{" "}
                <a href="https://www.nstad.in" target="_blank" rel="noopener noreferrer" style={{ color: "#6c5ce7", fontWeight: "bold" }}>
                  www.nstad.in
                </a>{" "}
                before attempting the quiz. Participants are encouraged to register themselves on the portal before
                participation and may enter into the quiz portal by using login credentials. A credential received
                immediately after registration can be used for participation.
              </p>
            </div>

            <div className="rule-item">
              <div className="rule-number" style={{ background: "linear-gradient(135deg, #00b894, #00cec9)" }}>03</div>
              <p className="rule-text">
                <strong>Submission Guidelines:</strong> The quiz will be available only on <strong>9th August, 2026
                at 21:00 Hrs</strong>. Portal will not allow to participate and enter into the webpage except
                scheduled time. Duration of the quiz is <strong>10 Minutes</strong> and Questions will be displayed
                one by one. During the active session participants can change the response. At the end they must
                submit the responses to register the answer. If not submitted within schedule time, it can be
                treated as disqualified. Once submitted, responses cannot be edited or resubmitted.
              </p>
            </div>

            <div className="rule-item">
              <div className="rule-number" style={{ background: "linear-gradient(135deg, #fdcb6e, #e17055)" }}>04</div>
              <p className="rule-text">
                <strong>Evaluation:</strong> Each correct answer carries <strong>One mark</strong>. There is negative
                marking. <strong>One mark will be deducted</strong> for 1 wrong answer. In the event of a tie,
                participants who submitted their entries fastest will be considered as winner. If required, the
                organizing committee may apply additional tie-breaking criteria. Winners will be selected based on
                the highest scores in accordance with the quiz rules.
              </p>
            </div>

            <div className="rule-item">
              <div className="rule-number" style={{ background: "linear-gradient(135deg, #6c5ce7, #a29bfe)" }}>05</div>
              <p className="rule-text">
                <strong>Disclaimer:</strong> By participating, entrants agree to abide by these Rules &amp; Regulations.
                The organizers reserve the right to modify, postpone, or cancel the quiz under unforeseen circumstances
                without prior notice.
              </p>
            </div>

            <div className="info-box">
              📌 Explore the National Science and Technology Digital Archive:{" "}
              <a href="https://www.nstad.in" target="_blank" rel="noopener noreferrer" style={{ color: "#6c5ce7", fontWeight: "bold" }}>
                www.nstad.in
              </a>
            </div>

          </div>

          {/* Footer pinned to bottom */}
          <div className="rules-footer">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              I have read and agree to all the rules and regulations.
            </label>
            
            <div className="button-group">
              <button
                className="btn btn-primary"
                onClick={() => agreed && navigate("/register")}
                disabled={!agreed}
              >
                📝 Register Now
              </button>
              <button
                className="btn btn-secondary"
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
