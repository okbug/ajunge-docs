

const load = document.getElementById('load');
load.addEventListener('click', () => {
    import(/* webpackChunkName: 'title' */'./title').then(result => {
        console.log(result.default);
    });
});
