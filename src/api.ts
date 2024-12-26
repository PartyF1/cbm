import axios from 'axios';

export const fetchTemplates = async () => {
  const response = await axios.get('http://localhost:3000/templates');
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post('http://localhost:3000/users', { email, password });
  return response.data;
};