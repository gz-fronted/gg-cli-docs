import { defineConfig } from 'dumi';
import environments from './config/environments.json';

const target = process.env.DOCS_TARGET ?? 'public';
if (!Object.hasOwn(environments, target)) {
  throw new Error(`不支持的文档构建环境：${target}`);
}
const environment = environments[target as keyof typeof environments];

const rawBase = process.env.DOCS_BASE ?? '/';
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;
const origin = (process.env.DOCS_ORIGIN ?? '').replace(/\/$/, '');
const socialImage = origin ? `${origin}${base}og.png` : `${base}og.png`;

export default defineConfig({
  title: 'gz-cli',
  metas: [
    {
      name: 'description',
      content: 'gz-cli 前端脚手架安装、使用与配套工具文档',
    },
    { property: 'og:title', content: 'gz-cli' },
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
  outputPath: environment.outputPath,
  hash: true,
  theme: {
    '@c-primary': '#2563eb',
  },
  themeConfig: {
    externalLinks: environment.externalLinks,
    name: 'gz-cli',
    logo: false,
    prefersColor: {
      default: 'light',
      switch: true,
    },
    nav: [
      { title: '指南', link: '/getting-started' },
      { title: '项目模板', link: '/templates' },
      {
        title: '配套工具',
        children: [
          { title: 'gz-pc', link: '/gz-pc' },
          { title: 'gz-ui-web', link: environment.externalLinks.gzUiWeb },
        ],
      },
      { title: '常见问题', link: '/faq' },
      { title: '更新日志', link: '/changelog' },
    ],
    footer: 'gz-cli · 前端项目脚手架',
  },
});
