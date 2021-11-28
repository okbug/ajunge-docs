import axios from './';
export function getSliders(){
    return axios.get('/slider/list');
}
/**
 * 通过分页的方式获取课程列表
 * @param currentCategory  当前的分类 
 * @param offset  偏移量
 * @param limit  每页的条数
 */
export function getLessons(currentCategory='all',offset:number,limit:number){
  return axios.get(`/lesson/list?category=${currentCategory}&offset=${offset}&limit=${limit}`);
}
/**
 * 1-5 react
 * 6-10 vue
 * 11-15 react 
 * 16-20 vue
 */
 export function getLesson<T>(id:string){
  return axios.get<T,T>(`/lesson/${id}`);
}