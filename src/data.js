import { extractCommitCountInIntervalDays } from "./utils/transformers";

export const REPO_LIST_PAGINATE_SIZE = 10;
export const GLOBAL_PLACEHOLDER_URL = "images/placeholder.svg";
export const ASC = "asc";
export const DESC = "desc";
export const DEV_ENV = import.meta.env.VITE_DEV_ENV;
export const API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;
export const CLIENT_ID =
  DEV_ENV === "test"
    ? import.meta.env.VITE_GITHUB_CLIENT_ID_TEST
    : import.meta.env.VITE_GITHUB_CLIENT_ID;
export const GITHUB_AUTH_LINK = "https://github.com/login/oauth/authorize";
export const ALERT_SUCCESS = 0;
export const ALERT_FAILURE = 1;
export const ALERT_ERROR = 2;
export const ALERT_INFO = 3;

export const repoLinkTypeData = {
  SSHLink: "----",
  HTTPSLink: "----",
  defaultLink: "https",
};

export const repoNameAndLanguageData = {
  name: "----",
  languages: [],
};

export const repoOwnerSectionData = {
  ownerName: "no name available",
  ownerAvatarUrl: GLOBAL_PLACEHOLDER_URL,
  ownerBio: "No bio available",
};

export const repoStatData = {
  commits: 0,
  forks: 0,
  contributorCount: 0,
};

export const commitSignpostData = {
  dateCreated: new Date("1970-01-01T22:00:00Z"),
  dateUpdated: new Date("1970-01-01T22:00:00Z"),
};

export const repoBottomData = {
  ...commitSignpostData,
  license: "NO LICENSE", //licenseInfo
  contributors: [
    { avatarUrl: GLOBAL_PLACEHOLDER_URL, bio: "no bio available" },
  ],
};

export const repoLinkData = [
  { name: "----", dateUpdated: new Date("2024-02-10T00:30:00Z") },
  { name: "----", dateUpdated: new Date("2024-02-10T00:30:00Z") },
  { name: "----", dateUpdated: new Date("2024-02-10T00:30:00Z") },
  { name: "----", dateUpdated: new Date("2024-02-10T00:30:00Z") },
  { name: "----", dateUpdated: new Date("2024-02-10T00:30:00Z") },
  { name: "----", dateUpdated: new Date("2024-02-10T00:30:00Z") },
  { name: "----", dateUpdated: new Date("2024-02-10T00:30:00Z") },
  { name: "----", dateUpdated: new Date("2024-02-10T00:30:00Z") },
  { name: "----", dateUpdated: new Date("2024-02-10T00:30:00Z") },
  { name: "----", dateUpdated: new Date("2024-02-10T00:30:00Z") },
];

export const repoGraphDataCommits = [
  {
    dayCommit: new Date("2023-03-01T00:30:00Z"),
    author: {
      name: "name1",
      email: "name1@gmail.com",
      avatarUrl: GLOBAL_PLACEHOLDER_URL,
      bio: "no bio available",
    },
  },
  {
    dayCommit: new Date("2024-02-10T00:30:00Z"),
    author: {
      name: "name2",
      email: "name2@gmail.com",
      avatarUrl: GLOBAL_PLACEHOLDER_URL,
      bio: "no bio available",
    },
  },
  {
    dayCommit: new Date("2024-02-13T00:30:00Z"),
    author: {
      name: "name3",
      email: "name3@gmail.com",
      avatarUrl: GLOBAL_PLACEHOLDER_URL,
      bio: "no bio available",
    },
  },
  {
    dayCommit: new Date("2023-03-03T00:30:00Z"),
    author: {
      name: "name4",
      email: "name4@gmail.com",
      avatarUrl: GLOBAL_PLACEHOLDER_URL,
      bio: "no bio available",
    },
  },
  {
    dayCommit: new Date("2023-03-11T00:30:00Z"),
    author: {
      name: "name5",
      email: "name5@gmail.com",
      avatarUrl: GLOBAL_PLACEHOLDER_URL,
      bio: "no bio available",
    },
  },
  {
    dayCommit: new Date("2024-02-02T00:30:00Z"),
    author: {
      name: "name6",
      email: "name6@gmail.com",
      avatarUrl: GLOBAL_PLACEHOLDER_URL,
      bio: "no bio available",
    },
  },
  {
    dayCommit: new Date("2024-02-04T00:30:00Z"),
    author: {
      name: "name7",
      email: "name7@gmail.com",
      avatarUrl: GLOBAL_PLACEHOLDER_URL,
      bio: "no bio available",
    },
  },
  {
    dayCommit: new Date("2024-01-19T00:30:00Z"),
    author: {
      name: "name8",
      email: "name8@gmail.com",
      avatarUrl: GLOBAL_PLACEHOLDER_URL,
      bio: "no bio available",
    },
  },
  {
    dayCommit: new Date("2024-01-15T00:30:00Z"),
    author: {
      name: "name9",
      email: "name9@gmail.com",
      avatarUrl: GLOBAL_PLACEHOLDER_URL,
      bio: "no bio available",
    },
  },
  {
    dayCommit: new Date("2024-02-21T00:30:00Z"),
    author: {
      name: "name10",
      email: "name10@gmail.com",
      avatarUrl: GLOBAL_PLACEHOLDER_URL,
      bio: "no bio available",
    },
  },
];

export const graphData = {
  weekCommitCount: extractCommitCountInIntervalDays(
    "2020-02-01T00:30:00Z",
    "2025-03-21T00:30:00Z",
    repoGraphDataCommits
  ),
};
// console.log("wcc ", graphData.weekCommitCount);

export const userInfo = {};
export const DBinfo = { blocked: false, name: `${"gtl_PERSIST" + (userInfo.username ||  "")}` };

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
