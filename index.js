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
const xUrl = 'https://x.com/mokkapps';
const linkedInUrl = 'https://www.linkedin.com/in/mokkapps';

// LinkedIn was removed from Simple Icons, so shields.io needs the logo inline
const linkedInLogo = Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
).toString('base64');

const badge = ({ label, color, logo, url, alt }) =>
  `<a href="${url}" target="_blank" rel="noreferrer nofollow"><img src="https://img.shields.io/badge/${encodeURIComponent(label)}-${color}?style=for-the-badge&logo=${encodeURIComponent(logo)}&logoColor=white" alt="${alt}" height="32"></a>`;

const generateReadme = () => {
  const headerImage = `<img src="header.png" alt="Hi, I'm Michael – Senior Vue.js & Nuxt freelancer for complex web apps">`;

  const xBadge = badge({
    label: '@mokkapps',
    color: '000000',
    logo: 'x',
    url: xUrl,
    alt: 'Follow me on X',
  });
  const linkedInBadge = badge({
    label: 'LinkedIn',
    color: '0A66C2',
    logo: `data:image/svg+xml;base64,${linkedInLogo}`,
    url: linkedInUrl,
    alt: 'Connect on LinkedIn',
  });

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
  ${xBadge} ${linkedInBadge}\n\n
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
