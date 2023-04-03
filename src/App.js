import {useSelector} from "react-redux";
import {useEffect, useReducer, useState} from "react";
import {Routes, Route} from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import {getPosts} from "./apiServices/post";
import Activate from "./pages/home/activate";
import ResetPassword from "./pages/resetPassword";
import {postsReducer} from "./reducers/postsReducer";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import CreatePostPopup from "./components/createPostPopup";


function App() {
   const {user} = useSelector((state) => ({...state}));
   const [createPostVisibility, setCreatePostVisibility] = useState(false);

   const [{loading, error, posts}, dispatch] = useReducer(postsReducer, {
      loading: false,
      posts: [],
      error: "",
   });

   const getAllPosts = async () => {
      try {
         dispatch({
            type: "POSTS_REQUEST",
         });
         const {data} = await getPosts(user.token);
         dispatch({
            type: "POSTS_SUCCESS",
            payload: data,
         });
      } catch (error) {
         dispatch({
            type: "POSTS_ERROR",
            payload: error.response.data.message,
         })
      }
   };

   useEffect(() => {
      user && getAllPosts();
   }, [user])

   return (
      <div>
         {user && createPostVisibility &&
            <CreatePostPopup user={user} setCreatePostVisibility={setCreatePostVisibility}/>}
         <Routes>
            <Route element={<LoggedInRoutes/>}>
               <Route path="/profile" element={<Profile/>} exact/>
               <Route path="/profile/:username" element={<Profile/>} exact/>
               <Route path="/" element={<Home user={user} posts={posts}
                                              setCreatePostVisibility={setCreatePostVisibility}/>} exact/>
               <Route path="/activate/:token" element={<Activate/>} exact/>
            </Route>
            <Route element={<NotLoggedInRoutes/>}>
               <Route path="/login" element={<Login/>} exact/>
            </Route>
            <Route path="reset-password" element={<ResetPassword/>}/>
         </Routes>
      </div>
   );
}

export default App;
