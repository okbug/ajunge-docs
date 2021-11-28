/**
 * 给路由打补丁
 * @param {*} param0 
 */
export function patchRoutes({ routes }) {
    console.log('routes', routes);
    routes.unshift({
        path: '/foo',
        exact: true,
        component: require('./Foo').default,
    });
}