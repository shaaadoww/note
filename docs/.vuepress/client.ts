import { defineClientConfig } from '@vuepress/client'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import showLocaleString from './global-directives/showLocaleString'

export default defineClientConfig({
  enhance ({ app, router, siteData }) {
    app.use(ElementPlus);
    app.directive('localeString', showLocaleString)

    router.beforeEach((to) => {
      console.log('before navigation')
    })

    router.afterEach((to) => {
      console.log('after navigation')
    })
  },
  setup(){},
  rootComponents: [],
})