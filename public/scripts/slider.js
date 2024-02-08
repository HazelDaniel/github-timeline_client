"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const rangeSlider = document.getElementById("slider-facade");
  const sliderParent = document.querySelector(".hero-timeline-slider");
  const prevList = [null, null, null];
  let currentValue = 0;
  let childrenLength = sliderParent.children.length;
  let sliderChildren = Array.from(sliderParent.children);

  rangeSlider.addEventListener("input", (e) => {
    for (const item of prevList) {
      if (!item) continue;
      item.classList.remove("elevate-subtle");
      item.classList.remove("elevate");
    }
    if (e.target.value)
      currentValue = Math.round((+e.target.value / 100) * (childrenLength - 1));
    if (!currentValue) {
      sliderChildren[currentValue].classList.add("elevate");
      sliderChildren[currentValue + 1].classList.add("elevate-subtle");
      prevList[0] = sliderChildren[currentValue]
      prevList[1] = sliderChildren[currentValue + 1];
    } else if (currentValue === childrenLength - 1) {
      sliderChildren[currentValue - 1].classList.add("elevate-subtle");
      sliderChildren[currentValue].classList.add("elevate");
      prevList[0] = sliderChildren[currentValue - 1];
      prevList[1] = sliderChildren[currentValue];
    } else {
      sliderChildren[currentValue - 1].classList.add("elevate-subtle");
      sliderChildren[currentValue].classList.add("elevate");
      sliderChildren[currentValue + 1].classList.add("elevate-subtle");
      prevList[0] = sliderChildren[currentValue - 1];
      prevList[1] = sliderChildren[currentValue];
      prevList[2] = sliderChildren[currentValue + 1];
    }
  });
});
