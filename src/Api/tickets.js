import { get, post, put, destroy } from ".";

const showTix = async (config) => {
  const res = await get("http://127.0.0.1:8000/api/ticket/", config);
  return res;
};

const createTix = async (data, config) => {
  const res = await post("http://127.0.0.1:8000/api/ticket", data, config);
  return res;
};

const editTix = async (config, data, id) => {
  const res = await put(`http://127.0.0.1:8000/api/ticket/${id}`, data, config);
  return res;
};

const delTix = async (config, id) => {
  const res = await destroy(`http://127.0.0.1:8000/api/ticket/${id}`, config);
  return res;
};

export { createTix, showTix, editTix, delTix };
