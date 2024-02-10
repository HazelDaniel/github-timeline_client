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
    if (!username?.username) {
      reject(new Error("no username found"));
    } else {
      resolve(username.username);
    }
  });
};

export const userInfo = {};
