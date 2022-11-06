import {useEffect, useRef, useState} from "react";

import {Return, Search} from "../../svg";
import {searchbarColor} from "../../utils/variables";
import useClickOutside from "../../hooks/useClickOutside";

const SearchMenu = ({setShowSearchMenu}) => {
   const menu = useRef(null);
   const input = useRef(null);
   const [iconVisible, setIconVisible] = useState(true);

   useClickOutside(menu, () => {
      setShowSearchMenu(false);
   });

   useEffect(() => {
      input.current.focus();
   }, []);

   return (
      <div className="header_left search_area scrollbar" ref={menu}>
         <div className="header_left search_wrap">
            <div className="header_logo">
               <div className="circle hover1" onClick={() => setShowSearchMenu(false)}>
                  <Return color={searchbarColor}/>
               </div>
            </div>
            <div className="search" onClick={() => input.current.focus()}>
               {
                  iconVisible &&
                  <div>
                     <Search color={searchbarColor}/>
                  </div>
               }
               <input type="text" placeholder="Search Facebook" ref={input} onFocus={() => setIconVisible(false)}
                      onBlur={() => setIconVisible(true)}/>
            </div>
         </div>
         <div className="search_history_header">
            <span className="">Recent searches</span>
            <a>Edit</a>
         </div>
         <div className="search_history"></div>
         <div className="search_results scrollbar"></div>
      </div>
   );
};

export default SearchMenu;