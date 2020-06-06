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

class PageIndex extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="container">
        <div className="landing-left"></div>
        <div className="landing-right"></div>
        <div className="main-content">
          <div className="self-intro">
            <div className="paragraphs">
              <h1>Hello There</h1>
              <h2>Here's who I am and what I do</h2>
              <div className="buttons">
                <button>RESUME</button>
                <button>CONTACT</button>
              </div>
              <p>
                I am currently a Master's student at Carnegie Mellon University
                studying Information Technology - Privacy Engineering. My
                favorite programming language is JavaScript.
              </p>
            </div>
          </div>
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
        fixed(width: 200, height: 200, quality: 90) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
