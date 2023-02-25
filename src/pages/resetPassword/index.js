import {useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import "./style.css";
import useLogout from "../../hooks/useLogout";
import LoginFooter from "../../components/login/LoginFooter";
import SendEmail from "../../components/resetPassword/SendEmail";
import SearchAccount from "../../components/resetPassword/SearchAccount";
import ChangePassword from "../../components/resetPassword/ChangePassword";
import CodeVerification from "../../components/resetPassword/CodeVerification";


const ResetPassword = () => {
   const {user} = useSelector((state) => ({...state}));
   const logout = useLogout();
   const [email, setEmail] = useState("");
   const [code, setCode] = useState("");
   const [error, setError] = useState("");
   const [visible, setVisible] = useState(0);
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [userInfo, setUserInfo] = useState("");

   return (
      <div className="reset">
         <div className="reset_header">
            <img src="../../../icons/facebook.svg" alt="logo"/>
            {
               user ? (
                  <div className="right_reset">
                     <Link to="/profile">
                        <img src={user?.picture} alt="user"/>
                     </Link>
                     <button className="blue_btn" onClick={logout}>Logout</button>
                  </div>
               ) : (
                  <Link to="/login" className="right_reset">
                     <button className="blue_btn">Login</button>
                  </Link>
               )
            }
         </div>
         <div className="reset_wrap">
            {
               visible === 0 && <SearchAccount email={email} setEmail={setEmail} error={error} setLoading={setLoading}
                                               setError={setError} setUserInfo={setUserInfo} setVisible={setVisible}/>
            }
            {
               visible === 1 && userInfo && <SendEmail userInfo={userInfo}/>
            }
            {
               visible === 2 && <CodeVerification code={code} setCode={setCode} error={error}/>
            }
            {
               visible === 3 &&
               <ChangePassword password={password} confirmPassword={confirmPassword} setPassword={setPassword}
                               setConfirmPassword={setConfirmPassword} error={error}/>
            }
         </div>
         <LoginFooter/>
      </div>
   );
};

export default ResetPassword;