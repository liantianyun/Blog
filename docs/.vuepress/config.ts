import { defineUserConfig, defaultTheme   } from "vuepress";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { searchPlugin } from '@vuepress/plugin-search';
import { sitemapPlugin } from "vuepress-plugin-sitemap2";
export default defineUserConfig ({
  title: '练天运的网络日志',
  description: 'Just playing around',
  head: [
    ['link', { rel: 'icon', href: '/images/book.png' }],
    ['meta', { name: 'baidu-site-verification', content: 'codeva-DhpnfJpQZa' }]
  ],
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
          link: '/books'
        }
      ],
      '/articles': [
        {
          text: '作文',
          link: '/articles',
          children: [
            '/articles/mum',
            '/articles/yhhwd3',
            '/articles/cfzy'
          ]
        }
      ],
      '/tech': [
        {
          text: '技术',
          link: '/tech',
          children: [
            {
              text: '计算机网络',
              children: [
                '/tech/softEngine/network.md',
              ]
            },
            {
              text: '数据结构和算法',
              children: [
                '/tech/dataStruct/listNode.md',
                '/tech/dataStruct/hashMap.md',
                '/tech/jszh/binaryAdd.md',
              ]
            },
            {
              text: 'React',
              children: [
                '/tech/react/understandFc.md'
              ]
            },
            {
              text: 'ahooks源码',
              children: [
                '/tech/react/ahooks/useMemorizedFn.md'
              ]
            },
            {
              text: '算法',
              children: [
                '/tech/jszh/maxCountTotal.md',
                '/tech/jszh/maxCountTotal2.md',
                '/tech/jszh/maxCountTotal3.md',
              ]
            },
            {
              text: '工程化',
              children: [
                '/tech/engineering/packageManager.md'
              ]
            },
            {
              text: 'VuePress2',
              children: [
                '/tech/vuePress2/build.md'
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
                '/diary/2023/04/08',
                '/diary/2023/04/09',
                '/diary/2023/04/10',
                '/diary/2023/04/11',
                '/diary/2023/04/12',
                '/diary/2023/04/13',
                '/diary/2023/04/14',
                '/diary/2023/04/15',
                '/diary/2023/04/16',
                '/diary/2023/04/17',
                '/diary/2023/04/18',
                '/diary/2023/04/19',
                '/diary/2023/04/20',
                '/diary/2023/04/21',
                '/diary/2023/04/22',
                '/diary/2023/04/23',
                '/diary/2023/04/24',
                '/diary/2023/04/25',
                '/diary/2023/04/27',
                '/diary/2023/04/28',
                '/diary/2023/04/29',
                '/diary/2023/04/30',
              ]
            },
            {
              text: '五月',
              collapsible: true,
              children: [
                '/diary/2023/05/1.md',
                '/diary/2023/05/4.md',
                '/diary/2023/05/5.md',
                '/diary/2023/05/6.md',
                '/diary/2023/05/7.md',
                '/diary/2023/05/8.md',
                '/diary/2023/05/9.md',
                '/diary/2023/05/10.md',
                '/diary/2023/05/11.md',
                '/diary/2023/05/12.md',
                '/diary/2023/05/13.md',
                '/diary/2023/05/14.md',
                '/diary/2023/05/15.md',
                '/diary/2023/05/16.md',
                '/diary/2023/05/17.md',
                '/diary/2023/05/18.md',
                '/diary/2023/05/19.md',
                '/diary/2023/05/20.md',
                '/diary/2023/05/21.md',
                '/diary/2023/05/22.md',
                '/diary/2023/05/23.md',
                '/diary/2023/05/24.md',
              ]
            },
            {
              text: '六月',
              children: [
                '/diary/2023/06/01.md',
                '/diary/2023/06/02.md',
                '/diary/2023/06/15.md',
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
    sitemapPlugin({
      hostname: 'https://liantianyun.top/'
    })
  ]
});