import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4040',  
});

 

export const fetchData = async (endpoint, config = {}) => {
  try {
    const response = await instance.request({
      url: endpoint,
      ...config,
    });

    return response.data;
  } catch (error) {
    console.error('Axios request error:', error);
    throw error;
  }
};

export default instance;
