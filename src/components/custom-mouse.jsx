import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const handleCustomMouse = ({ mouse: { current: customMouse }, location }) => {
  if (location === "/app") return;
  const accentColorTrans = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-color_trans")
    .trim();

  document.addEventListener("mousemove", (e) => {
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    customMouse.querySelector("span").classList.add("visible");
    customMouse.style.left =
      Math.min(e.clientX + scrollX, document.body.clientWidth - 20) + "px";
    customMouse.style.top =
      Math.min(e.clientY + scrollY, document.body.clientHeight - 50) + "px";
  });

  document.addEventListener("mouseout", (_) => {
    customMouse.querySelector("span").classList.add("visible");
  });

  document.addEventListener("click", (_) => {
    customMouse.style.border = `.1rem solid ${accentColorTrans}`;
    setTimeout(() => {
      customMouse.style.border = ``;
    }, 100);
  });
};

export const CustomMouse = () => {
  const mouse = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (mouse) handleCustomMouse({ mouse, location });
  }, [mouse]);

  return (
    <div id="custom-mouse" ref={mouse}>
      <span></span>
    </div>
  );
};
