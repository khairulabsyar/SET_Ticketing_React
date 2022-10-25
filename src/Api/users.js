import { get, post, put, destroy } from ".";

const apiSignIn = async (data) => {
  const res = await post(
    "https://set-ticketing-hello.herokuapp.com/api/user-login",
    data
  );
  return res;
};

const apiSignUp = async (data) => {
  const res = await post(
    "https://set-ticketing-hello.herokuapp.com/api/register",
    data
  );
  return res;
};

const apiGetUser = async (config) => {
  const res = await get(
    "https://set-ticketing-hello.herokuapp.com/api/user",
    config
  );
  return res;
};

const apiGetDev = async (data) => {
  const res = await get(
    "https://set-ticketing-hello.herokuapp.com/api/user/developer",
    data
  );
  return res;
};

export { apiSignIn, apiSignUp, apiGetUser, apiGetDev };
