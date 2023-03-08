import API from '../utils/request';

export const loginUser = async (payload) => {
   const response = await API.post('/login', payload);
   return response.data;
};

export const registerUser = async (payload) => {
   const response = await API.post('/register', payload);
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

export const activateAccount = async (token) => {
   const response = await API.post('/activate', {token}, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return response.data;
}

export const findUser = async (email) => {
   const response = await API.post('findUser', email);
   return response.data;
}

export const sendResetPasswordCode = async (email) => {
   const response = await API.post('/sendResetPasswordCode', email);
   return response.data;
}