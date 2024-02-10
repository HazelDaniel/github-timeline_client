export const REPO_LIST_PAGINATE_SIZE = 10;

export const repoBoardData = {
  SSHLink: "git@github.com/UserName/RepoName.git",
  HTTPSLink: "https://github.com/UserName/RepoName",
  defaultLink: "https",
};

export const commitSignpostData = {
  createdAt: new Date("2020-02-01T22:30:00Z"),
  updatedAt: new Date("2024-02-10T00:30:00Z"),
};

export const repoLinkData = [
  { name: "repo 1", dateUpdated: new Date("2024-02-10T00:30:00Z") },
  { name: "repo 2", dateUpdated: new Date("2024-01-10T09:30:00Z") },
  { name: "repo 3", dateUpdated: new Date("2024-01-11T00:30:00Z") },
  { name: "repo 4", dateUpdated: new Date("2024-02-21T20:30:00Z") },
  { name: "repo 5", dateUpdated: new Date("2023-03-13T00:40:00Z") },
  { name: "repo 6", dateUpdated: new Date("2023-08-15T00:35:00Z") },
  { name: "repo 7", dateUpdated: new Date("2023-11-10T18:30:00Z") },
  { name: "repo 8", dateUpdated: new Date("2023-12-10T10:30:00Z") },
  { name: "repo 9", dateUpdated: new Date("2023-06-01T00:30:00Z") },
  { name: "repo 10", dateUpdated: new Date("2022-01-01T00:00:00Z") },
];

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
          data: [5, 59, 80, 81, 56, 55, 30],
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
          type: "category", // Set the scale type to 'category' for the x-axis
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
    if (!username) {
      reject(new Error("no username found"));
    } else {
      resolve(username);
    }
  });
};

export const userInfo = {};
