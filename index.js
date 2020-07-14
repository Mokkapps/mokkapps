const md = require("markdown-it")({
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
  let text = "";
  try {
    text = await loadBlogPosts(text);
  } catch (e) {
    console.error(`Failed to load blog posts from ${websiteUrl}`, e);
  }

  const result = md.render(text);

  fs.writeFile("README.md", result, function (err) {
    if (err) return console.log(err);
    console.log(`${result} > README.md`);
  });
})();

async function loadBlogPosts(text) {
  const feed = await parser.parseURL(feedUrl);

  text = "# Latest Blog Posts \n";

  feed.items.slice(0, blogPostLimit).forEach((item) => {
    text += `- ${item.title} : ${item.link} \n`;
  });

  text += `\n More blog posts at ${websiteUrl}`;
  return text;
}
