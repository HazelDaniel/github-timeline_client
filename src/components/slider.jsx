import { useEffect, useRef } from "react";

const handleSlider = ({
  rangeInput: { current: rangeSlider },
  timelineSlider: { current: sliderParent },
}) => {
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
      prevList[0] = sliderChildren[currentValue];
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
};

export const Slider = () => {
  const rangeInput = useRef(null);
  const timelineSlider = useRef(null);
  const present = new Date();

  useEffect(() => {
    if (rangeInput && timelineSlider)
      handleSlider({ rangeInput, timelineSlider });
  }, [rangeInput, timelineSlider]);

  return (
    <>
      <div className="hero-image-div-slider-facade" ref={rangeInput}>
        <input type="range" name="" id="slider-facade" min="0" max="100" />
      </div>
      <div className="hero-timeline-slider" ref={timelineSlider}>
        <span className="stretched">
          <p>{present.getFullYear() - 3}</p>
        </span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span className="stretched">
          <p>{present.getFullYear() - 2}</p>
        </span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span className="stretched">
          <p>{present.getFullYear() - 1}</p>
        </span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span className="stretched">
          <p>{present.getFullYear() - 0}</p>
        </span>
      </div>
    </>
  );
};
