import { useEffect } from "react";
import { About } from "../components/about";
import { Explore } from "../components/explore";
import { Hero } from "../components/hero";
import { Motto } from "../components/motto";
import { useNavigate } from "react-router-dom";

export const Index = () => {
  const queryString = window.location.search;
  const urlParam = new URLSearchParams(queryString);
  let codeParam = urlParam.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    if (codeParam) {
      navigate(`/app?code=${codeParam}`, { replace: true });
    }
  }, []);

  return (
    <>
      <Hero />
      <Motto />
      <About />
      <Explore />
    </>
  );
};
