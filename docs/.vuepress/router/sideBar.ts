module.exports = {
  // SidebarItem
  '/document/': [
    {
      text: '数组',
      collapsible: true,
      children: ['array-one.md', 'array-two.md']
    },
    {
      text: '对象',
      collapsible: true,
      children: ['object-one.md', 'object-two.md']
    },
    {
      text: '字符串',
      collapsible: true,
      children: ['string-one.md']
    },
    {
      text: 'JSON',
      collapsible: true,
      children: ['json.md']
    },
    {
      text: 'ES6',
      collapsible: true,
      children: ['es6-one.md', 'es6-two.md']
    },
    {
      text: 'JS',
      collapsible: true,
      children: ['js-one.md', 'js-two.md']
    },
    {
      text: 'VUE',
      collapsible: true,
      children: ['vue-one.md', 'vue-two.md', 'vue-three.md']
    },
    {
      text: 'Flex',
      collapsible: true,
      children: ['flex-one.md', 'flex-two.md', 'flex-three.md']
    },
    {
      text: 'Echars',
      collapsible: true,
      children: ['echarts-one.md', 'echarts-two.md', 'echarts-three.md']
    },
    {
      text: 'Moment',
      collapsible: true,
      children: ['moment-one.md']
    },
    {
      text: 'Awe-dnd',
      collapsible: true,
      children: ['awe-dnd.md']
    },
    {
      text: 'qrcode',
      collapsible: true,
      children: ['qrcode.md']
    },
    {
      text: 'wangeditor',
      collapsible: true,
      children: ['wangeditor.md']
    },
    {
      text: 'element-ui',
      collapsible: true,
      children: ['element-ui-one.md', 'element-ui-two.md']
    },
    {
      text: '实战',
      collapsible: true,
      children: ['actual-combat.md']
    }
  ],
  '/group/': [
    {
      text: 'VuePress group',
      collapsible: true,
      children: ['/group/bar.md', '/group/foo.md'],
    },
    {
      text: 'Bundlers group',
      collapsible: true,
      children: ['/group/sub/bar.md', '/group/sub/foo.md'],
    },
  ]
}