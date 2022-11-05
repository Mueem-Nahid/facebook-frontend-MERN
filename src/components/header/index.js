import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import "./style.css";
import {searchbarColor} from "../../utils/variables";
import {
   ArrowDown,
   Friends,
   Gaming,
   HomeActive,
   Logo,
   Market,
   Menu,
   Messenger,
   Notifications,
   Search,
   Watch
} from "../../svg";

const Header = () => {
   const {user} = useSelector((user) => ({...user}));
   console.log(user);

   return (
      <header>
         <div className="header_left">
            <Link to="/" className="header_logo">
               <div className="circle">
                  <Logo/>
               </div>
            </Link>
            <div className="search search1">
               <Search color={searchbarColor}/>
               <input type="text" placeholder="Search Facebook" className="hide_input"/>
            </div>
         </div>
         <div className="header_middle">
            <Link to="/" className="middle_icon active">
               <HomeActive/>
            </Link>
            <Link to="/" className="middle_icon hover1">
               <Friends color={searchbarColor}/>
            </Link>
            <Link to="/" className="middle_icon hover1">
               <Watch color={searchbarColor}/>
               <div className="middle_notification">9+</div>
            </Link>
            <Link to="/" className="middle_icon hover1">
               <Market color={searchbarColor}/>
            </Link>
            <Link to="/" className="middle_icon hover1">
               <Gaming color={searchbarColor}/>
            </Link>
         </div>
         <div className="header_right">
            <Link to="/profile" className="profile_link hover1">
               <img src={user?.picture} alt=""/>
               <span>{user?.first_name}</span>
            </Link>
            <div className="circle_icon hover1">
               <Menu/>
            </div>
            <div className="circle_icon hover1">
               <Messenger/>
            </div>
            <div className="circle_icon hover1">
               <Notifications/>
               <div className="right_notification">3</div>
            </div>
            <div className="circle_icon hover1">
               <ArrowDown/>
            </div>
         </div>
      </header>
   );
};

export default Header;