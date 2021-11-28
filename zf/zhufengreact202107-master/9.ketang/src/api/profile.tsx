import { LoginPayload, RegisterPayload } from '@/typings/user';
import axios from './';
export function validate(){
    return axios.get('/user/validate');
}
export function register<T>(values:RegisterPayload){
    return axios.post<T,T>('/user/register',values);
}
export function login<T>(values:LoginPayload){
    return axios.post<T,T>('/user/login',values);
}