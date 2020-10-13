module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'subtitle - an asian film magazine', // Navigation and Site Title
  titleAlt: 'Subtitle', // Title for JSONLD
  description: 'an asian film magazine.',
  headline: 'Writing and publishing content for LekoArts', // Headline for schema.org JSONLD
  url: 'https://subtitlemagazine.com', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  logo: '/logos/logo-1024.png', // Used for SEO
  ogLanguage: 'en_US', // Facebook Language

  // JSONLD / Manifest
  favicon: 'src/favicon.png', // Used for manifest favicon generation
  shortName: 'Prismic', // shortname for manifest. MUST be shorter than 12 characters
  author: 'LekoArts', // Author for schemaORGJSONLD
  themeColor: '#3D63AE',
  backgroundColor: '#EBEDF2',

  twitter: '@starter_prismicio', // Twitter Username
  facebook: 'gatsby-prismic', // Facebook Site Name
  googleAnalyticsID: 'UA-47519312-7',

  skipNavId: 'reach-skip-nav', // ID for the "Skip to content" a11y feature
}
