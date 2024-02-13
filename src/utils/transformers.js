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

import { inObjectArray } from "./comparison";

export const transformRepoGraph = (data) => {
  if (!data) return null;

  let edges = data?.repository?.ref?.target?.history?.edges;
  if (!edges) edges = [];

  edges = Array.from(edges).map((node) => {
    let tmp = {};
    let userTmp = {};
    let dayCommit = new Date(node.committedDate);
    userTmp.bio = node.author.user.bio;
    userTmp.avatarUrl = node.author.avatarUrl;
    tmp.author = userTmp;
    tmp.dayCommit = dayCommit;
    return tmp;
  });

  return edges;
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
