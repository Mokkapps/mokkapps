const md = require("markdown-it")({
  html: true, // Enable HTML tags in source
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
});
const emoji = require("markdown-it-emoji");
const fs = require("fs");
const Parser = require("rss-parser");

const parser = new Parser();

const feedUrl = "https://www.mokkapps.de/rss.xml";
const websiteUrl = "https://www.mokkapps.de";
const twitterUrl = "https://www.twitter.com/mokkapps";
const linkedInUrl = "https://www.linkedin.com/in/michael-hoffmann-3b8933b1";
const instagramUrl = "https://www.instagram.com/mokkapps/";
const mediumUrl = "https://medium.com/@MokkappsDev";
const devToUrl = "https://dev.to/mokkapps";
const blogPostLimit = 5;
const badgeHeight = "25";

md.use(emoji);

(async () => {
  let blogPosts = "";
  try {
    blogPosts = await loadBlogPosts();
  } catch (e) {
    console.error(`Failed to load blog posts from ${websiteUrl}`, e);
  }

  const headerImage = `<img src="https://github.com/mokkapps/mokkapps/blob/master/header.png" alt="Mokkapps GitHub README header image">`;
  const twitterImage = `[<img src="https://github.com/mokkapps/mokkapps/blob/master/tweet.png" width="600">](${twitterUrl})`;
  const twitterBadge = `[<img src="https://img.shields.io/badge/twitter-%231DA1F2.svg?&style=for-the-badge&logo=twitter&logoColor=white" height=${badgeHeight}>](${twitterUrl})`;
  const linkedInBadge = `[<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" height=${badgeHeight}>](${linkedInUrl})`;
  const instagramBadge = `[<img src="https://img.shields.io/badge/instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white" height=${badgeHeight}>](${instagramUrl})`;
  const mediumBadge = `[<img src="https://img.shields.io/badge/medium-%2312100E.svg?&style=for-the-badge&logo=medium&logoColor=white" height=${badgeHeight}>](${mediumUrl})`;
  const devToBadge = `[<img src="https://img.shields.io/badge/DEV.TO-%230A0A0A.svg?&style=for-the-badge&logo=dev-dot-to&logoColor=white" height=${badgeHeight}>](${devToUrl})`;

  const buyMeACoffeeButton = `<a href="https://www.buymeacoffee.com/mokkapps" target="_blank" rel="noreferrer nofollow">
      <img src="https://cdn.buymeacoffee.com/buttons/default-red.png" alt="Buy Me A Coffee" height="40" width="170" >
    </a>`;

  const text = `${headerImage}\n\n
  ${twitterBadge} ${linkedInBadge} ${instagramBadge} ${mediumBadge} ${devToBadge}\n\n
  [:arrow_right: Check out my website](${websiteUrl})\n\n
  ${buyMeACoffeeButton}\n\n
  ## Latest Blog Posts\n
  ${blogPosts}\n
  ## Last Tweet\n
  ${twitterImage}\n\n
  ## GitHub Stats\n
  ![GitHub Stats](https://github-readme-stats.vercel.app/api?username=mokkapps&show_icons=true)`;

  const result = md.render(text);

  fs.writeFile("README.md", result, function (err) {
    if (err) return console.log(err);
    console.log(`${result} > README.md`);
  });
})();

async function loadBlogPosts() {
  const feed = await parser.parseURL(feedUrl);

  let links = "";

  feed.items.slice(0, blogPostLimit).forEach((item) => {
    links += `<li><a href=${item.link}>${item.title}</a></li>`;
  });

  return `
  <ul>
    ${links}
  </ul>\n
  [:arrow_right: More blog posts](${websiteUrl}/blog)
  `;
}
