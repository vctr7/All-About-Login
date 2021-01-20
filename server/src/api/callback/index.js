import Router from "koa-router";
import * as callbackCtrl from "./callback.ctrl";

const callback = new Router();

callback.get("/github", callbackCtrl.github);
callback.get("/spotify", callbackCtrl.spotify);
callback.post("/microsoft", callbackCtrl.microsoft);
callback.get("/linkedin", callbackCtrl.linkedin);
callback.get("/discord", callbackCtrl.discord);
callback.get("/line", callbackCtrl.line);


callback.post("/twitch", callbackCtrl.twitch);

callback.post("/kakao", callbackCtrl.kakao);
callback.post("/google", callbackCtrl.google);
callback.post("/facebook", callbackCtrl.facebook);
callback.post("/amazon", callbackCtrl.amazon);
callback.post("/naver", callbackCtrl.naver);

export default callback;
