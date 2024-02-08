document.addEventListener("DOMContentLoaded", () => {
  const repoList = document.querySelector(".repositories");
  const repoHighlight = repoList.querySelector(".repo-highlight");

  const repoToggler = document.querySelector(".repo-toggler");
  const repoBoard = document.querySelector(".repositories-tab");

  repoToggler.addEventListener("click", () => {
    repoBoard.classList.toggle("closed");
  });

  repoList.addEventListener("mouseover", (e) => {
    if (!e.target.dataset.pos) return;
    repoHighlight.classList.remove("defunct");
    let position = +e.target.dataset.pos;
    repoHighlight.style.top = `${4 * position}rem`;
  });

  repoList.addEventListener("mouseleave", () => {
    repoHighlight.classList.add("defunct");
  });
});
