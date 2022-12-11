import {useSelector} from "react-redux";

import "./style.css";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";

export default function Home() {
   const {user} = useSelector((state) => ({...state}));

   return (
      <div className="home">
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
