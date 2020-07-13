const md = require("markdown-it")();
const fs = require("fs");
const Parser = require("rss-parser");

const parser = new Parser();

(async () => {
  const feed = await parser.parseURL("https://www.mokkapps.de/rss.xml");
  console.log(feed.title);

  let result = md.render("# WIP!");

  feed.items.forEach((item) => {
    result = md.render("# Latest Blog Posts");
    result = md.render("- item.title + ":" + item.link");
    console.log(item.title + ":" + item.link);
  });


  fs.writeFile("README.md", result, function (err) {
    if (err) return console.log(err);
    console.log(`${result} > README.md`);
  });
})();
