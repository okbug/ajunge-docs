import axios from '.';
import { RegisterPayload, LoginPayload } from '@/typings/user';
export function validate() {
    return axios.get('/user/validate');
}

export function register<T>(values: RegisterPayload) {
    //第一个泛型T指的是 期待的响应体的类型 第2个泛型指的是真正响应的类型
    //响应体 {success:true}  响应对象{data: {success:true},status:200,statusText:"OK",headers:响应头}
    return axios.post<T, T>('/user/register', values);
}
export function login<T>(values: LoginPayload) {
    //第一个泛型T指的是 期待的响应体的类型 第2个泛型指的是真正响应的类型
    //响应体 {success:true}  响应对象{data: {success:true},status:200,statusText:"OK",headers:响应头}
    return axios.post<T, T>('/user/login', values);
}