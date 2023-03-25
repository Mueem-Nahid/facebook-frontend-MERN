import {useState} from "react";
import {useSelector} from "react-redux";
import {Routes, Route} from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Activate from "./pages/home/activate";
import ResetPassword from "./pages/resetPassword";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import CreatePostPopup from "./components/createPostPopup";

function App() {
   const {user} = useSelector((state) => ({...state}));
   const [createPostVisibility, setCreatePostVisibility] = useState(false);

   return (
      <div>
         {user && createPostVisibility &&
            <CreatePostPopup user={user} setCreatePostVisibility={setCreatePostVisibility}/>}
         <Routes>
            <Route element={<LoggedInRoutes/>}>
               <Route path="/profile" element={<Profile/>} exact/>
               <Route path="/" element={<Home user={user}
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
