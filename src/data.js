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



//=======DATABASES==========

let db;
const initDB = () => {
  const dbName = "githubUserData";
  const dbVersion = 1;

  const request = indexedDB.open(dbName, dbVersion);

  request.onerror = function (event) {
    console.error("Error opening IndexedDB database:", event.target.errorCode);
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("IndexedDB database opened successfully");
  };

  request.onupgradeneeded = function (event) {
    db = event.target.result;

    if (!db.objectStoreNames.contains("users")) {
      const objectStore = db.createObjectStore("users", { keyPath: "id" });
      objectStore.createIndex("username", "username", { unique: true });
    }
  };
};

export const storeGitHubUsername = (username) => {
  const transaction = db.transaction(['users'], 'readwrite');
  const objectStore = transaction.objectStore('users');
  const userData = { id: 1, username: username };
  const request = objectStore.add(userData);

  request.onsuccess = function(event) {
      console.log('GitHub username stored successfully');
  };

  request.onerror = function(event) {
      console.error('Error storing GitHub username:', event.target.errorCode);
  };
}

export const getGitHubUsername = () => {
  return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readonly');
      const objectStore = transaction.objectStore('users');
      const index = objectStore.index('username');
      const request = index.get('username');

      request.onsuccess = function(event) {
          const userData = event.target.result;
          if (userData) {
              resolve(userData.username);
          } else {
              reject('User not found');
          }
      };

      request.onerror = function(event) {
          reject(event.target.errorCode);
      };
  });
}



//======DATABASE ACTIONS=======
initDB();
