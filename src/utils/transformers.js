import { ASC, DESC, GLOBAL_PLACEHOLDER_URL } from "../data";
import { inObjectArray } from "./comparison";
import { getLastGraphDateRange } from "./storage";

export const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
export const daysLong = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

export const generateDays = (rangeState) => {
  const startDate = new Date(rangeState.range[0]);
  const endDate = new Date(rangeState.range[1]);
  const direction = rangeState.direction;
  let index;

  if (direction === "forward") index = endDate.getDay();
  else index = startDate.getDay();

  const resArray = new Array(7);
  let i = 0,
    j = index;

  while (i < 7) {
    resArray[i] = daysLong[j];
    j = (j + 1) % 7;
    i++;
  }

  return resArray;
};

function isLeapYear(year) {
  if (!(year % 4)) {
    if (!(year % 100)) {
      return !(year % 400);
    }
    return true;
  }
  return false;
}

export const genDateRange = (rangeType = "week") => {
  const today = new Date();
  const todayString = today.toISOString();
  let leap = 0;
  let lastPeriod;
  if (rangeType === "year") {
    if (isLeapYear(today.getFullYear()) && today.getMonth() > 1) leap = 1;
    lastPeriod = new Date(
      today.getTime() - Math.round((365 + leap) * 24 * 60 * 60 * 1000)
    );
  } else {
    lastPeriod = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  }
  let lastPeriodString = lastPeriod.toISOString();

  return [lastPeriodString, todayString];
};

export const extractGraphPayload = (userName, data) => {
  const payLoad = {};
  const lastDateRange = getLastGraphDateRange();
  payLoad.dateRange = lastDateRange.lastDateRange || genDateRange();
  payLoad.userName = userName;
  payLoad.repoName = data?.name || null;
  payLoad.direction = lastDateRange.direction;

  return payLoad;
};
export const transformRepoGraph = (data) => {
  if (!data) return null;

  let edges = data?.repository?.ref?.target?.history?.edges;
  if (!edges) edges = [];

  const description = data.repository.description;
  const name = data.repository.name;
  edges = Array.from(edges).map(({ node }) => {
    let tmp = {};
    let userTmp = {};
    let dayCommit = new Date(node.committedDate);
    userTmp.bio = node?.author?.user?.bio || "no bio available";
    userTmp.avatarUrl = node?.author?.avatarUrl || GLOBAL_PLACEHOLDER_URL;
    userTmp.email = node?.author?.email || "no email provided";
    userTmp.name = node?.author?.name || "no name provided";
    tmp.author = userTmp;
    tmp.dayCommit = dayCommit;
    tmp.oid = node.oid;
    return tmp;
  });

  return { commits: edges, description, name, done: edges.length < 100 };
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

  let tmp = {};
  console.log(commitCountHash);
  for (let i = 0; i < days.length; i++) {
    if (commitCountHash[i]) {
      tmp[days[i]] = commitCountHash[i];
    } else {
      tmp[days[i]] = 0;
    }
  }
  console.log(getDaysForCommitsObjs(edges));
  console.log(tmp);

  for (let key of Object.keys(commitCountHash)) {
    commitCountList[key] = commitCountHash[key];
  }

  return commitCountList;
};

function compareNodesForInterval(node1, node2, startDate, endDate) {
  const node2Date = new Date(node2.dayCommit);
  if (
    !(
      node2Date.getTime() >= startDate.getTime() &&
      node2Date.getTime() <= endDate.getTime()
    )
  ) {
    return true;
  }
  return (
    node2.author.email + node2.author.name ===
    node1.author.email + node1.author.name
  );
}

export const extractContribInInterval = (edges = [], range) => {
  let resEdges = [];
  if (!range || !range[0] || !range[1]) return [];
  const [startDateString, endDateString] = range;
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  edges.forEach((node) => {
    if (
      !inObjectArray(
        node,
        resEdges,
        compareNodesForInterval,
        startDate,
        endDate
      )
    ) {
      resEdges.push(node);
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
      // contributors: node.collaborators?.length || node.author,
      description: node.description,
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
  } = data;
  let { collaborators } = data;
  let contributorCount;
  if (!collaborators) {
    contributorCount = 0;
  }
  // collaborators: {
  //   nodes: { length: contributorCount },
  // },
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
  } = data;
  let { collaborators } = data;
  if (!collaborators) {
    // let tmp = { ...data.author };
    // console.log("author data, ", data.author);
    // tmp.bio = data.author?.user?.bio || "no bio available";
    // contributors = [tmp];
    collaborators = [];
  }

  if (license) license = license.name;
  else license = "NO LICENSE";

  return {
    dateCreated: new Date(dateCreated),
    dateUpdated: new Date(dateUpdated),
    license,
    contributors: collaborators,
  };
};
