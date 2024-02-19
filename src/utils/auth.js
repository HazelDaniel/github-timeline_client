import { CLIENT_ID, DEV_ENV, GITHUB_AUTH_LINK } from "../data";
import { getAccessToken, setAccessToken } from "./storage";

export const PROXY_URL =
  DEV_ENV === "test"
    ? import.meta.env.VITE_PROXY_ENDPOINT_TEST
    : import.meta.env.VITE_PROXY_ENDPOINT;

export const loginWithGithub = () => {
  window.location.assign(GITHUB_AUTH_LINK + "?client_id=" + CLIENT_ID);
};

export const fetchAccessToken = async (code) => {
  let res = await fetch(`${PROXY_URL}get_token?code=`, code);
  try {
    res = await res.json();
  } catch (err) {
    alert(err);
  }
  if (res.access_token) {
    setAccessToken(res.access_token);
  }
};

export const fetchUserData = async () => {
  let res = await fetch(`${PROXY_URL}get_data`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + (getAccessToken()?.token || ""),
    },
  });
  res = await res.json();
  return res;
};
