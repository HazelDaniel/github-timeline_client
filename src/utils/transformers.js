import { ASC, DESC, GLOBAL_PLACEHOLDER_URL } from "../data";
import { inObjectArray } from "./comparison";
import { getLastGraphDateRange } from "./storage";
//   "data": {
//     "repository": {
//       "ref": {
//         "target": {
//           "history": {
//             "pageInfo": {
//               "hasNextPage": false,
//               "endCursor": "6318dd85976d8c57dc0493eb2976f8f5624e89d7 7"
//             },
//             "edges": [
//               {
//                 "node": {
//                   "author": {
//                     "name": "HazelDaniel",
//                     "avatarUrl": "https://avatars.githubusercontent.com/u/77337868?s=100&v=4"
//                   },
//                   "committedDate": "2024-01-11T16:01:19Z"
//                 }
//               },
//               {
//                 "node": {
//                   "author": {
//                     "name": "HazelDaniel",
//                     "avatarUrl": "https://avatars.githubusercontent.com/u/77337868?s=100&v=4"
//                   },
//                   "committedDate": "2024-01-11T15:58:01Z"
//                 }
//               },
//               {
//                 "node": {
//                   "author": {
//                     "name": "HazelDaniel",
//                     "avatarUrl": "https://avatars.githubusercontent.com/u/77337868?s=100&v=4"
//                   },
//                   "committedDate": "2024-01-11T15:54:54Z"
//                 }
//               },
//               {
//                 "node": {
//                   "author": {
//                     "name": "HazelDaniel",
//                     "avatarUrl": "https://avatars.githubusercontent.com/u/77337868?s=100&v=4"
//                   },
//                   "committedDate": "2024-01-10T05:35:12Z"
//                 }
//               },
//               {
//                 "node": {
//                   "author": {
//                     "name": "HazelDaniel",
//                     "avatarUrl": "https://avatars.githubusercontent.com/u/77337868?s=100&v=4"
//                   },
//                   "committedDate": "2024-01-10T05:08:58Z"
//                 }
//               },
//               {
//                 "node": {
//                   "author": {
//                     "name": "HazelDaniel",
//                     "avatarUrl": "https://avatars.githubusercontent.com/u/77337868?s=100&v=4"
//                   },
//                   "committedDate": "2024-01-07T07:08:50Z"
//                 }
//               },
//               {
//                 "node": {
//                   "author": {
//                     "name": "HazelDaniel",
//                     "avatarUrl": "https://avatars.githubusercontent.com/u/77337868?s=100&v=4"
//                   },
//                   "committedDate": "2024-01-06T22:22:09Z"
//                 }
//               },
//               {
//                 "node": {
//                   "author": {
//                     "name": "HazelDaniel",
//                     "avatarUrl": "https://avatars.githubusercontent.com/u/77337868?s=100&v=4"
//                   },
//                   "committedDate": "2024-01-01T23:32:07Z"
//                 }
//               }
//             ]
//           }
//         }
//       }
//     }
//   }

export const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const genDateRange = () => {
  const today = new Date();
  const todayString = today.toISOString();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const lastWeekString = lastWeek.toISOString();

  return [lastWeekString, todayString];
};

export const extractGraphPayload = (userName, data) => {
  const payLoad = {};
  payLoad.dateRange = getLastGraphDateRange().lastDateRange || genDateRange();
  payLoad.userName = userName;
  payLoad.repoName = data?.name || null;

  return payLoad;
};
export const transformRepoGraph = (data) => {
  if (!data) return null;

  let edges = data?.repository?.ref?.target?.history?.edges;
  if (!edges) edges = [];

  edges = Array.from(edges).map((node) => {
    let tmp = {};
    let userTmp = {};
    let dayCommit = new Date(node.committedDate);
    userTmp.bio = node.author.user.bio;
    userTmp.avatarUrl = node?.author?.avatarUrl || GLOBAL_PLACEHOLDER_URL;
    userTmp.email = node.author.email;
    userTmp.name = node.author.name;
    tmp.author = userTmp;
    tmp.dayCommit = dayCommit;
    return tmp;
  });

  return edges;
};

