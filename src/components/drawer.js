import React, { useState } from "react";
import { Link } from "gatsby";
import { slide as Menu } from "react-burger-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "./drawer.scss";
import useWindowSize from "../hooks/useWindowSize";

const Drawer = () => {
  const [desktopOpen, setDesktopOpen] = useState(false);

  const [windowWidth] = useWindowSize();
  const isMobile = windowWidth <= 768;

  let classes = "drawer";
  classes += desktopOpen ? " drawer-open" : "";

  const navItems = () => {
    return (
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/blogs"}>Blogs</Link>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://drive.google.com/file/d/16UJuHO9Px1LX7pEAqr4EKQJu7pj4KPrD/view?usp=sharing"
          >
            Resume
          </a>
        </li>
      </ul>
    );
  };

  if (!isMobile) {
    return (
      <div
        onMouseLeave={() => setDesktopOpen(false)}
        onMouseEnter={() => setDesktopOpen(true)}
        className="drawer-wrapper"
      >
        <nav className={classes}>{navItems()}</nav>
        <div className="drawer-button">
          <FontAwesomeIcon icon={faChevronRight} id="arrow" />
        </div>
      </div>
    );
  } else {
    // isMobile
    return <Menu>{navItems()}</Menu>;
  }
};

export default Drawer;
