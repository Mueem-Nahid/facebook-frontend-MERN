import {Form, Formik} from "formik";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import "./style.css";
import useLogout from "../../hooks/useLogout";
import {useState} from "react";
import LoginInput from "../../components/inputs/loginInput";

const ResetPassword = () => {
   const {user} = useSelector((state) => ({...state}));
   const logout = useLogout();
   const [email, setEmail] = useState("");
   const [error, setError] = useState("");

   return (
      <div className="reset">
         <div className="reset_header">
            <img src="../../../icons/facebook.svg" alt="logo"/>
            {
               user ? (
                  <div className="right_reset">
                     <Link to="/profile">
                        <img src={user?.picture} alt="user"/>
                     </Link>
                     <button className="blue_btn" onClick={logout}>Logout</button>
                  </div>
               ) : (
                  <Link to="/login" className="right_reset">
                     <button className="blue_btn">Login</button>
                  </Link>
               )
            }
         </div>
         <div className="reset_wrap">
            <div className="reset_form">
               <div className="reset_form_header">Find your account</div>
               <div className="reset_form_text">
                  Please enter your email address or mobile number to search for your account.
               </div>
               <Formik enableReinitialize initialValues={{email,}}>
                  {
                     (formik) => (
                        <Form>
                           <LoginInput type="text" name="email" placeholder="Email or phone number"
                                       onChange={(e) => setEmail(e.target.value)}/>
                           {
                              error && <div className="error_text">{error}</div>
                           }
                           <div className="reset_form_btns">
                              <Link to="/login" className="gray_btn">Cancel</Link>
                              <button type="submit" className="blue_btn">Search</button>
                           </div>
                        </Form>
                     )
                  }
               </Formik>
            </div>
         </div>
      </div>
   );
};

export default ResetPassword;