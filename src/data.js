export const REPO_LIST_PAGINATE_SIZE = 10;

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
  ownerAvatarUrl: "images/placeholder.svg",
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
    { avatarUrl: "images/placeholder.svg", bio: "no bio available" },
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

export const graphData = {
  weekCommitCount: [5, 59, 80, 81, 56, 55, 30],
  weekStartDate: new Date("2024-02-10T00:30:00Z"),
  weekEndDate: new Date("2024-03-10T00:30:00Z"),
  weekcontributors: [
    { avatarUrl: "images/placeholder.svg", bio: "no bio available" },
  ],
};

export const getChartConfig = ({ horizontal, chartType, doc }) => {
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
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      datasets: [
        {
          label: "Contributions today",
          data: graphData.weekCommitCount,
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
