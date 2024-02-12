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
