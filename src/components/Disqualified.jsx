 import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Disqualified() {
  const { state } = useLocation();

  const reason =
    state?.reason ||
    "Your attempt has been disqualified because a quiz rule was violated.";

  const student = state?.student;

  useEffect(() => {
    // Redirect to nstad.in after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = "https://www.nstad.in";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          background: "#fff",
          borderRadius: "16px",
          padding: "45px 35px",
          textAlign: "center",
          boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
          borderTop: "6px solid #dc2626",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "#fee2e2",
            color: "#dc2626",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            margin: "0 auto 25px",
          }}
        >
          ✕
        </div>

        <h1
          style={{
            margin: "0 0 15px",
            color: "#dc2626",
            fontSize: "32px",
          }}
        >
          Quiz Disqualified
        </h1>

        <p
          style={{
            color: "#333",
            fontSize: "18px",
            lineHeight: 1.6,
            marginBottom: "25px",
          }}
        >
          Your quiz attempt has been disqualified.
        </p>

        {/* Student */}
        {student?.name && (
          <div
            style={{
              background: "#f8fafc",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <strong>{student.name}</strong>

            {student.regNo && (
              <div
                style={{
                  marginTop: "5px",
                  color: "#666",
                }}
              >
                Registration No: {student.regNo}
              </div>
            )}
          </div>
        )}

        {/* Reason */}
        <div
          style={{
            background: "#fff1f2",
            border: "1px solid #fecdd3",
            borderRadius: "10px",
            padding: "18px",
            marginBottom: "25px",
            textAlign: "left",
          }}
        >
          <strong
            style={{
              color: "#991b1b",
            }}
          >
            Reason
          </strong>

          <p
            style={{
              margin: "8px 0 0",
              color: "#7f1d1d",
              lineHeight: 1.5,
            }}
          >
            {reason}
          </p>
        </div>

        <div
          style={{
            background: "#f8fafc",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "25px",
            color: "#555",
            lineHeight: 1.5,
          }}
        >
          Your quiz submission is no longer available. Please contact the
          administrator if you believe this happened by mistake.
        </div>

        {/* Auto-redirect message */}
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          You will be redirected to nstad.in shortly...
        </p>
      </div>
    </div>
  );
}

export default Disqualified;
