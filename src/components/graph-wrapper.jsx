import { memo, useEffect, useMemo, useReducer } from "react";
import {
  getGraphState,
  getRepoListStateForGraph,
  setGraphRepoHash,
} from "../utils/storage";
import { userInfo } from "../data";
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

    const [graphDataState, graphDataDispatch] = useReducer(
      graphDataReducer,
      getInitialGraphDataState()
    );

    console.log("repo to fetch : ", repoToFetch);
    console.log(payLoad.repoName);

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
        skip: !payLoad.repoName || repoToFetch,
        fetchPolicy: "cache-first",
        onCompleted: (data) => {
          let transformedData = transformRepoGraph(data);
          setGraphRepoHash(transformedData.name, transformedData);
          graphDataDispatch(__updateGraphData(transformedData));
          console.log("transformed data is ", transformedData);
          return;
        },
      }
    );

    console.log("rendering wrapper ..");
    // console.log(payLoad.userName, payLoad.repoName, payLoad.dateRange);
    console.log(payLoad.dateRange);

    const graphDataValue = useMemo(
      () => ({ graphDataState, graphDataDispatch }),
      [graphDataState]
    );

    return (
      <GraphDataProvider value={graphDataValue}>
        <Graph />
      </GraphDataProvider>
    );
  },
  () => {}
);
