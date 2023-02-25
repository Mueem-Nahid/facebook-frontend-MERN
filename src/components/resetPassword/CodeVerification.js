import * as Yup from "yup";
import {Form, Formik} from "formik";
import {Link} from "react-router-dom";
import LoginInput from "../inputs/loginInput";

const CodeVerification = ({code, setCode, error}) => {
   const validateCode = Yup.object({
      code: Yup.string()
         .required("Code is required.")
         .min("5", "Code must be 5 characters.")
         .max("5", "Code must be 5 characters.")
   })

   return (
      <div className="reset_form">
         <div className="reset_form_header">Code verification</div>
         <div className="reset_form_text">
            Please enter the verification code that has been sent to your email.
         </div>
         <Formik enableReinitialize initialValues={{code}} validationSchema={validateCode}>
            {
               (formik) => (
                  <Form>
                     <LoginInput type="text" name="code" placeholder="Code"
                                 onChange={(e) => setCode(e.target.value)}/>
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

export default CodeVerification;