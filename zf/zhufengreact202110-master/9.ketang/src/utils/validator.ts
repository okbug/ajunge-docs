import validator from 'validator';

export const validateRegisterInput = (
    username: string,
    password: string,
    confirmPassword: string,
    email: string
) => {
    let errors: any = {};//TODO
    if (!username || validator.isEmpty(username)) {
        errors.username = '用户名不能为空';
    }
    if (!password || validator.isEmpty(password)) {
        errors.password = '密码不能为空';
    }
    if (!confirmPassword || validator.isEmpty(confirmPassword)) {
        errors.password = '确认密码不能为空';
    }
    if (password !== confirmPassword) {
        errors.password = '密码和确认密码不一致';
    }
    if (!email || validator.isEmpty(email)) {
        errors.email = '邮箱不能为空';
    }
    if (!validator.isEmail(email)) {
        errors.email = '邮箱地址不合法';
    }
    return { errors, valid: Object.keys(errors).length == 0 };
}