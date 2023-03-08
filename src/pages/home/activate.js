import Cookies from 'js-cookie';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import "./style.css";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import {activateAccount} from "../../apiServices/userAuth";
import ActivateForm from "../../components/activateForm/ActivateForm";

export default function Activate() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {user} = useSelector((state) => ({...state}));
   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(true);
   const {token} = useParams();

   const handleActivateAccount = async () => {
      try {
         setLoading(true);
         const data = await activateAccount(token);
         setSuccess(data?.message);

         // updating verification status into cookies & redux store
         Cookies.set("user", JSON.stringify({...user, verified: true}));
         dispatch({type: "VERIFY", payload: true});

         setTimeout(() => {
            navigate("/");
         }, 4000);

      } catch (error) {
         setError(error.response.data.message);
         setTimeout(() => {
            navigate("/");
         }, 4000);
      }
   };

   useEffect(() => {
      handleActivateAccount();
   }, []);

   return (<div className="home">
      {success &&
         <ActivateForm type="success" header="Account verification succeeded !" text={success} loading={loading}/>}
      {error && <ActivateForm type="error" header="Account verification failed !" text={error} loading={loading}/>}
      <Header/>
      <LeftHome user={user}/>
      <div className="home_middle">
         <Stories/>
         <CreatePost user={user}/>
      </div>
      <RightHome user={user}/>
   </div>)
}
