import React, { useState } from "react";
import Button from "./components/Button";
import "./App.css";

function App() {
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [otplength, setOtplength] = useState(0);

  const clearOtp = () => {
    setOtp(new Array(5).fill(""));
  };
  const getOtp = () => {
    alert(otp.join(""));
  };
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtplength(index + 1);

    if (value && index < otp.length - 1) {
      document.getElementById(`otpInput${index + 1}`).disabled = false;
      document.getElementById(`otpInput${index + 1}`).focus();
    }

    if (value === "" && index > 0) {
      document.getElementById(`otpInput${index - 1}`).focus();
      document.getElementById(`otpInput${index}`).disabled = true;
    }
  };
  return (
    <>
      <h2>Enter verification code</h2>
      <div className="Otp_container">
        {otp.map((value, i) => {
          return (
            <div key={i}>
              <input
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(i, e.target.value)}
                className="otp_inputs"
                id={`otpInput${i}`}
                disabled={otplength >= i ? false : true}
              />
            </div>
          );
        })}
      </div>
      <Button onClick={clearOtp}>Clear</Button>
      <Button onClick={getOtp}>Get OTP</Button>
    </>
  );
}

export default App;
