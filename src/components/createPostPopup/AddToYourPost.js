import {Dots, Feeling, Photo} from "../../svg";
import {dotsIconColor, feelingIconColor, photoIconColor, photoIconDisabled} from "../../utils/constants";

const AddToYourPost = ({setShowPrev, background}) => {
   return (
      <div className="add_to_your_post">
         <div className="add_to_your_post_text">Add to your post</div>
         {
            background ?
               <div className="post_header_right hover1">
                  <Photo color={photoIconDisabled}/>
               </div> :
               <div className="post_header_right hover1" onClick={() => setShowPrev(true)}>
                  <Photo
                     color={photoIconColor}/>
               </div>
         }
         <div className="post_header_right hover1">
            <i className="tag_icon"></i>
         </div>
         <div className="post_header_right hover1">
            <Feeling color={feelingIconColor}/>
         </div>
         <div className="post_header_right hover1">
            <i className="maps_icon"></i>
         </div>
         <div className="post_header_right hover1">
            <i className="microphone_icon"></i>
         </div>
         <div className="post_header_right hover1">
            <Dots color={dotsIconColor}/>
         </div>

      </div>
   );
};

export default AddToYourPost;