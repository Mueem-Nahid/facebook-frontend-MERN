import AllMenuItems from "./AllMenuItems";
import {menu, create} from "../../data/allMenu";

const AllMenu = () => {
   return (
      <div className="all_menu">
         <div className="all_menu_header">
            Menu
         </div>
         <div className="all_menu_wrap scrollbar">
            <div className="all_left">
               <div className="all_menu_search">
                  <i className="amm_s_ic"></i>
                  <input type="text" placeholder="Search Menu"/>
               </div>
               <div className="all_menu_group">
                  <div className="all_menu_group_header">Social</div>
                  {
                     menu.map((item, i) => (
                        <AllMenuItems key={i} name={item.name} description={item.description} icon={item.icon}/>
                     ))
                  }
               </div>
            </div>
         </div>
      </div>
   );
};

export default AllMenu;