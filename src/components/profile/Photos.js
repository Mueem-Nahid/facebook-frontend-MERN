import {useEffect, useReducer} from 'react';

import {getPhotos} from "../../apiServices/profile";
import {photosReducer} from "../../reducers/photosReducer";

const Photos = ({username, token}) => {
   const path = `${username}/*`;
   const max = 30;
   const sort = "desc";

   const [{loading, error, photos}, dispatch] = useReducer(photosReducer, {
      loading: false,
      photos: {},
      error: "",
   });

   const fetchUserPhotos = async () => {
      try {
         dispatch({
            type: "PHOTOS_REQUEST",
         });
         const {data} = await getPhotos({path, max, sort}, token);
         dispatch({
            type: "PHOTOS_SUCCESS",
            payload: data,
         });
      } catch (error) {
         dispatch({
            type: "PHOTOS_ERROR",
            payload: error.response.data.message,
         })
      }
   };

   useEffect(() => {
      fetchUserPhotos();
   }, [username]);

   return (
      <div className="profile_card">
         <div className="profile_card_header">
            Photos
            <div className="profile_header_link">See all photos</div>
         </div>
         <div className="profile_card_count">
            {
               photos.total_count === 0 ? "" :
                  photos.total_count === 1 ? "1 photo" :
                     `${photos.total_count} photos`
            }
         </div>
         <div className="profile_card_grid">
            {
               photos.resources && photos.resources.length &&
               photos.resources.slice(0, 9).map((img) => (
                  <div className="profile_photo_card" key={img?.public_id}>
                     <img src={img?.secure_url} alt=""/>
                  </div>
               ))
            }
         </div>
      </div>
   );
};

export default Photos;