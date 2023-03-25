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