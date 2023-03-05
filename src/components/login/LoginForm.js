import * as Yup from 'yup';
import {useState} from 'react';
import Cookies from "js-cookie";
import {Form, Formik} from 'formik';
import {useDispatch} from "react-redux";
import DotLoader from "react-spinners/DotLoader";
import {Link, useNavigate} from 'react-router-dom';

import {loaderColor} from "../../utils/variables";
import {loginUser} from "../../apiServices/userAuth";
import LoginInput from '../../components/inputs/loginInput';

const loginInfos = {
   email: '',
   password: ''
};

export default function LoginForm({setVisible}) {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [login, setLogin] = useState(loginInfos);
   const {email, password} = login;
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [loading, setLoading] = useState(false);

   const loginValidation = Yup.object({
      email: Yup.string().required('Email is required').email('Email must be a valid email'),
      password: Yup.string().required('Password is required'),
   })

   const handleLoginChange = (e) => {
      const {name, value} = e.target;
      setLogin({...login, [name]: value});
   };

   const handleLoginSubmit = async () => {
      try {
         setLoading(true)
         const data = await loginUser({email, password});
         dispatch({type: "LOGIN", payload: data});
         Cookies.set("user", JSON.stringify(data));
         navigate("/");
      } catch (error) {
         setLoading(false);
         setError(error.response.data.message);
      }
   }

   return (
      <div className='login_wrap'>
         <div className='login_1'>
            <img src='../../icons/facebook.svg' alt='facebook_logo'/>
            <span>
               Facebook helps you to connect and share with the people in your life.
            </span>
         </div>
         <div className='login_2'>
            <div className='login_2_wrap'>
               <Formik enableReinitialize initialValues={{email, password}} validationSchema={loginValidation}
                       onSubmit={handleLoginSubmit}>
                  {
                     (formik) => (
                        <Form>
                           <LoginInput type='text' name='email' placeholder='Email address'
                                       onChange={handleLoginChange}/>
                           <LoginInput type='password' name='password' placeholder='Password'
                                       onChange={handleLoginChange} bottom/>
                           <button type='submit' className='blue_btn'>Log In</button>
                        </Form>
                     )
                  }
               </Formik>
               <DotLoader color={loaderColor} loading={loading} size={30} aria-label="Loading Spinner"
                          data-testid="loader"/>
               {error && <div className="error_text">{error}</div>}
               <Link to='/reset-password' className='forget_password'>Forget password?</Link>
               <div className='sign_splitter'></div>
               <button className='blue_btn open_signup' onClick={() => setVisible(true)}>Create Account</button>
            </div>
            <Link to='/' className='sign_extra'>
               <b>Create a Page</b> for celebraty, brand or business
            </Link>
         </div>
      </div>
   )
}
