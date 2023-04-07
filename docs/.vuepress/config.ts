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
    sidebar: {
      '/books': [
        {
          text: '阅读',
          link: '/books',
        }
      ],
      '/diary': [
        {
          text: '2023年',
          collapsible: true,
          children: [
            {
              text: '三月',
              collapsible: true,
              children: [
                '/diary/2023/03/30',
              ]
            },
            {
              text: '四月',
              collapsible: true,
              children: [
                '/diary/2023/04/01',
                '/diary/2023/04/02',
                '/diary/2023/04/03',
                '/diary/2023/04/04',
                '/diary/2023/04/05',
                '/diary/2023/04/06',
                '/diary/2023/04/07',
              ]
            }
          ]
        },
      ],
      '/': [],
    },
    editLink: false,
    notFound: ['页面不存在'],
    backToHome: '回到首页',
    contributors: false,
    lastUpdatedText: '编辑时间',
    repo: 'https://github.com/liantianyun/Blog',
  })
});