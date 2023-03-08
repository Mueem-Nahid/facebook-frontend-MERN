import * as Yup from "yup";
import {Form, Formik} from "formik";
import {Link} from "react-router-dom";
import LoginInput from "../inputs/loginInput";
import {findUser} from "../../apiServices/userAuth";

const SearchAccount = ({email, setEmail, error, setLoading, setError, setUserInfo, setVisible}) => {

   const validateEmail = Yup.object({
      email: Yup.string()
         .required("Email address is required.")
         .email("Must be a valid email.")
   });

   const handleSearch = async () => {
      try {
         setLoading(true);
         const data = await findUser({email});
         setUserInfo(data);
         setVisible(1);
         setError("");
      } catch (error) {
         setLoading(false);
         setError(error?.response?.data?.message);
      }
   }

   return (
      <div className="reset_form">
         <div className="reset_form_header">Find your account</div>
         <div className="reset_form_text">
            Please enter your email address or mobile number to search for your account.
         </div>
         <Formik enableReinitialize initialValues={{email,}} validationSchema={validateEmail} onSubmit={handleSearch}>
            {
               (formik) => (
                  <Form>
                     <LoginInput type="text" name="email" placeholder="Email or phone number"
                                 onChange={(e) => setEmail(e.target.value)}/>
                     {
                        error && <div className="error_text">{error}</div>
                     }
                     <div className="border"></div>
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