export const extractCommitsInInterval = (
  startDateString,
  endDateString,
  edges
) => {
  const direction =
    new Date(startDateString).getTime() < new Date(endDateString).getTime()
      ? ASC
      : DESC;
  return edges.filter((node) => {
    if (!node.dayCommit.getTime) {
      node.dayCommit = new Date(node.dayCommit);
    }
    if (direction === ASC) {
      if (
        node.dayCommit.getTime() <= new Date(endDateString).getTime() &&
        node.dayCommit.getTime() >= new Date(startDateString).getTime()
      ) {
        return node;
      }
    } else {
      if (
        node.dayCommit.getTime() >= new Date(endDateString).getTime() &&
        node.dayCommit.getTime() <= new Date(startDateString).getTime()
      ) {
        return node;
      }
    }
  });
};

export const getDaysForCommitsObjs = (edges = []) => {
  return edges.map((el) => days[el.dayCommit.getDay()]);
};

export const extractCommitCountInIntervalDays = (
  startDateString,
  endDateString,
  edges
) => {
  const commitCountList = [0, 0, 0, 0, 0, 0, 0];
  const commitsInInterval = extractCommitsInInterval(
    startDateString,
    endDateString,
    edges
  );
  const commitCountHash = commitsInInterval.reduce((acc, curr) => {
    const key = curr.dayCommit.getDay();
    if (acc[key]) {
      acc[key]++;
    } else {
      acc[key] = 1;
    }
    return acc;
  }, {});

  // let tmp = {};
  // console.log(commitCountHash);
  // for (let i = 0; i < days.length; i++) {
  //   if (commitCountHash[i]) {
  //     tmp[days[i]] = commitCountHash[i];
  //   } else {
  //     tmp[days[i]] = 0;
  //   }
  // }
  // console.log(getDaysForCommitsObjs(edges));
  // console.log(tmp);

  for (let key of Object.keys(commitCountHash)) {
    commitCountList[key] = commitCountHash[key];
  }

  return commitCountList;
};

export const extractContribInInterval = (edges = []) => {
  let resEdges = [];

  edges.forEach((node) => {
    if (
      !inObjectArray(
        node,
        edges,
        (node1, node2) =>
          node1.author.email + node1.author.name ===
          node2.author.email + node2.author.name
      )
    ) {
      resEdges.push(node.author);
    }
  });

  return resEdges;
};

export const transformRepoList = (data) => {
  if (!data) return null;

  let { nodes } = data.user.repositories;
  nodes = Array.from(nodes).map((node) => {
    return {
      name: node.name,
      ...transformRepoBoard(node),
      ...transformOwnerAndStat(node),
      ...transformRepoBottom(node),
    };
  });
  return nodes;
};

export const transformRepoBoard = (data) => {
  let {
    name,
    url: HTTPSLink,
    sshUrl: SSHLink,
    languages: { nodes: languages },
  } = data;

  if (languages) {
    languages = languages.map((el) => {
      return el.name;
    });
  } else languages = [];

  return { name, languages, HTTPSLink, SSHLink };
};

export const transformOwnerAndStat = (data) => {
  let {
    owner: { name: ownerName, avatarUrl: ownerAvatarUrl, bio: ownerBio },
    forks: { totalCount: forks },
    defaultBranchRef,
    collaborators: {
      nodes: { length: contributorCount },
    },
  } = data;
  let commits = defaultBranchRef?.target?.history?.totalCount || 0;
  return {
    ownerName,
    ownerAvatarUrl,
    ownerBio,
    forks,
    commits,
    contributorCount,
  };
};

export const transformRepoBottom = (data) => {
  let {
    createdAt: dateCreated,
    updatedAt: dateUpdated,
    licenseInfo: license,
    collaborators: { nodes: contributors },
  } = data;

  if (license) license = license.name;
  else license = "NO LICENSE";

  return {
    dateCreated: new Date(dateCreated),
    dateUpdated: new Date(dateUpdated),
    license,
    contributors,
  };
};
