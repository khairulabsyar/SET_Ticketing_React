import { get, post, put, destroy } from ".";

const apiSignIn = async (data) => {
  const res = await post("http://127.0.0.1:8000/api/user-login", data);
  return res;
};

const apiSignUp = async (data) => {
  const res = await post("http://127.0.0.1:8000/api/register", data);
  return res;
};

const apiGetUser = async (config) => {
  const res = await get("http://127.0.0.1:8000/api/user", config);
  return res;
};

const apiGetDev = async (data) => {
  const res = await get("http://127.0.0.1:8000/api/user/developer", data);
  return res;
};

export { apiSignIn, apiSignUp, apiGetUser, apiGetDev };
