import Moment from "react-moment";
import {Link} from "react-router-dom";

import "./style.css";
import {Dots, Public} from "../../svg";
import {dotsIconColor, publicIconColor} from "../../utils/constants";


const Post = ({post}) => {
   console.log(post)
   return (
      <div className="post">
         <div className="post_header">
            <Link to={`/profile/${post?.user?.username}`} className="post_header_left ">
               <img src={post?.user?.picture} alt=""/>
               <div className="header_col">
                  <div className="post_profile_name">
                     {post?.user?.first_name} {post?.user?.last_name}
                     <div className="updated_picture">
                        {post?.type === "profilePicture" &&
                           `upated ${post?.user?.gender === "male" ? "his" : "her"} profile picture`
                        }
                        {post?.type === "profilePicture" &&
                           `upated ${post?.user?.gender === "male" ? "his" : "her"} cover picture`
                        }
                     </div>
                  </div>
                  <div className="post_profile_privacy_date">
                     <Moment fromNow interval={60}>
                        {post?.createdAt}
                     </Moment>
                     . <Public color={publicIconColor}/>
                  </div>
               </div>
            </Link>
            <div className="post_header_right hover1">
               <Dots color={dotsIconColor}/>
            </div>
         </div>
      </div>
   );
};

export default Post;