module.exports = [
  {
    text: 'Document',
    link: '/document/'
  },
  // NavbarItem
  {
    text: 'Foo',
    link: '/foo/',
  },
  // NavbarGroup
  {
    text: 'Group',
    children: ['/group/foo.md', '/group/bar.md'],
  },
  {
    text: '嵌套Group',
    children: [
      {
        text: 'SubGroup',
        children: ['/group/sub/foo.md', '/group/sub/bar.md'],
      },
    ],
  },
  // 控制元素何时被激活
  {
    text: 'Group 2',
    children: [
      {
        text: 'Always active',
        link: '/foo',
        // 该元素将一直处于激活状态
        activeMatch: '/foo',
      },
      {
        text: 'Active on /foo/',
        link: '/not-foo/',
        // 该元素在当前路由路径是 /foo/ 开头时激活
        // 支持正则表达式
        activeMatch: '^/foo/',
      },
    ],
  }
]