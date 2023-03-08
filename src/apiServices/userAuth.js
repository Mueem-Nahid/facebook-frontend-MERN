import API from '../utils/request';

export const loginUser = async ({email, password}) => {
   const response = await API.post('/login', {email, password});
   return response.data;
};

export const registerUser = async ({first_name, last_name, email, password, bYear, bMonth, bDay, gender}) => {
   const response = await API.post('/register', {first_name, last_name, email, password, bYear, bMonth, bDay, gender});
   return response.data;
}

export const sendVerificationEmail = async (token) => {
   const response = await API.post('/sendVerificationEmail', {}, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return response.data;
}