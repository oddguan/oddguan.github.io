import React from 'react';

export default class Comments extends React.Component {
  componentDidMount() {
    let script = document.createElement("script");
    let anchor = document.getElementById("inject-comments-for-uterances");
    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", true);
    script.setAttribute("repo", "oddguan/oddguan.io");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", "github-dark");
    script.setAttribute("label", "blog-comments");
    anchor.appendChild(script);
  }

  render() {
    return <div id="inject-comments-for-uterances"></div>;
  }
}