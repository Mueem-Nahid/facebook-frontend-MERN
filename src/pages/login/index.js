import React from 'react'
import { Form, Formik } from 'formik'
import { Link } from 'react-router-dom'

import './style.css'

export default function Login() {
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
                     <Formik>
                        {
                           (formik) => (
                              <Form>
                                 <input type='text' />
                                 <input typpe='text' />
                                 <button type='submit'>Log In</button>
                              </Form>
                           )
                        }
                     </Formik>
                     <Link to='/forget-password'>Forget password?</Link>
                     <div className='sign_splitter'></div>
                     <button className='blue_btn open_signup'>Create Account</button>
                  </div>
                  <Link to='/'>
                     <b>Create a Page</b> for celebraty, brand or business
                  </Link>
               </div>
            </div>
            <div className='register'></div>
         </div>
      </div>
   )
}
