import { ProfileState } from '@/store/reducers/profile';
import React,{PropsWithChildren,useEffect,useState} from 'react'
import {connect} from 'react-redux';
import {CombinedState} from '@/store/reducers';
import {RouteComponentProps} from 'react-router-dom';
import NavHeader from '@/components/NavHeader';
import actions from '@/store/actions/profile';
import { AxiosError } from 'axios';
import {message,Descriptions,Alert,Button,Upload} from 'antd';
import LOGIN_TYPES from '@/typings/login-types';
import './index.less';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { UploadFile ,UploadChangeParam,RcFile} from 'antd/lib/upload/interface';
type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = {
    [key in keyof typeof actions]:any
};
interface Params{}
type Props = PropsWithChildren<RouteComponentProps<Params>&StateProps&DispatchProps>
function Profile(props:Props) {
    let [uploading,setUploading] = useState(false);
    useEffect(()=>{
        //在此向服务器发验证请求的时候，会把token发回服务器，服务器会返回当前用户信息
        props.validate().catch((error:AxiosError)=>message.error(error.message));
    },[]);
    let content;
    if(props.loginState === LOGIN_TYPES.UN_VALIDATE){
        content = null;
    }else if(props.loginState === LOGIN_TYPES.LOGINED){
        const uploadButton = (
            <div>
                {uploading?<LoadingOutlined/>:<UploadOutlined/>}
                <div className="ant-upload-text">上传</div>
            </div>
        )
        File
        const handleChange = (info:UploadChangeParam)=>{
            //status 当前上传的状态
            let file:UploadFile = info.file;
            if(file.status === 'uploading'){//如果是上传中的话
                setUploading(true);
            }else if(file.status === 'done'){//上传完成了
                let {success,data,message} = info.file.response;
                if(success){
                    setUploading(false);
                    props.changeAvatar(data);
                }else{
                    message.error(message);
                }
            }
        }
        content = (
            <div className="user-info">
                <Descriptions title="当前用户">
                  <Descriptions.Item label="用户名">{props.user.username}</Descriptions.Item>
                  <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>
                  <Descriptions.Item label="头像">
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="http://ketang.zhufengpeixun.com/user/uploadAvatar"
                        beforeUpload={beforeUpload}
                        data={{userId:props.user.id,token:sessionStorage.getItem('access_token')}}
                        onChange={handleChange}
                      >
                        {
                            props.user.avatar?<img src={props.user.avatar} style={{width:'100%'}}/>:uploadButton
                        }
                      </Upload>
                  </Descriptions.Item>
                </Descriptions>
                <Button type="primary" onClick={async ()=>{
                    await props.logout();
                    props.history.push('/login');
                }}>退出登录</Button>
            </div>
        )
    }else{
        content = (
         <>
          <Alert type="warning" message="未登录" description="亲爱的用户你好，你选择注册或登录">
          </Alert>
           <div style={{textAlign:'center',padding:'50px'}}>
           <Button type="dashed" onClick={()=>props.history.push('/login')}>登录</Button>
           <Button type="dashed" style={{marginLeft:'50px'}} onClick={()=>props.history.push('/register')}>注册</Button>
          </div>
         </>
        )
    }
    return (
        <section>
           <NavHeader history={props.history}>个人中心</NavHeader>
           {content}
        </section>
    )
}
export function beforeUpload(file:RcFile){
    const isJpgOrPng = file.type === 'image/jpeg'|| file.type === 'image/png';
    if(!isJpgOrPng){
        message.error('你只能上传jpg/png文件');
    }
    const isLessThen2M = file.size /1024/1024 <2;
    if(!isLessThen2M){
        message.error('图片必须小于2M');
    }
    return isJpgOrPng&&isLessThen2M;
}
function mapStateToProps(state:CombinedState):ProfileState{
    return state.profile;
}
export default connect(mapStateToProps,actions)(Profile);