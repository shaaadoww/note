import { defineUserConfig, defaultTheme } from 'vuepress'
import { path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'shadow docs',
  description: 'shadow docs',
  head: [['link', { rel: 'icon', href: '/11.webp' }]],
  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(/^@vuepress/, path.resolve(__dirname, './')),
    }
  },
  alias: {
    '@image': path.resolve(__dirname, './public')
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/en/': {
      lang: 'en-US',
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器',
    },
  },
  theme: defaultTheme({
    locales: {
      '/MyBlog/': {
        selectLanguageName: 'English',
      },
      '/zh/': {
        selectLanguageName: '简体中文',
      },
    },

    editLink: true,
    editLinkText: '编辑此页',
    lastUpdated: true,
    lastUpdatedText: '更新时间',
    contributors: false,
    contributorsText: '贡献者',

    navbar: require('./router/nav'),
    sidebar: require('./router/sideBar')
  }),
  plugins: [
    // 注册vue组件
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    })
    // registerComponentsPlugin({
    //   components: {
    //     Shadow: path.resolve(__dirname, './components/Shadow.vue'),
    //   },
    // })
  ]
})