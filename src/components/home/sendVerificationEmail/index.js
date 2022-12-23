import './style.css';
import {useState} from "react";
import axios from "axios";

const SendVerificationEmail = ({user}) => {
   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");

   const sendVerificationEmail = async () => {
      try {
         const {data} = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/sendVerificationEmail`, {},
            {
               headers: {
                  Authorization: `Bearer ${user?.token}`,
               },
            }
         );
         setSuccess(data.message);
      } catch (error) {
         setError(error.response.data.message);
      }
   }

   return (
      <div className="send_verification">
         <span>Your account is not verified. Verify your account before it gets deleted after a month from creating.</span>
         <a className="verification_link" onClick={sendVerificationEmail}>Click here to resend verification link</a>
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