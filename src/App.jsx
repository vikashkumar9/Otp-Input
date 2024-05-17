import React, { useEffect, useContext } from 'react';
import './App.css';
import { OtpContext } from './components/OtpContext';

function App() {
  const { otp, setOtp, otplength, setOtplength, inputRefs } =
    useContext(OtpContext);

  // Effect to alert when OTP is complete
  useEffect(() => {
    if (otplength === otp.length && otp.every((value) => value !== '')) {
      console.log(otp.join(''));
    }
  }, [otplength, otp]);

  // Set focus on the first input field on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Function to handle input change
  const handleChange = (index, value) => {
    if (!isNaN(value) && value >= 0 && value <= 9) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
        setOtplength((prev) => prev + 1);
      }

      if (value === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
        setOtplength((prev) => prev - 1);
      }
    }
  };

  // Function to handle key down events
  const handleKeyDown = (index, e) => {
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (
      (e.key === 'Backspace' || e.key === 'Delete') &&
      otp[index] === '' &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
      setOtplength((prev) => prev - 1);
    }
  };

  const handleFocus = (index) => {
    inputRefs.current.forEach((ref) => ref.classList.remove('active'));
    inputRefs.current[index]?.classList.add('active');
  };

  return (
    <>
      <h2>Enter verification code</h2>
      <div className='Otp_container'>
        {otp.map((value, i) => (
          <div key={i}>
            <input
              type='text'
              value={value}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className='otp_inputs'
              onFocus={() => handleFocus(i)}
              ref={(el) => (inputRefs.current[i] = el)}
              maxLength={1}
              disabled={otplength < i}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
