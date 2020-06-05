import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

import "./index.scss";

class PageIndex extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="container">
        <div className="landing-left">This is on the left</div>
        <div className="landing-right">This is on the right</div>
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
            <hr className="separate" />
            <h4>Aspiring Software Engineer</h4>
          </div>
          <div className="personal-card-bottom">
            <FontAwesomeIcon icon={faTwitter} />
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
        fixed(width: 175, height: 175) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
