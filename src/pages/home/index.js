import "./style.css";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import SendVerificationEmail from "../../components/home/sendVerificationEmail";

export default function Home({user, setCreatePostVisibility}) {
   // const {user} = useSelector((state) => ({...state}));

   return (
      <div className="home">
         <Header/>
         <LeftHome user={user}/>
         <div className="home_middle">
            <Stories/>
            {
               !user.verified && <SendVerificationEmail user={user}/>
            }
            <CreatePost user={user} setCreatePostVisibility={setCreatePostVisibility}/>
         </div>
         <RightHome user={user}/>
      </div>
   )
}
