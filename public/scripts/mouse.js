"use strict";
const accentColorTrans = getComputedStyle(document.documentElement)
  .getPropertyValue("--accent-color_trans")
  .trim();

document.addEventListener("mousemove", (e) => {
  // if (e.target.closest("img")) {
  //   //optimization, in case you are wondering in the future
  //   return;
  // }
  const customMouse = document.getElementById("custom-mouse");
  const scrollX = window.scrollX || document.documentElement.scrollLeft;
  const scrollY = window.scrollY || document.documentElement.scrollTop;

  customMouse.querySelector("span").classList.add("visible");
  customMouse.style.left =
    Math.min(e.clientX + scrollX, document.body.clientWidth - 20) + "px";
  customMouse.style.top =
    Math.min(e.clientY + scrollY, document.body.clientHeight - 50) + "px";
});

document.addEventListener("mouseout", (e) => {
  // if (e.target.closest("img")) {
  //   //optimization, in case you are wondering in the future
  //   return;
  // }
  const customMouse = document.getElementById("custom-mouse");
  customMouse.querySelector("span").classList.add("visible");
});

document.addEventListener("click", (e) => {
  const customMouse = document.getElementById("custom-mouse");
  // if (e.target.closest("img")) {
  //   //optimization, in case you are wondering in the future
  //   return;
  // }
  customMouse.style.border = `.1rem solid ${accentColorTrans}`;
  setTimeout(() => {
    customMouse.style.border = ``;
  }, 100);
});
