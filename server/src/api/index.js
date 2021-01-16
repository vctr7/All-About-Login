import Router from 'koa-router';
import auth from './auth';
import callback from './callback';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/callback', callback.routes());

export default api;