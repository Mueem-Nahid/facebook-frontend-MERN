import {Link} from "react-router-dom";
import axios from "axios";

const SendEmail = ({userInfo, error, email, setError, setUserInfo, setLoading, setVisible, loading}) => {
   const sendEmail = async () => {
      try {
         setLoading(true);
         const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
            {email}
         );
         console.log("Res:", data)
         setError("");
         setVisible(2);
      } catch (err) {
         setLoading(false);
         setError(err.response.data.message);
      }
   }
   return (
      <div className="reset_form dynamic_height">
         <div className="reset_form_header">Reset your password</div>
         <div className="reset_grid">
            <div className="reset_left">
               <div className="reset_form_text">How do you want to receive the code to reset your password?</div>
               <label htmlFor="email" className="hover1">
                  <input type="radio" name="email" id="email" checked readOnly/>
                  <div className="label_col">
                     <span>Send code via email</span>
                     <span>{userInfo?.email}</span>
                  </div>
               </label>
            </div>
            <div className="reset_right">
               <img src={userInfo?.picture} alt="image"/>
               <span>{userInfo?.email}</span>
               <span>Facebook user</span>
            </div>
         </div>
         {
            error && <div className="error_text">{error}</div>
         }
         <div className="border"></div>
         <div className="reset_form_btns">
            <Link to="/login" className="gray_btn">Not You?</Link>
            <button onClick={sendEmail} className="blue_btn">Continue</button>
         </div>
      </div>
   );
};

export default SendEmail;