import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function useLogout() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   return () => {
      Cookies.set("user", "");
      dispatch({type: "LOGOUT"});
      navigate("/login");
   }
}