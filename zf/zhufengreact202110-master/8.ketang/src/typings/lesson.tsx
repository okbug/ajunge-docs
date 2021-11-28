export interface Lesson {
    id: string;
    title: string;//标题
    video: string;//视频地址
    poster: string;//海报地址
    url: string;//地址
    price: string;//价格
    category: string;//所属的分类 react vue react vue
}

export interface LessonResult {
    success:boolean;
    data:Lesson
}