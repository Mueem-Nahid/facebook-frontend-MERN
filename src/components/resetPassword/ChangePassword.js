import * as Yup from "yup";
import {useState} from "react";
import {Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";

import LoginInput from "../inputs/loginInput";
import {changePassword} from "../../apiServices/userAuth";

const ChangePassword = ({
                           password,
                           setPassword,
                           confirmPassword,
                           setConfirmPassword,
                           error,
                           setLoading,
                           userInfo,
                           loading,
                           setError,
                           setVisible
                        }) => {
   const {email} = userInfo;
   const [success, setSuccess] = useState("");
   const navigate = useNavigate();

   const validatePassword = Yup.object({
      password: Yup.string()
         .required('Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &)')
         .min(6, 'Password must be at least six characters')
         .max(20, "Password can't be more than 20 characters"),
      confirmPassword: Yup.string()
         .required("Confirm your password.")
         .oneOf([Yup.ref("password")], "Passwords are not same."),
   });

   const handleChangePassword = async () => {
      try {
         setLoading(true);
         const data = await changePassword({email, password});
         setSuccess(data?.message);
         setTimeout(() => {
            navigate("/");
         }, 3000);
      } catch (error) {
         setLoading(false);
         setError(error.response?.data?.message);
      }
   }

   return (
      <div className="reset_form" style={{height: '310px'}}>
         <div className="reset_form_header">Change Password</div>
         <div className="reset_form_text">
            Pick a strong password.
         </div>
         <Formik enableReinitialize initialValues={{password, confirmPassword}} validationSchema={validatePassword}
                 onSubmit={handleChangePassword}>
            {
               (formik) => (
                  <Form>
                     <LoginInput type="password" name="password" placeholder="New password"
                                 onChange={(e) => setPassword(e.target.value)}/>
                     <LoginInput type="password" name="confirmPassword" bottom placeholder="Confirm password"
                                 onChange={(e) => setConfirmPassword(e.target.value)}/>
                     {
                        error && <div className="error_text">{error}</div>
                     }
                     {
                        success && <div className="success_text">{success}</div>
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