const md = require("markdown-it")();
const fs = require("fs");
const Parser = require("rss-parser");

const parser = new Parser();

(async () => {
  const feed = await parser.parseURL("https://www.mokkapps.de/rss.xml");
  console.log(feed.title);

  let text = "# Latest Blog Posts &nbsp;"

  feed.items.forEach((item) => {
    text += `- T${item.title} : ${item.link} &nbsp;`;
  });

  const result = md.render(text);

  fs.writeFile("README.md", result, function (err) {
    if (err) return console.log(err);
    console.log(`${result} > README.md`);
  });
})();
