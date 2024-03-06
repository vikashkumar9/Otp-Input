import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [otplength, setOtplength] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (otplength === 5) {
      console.log(otp);
      alert(otp.join(""));
    }
  }, [otplength, otp]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.removeAttribute("disabled");
      inputRefs.current[index + 1]?.focus();
    }

    if (value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      inputRefs.current[index]?.setAttribute("disabled", true);
    }

    setOtp(newOtp);
    setOtplength((prev) => prev + 1);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.removeAttribute("disabled");
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.removeAttribute("disabled");
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <>
      <h2>Enter verification code</h2>
      <div className="Otp_container">
        {otp.map((value, i) => (
          <div key={i}>
            <input
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="otp_inputs"
              ref={(el) => (inputRefs.current[i] = el)}
              disabled={otplength >= i ? false : true}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
