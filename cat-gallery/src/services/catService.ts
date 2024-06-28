import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

export const fetchCats = async (page: number, limit: number, filter: boolean) => {
  const response = await axios.get(`${BASE_URL}/images/search`, {
    headers: {
      'x-api-key': API_KEY,
    },
    params: {
      page,
      limit,
      mime_types: filter ? 'gif' : '',
    },
  });
  return response.data;
};
