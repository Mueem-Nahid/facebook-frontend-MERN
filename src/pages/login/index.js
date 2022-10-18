import LoginFooter from '../../components/login/LoginFooter'
import LoginForm from '../../components/login/LoginForm'
import RegisterForm from '../../components/login/RegisterForm'
import './style.css'

export default function Login() {
   return (
      <div className='login'>
         <div className='login_wrapper'>
            <LoginForm />
            <RegisterForm />
            <LoginFooter />
         </div>
      </div>
   )
}
