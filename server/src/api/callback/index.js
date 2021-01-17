
import Router from 'koa-router';
import * as callbackCtrl from './callback.ctrl';

const callback = new Router();

callback.get('/github', callbackCtrl.github);
callback.get('/spotify', callbackCtrl.spotify);

callback.post('/google', callbackCtrl.google);
callback.post('/facebook', callbackCtrl.facebook);
callback.post('/amazon', callbackCtrl.amazon);
// callback.get('/github', callbackCtrl.github);
// callback.get('/github', callbackCtrl.github);



export default callback;