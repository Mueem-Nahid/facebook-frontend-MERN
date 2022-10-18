import { Link } from 'react-router-dom'

export default function LoginFooter() {
   return (
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
   )
}
