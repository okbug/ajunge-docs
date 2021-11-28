import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';//它可以读取当前目录中的.env文件，把对应的属性和值写入process.env对象
import multer from 'multer';
import path from 'path';
import morgan from 'morgan';
import * as userController from './controller/user';
import errorMiddleware from './middlewares/errorMiddleware';
//指定文件上传中间件的存储配置
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public', 'uploads'),
    filename: (_req: Request, file: Express.Multer.File, cb: Function) => {
        //最终保存的文件名是 时间戳+原来的文件扩展名
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });
const app: Express = express();
//打印开发访问日志的
app.use(morgan('dev'));
app.use(cors());
//这个是用来过滤恶意输入的
app.use(helmet());
//这个可以将public目录作为静态文件根目录 
app.use(express.static(path.resolve(__dirname, 'public')));
//解析JSON格式的请求体 把请求体变成对象传递给req.body
app.use(express.json());
//解析form格式的请求体 把请求体变成对象传递给req.body
app.use(express.urlencoded({ extended: true }));
app.get('/', (_req: Request, res: Response) => {
    res.json({ success: true, message: 'hello' });
});
app.post('/user/register', userController.register);
app.post('/user/login', userController.login);
app.get('/user/validate', userController.validate);
app.post('/user/uploadAvatar', upload.single('avatar'), userController.uploadAvatar);
app.use(errorMiddleware);
; (async function () {
    //mongoose.set('useNewUrlParser', true);
    //mongoose.set('useUnifinedTopology', true);
    await mongoose.connect('mongodb://localhost/zhufengketang');
})();
const PORT: number = 8000;
app.listen(PORT, () => {
    console.log(`服务器已经启动在 http://localhost:${PORT}`);
});