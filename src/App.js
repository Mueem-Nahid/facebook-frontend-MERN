import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";

function App() {
   return (
      <div className="App">
         <h1>Welcome to React Router!</h1>
         <Routes>
            <Route path="/login" element={<Login />} exact />
            <Route path="/profile" element={<Profile />} exact />
            <Route path="/" element={<Home />} exact />
         </Routes>
      </div>
   );
}

export default App;
