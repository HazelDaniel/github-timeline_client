import { json } from "react-router-dom";
import { userInfo } from "./data";
import { getAccessToken, getGitHubUsername, getSeenWarningOn, setAccessToken, setSeenWarningOn } from "./utils/storage";
import { PROXY_URL } from "./utils/auth";

export const appLoader = async () => {
  const queryString = window.location.search;
  const urlParam = new URLSearchParams(queryString);
  let codeParam = urlParam.get("code")?.trim();
  let { token } = getAccessToken();
  userInfo.error = null;
  userInfo.message = null;
  if (!codeParam && !token) {
    userInfo.warning = { message: "you need to sign in to use feature" };
    let { seenWarning } = getSeenWarningOn("App");
    if (!seenWarning) setSeenWarningOn("App", 1);
    else if (seenWarning >= 1) userInfo.warning = null;
    setSeenWarningOn("App", (seenWarning || 0) + 1);
    return json(userInfo);
  }
  const { username } = await getGitHubUsername();

  if (!token) {
    let codeRes;
    try {
      codeRes = await fetch(`${PROXY_URL}get_token?code=` + codeParam);
      let data = await codeRes.json();
      if (data.access_token) {
        userInfo.token = data.access_token;
        userInfo.username = username;
        setAccessToken(data.access_token);
        userInfo.message = "user authenticated succesfully";
        return json(userInfo);
      } else {
        userInfo.error = {
          message:
            "something wrong with the connection or credentials expired, please try again!",
        };
        userInfo.message = null;
        return json(userInfo);
      }
    } catch (err) {
      userInfo.message = null;
      let error = { message: "error making connection to the server" };
      userInfo.error = error;
      return json(userInfo);
    }
  }
  userInfo.username = username;
  userInfo.token = getAccessToken().token;
  return json(userInfo);
};

export const graphLoader = async () => {
  return json({});
}
