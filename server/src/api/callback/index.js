
import Router from 'koa-router';
import * as callbackCtrl from './callback.ctrl';

const callback = new Router();

callback.get('/github', callbackCtrl.github);
callback.get('/spotify', callbackCtrl.spotify);

callback.get('/google', callbackCtrl.google);

callback.get('/facebook', callbackCtrl.facebook);
// callback.get('/github', callbackCtrl.github);
// callback.get('/github', callbackCtrl.github);
// callback.get('/github', callbackCtrl.github);



export default callback;