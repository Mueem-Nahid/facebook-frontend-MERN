import API from '../utils/request';

export const loginUser = async ({email, password}) => {
   const response = await API.post('/login', {email, password});
   return response.data;
};