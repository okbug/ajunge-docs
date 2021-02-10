const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let config = require('./config');
const conn = mongoose.createConnection(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

let UserSchema = new Schema({
    email: { type: String },//邮箱
    username: { type: String },//用户名
    password: { type: String, required: true },//密码
    avatar: { type: String, required: true },//头像
    access: { type: String, required: true,default:'user' }//当前用户的权限
},{timestamps:true,toJSON:{
    transform(doc,ret){
        ret.id=ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
    }
}});

const UserModel = conn.model('User', UserSchema);

module.exports = {
    UserModel
}