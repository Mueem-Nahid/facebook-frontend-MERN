import "./style.css";
import Contact from "./Contact";
import {Dots, NewRoom, Search} from "../../../svg";
import {searchbarColor} from "../../../utils/variables";

const RightHome = ({user}) => {
   return (
      <div className="right_home">
         <div className="heading">Sponsored</div>
         <div className="splitter1"></div>
         <div className="contacts_wrap">
            <div className="contacts_header">
               <div className="contacts_header_left">Contacts</div>
               <div className="contacts_header_right">
                  <div className="contact_circle hover1">
                     <NewRoom color={searchbarColor}/>
                  </div>
                  <div className="contact_circle hover1">
                     <Search color={searchbarColor}/>
                  </div>
                  <div className="contact_circle hover1">
                     <Dots color={searchbarColor}/>
                  </div>
               </div>
            </div>
            <div className="contacts_list">
               <Contact user={user}/>
            </div>
         </div>

      </div>
   );
};

export default RightHome;