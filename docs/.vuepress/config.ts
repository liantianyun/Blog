import { defineUserConfig, defaultTheme   } from "vuepress";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { searchPlugin } from '@vuepress/plugin-search';
export default defineUserConfig ({
  title: '练天运',
  description: 'Just playing around',
  theme: defaultTheme({
    locales: {
      '/': {
        lang: 'zh-CN'
      }
    },
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
          text: '日记说明',
          link: '/diary'
        },
        {
          text: '2023年',
          collapsible: true,
          children: [
            {
              text: '三月',
              collapsible: true,
              children: [
                '/diary/2023/03/13',
                '/diary/2023/03/14',
                '/diary/2023/03/15',
                '/diary/2023/03/16',
                '/diary/2023/03/17',
                '/diary/2023/03/18',
                '/diary/2023/03/19',
                '/diary/2023/03/20',
                '/diary/2023/03/21',
                '/diary/2023/03/23',
                '/diary/2023/03/24',
                '/diary/2023/03/25',
                '/diary/2023/03/26',
                '/diary/2023/03/27',
                '/diary/2023/03/29',
                '/diary/2023/03/30',
                '/diary/2023/03/31',
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
      '/': [
        {
          text: '关于本站',
          link: '/',
        }
      ],
    },
    editLink: false,
    notFound: ['页面不存在'],
    backToHome: '回到首页',
    contributors: false,
    lastUpdatedText: '编辑时间',
  }),
  plugins: [
    googleAnalyticsPlugin({
      id: 'G-M13Y7T8PT8'
    }),
    searchPlugin(),
  ]
});