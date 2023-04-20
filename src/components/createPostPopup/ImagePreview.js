import {useRef} from "react";

import {handleImages, handleOpenInput} from "../../utils/utils";
import TextareaWithEmojiPicker from "./TextareaWithEmojiPicker";

const ImagePreview = ({text, setText, images, setImages, setShowPrev, setError}) => {
   const imageInputRef = useRef(null);

   const handleRemoveAllImages = () => {
      setImages([]);
   }

   const handlePostImages = (e) => {
      handleImages(e, setError, setImages);
   }

   return (
      <div className="overflow_a scrollbar">
         <TextareaWithEmojiPicker text={text} setText={setText} type2/>
         <div className="add_pictures_wrap">
            <input type="file" accept="image/jpeg, image/png, image/webp, image/gif" multiple hidden ref={imageInputRef}
                   onChange={handlePostImages}/>
            {
               images && images.length ?
                  <div className="add_pics_inside_1 p_0">
                     <div className="preview_actions">
                        <button className="hover1">
                           <i className="edit_icon"></i>
                           <span>Edit</span>
                        </button>
                        <button className="hover1" onClick={() => handleOpenInput(imageInputRef)}>
                           <i className="addPhoto_icon"></i>
                           <span>Add</span>
                        </button>
                     </div>
                     <div className="small_white_circle" onClick={handleRemoveAllImages}>
                        <i className="exit_icon"></i>
                     </div>
                     <div className={
                        images.length === 1 ? "preview_1" :
                           images.length === 2 ? "preview_2" :
                              images.length === 3 ? "preview_3" :
                                 images.length === 4 ? "preview_4" :
                                    images.length === 5 ? "preview_5" :
                                       images.length % 2 === 0 ? "preview_6" :
                                          "preview_6 singular_grid"
                     }>
                        {
                           images.map((img, i) => (
                              <img src={img} key={i} alt={`image_${i}`}/>
                           ))
                        }
                     </div>
                  </div>
                  :
                  <div className="add_pics_inside_1">
                     <div className="small_white_circle" onClick={() => setShowPrev(false)}>
                        <i className="exit_icon"></i>
                     </div>
                     <div className="add_col" onClick={() => handleOpenInput(imageInputRef)}>
                        <div className="add_circle">
                           <i className="addPhoto_icon"></i>
                        </div>
                        <span>Add Photos/Videos</span>
                        <span>or drag and drop</span>
                     </div>
                  </div>
            }
            <div className="add_pics_inside_2">
               <div className="add_circle">
                  <i className="phone_icon"></i>
               </div>
               <div className="mobile_text">Add photos from your mobile device.</div>
               <span className="add_phone_btn">Add</span>
            </div>
         </div>
      </div>
   );
};

export default ImagePreview;