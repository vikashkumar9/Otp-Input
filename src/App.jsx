import React, { useEffect } from 'react';
import './App.css';
import { OtpContext } from './components/OtpContext';
import { useContext } from 'react';
function App() {
  const { otp, setOtp, otplength, setOtplength, inputRefs } =
    useContext(OtpContext);

  // Effect to alert when OTP is complete
  useEffect(() => {
    if (otplength === 4 && otp[4] != '') {
      console.log(otp);
    }
  }, [otplength, otp]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  });

  // Function to handle input change
  const handleChange = (index, value) => {
    if (!isNaN(value) && value >= 0 && value <= 9) {
      const newOtp = [...otp];
      newOtp[index] = value;

      inputRefs.current.map((ref, i) => {
        ref.setAttribute('disabled', true);
      });
      inputRefs.current[index]?.removeAttribute('disabled');

      // Enable next input field if value is entered and not at the last index
      if (value && index < otp.length - 1) {
        inputRefs.current[index]?.setAttribute('disabled', true);
        inputRefs.current[index + 1]?.removeAttribute('disabled');
        inputRefs.current[index + 1]?.focus();
        setOtplength((prev) => prev + 1);
      }

      // Focus previous input field and disable current input field if value is cleared
      if (value === '' && index > 0) {
        // inputRefs.current[index - 1]?.removeAttribute('disabled');
        inputRefs.current[index]?.focus();
        // inputRefs.current[index]?.setAttribute('disabled', true);

        // setOtplength((prev) => prev - 1);
      }

      // Update OTP and OTP length states
      setOtp(newOtp);
    }
  };
  console.log(otplength);
  // Function to handle key down events
  const handleKeyDown = (index, e) => {
    const inputRefsArray = inputRefs.current;

    // Focus previous input field if left arrow key, backspace, or delete is pressed and current input field is empty
    if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'Delete') {
      if (index > 0 && otp[index] === '') {
        inputRefsArray[index - 1]?.removeAttribute('disabled');
        inputRefsArray[index - 1]?.focus();
        setOtplength((prev) => prev - 1);
        return; // Early return to prevent executing the next condition in the same keydown event
      } else if (otp[index] !== '') {
        const newOtp = [...otp];
        newOtp[index] = '';
        inputRefsArray[index + 1]?.focus();
        // Ensure focus remains on the current input field
        setOtp(newOtp);

        return; // Early return to prevent cursor movement issues
      }
    }
    if (
      e.key >= '0' &&
      e.key <= '9' &&
      otp[index] !== '' &&
      index < otp.length - 1
    ) {
      const newOtp = [...otp];
      newOtp[index + 1] = e.key;
      inputRefs.current[index]?.setAttribute('disabled', true);
      inputRefs.current[index + 1]?.removeAttribute('disabled');
      inputRefs.current[index + 1]?.focus();
      setOtplength((prev) => prev + 1);
      setOtp(newOtp);

      return; // Early return to prevent cursor movement issues
    }

    // Focus next input field if right arrow key is pressed
    if (e.key === 'ArrowRight' && index < otp.length - 1 && otp[index] !== '') {
      inputRefsArray[index + 1]?.removeAttribute('disabled');
      inputRefsArray[index + 1]?.focus();
      setOtplength((prev) => prev + 1);
      return; // Early return to prevent executing the next condition in the same keydown event
    }
  };

  const handleFocus = (index) => {
    inputRefs.current.map((ref, i) => {
      ref.classList.remove('active');
    });

    inputRefs.current[index].classList.add('active');
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
              inputMode='numeric'
              pattern='[0-9]*'
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
