import {Dots} from "../../svg";
import {stories} from "../../data/home";
import AddFriendSmallCard from "./AddFriendSmallCard";


const PeopleYouMayKnow = () => {
   return (
      <div className="people_you_may_know">
         <div className="people_you_may_know_header">
            People You May Know
            <div className="post_header_right ppl_circle hover1">
               <Dots/>
            </div>
         </div>
         <div className="people_you_may_know_list">
            {
               stories.map((item, i) => (
                  <AddFriendSmallCard item={item} key={i}/>
               ))
            }
         </div>
      </div>
   );
};

export default PeopleYouMayKnow;