import { Form, Formik } from "formik";
import * as Yup from 'yup'
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";

const userInfos = {
   first_name: '',
   last_name: '',
   email: '',
   password: '',
   bYear: new Date().getFullYear(),
   bMonth: new Date().getMonth() + 1, // in js month starts with 0
   bDay: new Date().getDate(),
   gender: ''
}

export default function RegisterForm() {
   const [user, setUser] = useState(userInfos);
   const { first_name, last_name, email, password, bYear, bMonth, bDay, gender } = user
   const yearTemp = new Date().getFullYear()
   const years = Array.from(new Array(70), (val, index) => yearTemp - index)
   const months = Array.from(new Array(12), (val, index) => 1 + index)

   const registerValidation = Yup.object({
      first_name: Yup.string().required('What is your first name?').min(3, 'First name must be between 3 and 16 characters').max(16, 'First name must be between 3 and 16 characters')
         .matches(/^[aA-zZ\s]+$/, 'Numbers and special characters are not allowed'),
      last_name: Yup.string().required('What is your last name?').min(3, 'Last name must be between 3 and 16 characters').max(16, 'Last name must be between 3 and 16 characters')
         .matches(/^[aA-zZ\s]+$/, 'Numbers and special characters are not allowed'),
      email: Yup.string().required("You'll uses this when you log in and if you ever need to reset your password").email('Email must be a valid email'),
      password: Yup.string().required('Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &)')
         .min(6, 'Password must be at least six characters')
         .max(20, "Password can't be more than 20 characters"),
   })

   const getDays = () => {
      return new Date(bYear, bMonth, 0).getDate();
   }

   const days = Array.from(new Array(getDays()), (val, index) => 1 + index)

   const handleRegisterChange = (e) => {
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
            <Formik enableReinitialize initialValues={{ first_name, last_name, email, password, bYear, bMonth, bDay, gender }} validationSchema={registerValidation}>
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
                              <select value={bDay} name="bDay" onChange={handleRegisterChange}>
                                 {
                                    days.map((day, i) => (
                                       <option value={day} key={i}>{day}</option>
                                    ))
                                 }
                              </select>
                              <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
                                 {
                                    months.map((month, i) => (
                                       <option value={month} key={i}>{month}</option>
                                    ))
                                 }
                              </select>
                              <select name="bYear" value={bYear} onChange={handleRegisterChange}>
                                 {
                                    years.map((year, i) => (
                                       <option value={year} key={i}>{year}</option>
                                    ))
                                 }
                              </select>
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
