import {useCallback} from 'react';
import getCroppedImage from "../utils/getCroppedImage";

export const UseImageCropperHandler = useCallback(async (image, croppedAreaPixels, setZoom, setCrop, setImage, setError, showCroppedImage = false) => {
   try {
      const img = await getCroppedImage(image, croppedAreaPixels);
      if (showCroppedImage) {
         setZoom(1);
         setCrop({x: 0, y: 0});
         setImage(img);
      } else {
         return img;
      }
   } catch (error) {
      setError(error);
      console.log("Error getting cropped image: ", error)
   }
}, [croppedAreaPixels]);


export default UseImageCropperHandler;