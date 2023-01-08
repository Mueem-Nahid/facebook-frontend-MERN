import {Form, Formik} from "formik";
import {Link} from "react-router-dom";
import LoginInput from "../inputs/loginInput";

const SearchAccount = ({email, setEmail, error}) => {

   return (
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
   );
};

export default SearchAccount;