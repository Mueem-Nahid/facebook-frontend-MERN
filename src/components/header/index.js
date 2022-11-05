import {Link} from "react-router-dom";

import "./style.css";
import {searchbarColor} from "../../utils/variables";
import {Friends, Gaming, HomeActive, Logo, Market, Search, Watch} from "../../svg";

const Header = () => {
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
         <div className="header_right"></div>
      </header>
   );
};

export default Header;