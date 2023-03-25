import API from "../utils/request";

export const createPost = async (type, background, text, images, userid, token) => {
   const response = await API.post('/createPost',
      {type, background, text, images, userid}, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
   return response.data;
}