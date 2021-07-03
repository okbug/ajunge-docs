import src from './1.jpeg'
// import './1.css'
import './1'
import $ from 'jquery'
import vue from 'vue'
import loadsh from 'loadsh'
console.log($, vue, loadsh)

let img = new Image();
img.src = src;
document.body.appendChild(img)