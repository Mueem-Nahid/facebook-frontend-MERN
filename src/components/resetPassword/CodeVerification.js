import * as Yup from "yup";
import {Form, Formik} from "formik";
import {Link} from "react-router-dom";
import LoginInput from "../inputs/loginInput";
import {validateResetPasswordCode} from "../../apiServices/userAuth";

const CodeVerification = ({userInfo, code, setCode, error, setError, loading, setLoading, setVisible}) => {
   const validateCode = Yup.object({
      code: Yup.string()
         .required("Code is required.")
         .min("5", "Code must be 5 characters.")
         .max("5", "Code must be 5 characters.")
   });

   const {email} = userInfo;

   const handleContinueVerification = async () => {
      try {
         setLoading(true);
         await validateResetPasswordCode({email, code});
         setVisible(3);
         setError("");
         setLoading(false);
      } catch (error) {
         setLoading(false);
         setError(error.response.data.message);
      }
   }

   return (
      <div className="reset_form">
         <div className="reset_form_header">Code verification</div>
         <div className="reset_form_text">
            Please enter the verification code that has been sent to your email.
         </div>
         <Formik enableReinitialize initialValues={{code}} validationSchema={validateCode}
                 onSubmit={handleContinueVerification}>
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