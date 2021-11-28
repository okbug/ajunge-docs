export default interface Lesson{
    id:string;
    title:string;
    video:string;
    poster:string;
    url:string;
    price:string;
    category:string;//react vue
}
interface  LessonResult{
    success:boolean;
    data:Lesson
}
export {
    Lesson,
    LessonResult
}