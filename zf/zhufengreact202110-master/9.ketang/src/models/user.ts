import { model, Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt, { JwtPayload } from 'jsonwebtoken';
//import { UserPayload } from '../typings/jwt';
//UserScheme类似于mysql里的表，也就对应mongodb里的集合
export interface IUserDocument extends Document {
    username: string;
    password: string,
    avatar: string,
    email: string;
    generateToken: () => string;
}
const UserScheme: Schema<IUserDocument> = new Schema({
    username: {
        type: String,
        required: [true, '用户名不能为空'],
        minlength: [6, '用户名不能少于6位'],
        maxlength: [12, '用户名不能大于12位']
    },
    password: String,
    avatar: String,
    email: {
        type: String,
        trim: true,//写数据库的时候去掉值左右的空格
        validate: {
            validator: validator.isEmail
        }

    }
}, {
    //mongoose里的对象和普通的JSON对象并不相同，
    timestamps: true, toJSON: {
        transform(_doc, result) {
            result.id = result._id;
            delete result._id;;
            delete result.__v;
            delete result.password;
            return result;
        }
    }
});
//给文档对象扩展一个实例方法用来生成此文档 的jwt token
UserScheme.methods.generateToken = function () {
    let payload: JwtPayload = { id: this._id };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' });
}
//UserScheme.static可以用来给模型Model扩展静态方法，
UserScheme.static('findUsername', async function (this: any, username: string) {
    let user = await this.model('User').findOne({ username });
    return !!user;
});
UserScheme.static('login', async function (this: any, username: string, password: string) {
    let user = await this.model('User').findOne({ username });
    if (user) {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) {
            return user;
        } else {
            return null;
        }
    }
    return user;
});
//这其实是一个钩子，当用户在执行save方法前执行此函数 
UserScheme.pre<IUserDocument>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        this
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    };
});
interface IUserModel<T extends Document> extends Model<T> {
    findUsername: (username: string) => IUserDocument | null
    login: (username: string, password: string) => IUserDocument | null
}
//User是一个数据库模型 可以通过对象数据库进行数据处理
//代表一个数据库的连接
export const User: IUserModel<IUserDocument> = model<IUserDocument, IUserModel<IUserDocument>>('User', UserScheme);