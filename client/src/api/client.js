import client from './client';

//Login
export const login = ({userId, password}) => 
    client.post('/api/auth/login', { userId, password });

//Register
export const register = ({ userId, password, username, emailAddress, birthday, homeAddress, phoneNumber, cellphoneNumber }) =>
    client.post('/api/auth/register', { userId, password, username, emailAddress, birthday, homeAddress, phoneNumber, cellphoneNumber });

//Check Login State
export const check = () => client.get('/api/auth/check');

//Logout
export const logout = () => client.post('/api/auth/logout');