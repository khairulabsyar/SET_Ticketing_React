import { get, post, put, destroy } from ".";

const showTix = async (config) => {
  const res = await get(
    "https://set-ticketing-hello.herokuapp.com/api/ticket/",
    config
  );
  return res;
};

const createTix = async (data, config) => {
  const res = await post(
    "https://set-ticketing-hello.herokuapp.com/api/ticket",
    data,
    config
  );
  return res;
};

const editTix = async (config, data, id) => {
  const res = await put(
    `https://set-ticketing-hello.herokuapp.com/api/ticket/${id}`,
    data,
    config
  );
  return res;
};

const delTix = async (config, id) => {
  const res = await destroy(
    `https://set-ticketing-hello.herokuapp.com/api/ticket/${id}`,
    config
  );
  return res;
};

export { createTix, showTix, editTix, delTix };
