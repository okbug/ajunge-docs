export default [{
        path: 'userStatistics',
        meta: {
            auth: 'userStatistics'
        },
        name: 'userStatistics',
        component: () => import( /*webpackChunkName:'manager'*/ '@/views/Manager/userStatistics.vue')
    },
    {
        path: 'userAuth',
        meta: {
            auth: 'userAuth'
        },
        name: 'userAuth',
        component: () => import( /*webpackChunkName:'manager'*/ '@/views/Manager/userAuth.vue')
    },
    {
        path: 'infoPublish',
        meta: {
            auth: 'infoPublish'
        },
        name: 'infoPublish',
        component: () => import( /*webpackChunkName:'manager'*/ '@/views/Manager/infoPublish.vue')
    },
    {
        path: 'articleManager',
        meta: {
            auth: 'articleManager'
        },
        name: 'articleManager',
        component: () => import( /*webpackChunkName:'manager'*/ '@/views/Manager/articleManager.vue')
    },
    {
        path: 'personal',
        name: 'personal',
        meta: {
            auth: 'personal'
        },
        component: () => import( /*webpackChunkName:'manager'*/ '@/views/Manager/personal.vue')
    },
    {
        path: 'myCollection',
        meta: {
            auth: 'myCollection'
        },
        name: 'myCollection',
        component: () => import( /*webpackChunkName:'manager'*/ '@/views/Manager/myCollection.vue')
    },
    {
        path: 'privateMessage',
        meta: {
            auth: 'privateMessage'
        },
        name: 'privateMessage',
        component: () => import( /*webpackChunkName:'manager'*/ '@/views/Manager/privateMessage.vue')
    },
    {
        path: 'myArticle',
        meta: {
            auth: 'myArticle'
        },
        name: 'myArticle',
        component: () => import( /*webpackChunkName:'manager'*/ '@/views/Manager/myArticle.vue')
    }
]