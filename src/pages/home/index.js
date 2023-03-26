import "./style.css";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import SendVerificationEmail from "../../components/home/sendVerificationEmail";

export default function Home({user, posts, setCreatePostVisibility}) {

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
            {
               posts.length > 0 && posts.map((post) => (
                  <div className="post" key={post._id}>
                     {post._id}
                  </div>
               ))
            }
         </div>
         <RightHome user={user}/>
      </div>
   )
}
