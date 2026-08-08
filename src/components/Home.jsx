import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RulesPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#1a1a40] to-[#24243e] p-4 sm:p-8 relative overflow-hidden font-sans">
      
      {/* Background Decorative Circles */}
      <div className="absolute top-[-100px] right-[-100px] w-64 h-64 md:w-[500px] md:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(108,92,231,0.2)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 md:w-[400px] md:h-[400px] rounded-full bg-[radial-gradient(circle,rgba(46,213,115,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Content Card */}
      <div className="max-w-4xl w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10 lg:p-12 relative z-10 my-4 flex flex-col">
        
        {/* Image on top right - Responsive sizing */}
        <img 
          src="/assets/RulesPic.png" 
          alt="Rules Icon" 
          className="absolute top-4 right-4 md:top-8 md:right-8 w-12 md:w-20 h-auto rounded-xl shadow-md" 
        />

        {/* Introduction */}
        <div className="bg-[#f5f3ff] p-5 md:p-6 rounded-xl border-l-4 border-[#6c5ce7] mb-6 mt-12 md:mt-0">
          <p className="text-base md:text-lg leading-relaxed text-gray-800 mb-2">
            <strong>National Science and Technology Digital Archive (NSTAD)</strong> invites you to participate in
            an <strong>Online Quiz</strong> based on available archival documents at{" "}
            <a href="https://nstad.in" target="_blank" rel="noopener noreferrer" className="text-[#6c5ce7] font-bold hover:underline">
              nstad.in
            </a>. <br className="hidden md:block" />
            <span className="block mt-2 md:inline md:mt-0">
              <strong>Quiz Date:</strong> 09.08.2026 &nbsp;|&nbsp; <strong>Time:</strong> 21:00 Hrs
            </span>
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-800">
            The National Science and Technology Digital Archive (NSTAD) invites science enthusiasts, students,
            researchers, and the general public to participate in an online quiz celebrating the life, work, and
            scientific legacy of <strong>Acharya Prafulla Chandra Ray</strong>, one of India's greatest chemists and
            pioneers of modern scientific research.
          </p>
        </div>

        {/* Rules Section */}
        <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar space-y-4">
          
          <div className="flex gap-4 items-start bg-[#faf9ff] rounded-xl p-4 md:p-5 border border-[#edeaf6] hover:shadow-md transition-shadow">
            <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] text-white font-extrabold text-lg flex items-center justify-center">01</div>
            <div className="flex-1 text-sm md:text-base leading-relaxed text-gray-800">
              <strong>Eligibility:</strong> The quiz is open to students of Class XI, Class XII, and Undergraduates
              from any recognized school, college, or university. Participation is free of cost. Each participant is
              permitted to submit only one entry. Multiple submissions by the same participant may lead to disqualification.
            </div>
          </div>

          <div className="flex gap-4 items-start bg-[#faf9ff] rounded-xl p-4 md:p-5 border border-[#edeaf6] hover:shadow-md transition-shadow">
            <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#e17055] to-[#d63031] text-white font-extrabold text-lg flex items-center justify-center">02</div>
            <div className="flex-1 text-sm md:text-base leading-relaxed text-gray-800">
              <strong>Quiz Format:</strong> The quiz consists of multiple-choice questions (MCQs). Participants are
              encouraged to explore the collections of scientists pages available on{" "}
              <a href="https://www.nstad.in" target="_blank" rel="noopener noreferrer" className="text-[#6c5ce7] font-semibold hover:underline">
                www.nstad.in
              </a>{" "}
              before attempting the quiz. Participants are encouraged to register themselves on the portal before
              participation and may enter into the quiz portal by using login credentials. A credential received
              immediately after registration can be used for participation.
            </div>
          </div>

          <div className="flex gap-4 items-start bg-[#faf9ff] rounded-xl p-4 md:p-5 border border-[#edeaf6] hover:shadow-md transition-shadow">
            <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#00b894] to-[#00cec9] text-white font-extrabold text-lg flex items-center justify-center">03</div>
            <div className="flex-1 text-sm md:text-base leading-relaxed text-gray-800">
              <strong>Submission Guidelines:</strong> The quiz will be available only on <strong>9th August, 2026
              at 21:00 Hrs</strong>. Portal will not allow to participate and enter into the webpage except
              scheduled time. Duration of the quiz is <strong>10 Minutes</strong> and Questions will be displayed
              one by one. During the active session participants can change the response. At the end they must
              submit the responses to register the answer. If not submitted within schedule time, it can be
              treated as disqualified. Once submitted, responses cannot be edited or resubmitted.
            </div>
          </div>

          <div className="flex gap-4 items-start bg-[#faf9ff] rounded-xl p-4 md:p-5 border border-[#edeaf6] hover:shadow-md transition-shadow">
            <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#fdcb6e] to-[#e17055] text-white font-extrabold text-lg flex items-center justify-center">04</div>
            <div className="flex-1 text-sm md:text-base leading-relaxed text-gray-800">
              <strong>Evaluation:</strong> Each correct answer carries <strong>One mark</strong>. There is negative
              marking. <strong>One mark will be deducted</strong> for 1 wrong answer. In the event of a tie,
              participants who submitted their entries fastest will be considered as winner. If required, the
              organizing committee may apply additional tie‑breaking criteria. Winners will be selected based on
              the highest scores in accordance with the quiz rules.
            </div>
          </div>

          <div className="flex gap-4 items-start bg-[#faf9ff] rounded-xl p-4 md:p-5 border border-[#edeaf6] hover:shadow-md transition-shadow">
            <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] text-white font-extrabold text-lg flex items-center justify-center">05</div>
            <div className="flex-1 text-sm md:text-base leading-relaxed text-gray-800">
              <strong>Disclaimer:</strong> By participating, entrants agree to abide by these Rules &amp; Regulations.
              The organizers reserve the right to modify, postpone, or cancel the quiz under unforeseen circumstances
              without prior notice.
            </div>
          </div>

          {/* Extra Info Box */}
          <div className="mt-6 bg-[#eef2ff] rounded-xl p-4 md:p-5 border-l-4 border-[#6c5ce7] text-sm md:text-base text-[#1a237e]">
            📌 Explore the National Science and Technology Digital Archive:{" "}
            <a href="https://www.nstad.in" target="_blank" rel="noopener noreferrer" className="text-[#6c5ce7] font-bold hover:underline">
              www.nstad.in
            </a>
          </div>
        </div>

        {/* Checkbox & Action Buttons */}
        <div className="flex flex-col gap-5 pt-4 border-t border-gray-100">
          <label className="flex items-center justify-center gap-3 text-base md:text-lg text-gray-900 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 md:w-6 md:h-6 cursor-pointer accent-[#6c5ce7]"
            />
            I have read and agree to all the rules and regulations.
          </label>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => agreed && navigate("/register")}
              disabled={!agreed}
              className={`flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold rounded-xl text-white transition-all duration-300 shadow-lg ${
                agreed 
                  ? "bg-gradient-to-br from-[#6c5ce7] to-[#5a4bd1] hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/30 cursor-pointer" 
                  : "bg-gray-400 cursor-not-allowed opacity-70"
              }`}
            >
              📝 Register Now
            </button>
            <button
              onClick={() => agreed && navigate("/login")}
              disabled={!agreed}
              className={`flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold rounded-xl transition-all duration-300 border-2 ${
                agreed 
                  ? "bg-white text-[#3d3d5c] border-[#d5d0e8] hover:border-[#6c5ce7] hover:-translate-y-1 hover:shadow-lg cursor-pointer" 
                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-70"
              }`}
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
