import {useEffect, useRef, useState} from "react";

import "./style.css";
import Post from "../../components/post";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import SendVerificationEmail from "../../components/home/sendVerificationEmail";

export default function Home({user, posts, setCreatePostVisibility}) {
   const middle = useRef(null);
   const [height, setHeight] = useState();

   useEffect(() => {
      setHeight(middle.current.clientHeight); // get the height of an element
   }, [middle?.current?.clientHeight]);

   return (
      <div className="home" style={{height: `${height + 150}px`}}>
         <Header/>
         <LeftHome user={user}/>
         <div className="home_middle" ref={middle}>
            <Stories/>
            {
               !user.verified && <SendVerificationEmail user={user}/>
            }
            <CreatePost user={user} setCreatePostVisibility={setCreatePostVisibility}/>
            <div className="posts">
               {
                  posts.length > 0 && posts.map((post) => (
                     <Post key={post._id} post={post} user={user}/>
                  ))
               }
            </div>
         </div>
         <RightHome user={user}/>
      </div>
   )
}
