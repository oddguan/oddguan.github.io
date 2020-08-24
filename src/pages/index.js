import React from "react";
import { graphql } from "gatsby";
import Typed from "typed.js";
import Img from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import "./index.scss";
import Drawer from "../components/drawer";

class PageIndex extends React.Component {
  componentDidMount() {
    new Typed("#typer", {
      strings: [
        `
        <span class="highlight-const">const</span> 
          <span class="highlight-variable">description</span> <span class="highlight-equalsign">=</span> {<br> 
          &nbsp;&nbsp;<span class="highlight-key">name</span>: <span class="highlight-string">"Chenxiao Guan"</span>,<br>
          &nbsp;&nbsp;<span class="highlight-key">speaks</span>: [<span class="highlight-string">"English"</span>, <span class="highlight-string">"Mandarin Chinese"</span>],<br>
          &nbsp;&nbsp;<span class="highlight-key">interestedIn</span>: [<span class="highlight-string">"Web Development"</span>, <span class="highlight-string">"DevOps"</span>, <span class="highlight-string">"Digital Privacy"</span>],<br>
          &nbsp;&nbsp;<span class="highlight-key">favoriteLanguage</span>: <span class="highlight-string">"JavaScript"</span>,<br>
          &nbsp;&nbsp;<span class="highlight-key">frameworksOfChoice</span>: [<span class="highlight-string">"React"</span>, <span class="highlight-string">"Express"</span>],<br>
        };`,
      ],
      typeSpeed: 30,
    });
  }

  render() {
    const { data } = this.props;
    return (
      <div id="app-container" className="container">
        <SEO
          title="Home"
          keywords={[
            `Chenxiao Guan`,
            `Chenxiao`,
            `Guan`,
            `Software Engineer`,
            `Student`,
            `Technical Blog`,
          ]}
        />
        <div className="landing-left"></div>
        <div className="landing-right"></div>
        <div id="main-content" className="main-content">
          <Drawer />
          <div className="personal-card">
            <div className="personal-card-main">
              <Img
                className="personal-card-icon"
                fixed={data.file.childImageSharp.fixed}
              />
            </div>
            <div className="personal-card-name">
              <h2>Chenxiao</h2>
              <h2>Guan</h2>
            </div>
            <div className="personal-card-title">
              <span className="separate"></span>
              <h4>Aspiring Software Engineer</h4>
            </div>
            <div className="personal-card-bottom">
              <div className="socialmedia-icons">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://twitter.com/tismy97"
                >
                  <FontAwesomeIcon size="lg" icon={faTwitter} />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://instagram.com/oddguan"
                >
                  <FontAwesomeIcon size="lg" icon={faInstagram} />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/oddguan"
                >
                  <FontAwesomeIcon size="lg" icon={faGithub} />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://linkedin.com/in/chenxiao-guan"
                >
                  <FontAwesomeIcon size="lg" icon={faLinkedin} />
                </a>
              </div>
            </div>
          </div>
          <div className="self-intro">
            <div className="paragraphs">
              <h1>Hello There!</h1>
              <h2>Welcome to my space on the World Wide Web.</h2>
              <div id="typer-wrapper">
                <div id="typer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageIndex;

export const pageQuery = graphql`
  query {
    file(absolutePath: { regex: "/icon_squared.jpg/" }) {
      childImageSharp {
        fixed(width: 200, height: 200, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
