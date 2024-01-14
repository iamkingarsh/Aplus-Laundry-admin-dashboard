import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4040',
});


export const fetchData = async (endpoint:any, config = {}) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)AplusToken\s*=\s*([^;]*).*$)|^.*$/, '$1') as string;
  try {
    const response = await instance.request({
      url: endpoint,
      headers: {
        Authorization: `Bearer ${token}`,
        // Add other headers if needed
      },
      ...config,
    });
    

    return response.data;
  } catch (error) {
    console.error('Axios request error:', error);
    throw error;
  }
};

export const postData = async (endpoint:any, data:any, config = {}) => {
  try {
    const response = await instance.post(endpoint, data, config);
    return response.data;
  } catch (error) {
    console.error('Axios POST request error:', error);
    throw error;
  }
};

export const deleteData = async (endpoint: string, config = {}) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)AplusToken\s*=\s*([^;]*).*$)|^.*$/, '$1') as string;
  try {
    const response = await instance.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Add other headers if needed
      },
      ...config,
    });

    return response.data;
  } catch (error) {
    console.error('Axios delete request error:', error);
    throw error;
  }
};
export default instance;
