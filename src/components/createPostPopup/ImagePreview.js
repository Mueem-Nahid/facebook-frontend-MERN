import {useRef} from "react";

import TextareaWithEmojiPicker from "./TextareaWithEmojiPicker";


const ImagePreview = ({text, setText, images, setImages}) => {
   const imageInputRef = useRef(null);

   const handleImages = () => {

   }

   return (
      <div className="overflow_a">
         <TextareaWithEmojiPicker text={text} setText={setText} type2/>
         <div className="add_pictures_wrap">
            <input type="file" multiple hidden ref={imageInputRef} onChange={handleImages}/>
            {
               images && images.length ? "" :
                  <div className="add_pics_inside_1">
                     <div className="small_white_circle">
                        <i className="exit_icon"></i>
                     </div>
                     <div className="add_col">
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