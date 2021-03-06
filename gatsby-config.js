module.exports = {
  siteMetadata: {
    title: `Chenxiao's Blog`,
    author: `Chenxiao Guan`,
    description: `This is a technical blog`,
    siteUrl: `http://oddguan.io`,
    social: {
      instagram: `oddguan`,
    },
  },
  pathPrefix: ``,
  plugins: [
    {
      resolve: `gatsby-rehype-prismjs`,
      options: {
        classPrefix: "language-",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          "gatsby-remark-autolink-headers",
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              aliases: {
                sh: "bash",
                "c++": "cpp",
              },
              languageExtensions: [
                {
                  extend: "javascript",
                  definition: {
                    const: {
                      pattern: /(const\s+)[\w.\\]+/,
                      lookbehind: true,
                      greedy: true,
                    },
                    let: {
                      pattern: /(\blet\s+)[\w.\\]+/,
                      lookbehind: true,
                      greedy: true,
                    },
                    this: {
                      pattern: /(\bthis)+/,
                      greedy: true,
                    },
                  },
                },
              ],
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-emoji`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chenxiao's Blog`,
        short_name: `Chenxiao`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/favicon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: `./src/favicon.png`,
      },
    },
  ],
};
