import axios from '.';
export function getSliders() {
    return axios.get('/slider/list');
}
/**
 * 获取课程列表
 * @param currentCategory  当前分类，你要获取哪个分类的课程
 * @param offset  从第几个索引开始取
 * @param limit 每页获取的条数
 * @returns
 */
export function getLessons(
    currentCategory: string = 'all',
    offset: number = 0,
    limit: number = 5
) {
    return axios.get(`/lesson/list?category=${currentCategory}&offset=${offset}&limit=${limit}`);
}

export function getLesson<T>(id: string) {
    return axios.get<T, T>(`/lesson/${id}`);
}