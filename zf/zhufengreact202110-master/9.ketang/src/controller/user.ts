import { Request, Response, NextFunction } from 'express';
import { validateRegisterInput } from '../utils/validator';
import HttpException from '../exceptions/HttpException';
import StatusCodes from 'http-status-codes';
import { User } from '../models/user';
import jwt, { JwtPayload } from 'jsonwebtoken';
//import { UserPayload } from '../typings/jwt';
/**
 * 注册路由控制器
 * 1.验证用户输入是否合法，如果不合法就报错，抛出错误
 * 2.如果合法则判断用户名是否在数据库中已经存在，如果存在，也抛错误
 * 3.如果不存在执行保存操作
 * 4.生成jwt token,并且返回给客户端
 * @param req 请求
 * @param res 响应
 * @param next 下一个
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { username, password, confirmPassword, email } = req.body;
        //1.验证用户输入是否合法
        const { valid, errors } = validateRegisterInput(username, password, confirmPassword, email);
        //如果不合法抛出异常
        if (!valid) {
            throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, `输入参数验证失败`, errors);
        }
        //如果合法，把用户输入保存到数据库中
        //User是模型 对应的整个集合或者表 user代表文档 ，代表某一个用户或者说某一条数据
        let user = new User({ username, password, email });
        //在保存到数据库之前我们还验证一下用户名是否重复
        let exist = await User.findUsername(username);
        if (exist) {
            throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, `用户名重复`, {});
        }
        //保存数据库 调用它的save方法可以把自己保存到数据库 
        await user.save();
        //要想这么用，需要自己先给user文档 对象扩展一个generateToken方法,用来生成jwt token
        let token = user.generateToken();
        res.json({
            success: true,
            data: { token }
        });
    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { username, password } = req.body;
        let user = await User.login(username, password);
        if (user) {
            let token = user.generateToken();
            res.json({
                success: true,
                data: { token }
            });
        } else {
            throw new HttpException(StatusCodes.UNAUTHORIZED, `用户名或密码错误`, {});
        }
    } catch (error) {
        next(error);
    }
}

export const validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers['authorization'];
        if (authorization) {
            const token = authorization.split(' ')[1];
            try {
                const payload: JwtPayload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
                const user = await User.findById(payload.id);
                if (user) {
                    res.json({
                        success: true,
                        data: user.toJSON()
                    });
                } else {
                    next(new HttpException(StatusCodes.UNAUTHORIZED, '用户不正确'));
                }
            } catch (error) {
                next(new HttpException(StatusCodes.UNAUTHORIZED, 'token为空'));
            }
        }
    } catch (error) {
        next(new HttpException(StatusCodes.UNAUTHORIZED, 'authorization为空'));
    }
}
export const uploadAvatar = async (req: Request, res: Response, _next: NextFunction) => {
    let { userId } = req.body;
    let domain = `http://localhost:8000`;
    let avatar = `${domain}/uploads/${req.file!.filename}`;
    await User.updateOne({ _id: userId }, { avatar });
    res.json({
        success: true,
        data: avatar
    });
}