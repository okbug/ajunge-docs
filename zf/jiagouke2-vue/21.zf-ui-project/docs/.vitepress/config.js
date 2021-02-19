module.exports = {
    title: 'zf-ui', // 设置网站标题
    description: 'ui 库', //描述
    dest: './build', // 设置输出目录
    themeConfig: { //主题配置
        nav: [
            { text: '主页', link: '/' },
            { text: '联系我', link: '/contact/' },
            { text: '我的博客', link: 'https://' },
        ],
        // 为以下路由添加侧边栏
        sidebar: [
            {
                text: 'Button 按钮', // 必要的
                link: '/button/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1, // 可选的, 默认值是 1
            },
            {
                text: 'Icon 图标', // 必要的
                link: '/icon/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1, // 可选的, 默认值是 1
            },
        ]
    }
}