import {useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import "./style.css";
import useLogout from "../../hooks/useLogout";
import SearchAccount from "../../components/resetPassword/SearchAccount";
import SendEmail from "../../components/resetPassword/SendEmail";

const ResetPassword = () => {
   const {user} = useSelector((state) => ({...state}));
   const logout = useLogout();
   const [email, setEmail] = useState("");
   const [error, setError] = useState("");
   const [visible, setVisible] = useState(1);

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
               visible === 0 && <SearchAccount email={email} setEmail={setEmail} error={error}/>
            }
            {
               visible === 1 && <SendEmail/>
            }
         </div>
      </div>
   );
};

export default ResetPassword;