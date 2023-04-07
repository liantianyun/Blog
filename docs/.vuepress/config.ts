import { defineUserConfig, defaultTheme   } from "vuepress";

export default defineUserConfig ({
  title: '练天运',
  description: 'Just playing around',
  theme: defaultTheme({
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '日记',
        link: '/diary',
      },
      {
        text: '阅读',
        link: '/books',
      },
    ],
  })
});