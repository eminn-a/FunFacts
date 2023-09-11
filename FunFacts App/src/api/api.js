import { clearUserData, getAccessToken } from "../util.js";

const host = "http://localhost:3030";

async function request(method, url, data) {
  const option = {
    method,
    headers: {},
  };

  const token = getAccessToken();
  if (token) {
    option.headers["X-Authorization"] = token;
  }
  if (data) {
    option.headers["Content-Type"] = "application/json";
    option.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(host + url, option);

    if (response.ok != true) {
      if (response.status == 403) {
        clearUserData();
      }
      const error = await response.json();
      throw new Error(error.message);
    }
    if (response.status == 204) {
      return response;
    } else {
      return response.json();
    }
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const put = request.bind(null, "PUT");
export const del = request.bind(null, "DELETE");
