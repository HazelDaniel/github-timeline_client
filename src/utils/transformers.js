export const transformRepoList = (data) => {
  let nodes;

  if (!data)
  return (null);

  nodes = data.user.repositories.nodes;
  nodes = Array.from(nodes).map((node) => {
    return { name: node.name, dateUpdated: new Date(node.updatedAt) };
  });
  return nodes;
};
