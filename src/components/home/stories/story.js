import React from 'react';

const Story = ({story}) => {
   return (
      <div className="story">
         <img className="story_img" src={story.image} alt={story.profile_name}/>
         <div className="story_profile_pic">
            <img src={story.profile_picture} alt={story.profile_name}/>
         </div>
         <div className="story_profile_name">
            {story.profile_name}
         </div>
      </div>
   );
};

export default Story;