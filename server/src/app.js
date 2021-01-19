require("dotenv").config();

import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import api from "./api";
import jwtMiddleware from "./lib/jwtMiddleware";
import * as mongodb from './mongodb/mongodb.js';

const https = require('https');
const sslConfig = require('../private/ssl-config.js');
const options = {
    key: sslConfig.privateKey,
    cert: sslConfig.certificate,
    passphrase: process.env.PASSPHRASE,
  };
const router = new Router();
const app = new Koa();
const port = process.env.PORT || 8888;
mongodb.connect();

router.use("/api", api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => console.log(`HTTP server Listening on port ${port}`));

const httpsServer = https.createServer(options, app.callback());
httpsServer.listen(8796, () => console.log(`HTTPS server Listening on port ${8796}`));