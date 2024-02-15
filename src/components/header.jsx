import { memo } from "react";
import { Logo } from "./logo";

export const Header = memo(function Header () {
  return (
      <header>
        <Logo/>
      </header>
  );
});