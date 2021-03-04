module.exports = {
  siteMetadata: {
    title: `qolab | Blog`,
    name: `qolab`,
    siteUrl: `https://qolab.eu`,
    description: ``,
    hero: {
      heading: ``,
      maxWidth: 652,
    },
    social: [
      {
        name: `github`,
        url: `https://github.com/qolab`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/company/qolab-europe`,
      },
      {
        name: `facebook`,
        url: `https://facebook.com/qolab.sro/`,
      }
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `qolab | Blog`,
        short_name: `qolab`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/logo.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import'
    }
  ],
};
