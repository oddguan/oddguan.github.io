import React, { useState } from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "./drawer.scss";

const Drawer = () => {
  const [open, setOpen] = useState(false);

  let classes = "drawer";
  classes += open ? " drawer-open" : "";

  return (
    <div
      onMouseLeave={() => setOpen(false)}
      onMouseEnter={() => setOpen(true)}
      className="drawer-wrapper"
    >
      <nav className={classes}>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/blogs"}>Blogs</Link>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href="https://drive.google.com/file/d/16UJuHO9Px1LX7pEAqr4EKQJu7pj4KPrD/view?usp=sharing">Resume</a>
          </li>
        </ul>
      </nav>
      <div className="drawer-button">
        <FontAwesomeIcon icon={faChevronRight} id="arrow" />
      </div>
    </div>
  );
};

export default Drawer;
