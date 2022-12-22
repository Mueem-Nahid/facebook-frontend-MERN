import './style.css';
import {useState} from "react";

const SendVerificationEmail = () => {
   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");

   return (
      <div className="send_verification">
         <span>Your account is not verified. Verify your account before it gets deleted after a month from creating.</span>
         <a className="verification_link">Click here to resend verification link</a>
         {
            success && <div className="success_text">{success}</div>
         }
         {
            error && <div className="error_text">{error}</div>
         }
      </div>
   )
};

export default SendVerificationEmail;