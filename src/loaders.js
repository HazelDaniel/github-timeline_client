import { json } from "react-router-dom";
import { DEV_ENV, userInfo } from "./data";
import {
  getAccessToken,
  getGitHubUsername,
  getLastRepoUpdate,
  getRepoListStateForGraph,
  getSeenWarningOn,
  setAccessToken,
  setLastRepoUpdate,
  setSeenWarningOn,
} from "./utils/storage";
import { PROXY_URL } from "./utils/auth";
import { client } from "./App";
import { gql } from "@apollo/client";
import { extractGraphPayload } from "./utils/transformers";

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
export const GET_ACTIVITY = gql`
  query GetRepoLastUpdatedDate($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      updatedAt
    }
  }
`;

export const graphLoader = async () => {
  const { data: graphInfo } = getRepoListStateForGraph();
  const userName = userInfo.username;
  const payLoad = extractGraphPayload(userName, graphInfo);
	if (DEV_ENV === "test")
  console.log(payLoad);

  const { username } = await getGitHubUsername();
  let res = { activityChange: false };
  if (!userInfo.token) {
    if (DEV_ENV === "test") {
      console.log("quitting early");
    }
    return json(res);
  }

  try {
    const result = await client.query({
      query: GET_ACTIVITY,
      variables: {
        owner: username,
        name: payLoad.repoName,
      },
      context: {
        Headers: {
          Authorization: `Bearer: ${userInfo.token}`,
        },
      },
    });

    // return json(res);
    let dateUpdated = result.data?.repository?.updatedAt
      ? new Date(result.data.repository.updatedAt).getTime()
      : new Date(0);

    // const { lastContribCount } = getLastContribCount(userInfo.username);
    const { lastUpdated } = getLastRepoUpdate(payLoad.repoName);

    if (lastUpdated !== dateUpdated) {
      if (DEV_ENV === "test") {
        console.log(
          "activity changed from loader with : ",
          lastUpdated,
          dateUpdated
        );
      }
      // setLastContribCount(userInfo.username, totalContrib);
      setLastRepoUpdate(payLoad.repoName, dateUpdated);
      res.activityChange = true;
      return json(res);
    }
    return json(res);
  } catch (error) {
    console.error("Error fetching data:", error);
    return json(res);
  }
};
