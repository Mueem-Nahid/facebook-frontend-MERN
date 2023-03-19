import TextareaWithEmojiPicker from "./TextareaWithEmojiPicker";


const ImagePreview = ({text, setText}) => {

   return (
      <div className="overflow_a">
         <TextareaWithEmojiPicker text={text} setText={setText} type2/>
      </div>
   );
};

export default ImagePreview;