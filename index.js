import markdownit from 'markdown-it';
import { full as emoji } from 'markdown-it-emoji';
import fs from 'fs';
import Parser from 'rss-parser';

const md = markdownit({
  html: true, // Enable HTML tags in source
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
});
md.use(emoji);

const parser = new Parser();

const feedUrl = 'https://mokkapps.de/rss.xml';
const newsletterFeedUrl = 'https://weekly-vue.news/rss.xml';
const websiteUrl = 'https://mokkapps.de';
const newsletterUrl = 'https://weekly-vue.news';
const xUrl = 'https://www.x.com/mokkapps';
const linkedInUrl = 'https://www.linkedin.com/in/mokkapps';
const instagramUrl = 'https://www.instagram.com/mokkapps/';
const youTubeUrl = 'https://www.youtube.com/@mokkapps';
const mediumUrl = 'https://medium.com/@MokkappsDev';
const devToUrl = 'https://dev.to/mokkapps';
const blogPostLimit = 5;
const newsletterIssueLimit = 5;
const badgeHeight = '25';

async function loadBlogPosts() {
  console.log(`🏗️ Fetching blog posts from ${feedUrl}`);
  const feed = await parser.parseURL(feedUrl);
  console.log(`✅ Fetched ${feed.items.length} blog posts from ${websiteUrl}`);

  let links = '';

  feed.items.slice(0, blogPostLimit).forEach((item) => {
    links += `<li><a href=${item.link} target="_blank" rel="noreferrer nofollow">${item.title}</a></li>`;
  });

  return `
  <ul>
  ${links}
  </ul>\n
  [:arrow_right: More blog posts](${websiteUrl}/blog)
  `;
}

async function loadNewsletterIssues() {
  console.log(`🏗️ Fetching newsletter issues from ${newsletterFeedUrl}`);
  const feed = await parser.parseURL(newsletterFeedUrl);
  console.log(
    `✅ Fetched ${feed.items.length} newsletter issues from ${newsletterFeedUrl}`,
  );

  let links = '';

  feed.items.slice(0, newsletterIssueLimit).forEach((item) => {
    links += `<li><a href=${item.link} target="_blank" rel="noreferrer nofollow">${item.title}</a></li>`;
  });

  return `
  <ul>
    ${links}
  </ul>\n
  [:arrow_right: More issues](${newsletterUrl}/issues)
  `;
}

const generateReadme = async () => {
  let blogPosts = '';
  try {
    blogPosts = await loadBlogPosts();
  } catch (error) {
    console.error(`🚨 Failed to load blog posts from ${websiteUrl}`, error);
  }

  let newsletterIssues = '';
  try {
    newsletterIssues = await loadNewsletterIssues();
  } catch (error) {
    console.error(`🚨 Failed to load newsletter issues`, e);
  }

  const headerImage = `<img src="https://github.com/Mokkapps/mokkapps/blob/master/header.png" alt="Mokkapps GitHub README header image">`;
  const twitterBadge = `[<img src="https://img.shields.io/badge/twitter-%231DA1F2.svg?&style=for-the-badge&logo=twitter&logoColor=white" height=${badgeHeight}>](${xUrl})`;
  const linkedInBadge = `[<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" height=${badgeHeight}>](${linkedInUrl})`;
  const instagramBadge = `[<img src="https://img.shields.io/badge/instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white" height=${badgeHeight}>](${instagramUrl})`;
  const youTubeBadge = `[<img src="https://img.shields.io/badge/youtube-%2312100E.svg?&style=for-the-badge&logo=youtube&logoColor=white" height=${badgeHeight}>](${youTubeUrl})`;
  const mediumBadge = `[<img src="https://img.shields.io/badge/medium-%2312100E.svg?&style=for-the-badge&logo=medium&logoColor=white" height=${badgeHeight}>](${mediumUrl})`;
  const devToBadge = `[<img src="https://img.shields.io/badge/DEV.TO-%230A0A0A.svg?&style=for-the-badge&logo=dev-dot-to&logoColor=white" height=${badgeHeight}>](${devToUrl})`;

  const buyMeACoffeeButton = `<a href="https://www.buymeacoffee.com/mokkapps" target="_blank" rel="noreferrer nofollow">
      <img src="https://cdn.buymeacoffee.com/buttons/default-red.png" alt="Buy Me A Coffee" height="40" width="170" >
    </a>`;

  const nuxtStarterKitPromo = `<a href="https://nuxtstarterkit.com" target="_blank" rel="noreferrer nofollow">
      <img src="https://mokkapps.twic.pics/nuxtstarterkit.com/promo.png" alt="Nuxt Starter Kit" height="500" >
    </a>`;

  const text = `${headerImage}\n\n
  ${twitterBadge} ${linkedInBadge} ${instagramBadge} ${youTubeBadge} ${mediumBadge} ${devToBadge}\n\n
  ## Check My Nuxt Starter Kit\n
  ${nuxtStarterKitPromo}\n\n
  ## Latest Blog Posts\n
  ${blogPosts}\n
  ## Latest Newsletter Issues\n
  ${newsletterIssues}\n
  ## GitHub Stats\n
  ![GitHub Stats](https://github-readme-stats.vercel.app/api?username=mokkapps&show_icons=true)\n\n
  ${buyMeACoffeeButton}`;

  const result = md.render(text);

  fs.writeFileSync('README.md', result);
  console.log(`✅ Successfully wrote README.md file`);
  console.log(result);
};

try {
  await generateReadme();
} catch (error) {
  console.error('🚨 Failed to generate README', error);
} finally {
  process.exit();
}
