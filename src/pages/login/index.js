import React, { useState } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { Link } from 'react-router-dom'

import './style.css'
import LoginInput from '../../components/inputs/loginInput'

const loginInfos = {
   email: '',
   password: ''
};

export default function Login() {
   const [login, setLogin] = useState(loginInfos);
   const { email, password } = login;
   const loginValidation = Yup.object({
      email: Yup.string().required('Email is required').email('Email must be a valid email'),
      password: Yup.string().required('Password is required'),
   })

   const handleLoginChange = (e) => {
      const { name, value } = e.target;
      setLogin({ ...login, [name]: value });
   };

   return (
      <div className='login'>
         <div className='login_wrapper'>
            <div className='login_wrap'>
               <div className='login_1'>
                  <img src='../../icons/facebook.svg' alt='facebook_logo' />
                  <span>
                     Facebook helps you to connect and share with the people in your life.
                  </span>
               </div>
               <div className='login_2'>
                  <div className='login_2_wrap'>
                     <Formik enableReinitialize initialValues={{ email, password }} validationSchema={loginValidation}>
                        {
                           (formik) => (
                              <Form>
                                 <LoginInput type='text' name='email' placeholder='Email address' onChange={handleLoginChange} />
                                 <LoginInput type='password' name='password' placeholder='Password' onChange={handleLoginChange} bottom />
                                 <button type='submit' className='blue_btn'>Log In</button>
                              </Form>
                           )
                        }
                     </Formik>
                     <Link to='/forget-password' className='forget_password'>Forget password?</Link>
                     <div className='sign_splitter'></div>
                     <button className='blue_btn open_signup'>Create Account</button>
                  </div>
                  <Link to='/' className='sign_extra'>
                     <b>Create a Page</b> for celebraty, brand or business
                  </Link>
               </div>
            </div>
            <div className='register'></div>
         </div>
      </div>
   )
}
