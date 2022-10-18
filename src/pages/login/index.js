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
            <footer className='login_footer'>
               <div className='login_footer_wrap'>
                  <Link to="/">English (UK)</Link>
                  <Link to="/">বাংলা</Link>
                  <Link to="/">हिन</Link>
                  <Link to="/">Bahasa Indonesia</Link>
                  <Link to="/">العربية</Link>
                  <Link to="/">中文(简体)</Link>
                  <Link to="/">Español</Link>
                  <Link to="/">Português (Brasil)</Link>
                  <Link to="/" className='footer_square'>
                     <i className='plus_icon'></i>
                  </Link>
               </div>
               <div className='footer_splitter'></div>
               <div className='login_footer_wrap'>
                  <Link to="/">Sign Up</Link>
                  <Link to="/">Log in</Link>
                  <Link to="/">Messenger</Link>
                  <Link to="/">Facebook Lite</Link>
                  <Link to="/">Watch</Link>
                  <Link to="/">Places</Link>
                  <Link to="/">Games</Link>
                  <Link to="/">Marketplace</Link>
                  <Link to="/">Facebook Pay</Link>
                  <Link to="/">Oculus</Link>
                  <Link to="/">Portal</Link>
                  <Link to="/">Instagram</Link>
                  <Link to="/">Bulletin</Link>
                  <Link to="/">Local</Link>
                  <Link to="/">Fundraisers</Link>
                  <Link to="/">Services</Link>
                  <Link to="/">Voting Information Centre</Link>
                  <Link to="/">Groups</Link>
                  <Link to="/">About</Link>
                  <Link to="/">Create ad</Link>
                  <Link to="/">Create Page</Link>
                  <Link to="/">Developers</Link>
                  <Link to="/">Careers</Link>
                  <Link to="/">Privacy</Link>
                  <Link to="/">Cookies</Link>
                  <Link to="/">AdChoices<i className="adChoices_icon"></i></Link>
                  <Link to="/">Terms</Link>
                  <Link to="/">Help</Link>
               </div>
               <div className="login_footer_wrap">
                  <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
                     Meta © 2022
                  </Link>
               </div>
            </footer>
         </div>
      </div>
   )
}
