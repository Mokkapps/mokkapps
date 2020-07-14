const md = require("markdown-it")({
  html: true,   // Enable HTML tags in source
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
});
const fs = require("fs");
const Parser = require("rss-parser");

const parser = new Parser();

const feedUrl = "https://www.mokkapps.de/rss.xml";
const websiteUrl = "https://www.mokkapps.de";
const blogPostLimit = 5;

(async () => {
  let blogPosts = "";
  try {
    blogPosts = await loadBlogPosts();
  } catch (e) {
    console.error(`Failed to load blog posts from ${websiteUrl}`, e);
  }

  const tweets = `\n\n <a class="twitter-timeline" data-height="700" href="https://twitter.com/Mokkapps?ref_src=twsrc%5Etfw">Tweets by Mokkapps</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`;

  text = `
<table>
    <tr>
        <th>Latest Blog Posts</th>
        <th>Tweets</th>
    </tr>
    <td>${blogPosts}</td>
    <td>${tweets}</td>
</table>
  `;

  const twitterImage = `<img src="https://github.com/mokkapps/mokkapps/blob/master/tweet.png" width="600">    `

  const result = md.render(text);

  fs.writeFile("README.md", result, function (err) {
    if (err) return console.log(err);
    console.log(`${result} > README.md`);
  });
})();

async function loadBlogPosts() {
  const feed = await parser.parseURL(feedUrl);

  let links = '';

  feed.items.slice(0, blogPostLimit).forEach((item) => {
    links += `<li><a href=${item.link}>${item.title}</a></li>`;
  });

  return `
  <ul>
    ${links}
  </ul>
  <a href=${websiteUrl}/blog>More blog posts</a>
  `;
}
