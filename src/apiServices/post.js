import API from "../utils/request";

export const createPost = async (type, background, text, images, user, token) => {
   const response = await API.post('/createPost',
      {type, background, text, images, user}, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
   return response.data;
}

export const uploadImages = async (formData, path, token) => {
   const response = await API.post('/uploadImages', formData, {
      headers: {
         Authorization: `Bearer ${token}`,
         "content-type": "multipart/form-data",
      },
   });
   return response?.data?.data?.images;
}