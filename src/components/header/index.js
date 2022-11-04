import {Link} from "react-router-dom";

import "./style.css";
import {Logo, Search} from "../../svg";
import {searchbarColor} from "../../utils/variables";

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
         <div className="header_middle"></div>
         <div className="header_right"></div>
      </header>
   );
};

export default Header;