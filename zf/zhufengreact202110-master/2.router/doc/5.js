//   <Route path="/" exact={true} component={Home} />
let path = '/';
let exact = true;
let pathname = '/user';
let url = '/';//匹配到的url地址
let isExact = url === pathname;
if (exact && !isExact) {
    return null;
}
