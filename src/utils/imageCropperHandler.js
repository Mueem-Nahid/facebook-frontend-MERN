import getCroppedImage from "../utils/getCroppedImage";

async function getCroppedImageHandler(image, croppedAreaPixels) {
   try {
      const img = await getCroppedImage(image, croppedAreaPixels);
      return img;
   } catch (error) {
      throw new Error(error);
   }
}

function handleImageCrop(image, croppedAreaPixels, setZoom, setCrop, setImage, setError, showCroppedImage = false) {
   try {
      const img = getCroppedImageHandler(image, croppedAreaPixels);
      if (showCroppedImage) {
         setZoom(1);
         setCrop({x: 0, y: 0});
         setImage(img);
      } else {
         return img;
      }
   } catch (error) {
      setError(error);
      console.log("Error getting cropped image: ", error);
   }
}

export default handleImageCrop;
