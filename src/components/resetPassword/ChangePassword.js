import {Form, Formik} from "formik";
import {Link} from "react-router-dom";
import LoginInput from "../inputs/loginInput";

const ChangePassword = ({password, setPassword, confirmPassword, setConfirmPassword, error}) => {

   return (
      <div className="reset_form" style={{height: '310px'}}>
         <div className="reset_form_header">Change Password</div>
         <div className="reset_form_text">
            Pick a strong password.
         </div>
         <Formik enableReinitialize initialValues={{password, confirmPassword}}>
            {
               (formik) => (
                  <Form>
                     <LoginInput type="text" name="password" placeholder="New password"
                                 onChange={(e) => setPassword(e.target.value)}/>
                     <LoginInput type="text" name="confirm_password" placeholder="Confirm password"
                                 onChange={(e) => setConfirmPassword(e.target.value)}/>
                     {
                        error && <div className="error_text">{error}</div>
                     }
                     <div className="border"></div>
                     <div className="reset_form_btns">
                        <Link to="/login" className="gray_btn">Cancel</Link>
                        <button type="submit" className="blue_btn">Continue</button>
                     </div>
                  </Form>
               )
            }
         </Formik>
      </div>
   );
};

export default ChangePassword;