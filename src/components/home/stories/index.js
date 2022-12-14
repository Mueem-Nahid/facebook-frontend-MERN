import "./style.css";
import Story from "./story";
import {stories} from "../../../data/home";
import {ArrowRight, Plus} from "../../../svg";
import {searchbarColor} from "../../../utils/variables";
import useMediaQueryVariables from "../../../hooks/useMediaQueryVariables";

const Stories = () => {
   const {view4, view5, view6, view7} = useMediaQueryVariables();
   const max = view7 ? 5 : view6 ? 4 : view5 ? 5 : view4 ? 4 : stories.length;

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
            stories.slice(0, max).map((story, i) => (
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