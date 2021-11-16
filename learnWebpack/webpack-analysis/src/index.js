import title, { age } from "./title";

console.log(title, age);
export const a = 1;

const btn = document.getElementById('btn')
btn.onclick = () => {
    import('./lazy.js').then(e => {
        console.log(e);
    })
}