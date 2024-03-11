import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const noofFields = 5; // number of input fields in the component
  const [otp, setOtp] = useState(new Array(noofFields).fill("")); // OTP array
  const [otplength, setOtplength] = useState(0); // Length of entered OTP
  const inputRefs = useRef([]); // References to OTP input fields

  // Effect to alert when OTP is complete
  useEffect(() => {
    if (otplength === 4 && otp[4] != "") {
      console.log(otp);
    }
  }, [otplength, otp]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  });
  // Function to handle input change
  const handleChange = (index, value) => {
    // Ensure that the value is a number and is between 0 and 9
    if (!isNaN(value) && value >= 0 && value <= 9) {
      const newOtp = [...otp];
      newOtp[index] = value;

      inputRefs.current.map((ref, i) => {
        ref.setAttribute("disabled", true);
      });
      inputRefs.current[index]?.removeAttribute("disabled");

      // Enable next input field if value is entered and not at the last index
      if (value && index < otp.length - 1) {
        inputRefs.current[index]?.setAttribute("disabled", true);
        inputRefs.current[index + 1]?.removeAttribute("disabled");
        inputRefs.current[index + 1]?.focus();
        setOtplength((prev) => prev + 1);
      }

      // Focus previous input field and disable current input field if value is cleared
      if (value === "" && index > 0) {
        inputRefs.current[index - 1]?.removeAttribute("disabled");
        inputRefs.current[index - 1]?.focus();
        inputRefs.current[index]?.setAttribute("disabled", true);
        setOtplength((prev) => prev - 1);
      }

      // Update OTP and OTP length states
      setOtp(newOtp);
    }
  };
  console.log(otplength);
  // Function to handle key down events
  const handleKeyDown = (index, e) => {
    // Focus previous input field if left arrow key is pressed and current input field is empty
    if (e.key === "ArrowLeft" && index > 0 && otp[index] == "") {
      inputRefs.current[index - 1]?.removeAttribute("disabled");
      inputRefs.current[index - 1]?.focus();
      setOtplength((prev) => prev - 1);
    }
    // Focus next input field if right arrow key is pressed and current input field is not empty
    if (e.key === "ArrowRight" && index < otp.length - 1 && otp[index] !== "") {
      inputRefs.current[index + 1]?.removeAttribute("disabled");
      inputRefs.current[index + 1]?.focus();
      setOtplength((prev) => prev + 1);
    }
  };
  const handleFocus = (index) => {
    inputRefs.current.map((ref, i) => {
      ref.classList.remove("active");
    });

    inputRefs.current[index].classList.add("active");
  };

  return (
    <>
      <h2>Enter verification code</h2>
      <div className="Otp_container">
        {otp.map((value, i) => (
          <div key={i}>
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="otp_inputs"
              onFocus={() => handleFocus(i)}
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
