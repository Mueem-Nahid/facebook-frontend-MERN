import * as Yup from 'yup';
import Cookies from 'js-cookie';
import {Form, Formik} from "formik";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";

import GenderSelect from "./GenderSelect";
import {loaderColor} from "../../utils/constants";
import RegisterInput from "../inputs/registerInput";
import DateOfBirthSelect from "./DateOfBirthSelect";
import {registerUser} from "../../apiServices/userAuth";

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

export default function RegisterForm({setVisible}) {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [user, setUser] = useState(userInfos);
   const {first_name, last_name, email, password, bYear, bMonth, bDay, gender} = user
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
      const {name, value} = e.target;
      setUser({...user, [name]: value})
   }

   const [dateError, setDateError] = useState("");
   const [genderError, setGenderError] = useState("");

   const handleAgeValidation = () => {
      let currentDate = new Date();
      let pickedDate = new Date(bYear, bMonth - 1, bDay);
      let atleast14 = new Date(1970 + 14, 0, 1);   // year, month, date
      let noMoreThan70 = new Date(1970 + 70, 0, 1);
      if (currentDate - pickedDate < atleast14) {
         setDateError("It looks like you've entered the wrong info. Please make sure that you use your real date of birth")
      } else if (currentDate - pickedDate > noMoreThan70) {
         setDateError("It looks like you've entered the wrong info. Please make sure that you use your real date of birth")
      } else if (!gender) {
         setDateError("");
         setGenderError("Please choose a gender. You can change who can see this later");
      } else {
         setDateError("");
         setGenderError("");
         registerSubmit();
      }
   }

   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [loading, setLoading] = useState(false);

   const registerSubmit = async () => {
      try {
         setLoading(true)
         const data = await registerUser({first_name, last_name, email, password, bYear, bMonth, bDay, gender});
         setError("");
         setSuccess(data.message);
         const {message, ...rest} = data; // extracting every info except message
         setTimeout(() => {
            dispatch({type: "LOGIN", payload: rest?.data});
            Cookies.set("user", JSON.stringify(rest?.data));
            navigate("/");
         }, 3000);
      } catch (error) {
         setLoading(false);
         setSuccess("");
         setError(error.response.data.message);
      }
   }

   return (
      <div className="blur">
         <div className='register'>
            <div className='register_header'>
               <i className='exit_icon' onClick={() => setVisible(false)}></i>
               <span>Sign up</span>
               <span>It's quick and easy</span>
            </div>
            <Formik enableReinitialize
                    initialValues={{first_name, last_name, email, password, bYear, bMonth, bDay, gender}}
                    validationSchema={registerValidation} onSubmit={handleAgeValidation}>
               {
                  (formik) => (
                     <Form className="register_form">
                        <div className="reg_line">
                           <RegisterInput type='text' placeholder='First name' name='first_name'
                                          onChange={handleRegisterChange}/>
                           <RegisterInput type='text' placeholder='Last name' name='last_name'
                                          onChange={handleRegisterChange}/>
                        </div>
                        <div className="reg_line">
                           <RegisterInput type='text' placeholder='Mobile number or email address' name='email'
                                          onChange={handleRegisterChange}/>
                        </div>
                        <div className="reg_line">
                           <RegisterInput type='password' placeholder='New password' name='password'
                                          onChange={handleRegisterChange}/>
                        </div>
                        <div className="reg_col">
                           <div className="reg_line_header">
                              Date of birth <i className="info_icon"></i>
                           </div>
                           <DateOfBirthSelect
                              bDay={bDay} bMonth={bMonth} bYear={bYear} days={days} months={months} years={years}
                              handleRegisterChange={handleRegisterChange} dateError={dateError}
                           />
                        </div>
                        <div className="reg_col">
                           <div className="reg_line_header">
                              Gender <i className="info_icon"></i>
                           </div>
                           <GenderSelect genderError={genderError} handleRegisterChange={handleRegisterChange}/>
                        </div>
                        <div className="reg_infos">
                           By clicking Sign Up, you agree to
                           our <span> Terms, Privacy Policy </span> and <span>Cookies Policy </span>. You may
                           receive SMS notifications from us and can opt out at any time.
                        </div>
                        <div className="reg_btn_wrapper">
                           <button className="blue_btn open_signup">Sign up</button>
                        </div>
                        <DotLoader color={loaderColor} loading={loading} size={30} aria-label="Loading Spinner"
                                   data-testid="loader"/>
                        {error && <div className="error_text">{error}</div>}
                        {success && <div className="success_text">{success}</div>}
                     </Form>
                  )
               }
            </Formik>
         </div>
      </div>
   )
}
