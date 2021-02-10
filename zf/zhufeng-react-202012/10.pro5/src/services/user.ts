import { request } from 'umi';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  return request<API.CurrentUser>('/api/currentUser',{
    headers:{
      // 以后每次请求服务器的时候，都要把这个token带回给服务器，以便让服务器判断当前是哪个用户登录了
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  });
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
