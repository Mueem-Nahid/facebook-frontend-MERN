import LoginFooter from '../../components/login/LoginFooter'
import LoginForm from '../../components/login/LoginForm'
import './style.css'

export default function Login() {
   return (
      <div className='login'>
         <div className='login_wrapper'>
            <LoginForm />
            <div className='register'></div>
            <LoginFooter />
         </div>
      </div>
   )
}
