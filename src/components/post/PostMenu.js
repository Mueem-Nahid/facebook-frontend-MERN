import {useRef, useState} from "react";

import MenuItem from "./MenuItem";
import useClickOutside from "../../hooks/useClickOutside";


const PostMenu = ({userId, postUserId, imageLength, setShowMenu}) => {
   const [itemVisibility, setItemVisibility] = useState(postUserId === userId);
   const menuRef = useRef(null);

   useClickOutside(menuRef, () => setShowMenu(false));

   return (
      <div className="post_menu" ref={menuRef}>
         {
            itemVisibility && <MenuItem icon="pin_icon" title="Pin Post"/>
         }
         <MenuItem icon="save_icon" title="Save Post" subtitle="Add this to your saved items."/>
         <div className="line"></div>
         {
            itemVisibility && <MenuItem icon="edit_icon" title="Edit Post"/>
         }
         {
            !itemVisibility && <MenuItem icon="turnOnNotification_icon" title="Turn On Notification"/>
         }
         {
            imageLength && <MenuItem icon="download_icon" title="Download"/>
         }
         {
            imageLength && <MenuItem icon="fullscreen_icon" title="Enter Fullscreen"/>
         }
         {
            itemVisibility && <MenuItem img="../../../icons/lock.png" title="Edit Audience"/>
         }
         {
            itemVisibility && <MenuItem icon="turnOffNotifications_icon" title="Turn Off Notification"/>
         }
         {
            itemVisibility && <MenuItem icon="delete_icon" title="Turn Off Translation"/>
         }
         {
            itemVisibility && <MenuItem icon="date_icon" title="Edit Date"/>
         }
         {
            itemVisibility && <MenuItem icon="refresh_icon" title="Refresh Attachment"/>
         }
         {
            itemVisibility && <MenuItem icon="archive_icon" title="Move To Archive"/>
         }
         {
            itemVisibility && <MenuItem icon="trash_icon" title="Move To Trash"
                                        subtitle="Items in your trash will be deleted after 30 days."/>
         }
         {!itemVisibility && <div className="line"></div>}
         {
            !itemVisibility && <MenuItem img="../../../icons/report.png" title="Report Post"
                                         subtitle="I am concerned about this post."/>
         }
      </div>
   );
};

export default PostMenu;