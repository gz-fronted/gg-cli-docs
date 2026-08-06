import { defineConfig } from 'dumi';

const rawBase = process.env.DOCS_BASE ?? '/';
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;
const origin = (process.env.DOCS_ORIGIN ?? '').replace(/\/$/, '');
const socialImage = origin ? `${origin}${base}og.png` : `${base}og.png`;

export default defineConfig({
  title: 'gg-cli',
  metas: [
    {
      name: 'description',
      content: 'gg-cli 前端脚手架安装、使用与配套工具文档',
    },
    { property: 'og:title', content: 'gg-cli' },
    {
      property: 'og:description',
      content: '一条命令，创建符合团队约定的 React 项目',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: socialImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: socialImage },
  ],
  base,
  publicPath: base,
  outputPath: 'dist',
  hash: true,
  theme: {
    '@c-primary': '#2563eb',
  },
  themeConfig: {
    name: 'gg-cli',
    logo: false,
    prefersColor: {
      default: 'light',
      switch: true,
    },
    nav: [
      { title: '快速开始', link: '/getting-started' },
      { title: '项目命令', link: '/commands' },
      { title: '项目模板', link: '/templates' },
      {
        title: '配套工具',
        children: [
          { title: 'gz-pc', link: '/gz-pc' },
          { title: 'gg-ui', link: '/gg-ui' },
        ],
      },
      { title: '常见问题', link: '/faq' },
      { title: '部署', link: '/resources' },
    ],
    footer: 'gg-cli · 前端项目脚手架',
  },
});
