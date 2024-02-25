import api from './api'

export const fetchDataWithToken = async (endpoint: any) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)AplusToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    console.log(token)
    try {
      const response = await api.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(token)
      // Handle the response as needed
      console.log('API Response:', response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };