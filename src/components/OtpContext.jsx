import React, { createContext, useState, useRef } from "react";

// Create a context
export const OtpContext = createContext();

export default function OtpContextProvider({ children }) {
  const noofFields = 5; // number of input fields in the component
  const [otp, setOtp] = useState(new Array(noofFields).fill("")); // OTP array
  const [otplength, setOtplength] = useState(0); // Length of entered OTP
  const inputRefs = useRef([]); // References to OTP input fields

  return (
    <OtpContext.Provider
      value={{ otp, setOtp, otplength, setOtplength, inputRefs }}
    >
      {children}
    </OtpContext.Provider>
  );
}
