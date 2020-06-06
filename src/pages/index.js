import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import "./index.scss";
import Drawer from '../components/drawer';

class PageIndex extends React.Component {
  componentDidMount() {
    function setupTypewriter(t) {
      var HTML = t.innerHTML;

      t.innerHTML = "";

      var cursorPosition = 0,
        tag = "",
        writingTag = false,
        tagOpen = false,
        typeSpeed = 50,
        tempTypeSpeed = 0;

      var type = function() {
        if (writingTag === true) {
          tag += HTML[cursorPosition];
        }

        if (HTML[cursorPosition] === "<") {
          tempTypeSpeed = 0;
          if (tagOpen) {
            tagOpen = false;
            writingTag = true;
          } else {
            tag = "";
            tagOpen = true;
            writingTag = true;
            tag += HTML[cursorPosition];
          }
        }
        if (!writingTag && tagOpen) {
          tag.innerHTML += HTML[cursorPosition];
        }
        if (!writingTag && !tagOpen) {
          if (HTML[cursorPosition] === " ") {
            tempTypeSpeed = 0;
          } else {
            tempTypeSpeed = Math.random() * typeSpeed + 50;
          }
          t.innerHTML += HTML[cursorPosition];
        }
        if (writingTag === true && HTML[cursorPosition] === ">") {
          tempTypeSpeed = Math.random() * typeSpeed + 50;
          writingTag = false;
          if (tagOpen) {
            var newSpan = document.createElement("span");
            t.appendChild(newSpan);
            newSpan.innerHTML = tag;
            tag = newSpan.firstChild;
          }
        }

        cursorPosition += 1;
        if (cursorPosition < HTML.length) {
          setTimeout(type, tempTypeSpeed);
        }
      };

      return {
        type: type,
      };
    }

    var typer = document.getElementById("typewriter");

    typer = setupTypewriter(typer);

    typer.type();
  }

  render() {
    const { data } = this.props;
    return (
      <div className="container">
        <div className="landing-left"></div>
        <div className="landing-right"></div>
        <Drawer />
        <div className="main-content">
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
                <FontAwesomeIcon size="lg" icon={faTwitter} />
                <FontAwesomeIcon size="lg" icon={faInstagram} />
                <FontAwesomeIcon size="lg" icon={faGithub} />
                <FontAwesomeIcon size="lg" icon={faLinkedin} />
              </div>
            </div>
          </div>
          <div className="self-intro">
            <div className="paragraphs">
              <h1>Hello There</h1>
              <h2>Here's who I am and what I do</h2>
              <div className="codeblock-wrapper"></div>
              <pre id="typewriter" className="codeblock">
                <span className="highlight-const">const</span>{" "}
                <span className="highlight-variable">description </span>
                <span className="highlight-equalsign">=</span> {"{\n"}
                {"  "}
                <span className="highlight-key">name</span>:{" "}
                <span className="highlight-string">"Chenxiao Guan"</span>,{" "}
                {"\n"}
                {"  "}
                <span className="highlight-key">speaks</span>: [
                <span className="highlight-string">"English"</span>,{" "}
                <span className="highlight-string">"Chinese"</span>], {"\n"}
                {"  "}
                <span className="highlight-key">interestedIn</span>: [
                <span className="highlight-string">"Frontend Development"</span>
                , <span className="highlight-string">"DevOps"</span>,{" "}
                <span className="highlight-string">"Digital Privacy"</span>],{" "}
                {"\n"}
                {"  "}
                <span className="highlight-key">favoriteLanguage</span>:{" "}
                <span className="highlight-string">"JavaScript"</span>, {"\n"}
                {"  "}
                <span className="highlight-key">frameworkOfChoice</span>:{" "}
                <span className="highlight-string">"React"</span>, {"\n"}
                {"}"};
              </pre>
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
