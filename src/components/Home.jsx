import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RulesPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-0 m-0 font-sans">
      <div className="w-full h-screen bg-white flex flex-col relative overflow-hidden px-6 sm:px-10 md:px-16 lg:px-20 py-6 sm:py-8 md:py-10">

        {/* Image – top right */}
        <img
          src="/assets/RulesPic.png"
          alt="Rules Icon"
          className="absolute top-4 right-4 sm:top-6 sm:right-8 w-12 sm:w-16 md:w-20 h-auto rounded-xl shadow-md"
        />

        {/* Introduction */}
        <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-xl p-4 sm:p-5 md:p-6 mb-4 md:mb-6 flex-shrink-0 text-left">
          <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
            <strong>National Science and Technology Digital Archive (NSTAD)</strong> invites you to participate in
            an <strong>Online Quiz</strong> based on available archival documents at{" "}
            <a href="https://nstad.in" target="_blank" rel="noopener noreferrer" className="text-indigo-700 font-semibold underline">
              nstad.in
            </a>
            . <br />
            <strong>Quiz Date:</strong> 09.08.2026 &nbsp;|&nbsp; <strong>Time:</strong> 21:00 Hrs
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed mt-1">
            The National Science and Technology Digital Archive (NSTAD) invites science enthusiasts, students,
            researchers, and the general public to participate in an online quiz celebrating the life, work, and
            scientific legacy of <strong>Acharya Prafulla Chandra Ray</strong>, one of India's greatest chemists and
            pioneers of modern scientific research.
          </p>
        </div>

        {/* Rules Container – scrollable if needed */}
        <div className="flex-1 overflow-y-auto mb-3 md:mb-4 pr-1">
          <div className="space-y-2.5 sm:space-y-3 text-left">
            {/* Rule 01 */}
            <div className="flex gap-3 sm:gap-4 items-start bg-purple-50/50 rounded-xl border border-purple-100/80 p-3 sm:p-4">
              <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-400 text-white font-extrabold text-sm sm:text-base flex items-center justify-center">
                01
              </span>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                <strong>Eligibility:</strong> The quiz is open to students of Class XI, Class XII, and Undergraduates
                from any recognized school, college, or university. Participation is free of cost. Each participant is
                permitted to submit only one entry. Multiple submissions by the same participant may lead to disqualification.
              </p>
            </div>

            {/* Rule 02 */}
            <div className="flex gap-3 sm:gap-4 items-start bg-red-50/50 rounded-xl border border-red-100/80 p-3 sm:p-4">
              <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-400 text-white font-extrabold text-sm sm:text-base flex items-center justify-center">
                02
              </span>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                <strong>Quiz Format:</strong> The quiz consists of multiple-choice questions (MCQs). Participants are
                encouraged to explore the collections of scientists pages available on{" "}
                <a href="https://www.nstad.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold">
                  www.nstad.in
                </a>{" "}
                before attempting the quiz. Participants are encouraged to register themselves on the portal before
                participation and may enter into the quiz portal by using login credentials. A credential received
                immediately after registration can be used for participation.
              </p>
            </div>

            {/* Rule 03 */}
            <div className="flex gap-3 sm:gap-4 items-start bg-green-50/50 rounded-xl border border-green-100/80 p-3 sm:p-4">
              <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-400 text-white font-extrabold text-sm sm:text-base flex items-center justify-center">
                03
              </span>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                <strong>Submission Guidelines:</strong> The quiz will be available only on <strong>9th August, 2026
                at 21:00 Hrs</strong>. Portal will not allow to participate and enter into the webpage except
                scheduled time. Duration of the quiz is <strong>10 Minutes</strong> and Questions will be displayed
                one by one. During the active session participants can change the response. At the end they must
                submit the responses to register the answer. If not submitted within schedule time, it can be
                treated as disqualified. Once submitted, responses cannot be edited or resubmitted.
              </p>
            </div>

            {/* Rule 04 */}
            <div className="flex gap-3 sm:gap-4 items-start bg-yellow-50/50 rounded-xl border border-yellow-100/80 p-3 sm:p-4">
              <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-400 text-white font-extrabold text-sm sm:text-base flex items-center justify-center">
                04
              </span>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                <strong>Evaluation:</strong> Each correct answer carries <strong>One mark</strong>. There is negative
                marking. <strong>One mark will be deducted</strong> for 1 wrong answer. In the event of a tie,
                participants who submitted their entries fastest will be considered as winner. If required, the
                organizing committee may apply additional tie‑breaking criteria. Winners will be selected based on
                the highest scores in accordance with the quiz rules.
              </p>
            </div>

            {/* Rule 05 */}
            <div className="flex gap-3 sm:gap-4 items-start bg-indigo-50/50 rounded-xl border border-indigo-100/80 p-3 sm:p-4">
              <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-400 text-white font-extrabold text-sm sm:text-base flex items-center justify-center">
                05
              </span>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                <strong>Disclaimer:</strong> By participating, entrants agree to abide by these Rules &amp; Regulations.
                The organizers reserve the right to modify, postpone, or cancel the quiz under unforeseen circumstances
                without prior notice.
              </p>
            </div>
          </div>

          {/* NSTAD box */}
          <div className="mt-4 bg-blue-50 border-l-4 border-indigo-600 rounded-lg p-3 sm:p-4 text-left text-sm sm:text-base text-indigo-900">
            📌 Explore the National Science and Technology Digital Archive:{" "}
            <a href="https://www.nstad.in" target="_blank" rel="noopener noreferrer" className="font-bold underline text-indigo-700">
              www.nstad.in
            </a>
          </div>
        </div>

        {/* Checkbox & Buttons */}
        <div className="flex-shrink-0 flex flex-col gap-3 mt-2">
          <label className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 sm:w-5 sm:h-5 accent-indigo-600 cursor-pointer"
            />
            I have read and agree to all the rules and regulations.
          </label>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button
              className={`inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 ${
                agreed
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-1"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
              }`}
              onClick={() => agreed && navigate("/register")}
              disabled={!agreed}
            >
              📝 Register Now
            </button>
            <button
              className={`inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base border-2 transition-all duration-200 ${
                agreed
                  ? "border-indigo-300 bg-white text-gray-700 hover:border-indigo-500 hover:shadow-md hover:-translate-y-1"
                  : "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
              }`}
              onClick={() => agreed && navigate("/login")}
              disabled={!agreed}
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
