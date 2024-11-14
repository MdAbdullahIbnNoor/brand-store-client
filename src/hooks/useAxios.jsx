import axios from 'axios';

const useAxios = () => {
  const fetchData = async (url, method = 'GET', data = null) => {
    try {
      const response = await axios({
        method,
        url: `http://localhost:3000${url}`,
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Ensure we return just the data part of the response
    } catch (error) {
      throw error; // Propagate error for mutation's onError to handle
    }
  };

  return { fetchData };
};

export default useAxios;
