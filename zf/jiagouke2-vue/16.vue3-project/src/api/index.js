import {request} from '../utils/axios';

export function getPlanList(){
    return request({url:'/plan',method:'get'})
}

export function addPlan(data){
    return request({url:'/plan',method:'post',data})
}

export function deletePlan(id){
    return request({url:'/plan',method:'delete', params:{id}})
}