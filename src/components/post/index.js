import {useState} from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";

import "./style.css";
import PostMenu from "./PostMenu";
import {Dots, Public} from "../../svg";
import ReactsPopup from "./ReactsPopup";
import CreateComment from "./CreateComment";
import {dotsIconColor, publicIconColor} from "../../utils/constants";


const Post = ({post, user, profile}) => {
   const [visible, setVisible] = useState(false);
   const [showMenu, setShowMenu] = useState(false);

   const handleReactsPopup = (show) => {
      setTimeout(() => {
         show ? setVisible(true) : setVisible(false);
      }, 500)
   }

   return (
      <div className="post" style={{width: `${profile && "100%"}`}}>
         <div className="post_header">
            <Link to={`/profile/${post?.user?.username}`} className="post_header_left ">
               <img src={post?.user?.picture} alt=""/>
               <div className="header_col">
                  <div className="post_profile_name">
                     {post?.user?.first_name} {post?.user?.last_name}
                     <div className="updated_picture">
                        {post?.type === "profilePicture" &&
                           `updated ${post?.user?.gender === "male" ? "his" : "her"} profile picture`
                        }
                        {post?.type === "coverPhoto" &&
                           `updated ${post?.user?.gender === "male" ? "his" : "her"} cover photo`
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
            <div className="post_header_right hover1" onClick={() => setShowMenu(prev => !prev)}>
               <Dots color={dotsIconColor}/>
            </div>
         </div>
         {
            post?.background ?
               <div className="post_bg" style={{backgroundImage: `url(${post?.background})`}}>
                  <div className="post_bg_text">{post?.text}</div>
               </div> :
               <>
                  <div className="post_text">
                     {post?.text}
                  </div>
                  {
                     post.images && post.images.length &&
                     <div className={
                        post.images.length === 1 ? "grid_1"
                           : post.images.length === 2 ? "grid_2"
                              : post.images.length === 3 ? "grid_3"
                                 : post.images.length === 4 ? "grid_4"
                                    : post.images.length >= 5 && "grid_5"
                     }>
                        {
                           post.images.slice(0, 5).map((image, i) => (
                              <img src={image.url} key={i} alt="" className={`img-${i}`}/>
                           ))
                        }
                        {
                           post.images.length > 5 && <div className="more-pics-shadow">+{post.images.length - 5}</div>
                        }
                     </div>
                  }
               </>
         }
         <div className="post_infos">
            <div className="reacts_count">
               <div className="reacts_count_images"></div>
               <div className="reacts_count_numbers"></div>
            </div>
            <div className="to_right">
               <div className="comments_count">13 comments</div>
               <div className="share_count">1 share</div>
            </div>
         </div>
         <div className="post_actions">
            <ReactsPopup visible={visible} handleReactsPopup={handleReactsPopup}/>
            <div className="post_action hover1" onMouseOver={() => handleReactsPopup(true)}
                 onMouseLeave={() => handleReactsPopup(false)}>
               <i className="like_icon"></i>
               <span>Like</span>
            </div>
            <div className="post_action hover1">
               <i className="comment_icon"></i>
               <span>Comments</span>
            </div>
            <div className="post_action hover1">
               <i className="share_icon"></i>
               <span>Share</span>
            </div>
         </div>
         <div className="comments_wrap">
            <div className="comments_order"></div>
            <CreateComment user={user}/>
         </div>
         {
            showMenu && <PostMenu userId={user?.id} postUserId={post?.user?._id} imageLength={post?.images?.length}
                                  setShowMenu={setShowMenu}/>
         }
      </div>
   );
};

export default Post;