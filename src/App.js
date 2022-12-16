import {Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/activate";

function App() {
   return (
      <Routes>
         <Route element={<LoggedInRoutes/>}>
            <Route path="/profile" element={<Profile/>} exact/>
            <Route path="/" element={<Home/>} exact/>
            <Route path="/activate/:token" element={<Activate/>} exact/>
         </Route>
         <Route element={<NotLoggedInRoutes/>}>
            <Route path="/login" element={<Login/>} exact/>
         </Route>
      </Routes>
   );
}

export default App;
