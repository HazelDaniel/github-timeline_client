import { CLIENT_ID, GITHUB_AUTH_LINK } from "../data";
import { getAccessToken, setAccessToken } from "./storage";

export const loginWithGithub = () => {
  window.location.assign(GITHUB_AUTH_LINK + "?client_id=" + CLIENT_ID);
};

export const fetchAccessToken = async (code) => {
  let res = await fetch("http://localhost:4000/get_token?code=", code);
	try {
		res = await res.json();
	} catch (err) {
		alert(err);
	}
  if (res.access_token) {
    setAccessToken(res.access_token);
  }
  console.log("token response from the server: ", res);
};

export const fetchUserData = async () => {
  let res = await fetch("http://localhost:4000/get_data", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + (getAccessToken()?.token || ""),
    },
  });
  res = await res.json();
  console.log("data response from the server: ", res);
};
