import "./style.css";
import {Feeling, LiveVideo, Photo} from "../../svg";

const CreatePost = ({user, setCreatePostVisibility, profile}) => {
   return (
      <div className="create_post">
         <div className="create_post_header">
            <img src={user?.picture} alt="user"/>
            <div className="open_post hover2" onClick={() => setCreatePostVisibility(true)}>
               <p>What's on your mind, {user?.first_name}?</p>
            </div>
         </div>
         <div className="create_splitter"></div>
         <div className="create_post_body">
            <div className="create_post_icon hover1">
               <LiveVideo color="#f3425f"/>
               Live Video
            </div>
            <div className="create_post_icon hover1">
               <Photo color="#4bbf67"/>
               Photo/Video
            </div>
            {
               profile ?
                  <div className="create_post_icon hover1">
                     <i className="lifeEvent_icon"></i>
                     Life Event
                  </div> :
                  <div className="create_post_icon hover1">
                     <Feeling color="#f7b920"/>
                     Feeling/Activity
                  </div>
            }
         </div>
      </div>
   );
};

export default CreatePost;