import axios from "axios";

export const get = async (endpoint, body, options, config) => {
  try {
    const response = await axios.get(endpoint, body, options, config);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error);
  }
};

export const post = async (endpoint, body, options, data) => {
  try {
    const response = await axios.post(endpoint, body, options, data);
    return response;
  } catch (error) {
    if (error.response.status === 500) {
      alert("Error");
    }
    return error.response;
  }
};

export const put = async (endpoint, body, options) => {
  try {
    const response = await axios.put(endpoint, body, options);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const destroy = async (endpoint, body, options, config) => {
  try {
    const response = await axios.delete(endpoint, body, options, config);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
