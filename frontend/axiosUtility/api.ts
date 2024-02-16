import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://aplus-laundry-backend.vercel.app/',
  // baseURL: 'http://localhost:4040/',
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

export const postData = async (endpoint: any, data: any, config = {}) => {
const token = document.cookie.replace(/(?:(?:^|.*;\s*)AplusToken\s*=\s*([^;]*).*$)|^.*$/, '$1') as string;
  try {
    const response = await instance.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Add other headers if needed
      },
      ...config,
    });

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

export const deleteAllData = async (endpoint: string, data: any, config = {}) => {
  const token = document.cookie?.replace(/(?:(?:^|.*;\s*)AplusToken\s*=\s*([^;]*).*$)|^.*$/, '$1') as string | undefined;
 
  try {
    const response = await instance.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Add other headers if needed
      },
      ...config,
      data, // Assuming Axios expects the data to be passed in the 'data' property for DELETE requests
    });

    return response.data;
  } catch (error) {
    console.error('Axios delete request error:', error);
    throw {
      message: 'Error making delete request',
      originalError: error,
    };
  }
};



export const activateCoupon = async (endpoint: any, data: any, config = {}) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)AplusToken\s*=\s*([^;]*).*$)|^.*$/, '$1') as string;
    try {
      const response = await instance.put(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add other headers if needed
        },
        ...config,
      });
  
      return response.data;
    } catch (error) {
      console.error('Axios put request error:', error);
      throw error;
    }
  };

export default instance;
