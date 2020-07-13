const md = require("markdown-it")();
const fs = require("fs");
const Parser = require("rss-parser");

const parser = new Parser();

(async () => {
  const feed = await parser.parseURL("https://www.mokkapps.de/rss.xml");
  console.log(feed.title);

  feed.items.forEach((item) => {
    console.log(item.title + ":" + item.link);
  });

  const result = md.render("# WIP!");

  fs.writeFile("README.md", result, function (err) {
    if (err) return console.log(err);
    console.log(`${result} > README.md`);
  });
})();
