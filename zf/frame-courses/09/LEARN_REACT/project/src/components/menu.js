import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
export default [
  {
    key: '/',
    title: "Dashboard",
    icon: '',
    children: [
      {
        key: '/introduce',
        title: '系统介绍',
        icon: AppstoreOutlined
      },
      {
        key: '/dashboard',
        title: 'Dashboard',
        icon: MenuUnfoldOutlined
      },
      {
        key: '/add',
        title: '添加商品',
        level: 6,
        icon: MenuFoldOutlined
      }
    ]
  },
  {
    key: '/homeset',
    title: "首页配置",
    icon: '',
    children: [
      {
        key: '/swiper',
        title: '轮播图配置',
        icon: ContainerOutlined
      },
      {
        key: '/hot',
        title: '热销商品配置',
        icon: PieChartOutlined
      },
      {
        key: '/swiper3',
        title: '轮播图配置3',
        icon: DesktopOutlined
      }
    ]
  },
  {
    key: '/sysset',
    title: "系统配置",
    icon: '',
    children: [
      {
        key: '/changepsw',
        title: '修改密码',
        icon: MailOutlined
      }
    ]
  }
]