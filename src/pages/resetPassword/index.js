import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import "./style.css";
import useLogout from "../../hooks/useLogout";

const ResetPassword = () => {
   const {user} = useSelector((state) => ({...state}));
   const logout = useLogout();

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
      </div>
   );
};

export default ResetPassword;