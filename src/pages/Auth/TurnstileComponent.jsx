import React from "react";
import Turnstile from "react-turnstile";

export default function TurnstileComponent({ onVerify }) {
  return (
    <Turnstile
      sitekey="0x4AAAAAACEvEpotSfKtle_r"
      onVerify={(token) => {
        console.log("CF Token:", token);
        onVerify && onVerify(token);
      }}
    />
  );
}
