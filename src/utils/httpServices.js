import axios from "axios";

const get = async (url, data = {}, token = null) => {
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const config = {
    headers: headers,
    params: data, 
  };
  const result = await axios.get(url, config);
  return result;
};


const post = async (url, data = {}, token = null) => {
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const result = await axios.post(url, data, {
    headers: headers,
  });
  return result;
};

const put = async (url, data = {}, token = null) => {
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  console.log(data)
  const response = await axios.put(url, data, {
    headers: headers,
  });
  return response;
};

const remove = async (url, token = null) => {
  const headers = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await axios.delete(url, {
    headers: headers,
  });
  return response;
};

export const http = {
  get,
  post,
  put,
  delete: remove,
};

export const host = "https://inventorybillingapp-backend.onrender.com";
