import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";

const userInfos = {
   firs_name: '',
   last_name: '',
   email: '',
   password: '',
   bYear: '',
   bMonth: '',
   bDay: '',
   gender: ''
}

export default function RegisterForm() {
   const [user, setUser] = useState(userInfos);

   const handleRegisterChange = e => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value })
   }

   return (
      <div className="blur">
         <div className='register'>
            <div className='register_header'>
               <i className='exit_icon'></i>
               <span>Sign up</span>
               <span>It's quick and easy</span>
            </div>
            <Formik>
               {
                  (formik) => (
                     <Form className="register_form">
                        <div className="reg_line">
                           <RegisterInput type='text' placeholder='First name' name='first_name' onChange={handleRegisterChange} />
                           <RegisterInput type='text' placeholder='Last name' name='last_name' onChange={handleRegisterChange} />
                        </div>
                        <div className="reg_line">
                           <RegisterInput type='text' placeholder='Mobile number or email address' name='email' onChange={handleRegisterChange} />
                        </div>
                        <div className="reg_line">
                           <RegisterInput type='password' placeholder='New password' name='password' onChange={handleRegisterChange} />
                        </div>
                        <div className="reg_col">
                           <div className="reg_line_header">
                              Date of birth <i className="info_icon"></i>
                           </div>
                           <div className="reg_grid">
                              <select name="bDay"><option>15</option></select>
                              <select name="bMonth"><option>April</option></select>
                              <select name="bYear"><option>1998</option></select>
                           </div>
                        </div>
                        <div className="reg_col">
                           <div className="reg_line_header">
                              Gender <i className="info_icon"></i>
                           </div>
                           <div className="reg_grid">
                              <label htmlFor="male">
                                 Male
                                 <input type='radio' name='gender' id='male' value='male' onChange={handleRegisterChange} />
                              </label>
                              <label htmlFor="female">
                                 Female
                                 <input type='radio' name='gender' id='female' value='female' onChange={handleRegisterChange} />
                              </label>
                              <label htmlFor="custom">
                                 Custom
                                 <input type='radio' name='gender' id='custom' value='custom' onChange={handleRegisterChange} />
                              </label>
                           </div>
                        </div>
                        <div className="reg_infos">
                           By clicking Sign Up, you agree to our <span> Terms, Privacy Policy </span> and <span>Cookies Policy </span>. You may receive SMS notifications from us and can opt out at any time.
                        </div>
                        <div className="reg_btn_wrapper">
                           <button className="blue_btn open_signup">Sign up</button>
                        </div>
                     </Form>
                  )
               }
            </Formik>
         </div>
      </div>
   )
}
