import Joi from 'joi';
import User from '../../models/user';
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

export const register = async ctx => {
    console.log("register : receive data!")
    const schema = Joi.object().keys({
        userId: Joi.string().required(),
        password: Joi.string().required(),
        userName: Joi.string()
        .min(3)
        .max(20)
        .required(),
        emailAddress: Joi.string(),
        signBy: Joi.string().required(),
    });

    const result = schema.validate(ctx.request.body);
    // console.log(result);
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { userId, password, userName, emailAddress, signBy } = ctx.request.body;

    try{
        const exists = await User.findByUserId(userId);
        if(exists){
            ctx.status = 409;
            console.log("Already exist")
            return;
        }

        const user = new User({
            userId,
            userName,
            emailAddress,
            signBy,
        });

        await user.setPassword(password);
        await user.save();
        ctx.body = user.serialize();
        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60* 60 * 24 * 7,
            httpOnly: true,
        });
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const login = async ctx => {
    console.log("login : receive data!")
    const { userId, password } = ctx.request.body;

    if (!userId || !password) {
        ctx.status = 401;
        return;
    }

    try {
        const user = await User.findByUserId(userId);
        if(!user){
            ctx.status = 401;
            return;
        }
        const valid = await user.checkPassword(password);

        if(!valid){
            ctx.status = 401;
            return;
        }

        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60* 60 * 24 * 7,
            httpOnly: true,
        });

    } catch (e){
        throw(500, e);
    }
};

export const check = async ctx => {
    console.log("check : receive data!")
    const { user } = ctx.state;
    if(!user){
        ctx.status = 401;
        return;
    }
    const userinfo = await User.findByUserId(user.userId);
    ctx.body = userinfo;
};

export const logout = async ctx => {
    console.log("logout : receive data!")
    ctx.cookies.set('access_token');
    ctx.status = 204;
};