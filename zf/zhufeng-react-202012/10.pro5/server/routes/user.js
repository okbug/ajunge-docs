let express=require('express');
let {UserModel} = require('../model');
let jwt = require('jsonwebtoken');
let config = require('../config');
const router = express.Router();
//注册 url =/api/register
//req.body = {"email":"user@qq.com",username:"user","password":"user","access":"user"};
router.post('/register', async (req, res) => {
    let user = req.body;
    let hash = require('crypto').createHash('md5').update(user.email).digest('hex');
    user.avatar = `https://secure.gravatar.com/avatar/${hash}?s=48`;
    user = await UserModel.create(user);
    res.send({ status: 'ok',access: user.toJSON().access});
});
//查看用户列表
router.get('/user', async (req, res) => {
    let users = await UserModel.find();
    let dataSource = users.map(item=>item.toJSON());
    res.send({ success: true,data:dataSource});
});
//登录
router.post('/login/account', async (req, res) => {
    let query = {username:req.body.username,password:req.body.password};
    let dbUser = await UserModel.findOne(query);
    if (dbUser) {
        let user = dbUser.toJSON();
        let token = jwt.sign(user, config.secret,{expiresIn:'5d'});
        return res.send({ status: 'ok', token, type: 'account', access: user.access });
    } else {
        return res.send({
            status: 'error',
            type: 'account',
            access: 'guest'
        });
    }
});
//查看当前用户信息
router.get('/currentUser', async (req, res) => {
    let authorization = req.headers['authorization'];//获取 请求头中的认证信息
    if (authorization) {
        try {//通过JWT取出对应的用户信息
            let user = jwt.verify(authorization.split(' ')[1], config.secret);
            res.json(user);//返回用户信息
        } catch (err) {
            res.status(401).send({});
        }
    } else {
        res.status(401).send({});
    }
});
router.get('/login/outLogin', async (req, res) => {
    res.send({ data: {}, success: true });
});
module.exports = router;