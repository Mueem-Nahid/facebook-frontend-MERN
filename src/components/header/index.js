import {useRef, useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import {
   ArrowDown,
   Friends,
   Gaming, Home,
   HomeActive,
   Logo,
   Market,
   Menu,
   Messenger,
   Notifications,
   Search,
   Watch
} from "../../svg";
import "./style.css";
import Index from "./userMenu";
import AllMenu from "./AllMenu";
import SearchMenu from "./SearchMenu";
import {searchbarColor} from "../../utils/constants";
import useClickOutside from "../../hooks/useClickOutside";

const Header = ({page}) => {
   const {user} = useSelector((user) => ({...user}));
   const [showSearchMenu, setShowSearchMenu] = useState(false);
   const [showAllMenu, setShowAllMenu] = useState(false);
   const [showUserMenu, setShowUserMenu] = useState(false);
   const allMenu = useRef(null);
   const userMenu = useRef(null);

   useClickOutside(allMenu, () => {
      setShowAllMenu(false);
   })

   useClickOutside(userMenu, () => {
      setShowUserMenu(false);
   })

   return (
      <header>
         <div className="header_left">
            <Link to="/" className="header_logo">
               <div className="circle">
                  <Logo/>
               </div>
            </Link>
            <div className="search search1" onClick={() => setShowSearchMenu(true)}>
               <Search color={searchbarColor}/>
               <input type="text" placeholder="Search Facebook" className="hide_input"/>
            </div>
         </div>
         {
            showSearchMenu && <SearchMenu setShowSearchMenu={setShowSearchMenu}/>
         }
         <div className="header_middle">
            <Link to="/" className={`middle_icon ${page === 'home' ? 'active' : ''}`}>
               {
                  page === "home" ? <HomeActive/> : <Home color={searchbarColor}/>
               }
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
            <Link to="/profile" className={`profile_link hover1 ${page === 'profile' ? 'active_link' : ''}`}>
               <img src={user?.picture} alt=""/>
               <span>{user?.first_name}</span>
            </Link>
            <div className={`circle_icon hover1 ${showAllMenu && 'active_header'}`} ref={allMenu}>
               <div className="menu_icon" onClick={() => setShowAllMenu((prev) => !prev)}>
                  <Menu/>
               </div>
               {showAllMenu && <AllMenu/>}
            </div>
            <div className="circle_icon hover1">
               <Messenger/>
            </div>
            <div className="circle_icon hover1">
               <Notifications/>
               <div className="right_notification">3</div>
            </div>
            <div className={`circle_icon hover1 ${showUserMenu && 'active_header'}`} ref={userMenu}>
               <div className="menu_icon" onClick={() => setShowUserMenu((prev) => !prev)}>
                  <ArrowDown/>
               </div>
               {
                  showUserMenu && <Index user={user}/>
               }
            </div>
         </div>
      </header>
   );
};

export default Header;