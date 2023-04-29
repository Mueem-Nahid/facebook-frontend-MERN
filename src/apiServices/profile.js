import API from "../utils/request";

export const getProfile = async (username, token) => {
   const response = await API.get(`/getProfile/${username}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      },
   );
   return response.data;
};

export const getPhotos = async (payload, token) => {
   const response = await API.post(`/listImages`, payload, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      },
   );
   return response.data;
};

export const updateProfilePicture = async (url, token) => {
   const response = await API.patch('/updateProfilePicture',
      {url}, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
   return response.data;
};

export const updateCoverPicture = async (url, token) => {
   const response = await API.patch('/updateCover',
      {url}, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
   return response.data;
};