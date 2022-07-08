# Hello VuePress

# 粗体
**shadow**
__shadow__

# 斜体
*shadow*
_斜体文字_

# 删除线
~~删除~~

# 粗体和嵌入的斜体
**shadow_ 斜体_**

# 全部粗体和斜体
***全部***

# 下标
111<sub>下标</sub>

# 上标
222<sup>上标</sup>

# 表格
| First Header  | Second Header |
| --- | --- |
| Content Cell  | Content Cell111111111111111111  |
| Content Cell  | Content Cell  |

| Left-aligned | Center-aligned | Right-aligned |
| :---         |     :---:      |          ---: |
| git status   | git status     | git status    |
| git diff     | git diff       | git diff      |

| Command | Description |
| --- | --- |
| `git status` | List all *new or modified* files |
| `git diff` | Show file differences that **haven't been** staged |

| Name     | Character |
| ---      | ---       |
| Backtick | `         |
| Pipe     | \|        |

# 链接
<!-- 相对路径 -->
[首页](../README.md)

[配置参考](../reference/config.md)

[快速上手](./getting-started.md)

<!-- 绝对路径 -->
[指南](/zh/guide/README.md)

[配置参考 > markdown.links](/zh/reference/config.md#links)

<!-- URL -->
[GitHub](https://github.com)

# 目录
[[toc]]
## 123
## 456
### 789

# 代码块
```ts{1,6-8}
import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: '你好， VuePress',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
  }),
})
```

# 行号
```ts
// 行号默认是启用的
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:no-line-numbers
// 行号被禁用
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

# 添加v-pre
```md
<!-- 默认情况下，这里会被保持原样 -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```md:no-v-pre
<!-- 这里会被 Vue 编译 -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```js:no-v-pre
// 由于 JS 代码高亮，这里不会被正确编译
const onePlusTwoPlusThree = {{ 1 + 2 + 3 }}
```

# 导入代码块
<!-- 最简单的语法 -->
@[code](./.vuepress/config.ts)

@[code{1-8} ts{2,4-5}](@vuepress/config.ts)

# 使用vue
一加一等于： {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} </span>
<div>我是div</div>
<p>我是p</p>

# 引入图片
![VuePress Logo](/1webp.webp)

![VuePress Logo](@image/11.webp)

# 自定义容器
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个 details 标签
:::

::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码
```js
console.log('你好，VuePress！')
```
:::

:::: code-group
::: code-group-item FOO
```js
const foo = 'foo'
```
:::
::: code-group-item BAR
```js
const bar = 'bar'
```
:::
::::
