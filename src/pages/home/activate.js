import {useState} from "react";
import {useSelector} from "react-redux";

import "./style.css";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import ActivateForm from "../../components/activateForm/ActivateForm";

export default function Activate() {
   const {user} = useSelector((state) => ({...state}));
   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(true);

   return (
      <div className="home">
         {
            success &&
            <ActivateForm type="success" header="Account verification succeeded !" text={success} loading={loading}/>
         }
         {
            error &&
            <ActivateForm type="error" header="Account verification failed !" text={error} loading={loading}/>
         }
         <Header/>
         <LeftHome user={user}/>
         <div className="home_middle">
            <Stories/>
            <CreatePost user={user}/>
         </div>
         <RightHome user={user}/>
      </div>
   )
}
