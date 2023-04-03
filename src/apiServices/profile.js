import API from "../utils/request";

export const getProfile = async (username,token) => {
   const response = await API.get(`/getProfile/${username}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      },
   );
   return response.data;
};