import "./style.css";
import Story from "./story";
import {stories} from "../../../data/home";
import {ArrowRight, Plus} from "../../../svg";
import {searchbarColor} from "../../../utils/variables";

const Stories = () => {
   return (
      <div className="stories">
         <div className="create_story_card">
            <img className="create_story_img" src="../../../images/default_pic.png" alt="create_story"/>
            <div className="plus_story">
               <Plus color="#fff"/>
            </div>
            <div className="create_story_text">Create story</div>
         </div>
         {
            stories.map((story, i) => (
               <Story key={i} story={story}/>
            ))
         }
         <div className="white_circle">
            <ArrowRight color={searchbarColor}/>
         </div>
      </div>
   );
};

export default Stories;