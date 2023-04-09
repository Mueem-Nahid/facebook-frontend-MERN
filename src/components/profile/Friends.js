const Friends = ({friends}) => {

   return (
      <div className="profile_card">
         <div className="profile_card_header">
            Friends
            <div className="profile_header_link">See all friends</div>
         </div>
         <div className="profile_card_count">
            {
               friends?.length === 0 ? "" :
                  friends?.length === 1 ? "1 friends" :
                     `${friends?.length} friends`
            }
         </div>
         <div className="profile_card_grid">
            {
               friends &&
               friends.slice(0, 9).map((friend) => (
                  <div className="profile_photo_card">
                  </div>
               ))
            }
         </div>
      </div>
   );
};

export default Friends;