import { defineUserConfig, defaultTheme   } from "vuepress";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { searchPlugin } from '@vuepress/plugin-search';
export default defineUserConfig ({
  title: '练天运的网络日志',
  description: 'Just playing around',
  head: [['link', { rel: 'icon', href: '/images/book.png' }]],
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
      {
        text: '作文',
        link: '/articles',
      },
      {
        text: '技术',
        link: '/tech',
      },
    ],
    sidebar: {
      '/books': [
        {
          text: '阅读',
          link: '/books',
        }
      ],
      '/articles': [
        {
          text: '作文',
          link: '/articles',
          children: [
            '/articles/mum'
          ]
        }
      ],
      '/tech': [
        {
          text: '技术',
          link: '/tech',
          children: [
            {
              text: 'React',
              collapsible: true,
              children: [
                '/tech/react/understandFc.md'
              ]
            },
            {
              text: '工程化',
              children: [
                '/tech/engineering/packageManager.md'
              ]
            },
            {
              text: '职业生涯',
              children: [
                '/tech/career/workExperience.md'
              ]
            },
          ]
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
    logo: '/images/logo.png'
  }),
  plugins: [
    googleAnalyticsPlugin({
      id: 'G-M13Y7T8PT8'
    }),
    searchPlugin(),
  ]
});