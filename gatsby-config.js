module.exports = {
  siteMetadata: {
    title: `Blog - qolab`,
    name: `qolab`,
    siteUrl: `https://blog.qolab.eu`,
    description: `Prečítajte si články od našich najlepších ľudí. Venujeme sa prevažne témam v oblasti vývoja webových aplikácii, ale nájdete u nás aj iné zaujímavé odvetvia.`,
    hero: {
      heading: `Vitajte, prečítajte si články od našich najlepších ľudí.`,
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
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/logo.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
      },
    },
    {
      resolve: 'gatsby-plugin-root-import'
    }
  ],
};
