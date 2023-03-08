import {useState} from "react";

import './style.css';
import {sendVerificationEmail} from "../../../apiServices/userAuth";

const SendVerificationEmail = ({user}) => {
   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");

   const handleSendVerificationEmail = async () => {
      try {
         const data = await sendVerificationEmail(user?.token);
         console.log("sent:",data);
         setSuccess(data.message);
      } catch (error) {
         setError(error.response.data.message);
      }
   }

   return (
      <div className="send_verification">
         <span>Your account is not verified. Verify your account before it gets deleted after a month from creating.</span>
         <a className="verification_link" onClick={handleSendVerificationEmail}>Click here to resend verification
            link</a>
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