import {useState} from 'react';

const UpdateProfilePicture = ({setImage}) => {
   const [description, setDescription] = useState("");

   const handleDesc = (e) => {
      setDescription(e.target.value);
   }

   return (
      <div className="post_box update_image">
         <div className="box_header">
            <div className="small_circle" onClick={() => setImage([])}>
               <i className="exit_icon"></i>
            </div>
            <span>Update profile picture</span>
         </div>
         <div className="update_image_desc">
            <textarea value={description} onChange={handleDesc} placeholder="Description..."
                      className="textarea_blue details_input"></textarea>
         </div>
         <div className="update_center">
            <div className="cropper"></div>
         </div>
      </div>
   );
};

export default UpdateProfilePicture;