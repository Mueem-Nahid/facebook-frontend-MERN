import "./style.css";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import SendVerificationEmail from "../../components/home/sendVerificationEmail";
import Post from "../../components/post";

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
            <div className="posts">
               {
                  posts.length > 0 && posts.map((post) => (
                     <Post key={post._id} post={post}/>
                  ))
               }
            </div>
         </div>
         <RightHome user={user}/>
      </div>
   )
}
