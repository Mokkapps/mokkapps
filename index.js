import markdownit from 'markdown-it';
import fs from 'fs';

const md = markdownit({
  html: true, // Enable HTML tags in source
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
});

const portfolioUrl = 'https://mokkapps.de';
const starterKitUrl = 'https://nuxtstarterkit.com';
const vueDigestUrl = 'https://vuedigest.com';

const badge = ({ label, color, logo, url, alt }) =>
  `<a href="${url}" target="_blank" rel="noreferrer nofollow"><img src="https://img.shields.io/badge/${encodeURIComponent(label)}-${color}?style=for-the-badge&logo=${encodeURIComponent(logo)}&logoColor=white" alt="${alt}" height="32"></a>`;

const generateReadme = () => {
  const headerImage = `<img src="header.png" alt="Hi, I'm Michael – Senior Vue.js & Nuxt freelancer for complex web apps">`;

  const portfolioButton = badge({
    label: 'Visit mokkapps.de',
    color: '00342F',
    logo: 'vuedotjs',
    url: portfolioUrl,
    alt: 'Visit my portfolio',
  });

  const nuxtStarterKitPromo = `<a href="${starterKitUrl}" target="_blank" rel="noreferrer nofollow">
      <img src="nuxtstarterkit.png" alt="Nuxt SaaS Starter Kit – Ship your Nuxt SaaS in days, not months" width="100%">
    </a>`;

  const vueDigestPromo = `<a href="${vueDigestUrl}" target="_blank" rel="noreferrer nofollow">
      <img src="vuedigest.png" alt="Vue Digest – Your daily dose of Vue.js & Nuxt news" width="100%">
    </a>`;

  const text = `${headerImage}\n\n
  ## 🧑‍💻 Portfolio\n
  Senior Vue.js & Nuxt freelancer for complex web apps. Check out my projects, services and how I can help your team.\n
  ${portfolioButton}\n\n
  ## 🚀 Nuxt SaaS Starter Kit\n
  ${nuxtStarterKitPromo}\n\n
  ## 📰 Vue Digest\n
  Your daily dose of Vue.js & Nuxt: latest news, ecosystem releases & conferences.\n
  ${vueDigestPromo}`;

  const result = md.render(text);

  fs.writeFileSync('README.md', result);
  console.log(`✅ Successfully wrote README.md file`);
  console.log(result);
};

try {
  generateReadme();
} catch (error) {
  console.error('🚨 Failed to generate README', error);
}
