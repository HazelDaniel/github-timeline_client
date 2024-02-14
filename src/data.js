import {
  extractCommitCountInIntervalDays,
  extractCommitsInInterval,
} from "./utils/transformers";

export const REPO_LIST_PAGINATE_SIZE = 10;
export const GLOBAL_PLACEHOLDER_URL = "images/placeholder.svg";
export const ASC = "asc";
export const DESC = "desc";

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
    dayCommit: new Date("2024-03-01T00:30:00Z"),
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
    dayCommit: new Date("2024-03-03T00:30:00Z"),
    author: {
      name: "name4",
      email: "name4@gmail.com",
      avatarUrl: GLOBAL_PLACEHOLDER_URL,
      bio: "no bio available",
    },
  },
  {
    dayCommit: new Date("2024-03-11T00:30:00Z"),
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
    dayCommit: new Date("2024-03-04T00:30:00Z"),
    author: {
      name: "name7",
      email: "name7@gmail.com",
      avatarUrl: GLOBAL_PLACEHOLDER_URL,
      bio: "no bio available",
    },
  },
  {
    dayCommit: new Date("2024-03-19T00:30:00Z"),
    author: {
      name: "name8",
      email: "name8@gmail.com",
      avatarUrl: GLOBAL_PLACEHOLDER_URL,
      bio: "no bio available",
    },
  },
  {
    dayCommit: new Date("2024-03-15T00:30:00Z"),
    author: {
      name: "name9",
      email: "name9@gmail.com",
      avatarUrl: GLOBAL_PLACEHOLDER_URL,
      bio: "no bio available",
    },
  },
  {
    dayCommit: new Date("2024-03-21T00:30:00Z"),
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

export const getChartConfig = ({ horizontal, chartType, doc, dataset }) => {
  const accentColor = getComputedStyle(doc.documentElement)
    .getPropertyValue("--accent-color")
    .trim();
  const accentColorTrans = getComputedStyle(doc.documentElement)
    .getPropertyValue("--accent-color_trans")
    .trim();

  return {
    type: chartType,
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          label: "Contributions today",
          data: dataset,
          borderColor: `${accentColor}` || "#45c3ad",
          tension: 0.1,
          fill: false,
          lineTension: 0.1,
          backgroundColor: `${accentColorTrans}` || "#45c3ae98",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: !horizontal ? 9 / 16 : 2,
      plugins: {
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          type: "category",
          grid: {
            display: true,
            color: `${accentColorTrans}` || "#45c3ae98",
          },
        },
        y: {
          grid: {
            display: true,
            color: `${accentColorTrans}` || "#45c3ae98",
          },
        },
      },
    },
  };
};

export const storeGitHubUsername = (username) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem("gtl_username", JSON.stringify(username));
      resolve(username);
    } catch (err) {
      reject(new Error("error adding username"));
    }
  });
};

export const getGitHubUsername = () => {
  return new Promise((resolve, reject) => {
    const username = JSON.parse(localStorage.getItem("gtl_username"));
    if (!username?.username) {
      reject(new Error("no username found"));
    } else {
      resolve(username.username);
    }
  });
};

export const userInfo = {};

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
