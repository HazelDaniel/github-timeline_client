import { memo, useEffect, useMemo, useReducer, useState } from "react";
import {
  getGraphState,
  getLastContribCount,
  getRepoListStateForGraph,
  setGraphRepoHash,
} from "../utils/storage";
import { DEV_ENV, userInfo } from "../data";
import { Graph } from "../pages/graph";
import {
  __updateGraphData,
  getInitialGraphDataState,
  graphDataReducer,
} from "../reducers/graph-data.reducer";
import { GraphDataProvider } from "../contexts/graph-data.context";
import {
  extractGraphPayload,
  genDateRange,
  transformRepoGraph,
} from "../utils/transformers";
import { gql, useQuery } from "@apollo/client";
import { useLoaderData } from "react-router-dom";

const GET_REPO_COMMIT_HISTORY = gql`
  query GetCommits(
    $owner: String!
    $repoName: String!
    $since: GitTimestamp!
    $until: GitTimestamp!
  ) {
    repository(owner: $owner, name: $repoName) {
      description
      name
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            history(since: $since, until: $until, first: 100) {
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  oid
                  author {
                    name
                    email
                    avatarUrl
                    user {
                      bio
                    }
                  }
                  committedDate
                }
              }
            }
          }
        }
      }
    }
  }
`;

const REPO_DATE_RANGE = genDateRange("year");

export const GraphWrapper = memo(
  function GraphWrapper() {
    const { data: graphInfo } = getRepoListStateForGraph();
    const userName = userInfo.username;
    const payLoad = useMemo(() => {
      return extractGraphPayload(userName, graphInfo);
    }, []);
    const { storedGraphState: repoToFetch } = getGraphState(payLoad.repoName);
    const { activityChange } = useLoaderData();
    const [graphDataState, graphDataDispatch] = useReducer(
      graphDataReducer,
      repoToFetch || getInitialGraphDataState()
    );

    const { loading, data, error, fetchMore } = useQuery(
      GET_REPO_COMMIT_HISTORY,
      {
        variables: {
          owner: payLoad.userName,
          first: 100,
          repoName: payLoad.repoName,
          since: REPO_DATE_RANGE[0],
          until: REPO_DATE_RANGE[1],
        },
        skip: !payLoad.repoName || (repoToFetch && !activityChange),
        fetchPolicy: "cache-first",
        onCompleted: (data) => {
          let transformedData = transformRepoGraph(data);
          setGraphRepoHash(transformedData.name, transformedData);
          graphDataDispatch(__updateGraphData(transformedData));
          if (DEV_ENV === "test") {
            console.log("raw data is ", data);
            console.log("transformed data is ", transformedData);
          }

          return;
        },
      }
    );

    useEffect(() => {
      if (!payLoad.repoName || (repoToFetch && !activityChange)) return;
      let done = data?.repository?.ref?.target?.history?.pageInfo
        ? !data.repository.ref.target.history.pageInfo.hasNextPage
        : true;
      if (DEV_ENV === "test") {
        console.log("are we done with the commits?", done);
      }
      if (!done) {
        // so, this is where we run a while loop (while !done) and populate the database without interferring with the state
        // users would be okay with stale data but not flickering UI.
        if (DEV_ENV === "test")
          console.log("we don't have the commits and we will be fetching now");
      }
    }, [payLoad, repoToFetch, activityChange]);

    if (DEV_ENV === "test") {
      console.log("activity changed? ", activityChange);
      // console.log("repo to fetch : ", repoToFetch, graphDataState);
      // console.log("rendering wrapper ..");
      // console.log(payLoad.userName, payLoad.repoName, payLoad.dateRange);
      // console.log(payLoad.dateRange);
    }

    const graphDataValue = useMemo(
      () => ({ graphDataState, graphDataDispatch }),
      [graphDataState]
    );

    return (
      <GraphDataProvider value={graphDataValue}>
        <Graph />
      </GraphDataProvider>
    );
  }
);
